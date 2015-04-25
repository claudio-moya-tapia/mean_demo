app.controller('WallShared', function($scope, Wall, WallPost, Post, Comment, 
                                        PostLike, PostShare, Image, Video) {

    $scope.postNew = {};
    $scope.youtube = {};
    $scope.aryFiles = [];
    $scope.aryImages = [];
    $scope.commentNew = {};
    $scope.postCurrent = {};
    $scope.aryWallPost = new Array();
    $scope.profile_id = '';
    $scope.postLimit = 3;
    $scope.postSkip = 0;
    $scope.activeLoadMore = true;
    $scope.infiniteScroll = false;
    $scope.addNextImage = false;

    /**
     * Init
     */
    $scope.getWall = function() {

        var wall = new Wall();
        wall.params = {
            'search[and][ref_profile]': $scope.profile_id,
            'ref[wall_post.post.user]': 'yes',
            'ref[wall_post.post.image]': 'yes',
            'ref[wall_post.post.video]': 'yes',
            'ref[wall_post.post.comment.user]': 'yes',
            'ref[wall_post.profile]': 'yes',
            'ref[wall_post.profile.image]': 'yes',
            'ref[wall_post.profile_target]': 'yes',
            'ref[wall_post][sort]': '-date_updated',
            'ref[wall_post][limit]': $scope.postLimit,
            'ref[wall_post][skip]': $scope.postSkip
        };
        wall.ready = $scope.getWallReady;
        wall.findAll();
    };

    $scope.getWallReady = function(wall) {
       
        if (Array.isArray(wall.ref_wall_post)) {

            if (wall.ref_wall_post.length > 0) {
                
                $scope.activeLoadMore = true;
                
                if ($scope.infiniteScroll) {
                    //is profile page
                    $scope.aryWallPost = $scope.aryWallPost.concat(wall.ref_wall_post);
                } else {
                    //is home page
                    $scope.aryWallPost = wall.ref_wall_post;
                }
            }else{
                $scope.activeLoadMore = false;
            }

        } else {
            $scope.aryWallPost = new Array(wall.ref_wall_post);
        }
        
        if($scope.infiniteScroll){
            $scope.postSkip += $scope.postLimit;
        }
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
        if($scope.showVideo){
            $scope.showVideo = false;
            $scope.youtubeUrl = '';
        }else{
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
    
    $scope.insertVideo = function(){
        
        var video = new Video();
        video.data = {
            'url': $scope.youtube.url,
            'source': 'youtube'
        };
        video.ready = $scope.insertVideoReady;
        video.add();
    };
    
    $scope.insertVideoReady = function(video){
        
        $scope.postNew.ref_video = video._id;
        $scope.actionAddPost();
    };

    $scope.actionCheckPost = function() {

        if ($scope.aryFiles.length > 0) {
            $scope.insertImages();
        } else {
            
            if($scope.showVideo){
                $scope.insertVideo();
            }else{
                $scope.actionAddPost();
            }
        }
    };

    $scope.actionAddPost = function() {

        $scope.postNew.ref_profile = $scope.profile_id;

        var post = new Post();
        post.data = $scope.postNew;
        post.ready = $scope.actionAddPostReady;
        post.add();
    };

    $scope.actionAddPostReady = function(post) {

        if (post != null) {
            $scope.postNew = {};
            $scope.aryImages = [];
            $scope.aryFiles = [];
            $scope.youtube.url = '';
            $scope.getPost(post._id);
        }
    };

    $scope.getPost = function(postId) {
        var post = new Post();
        post.id = postId;
        post.params = {
            'ref[user]': 'yes',
            'ref[image]': 'yes',
            'ref[video]': 'yes',
            'ref[comment.user]': 'yes'
        };
        post.ready = $scope.getPostReady;
        post.findById();
    };

    $scope.getPostReady = function(post) {

        var wallPost = new WallPost();
        wallPost.id = post.ref_wall_post_parent;
        wallPost.params = {
            'ref[post.user]': 'yes',
            'ref[post.image]': 'yes',
            'ref[post.video]': 'yes',
            'ref[post.comment.user]': 'yes',
            'ref[profile]': 'yes',
            'ref[profile_target]': 'yes'
        };
        wallPost.ready = $scope.showLastPost;
        wallPost.findById();
    };
    
    $scope.imagesUploaded = function(){
        
    };
    
    $scope.showLastPost = function(wallPost) {
        $scope.aryWallPost.unshift(wallPost);
        $scope.$emit('profile.refresh()');
    };

    /**
     * Action Add Comment
     */
    $scope.actionAddComment = function(post, commentNew) {
        $scope.postCurrent = post;

        var comment = new Comment();
        comment.data = {
            'ref_post': post._id,
            'text': commentNew.text,
            'source': 'wall_post'
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
            'ref[user]': 'yes'
        };
        comment.ready = $scope.getCommentRes;
        comment.findById();
    };

    $scope.getCommentRes = function(comment) {
        if (comment != null) {
            $scope.postCurrent.ref_comment.push(comment);
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
            'ref_post': post._id
        };
        postLike.ready = $scope.actionAddLikeRes;
        postLike.add();
    };

    $scope.actionAddLikeRes = function(post) {
        $scope.postCurrent.ref_post_like = post.ref_post_like;
    };

    /**
     * Action Share
     */
    $scope.actionShare = function(wallPostId) {

        var postShare = new PostShare();
        postShare.id = wallPostId;
        postShare.data = {
            'ref_profile': $scope.profile_id
        };
        postShare.ready = $scope.actionShareReady;
        postShare.update();
    };

    $scope.actionShareReady = function(postShare) {

    };

    $scope.actionLoadMore = function() {
        if ($scope.activeLoadMore) {
            $scope.getWall();
        }
    };

    /**
     * Communication with parents Controllers
     * using $broadcast (to childs) and $emit (to parent)
     */
    $scope.$on('wall.profile_id', function(event, profile_id) {
        $scope.profile_id = profile_id;
    });
    
    $scope.$on('wall.postLimit', function(event, postLimit) {
        $scope.postLimit = postLimit;
    });

    $scope.$on('wall.infiniteScroll', function(event, infiniteScroll) {
        $scope.infiniteScroll = infiniteScroll;
    });
    
    $scope.$on('wall.getWall()', function(event) {
        $scope.activeLoadMore = false;
        $scope.getWall();
    });


    /**
     * Communication with UploaderController
     * $on('uploader.getFiles()') 
     * from UploaderController
     * $scope.$emit('uploader.getFiles()', $scope.aryFiles)
     */
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.aryFiles = aryFiles;
    });
});