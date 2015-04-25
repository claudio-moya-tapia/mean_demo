/**
 * Service activeRecordService
 * All Factories extends this Service
 * @param {http} $http module for HTTP/REST requests
 */
app.service('activeRecordService', function($http) {
    /**
     * Model name of the Factory
     * @type String 
     */
    this.model = '';
    /**
     * Database item ID
     * @type String
     */
    this.id = '';
    /**
     * Parameters to be used on GET requests
     * Methods "findAll" and "findById"
     * @example /post?search[title]=hello
     * @example params.search.title
     * @type Object
     */
    this.params = {};
    /**
     * Data to be used on the body part of POST and PUT requests
     * Methods "add" and "update"
     * @example params.search.title
     * @type Object
     */
    this.data = {};
    /**
     * Method used for Callback on sucess requests
     * @returns {Object/Array} mixed JSON objects
     */
    this.ready = function(){};
    /**
     * Method used for Callback on request errors
     * @returns {Object} JSON object
     */
    this.error = function(){};

    /**
     * Method findAll
     * @returns {Array} JSON array
     */
    this.findAll = function() {
       
        var url = '/api/'+this.model;
        $http.get(url, {params: this.params}).success(this.ready).error(this.error);
    };
    
    /**
     * Method findById
     * @returns {Object} JSON object
     */
    this.findById = function() {
        
        var url = '/api/'+this.model+'/'+this.id;
        $http.get(url, {params: this.params}).success(this.ready).error(this.error);
    };
    
    /**
     * Method add
     * @returns {Object} JSON object
     */
    this.add = function() {
       
        var url = '/api/'+this.model;
        $http.post(url, this.data).success(this.ready).error(this.error);
    };
    
    /**
     * Method update
     * @returns {Object} JSON object
     */
    this.update = function() {
        
        var url = '/api/'+this.model+'/'+this.id;
        $http.put(url, this.data).success(this.ready).error(this.error);
    };
    
    /**
     * Method delete
     * @returns {Object} JSON object
     */
    this.delete = function() {
        
        var url = '/api/'+this.model+'/'+this.id;
        $http.delete(url, this.data).success(this.ready).error(this.error);
    };
});