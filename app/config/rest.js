module.exports = function() {

    /**
     * Class REST
     * All API controllers extends this class
     * @property {Object} req ExpressJS request object (req)
     * @property {Object} res ExpressJS response object (res)
     */
    function Rest() {

    }

    /**
     * Common callback used by all controllers
     * @param {Object} err Error response, null if no errors found
     * @param {Object} model MongooseJS object
     */
    Rest.prototype.callback = function(err, model) {

        if (err) {
            this.res.status(400).send('Bad Request: ' + err.message);
        } else {
            if (model != null) {

                if (model.length == 1) {
                    model = model[0];
                }

                this.res.json(model);
            } else {
                this.res.status(400).send('Bad Request');
            }
        }
    };

    /**
     * Set the PUT fields to Model
     * @param {Object} Model MongooseJS Model
     * @returns {Object} Model MongooseJS Model
     */
    Rest.prototype.setPut = function(Model) {

        var errorCode = 0;
        var aryAtribute = new Array();
        var value = '';

        for (var atribute in Model.schema.tree) {

            if ((atribute != 'id') && (atribute != '_id') && (atribute != '__v')) {
                aryAtribute.push(atribute);
            }
        }

        if (aryAtribute.length == 0) {
            errorCode = 400;
        } else {

            for (var field in this.req.body) {

                if ((field != 'id') && (field != '_id') && (field != '__v')) {

                    if (aryAtribute.indexOf(field) == -1) {

                        errorCode = 400;
                        break;
                    } else {

                        value = this.req.body[field];
                        Model[field] = value;
                    }
                }
            }
        }

        switch (errorCode) {
            case 400:
                this.res.status(400).send('Bad Request');
                return null;
                break;
            default:
                return Model;
                break;
        }
    };

    /**
     * Set the POST fields to Model
     * @param {Object} Model MongooseJS Model
     * @returns {Object} Model MongooseJS Model
     */
    Rest.prototype.setPost = function(Model) {

        var errorCode = 0;
        var aryAtribute = new Array();

        for (var atribute in Model.schema.tree) {

            if ((atribute != 'id') && (atribute != '_id') && (atribute != '__v')) {
                aryAtribute.push(atribute);
            }
        }

        if (aryAtribute.length == 0) {
            errorCode = 400;
        } else {

            var model = new Model();

            for (var prop in this.req.body) {

                if (aryAtribute.indexOf(prop) == -1) {

                    errorCode = 400;
                    break;
                } else {

                    model[prop] = this.req.body[prop];
                }
            }
        }

        switch (errorCode) {
            case 400:
                this.res.status(400).send('Bad Request: Field not found ' + prop);
                return null;
                break;
            default:
                return model;
                break;
        }
    };

    /**
     * Set the fields of Model with reference models
     * @param {Object} Model MongooseJS Model
     * @returns {Object} model MongooseJS Model
     */
    Rest.prototype.find = function(Model) {
        var model = Model.findById(this.req.params.id);

        var fields = {};
        var populate = {};
        var populateAry = new Array();
        var search = {};
        var greater = null;
        var lower = null;

        if (typeof this.req.query.ref !== 'undefined') {

            var ref = this.req.query.ref;

            for (var modeQuery in ref) {

                var refModel = '';

                if (modeQuery.search('.') != -1) {
                    //Sub reference
                    refModel = 'ref_' + modeQuery.replace(/\./gi, '.ref_');

                } else {
                    refModel = 'ref_' + modeQuery;
                }

                populateAry.push(refModel);

                populate[refModel] = {};
                populate[refModel].select = '';
                populate[refModel].match = '';
                populate[refModel].options = {};
                populate[refModel].options.sort = '';
                populate[refModel].options.limit = 10;
                populate[refModel].options.skip = 0;

                for (var option in ref[modeQuery]) {

                    switch (option) {
                        case 'fields':

                            populate[refModel].select = ref[modeQuery][option].replace(/\,/gi, ' ');

                            break;
                        case 'search':

                            search = ref[modeQuery][option];

                            for (var condition in search) {

                                switch (condition) {
                                    case 'match':

                                        for (var field in search[condition]) {

                                            var fieldValue = search[condition][field].toString();
                                            var aryField = fieldValue.split(',');

                                            for (var i in aryField) {
                                                populate[refModel].match[field] = this.parseLikeCondition(aryField[i]);
                                            }
                                        }

                                        break;
                                    case 'greater':

                                        for (var field in search[condition]) {
                                            value = search[condition][field];

                                            greater = {};
                                            greater[field] = value;
                                        }

                                        break;
                                    case 'lower':

                                        for (var field in search[condition]) {
                                            value = search[condition][field];

                                            lower = {};
                                            lower[field] = value;
                                        }

                                        break;
                                }
                            }

                            break;
                        case 'sort':

                            populate[refModel].options.sort = ref[modeQuery][option];

                            break;
                        case 'limit':

                            populate[refModel].options.limit = ref[modeQuery][option];

                            break;
                        case 'skip':

                            populate[refModel].options.skip = parseInt(ref[modeQuery][option]);

                            break;
                    }
                }
                
                if ((greater != null) && (lower != null)) {

                    var dateGt = new Date();
                    var dateLt = new Date();

                    for (var field in greater) {
                        var date = greater[field];
                        dateGt = new Date(date + ' 00:00:00');
                    }

                    for (var field in lower) {
                        var date = lower[field];
                        dateLt = new Date(date + ' 23:59:59');
                    }

                    //Greater or equal
                    populate[refModel].match[field] = {
                        $gte: dateGt.toJSON()
                    };

                    //Lower or equal
                    populate[refModel].match[field] = {
                        $lte: dateLt.toJSON()
                    };
                }

                if ((greater != null) && (lower == null)) {

                    var dateGt = new Date();

                    for (var field in greater) {
                        var date = greater[field];
                        dateGt = new Date(date + ' 00:00:00');
                    }

                    //Greater or equal
                    populate[refModel].match[field] = {
                        $gte: dateGt.toJSON()
                    };
                }

                if ((greater == null) && (lower != null)) {

                    var dateLt = new Date();

                    for (var field in lower) {
                        var date = lower[field];
                        dateLt = new Date(date + ' 23:59:59');
                    }

                    //Lower or equal
                    populate[refModel].match[field] = {
                        $lte: dateLt.toJSON()
                    };
                }
            }
        }

        model.deepPopulate(populateAry, {
            populate: populate
        });

        for (var item in this.req.query) {

            var value = this.req.query[item];

            switch (item) {
                case 'fields':
                    fields = value.replace(/\,/gi, ' ');
                    break;
                default:

                    break;
            }
        }

        model = model.select(fields);

        return model;
    };

    /**
     * Creates a dynamic query based on the params sent via GET
     * @param {Object} Model MongooseJS Model
     * @returns {Object} model MongooseJS Model
     */
    Rest.prototype.findAll = function(Model) {

        var field = {};
        var fields = {};
        var whereAnd = new Array();
        var whereOr = new Array();
        var sort = '_id';
        var skip = 0;
        var limit = 10;
        var count = false;
        var search = {};
        var greater = null;
        var lower = null;

        var item = '';
        var value = '';

        var model = Model.find();

        var populate = {};
        var populateAry = new Array();

        if (typeof this.req.query.ref !== 'undefined') {

            var ref = this.req.query.ref;

            for (var modeQuery in ref) {

                var refModel = '';

                if (modeQuery.search('.') != -1) {
                    //Sub reference
                    refModel = 'ref_' + modeQuery.replace(/\./gi, '.ref_');

                } else {
                    refModel = 'ref_' + modeQuery;
                }

                populateAry.push(refModel);

                populate[refModel] = {};
                populate[refModel].select = '';
                populate[refModel].match = {};
                populate[refModel].options = {};
                populate[refModel].options.sort = '';
                populate[refModel].options.limit = 10;
                populate[refModel].options.skip = 0;

                for (var option in ref[modeQuery]) {

                    switch (option) {
                        case 'fields':

                            populate[refModel].select = ref[modeQuery][option].replace(/\,/gi, ' ');

                            break;
                        case 'limit':
                            
                            populate[refModel].options.limit = ref[modeQuery][option];

                            break;
                        case 'search':

                            search = ref[modeQuery][option];

                            for (var condition in search) {

                                switch (condition) {
                                    case 'match':

                                        for (var field in search[condition]) {

                                            var fieldValue = search[condition][field].toString();
                                            var aryField = fieldValue.split(',');

                                            for (var i in aryField) {
                                                populate[refModel].match[field] = this.parseLikeCondition(aryField[i]);
                                            }
                                        }

                                        break;
                                    case 'greater':

                                        for (var field in search[condition]) {
                                            value = search[condition][field];

                                            greater = {};
                                            greater[field] = value;
                                        }

                                        break;
                                    case 'lower':

                                        for (var field in search[condition]) {
                                            value = search[condition][field];

                                            lower = {};
                                            lower[field] = value;
                                        }

                                        break;
                                }
                            }

                            break;
                        case 'sort':

                            populate[refModel].options.sort = ref[modeQuery][option];

                            break;
                        case 'skip':

                            populate[refModel].options.skip = parseInt(ref[modeQuery][option]);

                            break;
                    }
                }

                if ((greater != null) && (lower != null)) {

                    var dateGt = new Date();
                    var dateLt = new Date();

                    for (var field in greater) {
                        var date = greater[field];
                        dateGt = new Date(date + ' 00:00:00');
                    }

                    for (var field in lower) {
                        var date = lower[field];
                        dateLt = new Date(date + ' 23:59:59');
                    }

                    //Greater or equal
                    populate[refModel].match[field] = {
                        $gte: dateGt.toJSON()
                    };

                    //Lower or equal
                    populate[refModel].match[field] = {
                        $lte: dateLt.toJSON()
                    };
                }

                if ((greater != null) && (lower == null)) {

                    var dateGt = new Date();

                    for (var field in greater) {
                        var date = greater[field];
                        dateGt = new Date(date + ' 00:00:00');
                    }

                    //Greater or equal
                    populate[refModel].match[field] = {
                        $gte: dateGt.toJSON()
                    };
                }

                if ((greater == null) && (lower != null)) {

                    var dateLt = new Date();

                    for (var field in lower) {
                        var date = lower[field];
                        dateLt = new Date(date + ' 23:59:59');
                    }

                    //Lower or equal
                    populate[refModel].match[field] = {
                        $lte: dateLt.toJSON()
                    };
                }
            }
        }

        model.deepPopulate(populateAry, {
            populate: populate
        });

        /**
         * Reset search filters
         */
        var field = {};
        var fields = {};
        var whereAnd = new Array();
        var whereOr = new Array();
        var sort = '_id';
        var skip = 0;
        var limit = 10;
        var count = false;
        var search = {};
        var greater = null;
        var lower = null;

        var item = '';
        var value = '';

        for (var item in this.req.query) {

            var value = this.req.query[item];

            switch (item) {
                case 'fields':
                    fields = value.replace(/\,/gi, ' ');
                    break;
                case 'sort':
                    sort = value.replace(',', ' ');
                    break;
                case 'skip':
                    skip = parseInt(value);
                    break;
                case 'limit':
                    limit = parseInt(value);
                    break;
                case 'count':
                    count = new Boolean(value);
                    break;
                case 'search':
                    search = value;

                    for (var condition in search) {

                        switch (condition) {
                            case 'and':

                                for (var field in search[condition]) {

                                    var fieldValue = search[condition][field].toString();
                                    var aryField = fieldValue.split(',');

                                    for (var i in aryField) {
                                        var objAnd = {};
                                        objAnd[field] = this.parseLikeCondition(aryField[i]);

                                        whereAnd.push(objAnd);
                                    }
                                }

                                break;
                            case 'or':

                                for (var field in search[condition]) {

                                    var fieldValue = search[condition][field].toString();
                                    var aryField = fieldValue.split(',');

                                    for (var i in aryField) {
                                        var objOr = {};
                                        objOr[field] = this.parseLikeCondition(aryField[i]);

                                        whereOr.push(objOr);
                                    }
                                }

                                break;
                            case 'in':

                                for (var field in search[condition]) {

                                    var fieldValue = search[condition][field].toString();
                                    var aryField = fieldValue.split(',');
                                    var aryFieldNew = new Array();

                                    for (var i in aryField) {
                                        aryFieldNew.push(this.parseLikeCondition(aryField[i]));
                                    }

                                    model = model.where(field).in(aryFieldNew);
                                }

                                break;
                            case 'greater':

                                for (var field in search[condition]) {
                                    value = search[condition][field];

                                    greater = {};
                                    greater[field] = value;
                                }

                                break;
                            case 'lower':

                                for (var field in search[condition]) {
                                    value = search[condition][field];

                                    lower = {};
                                    lower[field] = value;
                                }

                                break;
                        }
                    }

                    break;
                default:

                    break;
            }
        }

        if ((greater != null) && (lower != null)) {

            var dateGt = new Date();
            var dateLt = new Date();

            for (var field in greater) {
                var date = greater[field];
                dateGt = new Date(date + ' 00:00:00');
            }

            for (var field in lower) {
                var date = lower[field];
                dateLt = new Date(date + ' 23:59:59');
            }

            //Greater or equal
            model = model.where(field).gte(dateGt.toJSON());
            //Lower or equal
            model = model.where(field).lte(dateLt.toJSON());
        }

        if ((greater != null) && (lower == null)) {

            var dateGt = new Date();

            for (var field in greater) {
                var date = greater[field];
                dateGt = new Date(date + ' 00:00:00');
            }

            //Greater or equal
            model = model.where(field).gte(dateGt.toJSON());
        }

        if ((greater == null) && (lower != null)) {

            var dateLt = new Date();

            for (var field in lower) {
                var date = lower[field];
                dateLt = new Date(date + ' 23:59:59');
            }

            //Lower or equal
            model = model.where(field).lte(dateLt.toJSON());
        }

        if (whereAnd.length > 0) {
            model = model.and(whereAnd);
        }

        if (whereOr.length > 0) {
            model = model.or(whereOr);
        }

        if (count) {
            model.count();
        } else {
            model = model.select(fields);
            model = model.skip(skip);
            model = model.limit(limit);
            model = model.sort(sort);
        }

        return model;
    };

    /**
     * Check valid ObjectId of MongodDB
     * @param {String} id ObjectId or normal String
     * @return {Boolean}
     */
    Rest.prototype.isValidId = function(id) {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        return checkForHexRegExp.test(id);
    };

    /**
     * Simulate SQL LIKE condition using '*'
     * Set RegExp for text search
     * @param {String} value
     * @returns {RegExp} filter
     */
    Rest.prototype.parseLikeCondition = function(value) {

        var value = value.toString();
        var filter = null;

        if (this.isValidId(value)) {
            filter = new Object(value);
        } else {

            var filter = value;
            var likeIn = value.charAt(0);
            var likeOut = value.charAt(value.length - 1);

            if ((likeIn == '*') && (likeOut == '*')) {
                var newValue = value.replace('*', '');
                newValue = newValue.replace('*', '');

                filter = new RegExp(newValue, 'gi');
            }

            if ((likeIn != '*') && (likeOut == '*')) {
                var newValue = value.replace('*', '');

                filter = new RegExp('^' + newValue, 'gi');
            }

            if ((likeIn == '*') && (likeOut != '*')) {
                var newValue = value.replace('*', '');

                filter = new RegExp(newValue + '$', 'gi');
            }
        }

        return filter;
    };

    /**
     * Validates GET requests based on REST API standards
     * @returns {Boolean}
     */
    Rest.prototype.isValidGet = function() {

        var errorCode = 0;
        var prop = '';

        if (typeof this.req.params.id === 'undefined') {

            var allowParams = new Array();
            allowParams.push('fields');
            allowParams.push('sort');
            allowParams.push('skip');
            allowParams.push('offset');
            allowParams.push('limit');
            allowParams.push('count');
            allowParams.push('search');
            allowParams.push('ref');

            for (var prop in this.req.query) {

                if (this.req.query[prop] == '') {
                    errorCode = 400;
                    break;

                } else {

                    if (allowParams.indexOf(prop) == -1) {
                        errorCode = 400;
                        break;
                    }
                }
            }

        } else {

            if (this.req.params.id.length != 24) {
                errorCode = 400;
            }
        }

        switch (errorCode) {
            case 400:
                this.res.status(400).send('Bad Request: Empty values are not allowed : ' + prop);
                return false;
                break;
            default:
                return true;
                break;
        }
    };

    /**
     * Validates POST requests based on REST API standards
     * @returns {Boolean}
     */
    Rest.prototype.isValidPost = function() {
        var errorCode = 0;
        var prop = '';
        var countBody = 0;

        for (var prop in this.req.body) {
            if (!this.isValidField(prop)) {
                errorCode = 400;
                break;
            }

            countBody++;
        }

        if (countBody == 0) {
            errorCode = 400;
        }

        switch (errorCode) {
            case 400:
                this.res.status(400).send('Bad Request: Empty values are not allowed ' + prop);
                return false;
                break;
            default:
                return true;
                break;
        }
    };

    /**
     * Validates PUT requests based on REST API standards
     * @returns {Boolean}
     */
    Rest.prototype.isValidPut = function() {

        var errorCode = 0;
        var prop = '';

        if (typeof this.req.params.id === 'undefined') {
            errorCode = 405;
        }

        var countBody = 0;
        for (var prop in this.req.body) {

            if (!this.isValidField(prop)) {
                errorCode = 400;
                break;
            }

            countBody++;
        }

        if (countBody == 0) {
            errorCode = 400;
        }

        switch (errorCode) {
            case 400:
                this.res.status(400).send('Bad Request: Empty values are not allowed ' + prop);
                return false;
                break;
            case 405:
                this.res.status(405).send('Method Not Allowed');
                return false;
                break;
            default:
                return true;
                break;
        }
    };

    /**
     * Validates DELETE requests based on REST API standards
     * @returns {Boolean}
     */
    Rest.prototype.isValidDelete = function() {
        var errorCode = 0;

        if (typeof this.req.params.id === 'undefined') {
            errorCode = 405;
        }

        switch (errorCode) {
            case 405:
                this.res.status(405).send('Method Not Allowed');
                return false;
                break;
            default:
                return true;
                break;
        }
    };

    /**
     * Validates fields of a MongooseJS schema
     * check if property exists and if it's required
     * @property {String} prop Property of MongooseJS schema
     * @returns {Boolean}
     */
    Rest.prototype.isValidField = function(prop) {

        var isValid = true;
        var Schema = require('app/models/' + this.model);
        var aryFieldRequiered = new Array();
        var aryFieldValid = new Array();

        for (var atribute in Schema.schema.tree) {

            for (var atributeValue in Schema.schema.tree[atribute]) {

                if (atributeValue == 'required') {
                    aryFieldRequiered.push(atribute);
                }
            }

            aryFieldValid.push(atribute);
        }

        if (aryFieldValid.indexOf(prop) == -1) {
            isValid = false;
        } else {

            if (aryFieldRequiered.indexOf(prop) != -1) {

                if (this.req.body[prop].length == 0) {
                    isValid = false;
                }
            }
        }

        return isValid;
    };

    /**
     * Export new Rest
     */
    return new Rest();
};