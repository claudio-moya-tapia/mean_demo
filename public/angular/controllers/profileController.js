/**
 * Controller ProfileShared
 * @param {$scope} $scope DOM manipulation
 */
app.controller('ProfileShared', function($scope, $stateParams, Profile) {

    $scope.profile = {};
    $scope.myProfile = {};

    $scope.init = function() {
        var profile = new Profile();

        if (typeof $stateParams.id !== 'undefined') {
            profile.id = $stateParams.id;
        }

        profile.params = {
            'ref[image][fields]': 'image_original',
            'ref[image_cover][fields]': 'image_original',
            'ref[profile_friend][fields]': '_id, full_name, ref_image, total_friend, total_post',
            'ref[profile_friend][limit]': 12,
            'ref[profile_friend][sort]': 'date_updated',
            'ref[profile_friend.image][fields]': 'image_original',
            'ref[profile_friend.image][limit]': 12,
            'ref[profile_follower][fields]': '_id, full_name, ref_image, total_friend, total_post',
            'ref[profile_follower.image][fields]': 'image_original',
            'ref[group][fields]': '_id, title, ref_image',
            'ref[group][sort]': '-date_updated',
            'ref[group][limit]': 12,
            'ref[group.image][fields]': 'image_original, image_small',
            'ref[group.image][limit]': 12
        };

        profile.ready = $scope.getProfileReady;
        profile.findById();
    };

    /**
     * Communication with parent controller
     * $emit variable profile to any parent scope
     */
    $scope.getProfileReady = function(profile) {

        $scope.profile = profile;
        $scope.$emit('profile.getProfile()', profile);
        $scope.getMyProfile();
    };

    $scope.getMyProfile = function() {

        var profile = new Profile();
        profile.params = {
            'fields': '_id, ref_profile_friend, ref_image_cover',
            'ref[image_cover]': 'yes'
        };
        profile.ready = $scope.getMyProfileReady;
        profile.findAll();
    };

    /**
     * Communication with parent controller
     * $emit variable myProfile to any parent scope
     */
    $scope.getMyProfileReady = function(profile) {
        $scope.myProfile = profile;
        $scope.$emit('profile.getMyProfile()', profile);
    };

    /**
     * Communication with parent controller
     * request to refresh the current profile
     */
    $scope.$on('profile.refresh()', function() {
        $scope.init();
    });

    $scope.init();
});

/**
 * Controller ProfileIndex
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Profile} Profile factory
 */
app.controller('ProfileIndex', function($scope, $location) {

    $scope.$on('profile.getMyProfile()', function(event, profile) {
        $location.path('/profile/' + profile._id);
    });

//    $scope.isFriendProfile = false;
//    $scope.profile = {};
//    $scope.myProfile = {};
//    $scope.aryFiles = [];
//    $scope.cover = {};
//    $scope.cover.url = 'http://placehold.it/758x168';
//    $scope.cover.originalName = '';
//    $scope.isNewCover = false;
//
//    $scope.actionCoverUpdate = function() {
//
//        var image = new Image();
//        image.data = {
//            'image_original': $scope.cover.url,
//            'image_small': $scope.cover.smallUrl,
//            'image_medium': $scope.cover.mediumUrl,
//            'image_large': $scope.cover.largeUrl,
//            'image_name': $scope.cover.originalName
//        };
//        image.ready = $scope.actionCoverUpdateReady;
//        image.add();
//    };
//
//    $scope.actionCoverUpdateReady = function(image) {
//        $scope.updateCover(image);
//    };
//
//    $scope.updateCover = function(image) {
//        var profile = new Profile();
//        profile.id = $scope.myProfile._id;
//        profile.data = {
//            'ref_image_cover': image._id
//        };
//        profile.ready = $scope.updateCoverReady;
//        profile.update();
//    };
//    
//    $scope.updateCoverReady = function(image) {
//        $scope.isNewCover = false;
//    };
//
//    $scope.actionCoverCancel = function() {
//        $scope.isNewCover = false;
//        $scope.cover.url = $scope.myProfile.ref_image_cover.image_original;
//    };
//
//    /**
//     * Communication with child controller
//     * $on('profile') from $scope.$emit('profile', profile) ProfileShared
//     * $broadcast variable profile_id to WallController scope
//     */
//    $scope.$on('profile.getProfile()', function(event, profile) {
//        $scope.profile = profile;
//        $scope.$broadcast('wall.infiniteScroll', true);
//        $scope.$broadcast('wall.profile_id', $scope.profile._id);
//    });
//
//    $scope.$on('profile.getMyProfile()', function(event, profile) {
//        $scope.myProfile = profile;
//        
//        if(typeof $scope.myProfile.ref_image_cover !== 'undefined'){
//            $scope.cover.url = $scope.myProfile.ref_image_cover.image_original;
//        }
//
//        if ($scope.profile._id != $scope.myProfile._id) {
//            $scope.isFriendProfile = true;
//        }
//    });
//
//    /**
//     * Communication with UploaderController
//     * $on('uploader.getFiles()') 
//     * from UploaderController
//     * $scope.$emit('uploader.getFiles()', $scope.aryFiles)
//     */
//    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
//        $scope.cover = aryFiles[aryFiles.length - 1];
//        $scope.isNewCover = true;
//    });
});

/**
 * Controller ProfileView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Profile} Profile factory
 */
app.controller('ProfileView', function($scope, $stateParams, Profile, Friend, Image) {

    $scope.isFriendProfile = false;
    $scope.profile = {};
    $scope.myProfile = {};
    $scope.aryFiles = [];
    $scope.cover = {};
    $scope.cover.url = 'http://placehold.it/758x168';
    $scope.cover.originalName = '';
    $scope.isNewCover = false;

    $scope.actionCoverUpdate = function() {

        var image = new Image();
        image.data = {
            'image_original': $scope.cover.url,
            'image_small': $scope.cover.smallUrl,
            'image_medium': $scope.cover.mediumUrl,
            'image_large': $scope.cover.largeUrl,
            'image_name': $scope.cover.originalName
        };
        image.ready = $scope.actionCoverUpdateReady;
        image.add();
    };

    $scope.actionCoverUpdateReady = function(image) {
        $scope.updateCover(image);
    };

    $scope.updateCover = function(image) {
        var profile = new Profile();
        profile.id = $scope.myProfile._id;
        profile.data = {
            'ref_image_cover': image._id
        };
        profile.ready = $scope.updateCoverReady;
        profile.update();
    };

    $scope.updateCoverReady = function(image) {
        $scope.isNewCover = false;
    };

    $scope.actionCoverCancel = function() {
        $scope.isNewCover = false;
        $scope.cover.url = $scope.myProfile.ref_image_cover.image_original;
    };

    /**
     * Add a new friend
     */
    $scope.actionAddFriend = function() {

        var index = $scope.myProfile.ref_profile_friend.indexOf($scope.profile._id);

        if (index == -1) {
            $scope.friendAdded = $scope.profile;
            $scope.myProfile.ref_profile_friend.push($scope.profile._id);
            $scope.updateFriend();
        }
    };

    /**
     * Delete a friend
     */
    $scope.actionDeleteFriend = function() {

        var index = $scope.myProfile.ref_profile_friend.indexOf($scope.profile._id);
        if (index != -1) {
            $scope.friendDeleted = $scope.profile;
            $scope.myProfile.ref_profile_friend.splice(index, 1);
            $scope.updateFriend();
        }
    };

    /**
     * Update (add or remove) a friend
     * Also update the followers references inside ApiFriendController
     */
    $scope.updateFriend = function() {

        var friend = new Friend();
        friend.id = $scope.myProfile._id;
        friend.data = {
            'ref_profile_friend': $scope.myProfile.ref_profile_friend
        };
        friend.ready = $scope.updateReady;
        friend.update();
    };

    $scope.updateReady = function() {

    };

    /**
     * Communication with child controller
     * $on('profile') from $scope.$emit('profile', profile) ProfileShared
     * $broadcast variable profile_id to WallController scope
     */
    $scope.$on('profile.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.$broadcast('wall.infiniteScroll', true);
        $scope.$broadcast('wall.profile_id', $scope.profile._id);
    });

    $scope.$on('profile.getMyProfile()', function(event, profile) {
        $scope.myProfile = profile;

        if ($scope.profile._id != $scope.myProfile._id) {
            $scope.isFriendProfile = true;
            
            console.log($scope.profile);
            
            if (typeof $scope.profile.ref_image_cover !== 'undefined') {
                $scope.cover.url = $scope.profile.ref_image_cover.image_original;
            }
            
        }else{
            
            if (typeof $scope.myProfile.ref_image_cover !== 'undefined') {
                $scope.cover.url = $scope.myProfile.ref_image_cover.image_original;
            }
        }
    });

    /**
     * Communication with UploaderController
     * $on('uploader.getFiles()') 
     * from UploaderController
     * $scope.$emit('uploader.getFiles()', $scope.aryFiles)
     */
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.cover = aryFiles[aryFiles.length - 1];
        $scope.isNewCover = true;
    });

////VIEW ONLY
//    $scope.isMyProfile = false;
//    $scope.isFriendProfile = true;
//    $scope.profile = {};
//    $scope.myProfile = {};
//    $scope.friendAdded = {};
//    $scope.friendDeleted = {};
//
//    /**
//     * Add a new friend
//     */
//    $scope.actionAddFriend = function() {
//
//        var index = $scope.myProfile.ref_profile_friend.indexOf($scope.profile._id);
//
//        if (index == -1) {
//            $scope.friendAdded = $scope.profile;
//            $scope.myProfile.ref_profile_friend.push($scope.profile._id);
//            $scope.updateFriend();
//        }
//    };
//
//    /**
//     * Delete a friend
//     */
//    $scope.actionDeleteFriend = function() {
//
//        var index = $scope.myProfile.ref_profile_friend.indexOf($scope.profile._id);
//        if (index != -1) {
//            $scope.friendDeleted = $scope.profile;
//            $scope.myProfile.ref_profile_friend.splice(index, 1);
//            $scope.updateFriend();
//        }
//    };
//
//    /**
//     * Update (add or remove) a friend
//     * Also update the followers references inside ApiFriendController
//     */
//    $scope.updateFriend = function() {
//
//        var friend = new Friend();
//        friend.id = $scope.myProfile._id;
//        friend.data = {
//            'ref_profile_friend': $scope.myProfile.ref_profile_friend
//        };
//        friend.ready = $scope.updateReady;
//        friend.update();
//    };
//
//    $scope.updateReady = function() {
//
//    };
//
//    /**
//     * Communication with child controller
//     * $on('profile') from $scope.$emit('profile', profile) ProfileShared
//     * $broadcast variable profile_id to WallController scope
//     */
//    $scope.$on('profile.getProfile()', function(event, profile) {
//        $scope.profile = profile;
//        $scope.$broadcast('wall.infiniteScroll', true);
//        $scope.$broadcast('wall.profile_id', $scope.profile._id);
//    });
//
//    $scope.$on('profile.getMyProfile()', function(event, profile) {
//        $scope.myProfile = profile;
//
//        if ($scope.profile._id != $scope.myProfile._id) {
//            $scope.isFriendProfile = true;
//            
//        }else{
//            $scope.isMyProfile = true;
//        }
//        
//        console.log($scope.isMyProfile);
//    });
});