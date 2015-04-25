/**
 * Factory WallPost
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('WallPost', function(activeRecordService) {

    function WallPost(){
        this.model = 'wall-post';
    }

    WallPost.prototype = activeRecordService;

    return WallPost;
});
