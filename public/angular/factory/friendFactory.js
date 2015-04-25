/**
 * Factory Friend
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Friend', function(activeRecordService) {

    function Friend(){
        this.model = 'friend';
    }

    Friend.prototype = activeRecordService;

    return Friend;
});
