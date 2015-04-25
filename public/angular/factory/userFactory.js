/**
 * Factory User
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('User', function(activeRecordService) {

    function User(){
        this.model = 'user';
    }

    User.prototype = activeRecordService;

    return User;
});
