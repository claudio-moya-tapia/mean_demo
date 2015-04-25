/**
 * Factory Profile
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Profile', function(activeRecordService) {

    function Profile(){
        this.model = 'profile';
    }

    Profile.prototype = activeRecordService;

    return Profile;
});
