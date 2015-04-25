/**
 * Controller IndexHome
 * @param {$scope} $scope DOM manipulation
 */
app.controller('IndexHome', function($scope, Profile, Page, Birthday) {
    $scope.aryNewsHome = [];
    $scope.arySliderHome = [];
    $scope.aryGalleryHome = [];
    $scope.aryBirthdayHome = [];
    
    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.$broadcast('wall.postLimit', 3);
        $scope.$broadcast('wall.infiniteScroll', false);
        $scope.$broadcast('wall.profile_id', profile._id);
        $scope.$broadcast('wall.getWall()');
        $scope.getNews();
    });

    $scope.getNews = function() {
        var page = new Page();
        page.params = {
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'search[and][location]': 'noticia',
            'search[and][prominent]': 'true',
            'search[and][active]': 'true',
            'sort': 'order',
            'limit': '4'
        };
        page.ready = $scope.getNewsReady;
        page.findAll();

    };

    $scope.getNewsReady = function(aryNews) {

        if (!Array.isArray(aryNews)) {
            aryNews = new Array(aryNews);
        }
        
        $scope.aryNewsHome = aryNews;

        $scope.getSlider();
    };

    $scope.getSlider = function() {
        var slider = new Page();
        slider.params = {
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'search[and][location]': 'slider',
            'search[and][active]': 'true',
            'sort': 'order'
        };
        slider.ready = $scope.getSliderReady;
        slider.findAll();
    };

    $scope.getSliderReady = function(arySlider) {

        if (!Array.isArray(arySlider)) {
            arySlider = new Array(arySlider);
        }

        $scope.arySliderHome = arySlider;
        $scope.getGallery();
    };

    $scope.getGallery = function() {
        var gallery = new Page();
        gallery.params = {
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'search[and][location]': 'galeria',
            'search[and][active]': 'true',
            'sort': 'order'
        };
        gallery.ready = $scope.getGalleryReady;
        gallery.findAll();
    };

    $scope.getGalleryReady = function(aryGallery) {

        if (!Array.isArray(aryGallery)) {
            aryGallery = new Array(aryGallery);
        }

        $scope.aryGalleryHome = aryGallery;
        $scope.getBirthday();
    };

    $scope.getBirthday = function() {
        var date = moment().format('l');  //mm/dd/yyyy
        $scope.arySplit = date.split('/');

        var birthday = new Birthday();
        
        birthday.params = {
            'ref[image]': 'yes',
            'search[and][month]' : $scope.arySplit[0],
            'sort' : '-day',
            'limit' : 10
        };
        birthday.ready = $scope.getBirthdayReady;
        birthday.findAll();

    };

    $scope.getBirthdayReady = function(aryBirthday) {

        if (!Array.isArray(aryBirthday)) {
            aryBirthday = new Array(aryBirthday);
        }
        $scope.aryBirthdayHome = aryBirthday;
    };
});

/**
 * Controller IndexHome
 * @param {$scope} $scope DOM manipulation
 */
app.controller('IndexShared', function($scope, Profile, Page) {

    $scope.aryMenuHome = [];
    $scope.aryBanner = [];

    /**
     * Init
     */
    $scope.init = function() {
        $scope.getProfile();
        $scope.getPages();
    };

    $scope.getProfile = function() {
        var profile = new Profile();
        profile.params = {
            'ref[image][fields]': 'image_original'
        };
        profile.ready = $scope.getProfileReady;
        profile.findAll();
    };

    /**
     * Communication with child controller
     * $broadcast variable profile_id to WallController scope
     */
    $scope.getProfileReady = function(profile) {
        $scope.$emit('index.getProfile()', profile);
    };

    $scope.getPages = function() {
        var page = new Page();
        page.params = {
            'ref[image]': 'yes',
            'search[and][active]': true,
            'sort': 'order',
            'limit': false
        };
        page.ready = $scope.getMenuReady;
        page.findAll();
    };

    $scope.getMenuReady = function(aryPage) {

        if (!Array.isArray(aryPage)) {
            aryPage = new Array(aryPage);
        }

        for (var i in aryPage) {
            var page = aryPage[i];

            if (page.location == 'menu_home') {
                $scope.aryMenuHome.push(page);
            } else
            if (page.location == 'banner') {
                $scope.aryBanner.push(page);
            }
        }
    };

    /**
     * Called from WallShared
     * via $scope.$emit('refreshProfile');
     */
    $scope.$on('profile.refresh()', function() {
        $scope.getProfile();
    });

    $scope.init();
});