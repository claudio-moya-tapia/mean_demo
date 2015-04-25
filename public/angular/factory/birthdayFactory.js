/**
 * Factory Birthday
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Birthday', function(activeRecordService) {

    function Birthday(){
        this.model = 'birthday';
    }

    Birthday.prototype = activeRecordService;

    return Birthday;
});
