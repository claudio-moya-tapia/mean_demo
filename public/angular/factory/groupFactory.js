/**
 * Factory Group
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Group', function(activeRecordService) {

    function Group(){
        this.model = 'group';
    }

    Group.prototype = activeRecordService;

    return Group;
});
