/**
 * Controller BirthdayIndex
 * @param {$scope} $scope DOM manipulation
 */

app.controller('BirthdayIndex', function($scope, Profile, Birthday) {

    $scope.firstLoad = true;
    $scope.aryBirthdays = [];
    $scope.activeDay = false;
    $scope.activeWeek = false;
    $scope.activeMonth = false;
    
    $scope.init = function() {
        if($scope.firstLoad){
            $scope.firstLoad = false;
            $scope.actionBirthdayWeek();
            $scope.activeWeek = true;
        }
        
    };
    
    /**
     * Search Birthday day
     */
    $scope.actionBirthdayDay = function() {
        var date = moment().format('l');  //mm/dd/yyyy
        $scope.arySplit = date.split('/');
        var birthday = new Birthday();
        $scope.activeDay = true;
        $scope.activeWeek = false;
        $scope.activeMonth = false;
        
        birthday.params = {
            'ref[image]': 'yes',
            'search[and][month]' : $scope.arySplit[0],
            'search[and][day]' : $scope.arySplit[1]
        };
        birthday.ready = $scope.actionSearchReady;
        birthday.findAll();
        
    };
    
    /**
     * Search Birthday week
     */
    $scope.actionBirthdayWeek = function() {
        $scope.activeDay = false;
        $scope.activeWeek = true;
        $scope.activeMonth = false;
        var begin = moment().startOf("isoWeek").format('l');
        $scope.arySplitBegin = begin.split('/');
        var monday = $scope.arySplitBegin[1];
        var tuesday = parseInt($scope.arySplitBegin[1])+1;
        var wednesday = parseInt($scope.arySplitBegin[1])+2;
        var thursday = parseInt($scope.arySplitBegin[1])+3;
        var friday = parseInt($scope.arySplitBegin[1])+4;
        var saturday = parseInt($scope.arySplitBegin[1])+5;
        var sunday = parseInt($scope.arySplitBegin[1]) +6;     
  
        var birthday = new Birthday();
        birthday.params = {
            'ref[image]': 'yes',
            'search[and][month]' : $scope.arySplitBegin[0],
            'search[or][day]' : monday+','+tuesday+','+wednesday+','+thursday+','+friday+','+saturday+','+sunday+''

        };
        birthday.ready = $scope.actionSearchReady;
        birthday.findAll();
    };  
    
    /**
     * Search Birthday week
     */
    $scope.actionBirthdayMonth = function() {
        $scope.activeDay = false;
        $scope.activeWeek = false;
        $scope.activeMonth = true;
        var date = moment().format('l');  //mm/dd/yyyy
        $scope.arySplit = date.split('/');
        var birthday = new Birthday();
        
        birthday.params = {
            'ref[image]': 'yes',
            'search[and][month]' : $scope.arySplit[0],
        };
        birthday.ready = $scope.actionSearchReady;
        birthday.findAll();
    };


    $scope.actionSearchReady = function(aryBirthday) {
        
        if (Array.isArray(aryBirthday)) {
            $scope.aryBirthday = aryBirthday;
        } else {
            $scope.aryBirthday = new Array(aryBirthday);
        }

    };
    
    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.init();
    });
    
});