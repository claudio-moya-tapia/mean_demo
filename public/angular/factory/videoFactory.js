/**
 * Factory Video
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Video', function(activeRecordService) {

    function Video(){
        this.model = 'video';
    }

    Video.prototype = activeRecordService;

    return Video;
});
