/**
 * Factory GroupPost
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('GroupPost', function(activeRecordService) {

    function GroupPost(){
        this.model = 'group-post';
    }

    GroupPost.prototype = activeRecordService;

    return GroupPost;
});
