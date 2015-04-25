/**
 * Controller GroupPostIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('GroupPostIndex', function($scope) {

});

/**
 * Controller GroupPostList
 * @param {$scope} $scope DOM manipulation
 * @param {GroupPost} GroupPost factory
 */
app.controller('GroupPostList', function($scope, GroupPost) {

    $scope.actionCount = function() {

        var groupPost = new GroupPost();
        groupPost.params = {
            count: true
        };
        groupPost.ready = $scope.actionCountReady;
        groupPost.findAll();
    };
    $scope.actionCountReady = function(count) {

        $scope.count = parseInt(count);
        $scope.actionFind();
    };
    $scope.actionFind = function() {
        var groupPost = new GroupPost();
        groupPost.params = $scope.params;
        groupPost.ready = $scope.actionFindReady;
        groupPost.findAll();
    };
    $scope.actionFindReady = function(aryGroupPost) {
        if (Array.isArray(aryGroupPost)) {
            $scope.aryGroupPost = aryGroupPost;
        } else {
            $scope.aryGroupPost = new Array(aryGroupPost);
        }
    };
    $scope.actionDelete = function() {
        var groupPost = new GroupPost();
        groupPost.id = $scope.deleteId;
        groupPost.ready = $scope.actionDeleteReady;
        groupPost.delete();
    };
    $scope.actionDeleteReady = function(groupPost) {
        $scope.deleteId = '';
        $scope.init();
    };
    $scope.init = function() {
        $scope.actionCount();
    };
    $scope.init();
});

/**
 * Controller GroupPostNew
 * @param {$scope} $scope DOM manipulation
 * @param {$location} $location service
 * @param {GroupPost} GroupPost factory
 */
app.controller('GroupPostNew', function($scope, $location, GroupPost) {

    $scope.actionSubmit = function() {

        var groupPost = new GroupPost();
        groupPost.data = $scope.groupPost;
        groupPost.ready = $scope.actionSubmitReady;
        groupPost.add();
    };
    $scope.actionSubmitReady = function(groupPost) {
        $location.path('group-post/edit/' + groupPost._id);
    };
    $scope.init = function() {
        $scope.submitTitle = 'Crear';
    };
    $scope.init();
});

/**
 * Controller GroupPostEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {GroupPost} GroupPost factory
 */

app.controller('GroupPostEdit', function($scope, $stateParams, GroupPost) {

    $scope.actionSubmit = function() {

        var groupPost = new GroupPost();
        groupPost.id = $scope.groupPost._id;
        groupPost.data = $scope.groupPost;
        groupPost.ready = $scope.actionSubmitReady;
        groupPost.error = $scope.actionSubmitError;
        groupPost.update();
    };
    $scope.actionSubmitError = function(groupPost) {
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html(groupPost);
        $scope.init();
    };
    $scope.actionSubmitReady = function(groupPost) {
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html('Datos guardados exitosamente');
        $scope.init();
    };
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';
        var groupPost = new GroupPost();
        groupPost.id = $stateParams.id;
        groupPost.ready = $scope.actionInitReady;
        groupPost.findById();
    };
    $scope.actionInitReady = function(groupPost) {
        $scope.groupPost = groupPost;
    };
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.aryFiles = aryFiles;
    });
    $scope.init();
});

/**
 * Controller GroupPostView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {GroupPost} GroupPost factory
 */

app.controller('GroupPostView', function($scope, $stateParams, GroupPost, Group, Comment, PostLike, Profile) {

    $scope.profile = {};
    $scope.groupPost = {};
    $scope.postCurrent = {};
    $scope.commentNew = {};
    $scope.aryLatestComment = [];
    $scope.isOwner = false;
    $scope.isMember = false;

    $scope.init = function() {
        $scope.setProfile();
    };

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
        $scope.setGroupPost();
    };

    $scope.setGroupPost = function() {
        var groupPost = new GroupPost();
        groupPost.id = $stateParams.id;
        groupPost.params = {
            'ref[image]':'yes',
            'ref[video]':'yes',
            'ref[profile.image][fields]': 'image_original',
            'ref[profile][fields]': 'ref_image,first_name, last_name',
            'ref[comment.profile.image]': 'yes',
            'ref[group.image]': 'yes'
        };
        groupPost.ready = $scope.setGroupPostReady;
        groupPost.findById();
    };

    $scope.setGroupPostReady = function(groupPost) {
        $scope.groupPost = groupPost;
        $scope.setLatestComment();
        $scope.checkGroupOwner();
        $scope.checkGroupMember();
    };
    
    $scope.setLatestComment = function(){
        var comment = new Comment();
        comment.params = {
            'search[and][ref_group]':$scope.groupPost.ref_group._id,
            'ref[group_post][fields]': 'title',
            'sort':'-date_created',
            'limit':10
        };
        comment.ready = $scope.setLatestCommentReady;
        comment.findAll();
    };
    
    $scope.setLatestCommentReady = function(aryComment){
        if(!Array.isArray(aryComment)){
            aryComment = new Array(aryComment);
        }
        
        $scope.aryLatestComment = aryComment;
    };

    $scope.checkGroupOwner = function() {
        if ($scope.groupPost.ref_group.ref_profile_owner == $scope.profile._id) {
            $scope.isOwner = true;
        } else {
            $scope.isOwner = false;
        }
    };

    $scope.checkGroupMember = function() {
        var index = $scope.groupPost.ref_group.ref_profile_member.indexOf($scope.profile._id);
       
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

        var index = $scope.groupPost.ref_group.ref_profile_member.indexOf($scope.profile._id);

        if (index == -1) {
            $scope.groupPost.ref_group.ref_profile_member.push($scope.profile._id);
            $scope.updateGroupMember();
        }
    };

    /**
     * Leave Group
     */
    $scope.actionGroupLeave = function() {

        var index = $scope.groupPost.ref_group.ref_profile_member.indexOf($scope.profile._id);

        if (index != -1) {
            $scope.groupPost.ref_group.ref_profile_member.splice(index, 1);
            $scope.updateGroupMember();
        }
    };

    /**
     * Update (add or remove) a member
     */
    $scope.updateGroupMember = function() {

        var group = new Group();
        group.id = $scope.groupPost.ref_group._id;
        group.data = {
            'ref_profile_member': $scope.groupPost.ref_group.ref_profile_member,
            'total_member': $scope.groupPost.ref_group.ref_profile_member.length
        };
        group.ready = $scope.updateGroupMemberReady;
        group.update();
    };

    $scope.updateGroupMemberReady = function(group) {
        $scope.groupPost.ref_group.total_member = group.total_member;
        $scope.checkGroupMember();
    };

    /**
     * Action Add Comment
     */
    $scope.actionAddComment = function(groupPost, commentNew) {

        $scope.postCurrent = groupPost;

        var comment = new Comment();
        comment.data = {
            'ref_group': $scope.groupPost.ref_group._id,
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
            'ref[group_post][fields]': 'title',
            'ref[profile]': 'yes',
            'ref[profile.image]': 'yes'
        };
        comment.ready = $scope.getCommentRes;
        comment.findById();
    };

    $scope.getCommentRes = function(comment) {
        if (comment != null) {
            $scope.postCurrent.ref_comment.push(comment);
            $scope.postCurrent = {};
            $scope.aryLatestComment.unshift(comment);
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

    $scope.init();
});