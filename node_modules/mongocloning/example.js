var logs = true;
require('./mongocloning')({
        "src": "mongodb://localhost:27017/fromDatabase",
        "dst": "mongodb://localhost:27017/toDatabase"
    }, logs);