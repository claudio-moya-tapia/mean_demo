/**
 * Factory PostLike
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('PostLike', function(activeRecordService) {

    function PostLike(){
        this.model = 'post-like';
    }

    PostLike.prototype = activeRecordService;

    return PostLike;
});
