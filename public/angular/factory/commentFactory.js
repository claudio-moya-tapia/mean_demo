/**
 * Factory Comment
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Comment', function(activeRecordService) {

    function Comment(){
        this.model = 'comment';
    }

    Comment.prototype = activeRecordService;

    return Comment;
});
