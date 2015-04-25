/**
 * Factory Image
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Image', function(activeRecordService) {

    function Image(){
        this.model = 'image';
    }

    Image.prototype = activeRecordService;

    return Image;
});
