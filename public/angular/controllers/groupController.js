/**
 * Controller GroupIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('GroupIndex', function($scope, Group, GroupPost, Comment) {
    $scope.aryLatestGroup = [];
    $scope.aryTrending = [];
    $scope.aryLatestPost = [];
    $scope.aryLatestComment = [];

    /**
     * Latest Group
     */
    $scope.setLatestGroup = function() {
        var group = new Group();
        group.params = {
            'ref[image]': 'yes',
            'sort': '-date_created',
            'limit': 10
        };
        group.ready = $scope.setLatestGroupReady;
        group.findAll();
    };

    $scope.setLatestGroupReady = function(aryLatestGroup) {

        if (!Array.isArray(aryLatestGroup)) {
            aryLatestGroup = new Array(aryLatestGroup);
        }

        $scope.aryLatestGroup = aryLatestGroup;

        $scope.setTrending();
    };

    /**
     * Trending
     */
    $scope.setTrending = function() {
        var groupPost = new GroupPost();
        groupPost.params = {
            'ref[group][fields]': 'title',
            'fields': 'ref_group,title',
            'sort': '-date_updated',
            'limit': 10
        };
        groupPost.ready = $scope.setTrendingRes;
        groupPost.findAll();
    };

    $scope.setTrendingRes = function(aryTrending) {
        if (!Array.isArray(aryTrending)) {
            aryTrending = new Array(aryTrending);
        }

        $scope.aryTrending = aryTrending;

        $scope.setLastestPost();
    };

    /**
     * Latest Group Posts
     */
    $scope.setLastestPost = function() {
        var groupPost = new GroupPost();
        groupPost.params = {
            'ref[group][fields]': 'title, ref_image',
            'ref[group.image][fields]': 'image_small',
            'fields': 'ref_group,title, text',
            'sort': '-date_created',
            'limit': 3
        };
        groupPost.ready = $scope.setLastestPostRes;
        groupPost.findAll();
    };

    $scope.setLastestPostRes = function(aryLatestPost) {
        if (!Array.isArray(aryLatestPost)) {
            aryLatestPost = new Array(aryLatestPost);
        }

        $scope.aryLatestPost = aryLatestPost;
        $scope.setLatestComment();
    };

    /**
     * Lastest Group Comments
     */
    $scope.setLatestComment = function() {
        var comment = new Comment();
        comment.params = {
            'search[and][source]': 'group_post',
            'ref[group_post][fields]': 'title',
            'sort': '-date_created',
            'limit': 5
        };
        comment.ready = $scope.setLatestCommentReady;
        comment.findAll();
    };

    $scope.setLatestCommentReady = function(aryComment) {
        if (!Array.isArray(aryComment)) {
            aryComment = new Array(aryComment);
        }

        $scope.aryLatestComment = aryComment;
    };

    /**
     * Init
     */
    $scope.init = function() {
        $scope.setLatestGroup();
    };

    $scope.init();
});

/**
 * Controller GroupMenu
 * @param {$scope} $scope DOM manipulation
 */
app.controller('GroupMenu', function($scope, $rootScope, Group) {
    
    $scope.currentMenu = '';

});

/**
 * Controller GroupList
 * @param {$scope} $scope DOM manipulation
 * @param {Group} Group factory
 */
app.controller('GroupList', function($scope, Group, Profile) {
  
    $scope.profile = {};
    $scope.aryGroup = [];
    $scope.showMyGroups = false;

    $scope.init = function() {
        $scope.setProfile();
    };

    /**
     * Profile
     */
    $scope.setProfile = function() {
        var profile = new Profile();
        profile.params = {
            'fields': '_id'
        };
        profile.ready = $scope.setProfileReady;
        profile.findAll();
    };

    $scope.setProfileReady = function(profile) {
        $scope.profile = profile;
        $scope.myGroups();
    };

    $scope.myGroups = function() {

        var group = new Group();

        if ($scope.showMyGroups) {

            group.params = {
                'search[and][ref_profile_owner]': $scope.profile._id,
                'ref[image]': 'yes'
            };

        } else {

            group.params = {
                'search[in][ref_profile_member]': $scope.profile._id,
                'ref[image]': 'yes'
            };
        }

        group.ready = $scope.myGroupsRes;
        group.findAll();
    };

    $scope.myGroupsRes = function(aryGroups) {

        if (!Array.isArray(aryGroups)) {
            aryGroups = new Array(aryGroups);
        }

        $scope.aryGroup = aryGroups;
    };

    $scope.$watch('showMyGroups', function(value) {
        $scope.myGroups();
    });

    $scope.init();
});

/**
 * Controller GroupSearch
 * @param {$scope} $scope DOM manipulation
 * @param {Group} Group factory
 */
app.controller('GroupSearch', function($scope, Group) {
   
    $scope.aryGroup = [];

    $scope.init = function() {
        $scope.searchGroups();
    };
    
    $scope.actionSearch = function(){
        var group = new Group();
        group.params = {
            'search[in][title]': '*'+$scope.searchGroup.name+'*',
            'sort': '-date_updated',
            'ref[image]': 'yes'
        };
        group.ready = $scope.searchGroupsRes;
        group.findAll();
    };

    $scope.searchGroups = function() {

        var group = new Group();
        group.params = {
            'sort': '-date_updated',
            'ref[image]': 'yes'
        };
        group.ready = $scope.searchGroupsRes;
        group.findAll();
    };

    $scope.searchGroupsRes = function(aryGroups) {

        if (!Array.isArray(aryGroups)) {
            aryGroups = new Array(aryGroups);
        }

        $scope.aryGroup = aryGroups;
    };

    $scope.init();
});

/**
 * Controller GroupSearch
 * @param {$scope} $scope DOM manipulation
 * @param {Group} Group factory
 */
app.controller('GroupMember', function($scope, Group) {

});

/**
 * Controller GroupNew
 * @param {$scope} $scope DOM manipulation
 * @param {$location} $location service
 * @param {Group} Group factory
 */
app.controller('GroupNew', function($scope, $location, Group, Image) {
    
    $scope.group = {};
    $scope.image = {};
    $scope.image.url = 'http://placehold.it/200x90';

    $scope.actionSubmit = function() {
        $scope.uploadImage();
    };
    
    $scope.uploadImage = function() {

        var image = new Image();
        image.data = {
            'image_original': $scope.image.url,
            'image_small': $scope.image.url,
            'image_medium': $scope.image.url,
            'image_large': $scope.image.url,
            'image_name': '200x90'
        };
        image.ready = $scope.uploadImageReady;
        image.add();
    };

    $scope.uploadImageReady = function(image) {
        $scope.group.ref_image = image._id;
        $scope.add();
    };
    
    $scope.add = function() {

        var group = new Group();
        group.data = $scope.group;
        group.ready = $scope.actionSubmitReady;
        group.add();
    };
    
    $scope.actionSubmitReady = function(group) {

        $.bootstrapGrowl('Datos guardados exitosamente', {
            type: 'success',
            allow_dismiss: false,
            offset: {from: 'bottom', amount: 20},
            align: 'left'
        });

        $location.path('group/edit/' + group._id);
    };
    
    $scope.init = function() {
        $scope.submitTitle = 'Crear';
    };
    $scope.init();
});

/**
 * Controller GroupEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Group} Group factory
 */

app.controller('GroupEdit', function($scope, $stateParams, Group, Image) {

    $scope.group = {};
    $scope.isDefaultImage = true;
    $scope.isNewImage = false;
    $scope.image = {};
    $scope.image.url = 'http://placehold.it/200x90';

    $scope.update = function() {

        var group = new Group();
        group.id = $scope.group._id;
        group.data = $scope.group;
        group.ready = $scope.actionSubmitReady;
        group.error = $scope.actionSubmitError;
        group.update();
    };

    $scope.uploadImage = function() {

        var image = new Image();
        image.data = {
            'image_original': $scope.image.url,
            'image_small': $scope.image.smallUrl,
            'image_medium': $scope.image.mediumUrl,
            'image_large': $scope.image.largeUrl,
            'image_name': $scope.image.originalName
        };
        image.ready = $scope.uploadImageReady;
        image.add();
    };

    $scope.uploadImageReady = function(image) {
        $scope.group.ref_image = image._id;
        $scope.isNewImage = false;
        $scope.update();
    };

    $scope.actionSubmit = function() {

        if ($scope.isNewImage) {
            $scope.uploadImage();
        } else {

            if (!$scope.isDefaultImage) {
                $scope.group.ref_image = $scope.group.ref_image._id;
            }

            $scope.update();
        }
    };

    $scope.actionSubmitReady = function(group) {
        $.bootstrapGrowl('Datos guardados exitosamente', {
            type: 'success',
            allow_dismiss: false,
            offset: {from: 'bottom', amount: 20},
            align: 'left'
        });

        $scope.init();
    };

    /**
     * Init
     */
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';
        var group = new Group();
        group.id = $stateParams.id;
        group.params = {
            'ref[image]': 'yes'
        };
        group.ready = $scope.actionInitReady;
        group.findById();
    };

    $scope.actionInitReady = function(group) {
        $scope.group = group;

        if (typeof $scope.group.ref_image !== 'undefined') {
            $scope.image.url = $scope.group.ref_image.image_original;
            $scope.isDefaultImage = false;
        }
    };

    $scope.$on('uploader.getFiles()', function(event, aryFiles, sourceId) {

        if (sourceId == 'fileupload') {
            $scope.image = aryFiles[aryFiles.length - 1];
            $scope.isNewImage = true;
        }
    });

    $scope.init();
});

/**
 * Controller GroupView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Group} Group factory
 */

app.controller('GroupView', function($scope, $stateParams, Group, GroupPost, Image, Video, Comment, PostLike, Profile) {

    $scope.aryGroupPost = [];
    $scope.aryLatestComment = [];
    $scope.postNew = {};
    $scope.group = {};
    $scope.youtube = {};
    $scope.aryFiles = [];
    $scope.aryImages = [];
    $scope.commentNew = {};
    $scope.postCurrent = {};
    $scope.isOwner = false;
    $scope.isMember = false;

    /**
     * Profile
     */
    $scope.setProfile = function() {
        var profile = new Profile();
        profile.params = {
            'fields': '_id'
        };
        profile.ready = $scope.setProfileReady;
        profile.findAll();
    };

    $scope.setProfileReady = function(profile) {
        $scope.profile = profile;
        $scope.getWall();
    };

    /**
     * Get Wall
     */
    $scope.getWall = function() {
        var groupPost = new GroupPost();
        groupPost.params = {
            'search[and][ref_group]': $scope.group._id,
            'ref[image]': 'yes',
            'ref[video]': 'yes',
            'ref[comment.profile]': 'yes',
            'ref[comment.profile.image]': 'yes',
            'ref[profile]': 'yes',
            'ref[profile.image]': 'yes',
            'sort': '-date_updated'
//            'limit': $scope.postLimit,
//            'skip': $scope.postSkip
        };
        groupPost.ready = $scope.getWallReady;
        groupPost.findAll();
    };

    $scope.getWallReady = function(aryGroupPost) {
        if (!Array.isArray(aryGroupPost)) {
            aryGroupPost = new Array(aryGroupPost);
        }

        $scope.aryGroupPost = aryGroupPost;
        $scope.setLatestComment();
        $scope.checkGroupOwner();
        $scope.checkGroupMember();
    };

    $scope.setLatestComment = function() {
        var comment = new Comment();
        comment.params = {
            'search[and][ref_group]': $scope.group._id,
            'ref[group_post][fields]': 'title',
            'sort': '-date_created',
            'limit': 10
        };
        comment.ready = $scope.setLatestCommentReady;
        comment.findAll();
    };

    $scope.setLatestCommentReady = function(aryComment) {
        if (!Array.isArray(aryComment)) {
            aryComment = new Array(aryComment);
        }

        $scope.aryLatestComment = aryComment;
    };

    /**
     * Action Submit Post
     */
    $scope.removeFile = function(index) {
        $scope.aryFiles.splice(index, 1);
    };

    $scope.actionSetText = function() {
        $scope.showVideo = false;
        $scope.youtubeUrl = '';
    };

    $scope.actionSetImage = function() {
        $scope.showVideo = false;
        $scope.youtubeUrl = '';
    };

    $scope.actionSetVideo = function() {
        if ($scope.showVideo) {
            $scope.showVideo = false;
            $scope.youtubeUrl = '';
        } else {
            $scope.showVideo = true;
        }
    };

    $scope.insertImages = function() {

        if ($scope.aryImages.length < $scope.aryFiles.length) {

            var file = $scope.aryFiles[$scope.aryImages.length];

            var image = new Image();
            image.data = {
                'image_original': file.url,
                'image_small': file.smallUrl,
                'image_medium': file.mediumUrl,
                'image_large': file.largeUrl,
                'image_name': file.originalName
            };
            image.ready = $scope.insertImagesReady;
            image.add();

        } else {

            $scope.postNew.ref_image = $scope.aryImages;
            $scope.$broadcast('uploader.clearFiles()');
            $scope.actionAddPost();
        }
    };

    $scope.insertImagesReady = function(image) {
        $scope.aryImages.push(image._id);
        $scope.insertImages();
    };

    $scope.insertVideo = function() {

        var video = new Video();
        video.data = {
            'url': $scope.youtube.url,
            'source': 'youtube'
        };
        video.ready = $scope.insertVideoReady;
        video.add();
    };

    $scope.insertVideoReady = function(video) {

        $scope.postNew.ref_video = video._id;
        $scope.actionAddPost();
    };

    $scope.actionCheckPost = function() {

        if ($scope.aryFiles.length > 0) {
            $scope.insertImages();
        } else {

            if ($scope.showVideo) {
                $scope.insertVideo();
            } else {
                $scope.actionAddPost();
            }
        }
    };

    /**
     * Action Add Post
     */
    $scope.actionAddPost = function() {

        var groupPost = new GroupPost();
        groupPost.data = $scope.postNew;
        groupPost.ready = $scope.actionAddPostReady;
        groupPost.add();
    };

    $scope.actionAddPostReady = function(groupPost) {

        if (groupPost != null) {
            $scope.postNew = {};
            $scope.postNew.ref_group = $scope.group._id;
            $scope.aryImages = [];
            $scope.aryFiles = [];
            $scope.youtube.url = '';
            $scope.getGroupPost(groupPost._id);
        }
    };

    $scope.getGroupPost = function(id) {
        var groupPost = new GroupPost();
        groupPost.id = id;
        groupPost.params = {
            'ref[image]': 'yes',
            'ref[video]': 'yes',
            'ref[comment.user]': 'yes',
            'ref[profile]': 'yes',
            'ref[profile.image]': 'yes',
        };
        groupPost.ready = $scope.getGroupPostReady;
        groupPost.findById();
    };

    $scope.getGroupPostReady = function(groupPost) {
        $scope.aryGroupPost.unshift(groupPost);
        $scope.getGroupTotalPost();
    };

    $scope.getGroupTotalPost = function() {
        var groupPost = new GroupPost();
        groupPost.params = {
            'search[and][ref_group]': $scope.group._id,
            'count': true
        };
        groupPost.ready = $scope.getGroupTotalPostReady;
        groupPost.findAll();
    };

    $scope.getGroupTotalPostReady = function(total_post) {
        $scope.updateGroupTotalPost(total_post);
    };

    $scope.updateGroupTotalPost = function(total_post) {
        var group = new Group();
        group.id = $scope.group._id;
        group.data = {
            'total_post': total_post
        };
        group.ready = $scope.updateGroupTotalPostReady;
        group.update();
    };

    $scope.updateGroupTotalPostReady = function(group) {
        $scope.group.total_member = group.total_member;
        $scope.group.total_post = group.total_post;
    };

    /**
     * Action Add Comment
     */
    $scope.actionAddComment = function(groupPost, commentNew) {

        $scope.postCurrent = groupPost;

        var comment = new Comment();
        comment.data = {
            'ref_group': $scope.group._id,
            'ref_group_post': groupPost._id,
            'text': commentNew.text,
            'source': 'group_post'
        };
        comment.ready = $scope.actionAddCommentReady;
        comment.add();
    };

    $scope.actionAddCommentReady = function(comment) {

        if (comment != null) {
            $scope.commentNew = {};
            $scope.getComment(comment._id);
        }
    };

    $scope.getComment = function(id) {
        var comment = new Comment();
        comment.id = id;
        comment.params = {
            'ref[group_post]': 'yes',
            'ref[profile]': 'yes',
            'ref[profile.image]': 'yes'
        };
        comment.ready = $scope.getCommentRes;
        comment.findById();
    };

    $scope.getCommentRes = function(comment) {
        if (comment != null) {
            $scope.postCurrent.ref_comment.push(comment);
            $scope.aryLatestComment.unshift(comment);
            $scope.postCurrent = {};
        }
    };

    /**
     * Action Like Post
     */
    $scope.actionAddLike = function(post) {
        $scope.postCurrent = post;

        var postLike = new PostLike();
        postLike.data = {
            'ref_group_post': post._id
        };
        postLike.ready = $scope.actionAddLikeRes;
        postLike.add();
    };

    $scope.actionAddLikeRes = function(post) {
        $scope.postCurrent.ref_post_like = post.ref_post_like;
    };

    /**
     * Checks Group
     */
    $scope.checkGroupOwner = function() {
        if ($scope.group.ref_profile_owner == $scope.profile._id) {
            $scope.isOwner = true;
        } else {
            $scope.isOwner = false;
        }
    };

    $scope.checkGroupMember = function() {
        var index = $scope.group.ref_profile_member.indexOf($scope.profile._id);

        if (index == -1) {
            $scope.isMember = false;
        } else {
            $scope.isMember = true;
        }
    };

    /**
     * Join Group
     */
    $scope.actionGroupJoin = function() {

        var index = $scope.group.ref_profile_member.indexOf($scope.profile._id);

        if (index == -1) {
            $scope.group.ref_profile_member.push($scope.profile._id);
            $scope.updateGroupMember();
        }
    };

    /**
     * Leave Group
     */
    $scope.actionGroupLeave = function() {

        var index = $scope.group.ref_profile_member.indexOf($scope.profile._id);

        if (index != -1) {
            $scope.group.ref_profile_member.splice(index, 1);
            $scope.updateGroupMember();
        }
    };

    /**
     * Update (add or remove) a member
     */
    $scope.updateGroupMember = function() {

        var group = new Group();
        group.id = $scope.group._id;
        group.data = {
            'ref_profile_member': $scope.group.ref_profile_member,
            'total_member': $scope.group.ref_profile_member.length
        };
        group.ready = $scope.updateGroupMemberReady;
        group.update();
    };

    $scope.updateGroupMemberReady = function(group) {
        $scope.group.total_member = group.total_member;
        $scope.checkGroupMember();
    };

    /**
     * Communication with UploaderController
     * $on('uploader.getFiles()') 
     * from UploaderController
     * $scope.$emit('uploader.getFiles()', $scope.aryFiles)
     */
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.aryFiles = aryFiles;
    });

    $scope.init = function() {
        var group = new Group();
        group.id = $stateParams.id;
        group.params = {
            'ref[image]': 'yes'
        };
        group.ready = $scope.actionInitReady;
        group.findById();
    };

    $scope.actionInitReady = function(group) {
        $scope.group = group;
        $scope.postNew.ref_group = group._id;
        $scope.setProfile();
    };

    $scope.init();
});