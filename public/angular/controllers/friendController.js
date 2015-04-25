/**
 * Controller FriendList
 * @param {$scope} $scope DOM manipulation
 */
app.controller('FriendList', function($scope, Profile, Friend) {

    $scope.myProfile = {};
    $scope.searchFriend = {};
    $scope.aryFriend = [];
    $scope.ref_profile_friend = [];
    $scope.friendAdded = null;
    $scope.friendDeleted = null;
    $scope.firstLoad = true;
    $scope.friendSkip = 0;
    $scope.friendLimit = 10;
    $scope.activeLoadMore = false;
    $scope.searchQueue = [];
    $scope.searchQueueComplete = [];
    $scope.searchQueueBusy = false;
    $scope.searchFriendQueue = [];
    $scope.searchFriendQueueComplete = [];
    $scope.searchFriendQueueBusy = false;
    
    /**
     * Init
     */
    $scope.init = function() {
        if ($scope.firstLoad) {
            $scope.firstLoad = false;
            $scope.findFriends();
        }
    };

    $scope.getMyProfile = function() {
        var profile = new Profile();
        profile.params = {
            'fields': '_id, ref_profile_friend'
        };
        profile.ready = $scope.getMyProfileReady;
        profile.findAll();
    };

    $scope.getMyProfileReady = function(profile) {
        $scope.myProfile = profile;
        $scope.findFriends();
    };

    $scope.findFriends = function() {
        var friend = new Friend();
        friend.id = $scope.profile._id;
        friend.params = {
            'fields': 'ref_profile_friend',
            'ref[profile_friend][fields]': '_id, full_name, ref_image, total_friend, total_post',
            'ref[profile_friend.image][fields]': 'image_original',
            'ref[profile_friend][limit]': $scope.friendLimit,
            'ref[profile_friend][skip]': $scope.friendSkip,
            'ref[profile_friend][sort]': 'full_name'
        };
        friend.ready = $scope.findFriendsReady;
        friend.findById();
    };

    $scope.findFriendsReady = function(profile) {

        if (profile.ref_profile_friend.length > 0) {
            $scope.activeLoadMore = true;
            $scope.aryFriend = $scope.aryFriend.concat(profile.ref_profile_friend);
            $scope.friendSkip += $scope.friendLimit;
        } else {
            $scope.activeLoadMore = false;
        }
        
        $scope.searchQueueComplete.push(true);
        $scope.searchQueueBusy = false;
        $scope.processQueue();
    };

    $scope.processQueue = function() {
        
        if($scope.searchQueue.length > $scope.searchQueueComplete.length){
            if(!$scope.searchQueueBusy){
                $scope.searchQueueBusy = true;
                $scope.findFriends();
            }
        }
        
    };

    $scope.actionLoadMore = function() {
        if ($scope.activeLoadMore) {
            $scope.searchQueue.push(true);
            $scope.processQueue();
        }
    };

    /**
     * Searchs profiles by name or lastname
     */
    $scope.actionSearch = function() {

        if ($scope.searchFriend.name.length > 0) {
            
            $scope.activeLoadMore = false;
            $scope.searchFriendQueue.push(true);
            $scope.processFriendQueue();
           
        } else {

            $scope.aryFriend = [];
            $scope.activeLoadMore = true;
            $scope.friendSkip = 0;
            $scope.findFriends();
        }
    };
    
    $scope.processFriendQueue = function(){
        if($scope.searchFriendQueue.length > $scope.searchFriendQueueComplete.length){
            if(!$scope.searchFriendQueueBusy){
                $scope.searchFriendQueueBusy = true;
                $scope.findFriendsByName();
            }
        }
    };
    
    $scope.findFriendsByName = function() {
        
        var friend = new Friend();
        friend.params = {
            'fields': '_id, full_name, ref_image, total_friend, total_post',
            'ref[image][fields]': 'image_original',
            'search[and][full_name]': '*' + $scope.searchFriend.name + '*',
            'limit': false
        };
        friend.ready = $scope.findFriendsByNameReady;
        friend.findAll();
    };

    $scope.findFriendsByNameReady = function(aryFriend) {

        if (Array.isArray(aryFriend)) {
            $scope.aryFriend = aryFriend;
        } else {
            $scope.aryFriend = new Array(aryFriend);
        }
        
        $scope.searchFriendQueueComplete.push(true);
        $scope.searchFriendQueueBusy = false;
        $scope.processFriendQueue();
    };

    /**
     * Add a new friend
     */
    $scope.actionAdd = function(friend) {

        var index = $scope.myProfile.ref_profile_friend.indexOf(friend._id);

        if (index == -1) {
            $scope.friendAdded = friend;
            $scope.myProfile.ref_profile_friend.push(friend._id);
            $scope.update();
        }
    };

    /**
     * Delete a friend
     */
    $scope.actionDelete = function(friend) {

        var index = $scope.myProfile.ref_profile_friend.indexOf(friend._id);
        if (index != -1) {
            $scope.friendDeleted = friend;
            $scope.myProfile.ref_profile_friend.splice(index, 1);
            $scope.update();
        }
    };

    /**
     * Update (add or remove) a friend
     * Also update the followers references inside ApiFriendController
     */
    $scope.update = function() {

        var friend = new Friend();
        friend.id = $scope.myProfile._id;
        friend.data = {
            'ref_profile_friend': $scope.myProfile.ref_profile_friend
        };
        friend.ready = $scope.updateReady;
        friend.update();
    };

    $scope.updateReady = function() {

        if ($scope.myProfile._id == $scope.profile._id) {

            if ($scope.friendAdded != null) {

                $scope.profile.ref_profile_friend.unshift($scope.friendAdded);
                $scope.friendAdded = null;
                $scope.$broadcast('profile.refresh()');
            }

            if ($scope.friendDeleted != null) {

                var aryFriends = $scope.profile.ref_profile_friend;
                var aryFriendsNew = [];

                for (var x in aryFriends) {
                    var friend = aryFriends[x];

                    if (friend._id != $scope.friendDeleted._id) {
                        aryFriendsNew.push(friend);
                    }
                }

                $scope.profile.ref_profile_friend = aryFriendsNew;
                $scope.friendDeleted = null;
                $scope.$broadcast('profile.refresh()');
            }
        }
    };

    /**
     * Communication with child controller
     * $on('profile') from $scope.$emit('profile', profile) ProfileShared
     * $broadcast variable profile_id to WallController scope
     */
    $scope.$on('profile.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.$broadcast('profile_id', $scope.profile._id);
    });

    /**
     * Communication with child controller
     * $on('myProfile') from $scope.$emit('myProfile', profile) ProfileShared
     * start the friend controller with $scope.init();
     */
    $scope.$on('profile.getMyProfile()', function(event, profile) {
        $scope.myProfile = profile;
        $scope.init();
    });
});

/**
 * Controller FriendView
 * @param {$scope} $scope DOM manipulation
 */
app.controller('FriendView', function($scope, Friend) {

});

/**
 * Controller FriendIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('FriendIndex', function($scope, Friend) {

});