/**
 * Factory Wall
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Wall', function(activeRecordService) {

    function Wall(){
        this.model = 'wall';
    }

    Wall.prototype = activeRecordService;

    return Wall;
});
