var coolors = require('coolors');
var MongoClient = require('mongodb').MongoClient;
var totalCollections;
var databasesConnected = 0;
var currentInsertedCollection = 0;
var doLogs = false;
var dbs = {
    src: null,
    dst: null
};

function logger(msg){
    if(doLogs){
        console.log(msg);
    }
}

function logError(msg, err){
    logger(coolors(msg, {
        text: 'red',
        bold: true
    }));
    logger(err);
    logger(err.stack);
    process.exit();
}

function connected(err, db, dbProvider) {

    if(err){
        logError('Error to connect ' + (dbProvider === 'dst' ? 'destination' : 'source') + ' database', err);
        return;
    }

    logger(coolors('Connected correctly to ' + (dbProvider === 'src' ? 'destination' : 'source') + ' database', {
        text: 'blue',
        bold: true
    }));

    databasesConnected++;
    dbProvider === 'dst' ? dbs.dst = db : dbs.src = db;

    if(databasesConnected == 2){
        findCollections();
    }

}

function findCollections(){

    dbs.src.collectionNames(function(err, collections){

        if(err){
            logError('Some error getting collections names', err);
            return;
        }

        var collectionsNames = collections.map(function(collection){
            return collection.name;
        }).filter(function(collectionName){
            return collectionName.indexOf('.') === -1;
        });
        totalCollections = collectionsNames.length;

        if(!totalCollections){
            logger(coolors('No there are collections to clone', 'white'));
            process.exit();
        }

        collectionsNames.forEach(copyDocuments);

    });

}

function copyDocuments(collectionName){

    var collectionSrc = dbs.src.collection(collectionName);
    var collectionDst = dbs.dst.collection(collectionName);
    collectionSrc.find({}).toArray(function(err, docs) {

        if(err){
            logError('Some error getting documents from ' + collectionName + ' in source database', err);
            return;
        }

        if(!docs.length){
            checkEnd();
            return;
        }

        collectionDst.insert(docs, function(err, result) {

            if(err){
                logError('Some error inserting documents in ' + collectionName + ' in destination database', err);
                return;
            }

            logger(coolors('Documents inserted in collection ' + collectionName, 'green'));

            // End?
            checkEnd();

        });

    });

}

function checkEnd(){
    currentInsertedCollection++;
    if(currentInsertedCollection == totalCollections){
        logger(coolors('End migration', 'white'));
        process.exit();
    }
}

module.exports = function(config, forceLogs){
    doLogs = forceLogs;
    MongoClient.connect(config.src, function(err, db){
        connected(err, db, 'src');
    });
    MongoClient.connect(config.dst, function(err, db){
        connected(err, db, 'dst');
    });

};