/**
 * Factory PostShare
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('PostShare', function(activeRecordService) {

    function PostShare(){
        this.model = 'post-share';
    }

    PostShare.prototype = activeRecordService;

    return PostShare;
});
