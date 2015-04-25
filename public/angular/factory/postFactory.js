/**
 * Factory Post
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Post', function(activeRecordService) {

    function Post(){
        this.model = 'post';
    }

    Post.prototype = activeRecordService;

    return Post;
});
