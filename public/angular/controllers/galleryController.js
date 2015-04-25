/**
 * Controller PageView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Page} Page factory
 */
app.controller('GalleryView', function($scope, $stateParams, $filter, Page, Post, Comment, previewLinkService) {

    $scope.page = {};
    $scope.newComment = {};
    $scope.newComment.text = '';
    $scope.newComment.ref_page = '';
    $scope.aryPages = [];

    $scope.init = function() {
        var page = new Page();
        page.id = $stateParams.id;
        page.params = {
            'ref[profile]':'yes',
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'ref[comment.profile]':'yes',
            'ref[comment][sort]':'-date_created'
        };
        page.ready = $scope.actionInitReady;
        page.findById();
    };

    $scope.actionInitReady = function(page) {
        $scope.page = page;
        $scope.newComment.ref_page = $scope.page._id;
        $scope.getPagesRelated();
    };
    
    $scope.getPagesRelated = function(){
        var page = new Page();
        page.params = {
            'ref[image]':'yes',
            'search[and][active]':true,
            'limit':'4'
        };
        page.ready = $scope.getPagesRelatedReady;
        page.findAll();
    };
    
    $scope.getPagesRelatedReady = function(aryPages){
        if(!Array.isArray(aryPages)){
            $scope.aryPages = new Array(aryPages);
        }else{
            $scope.aryPages = aryPages;
        }
    };
    
    $scope.actionAddComment = function(){
        
        var comment = new Comment();
        comment.data = $scope.newComment;
        comment.ready = $scope.actionAddCommentReady;
        comment.add();
    };
    
    $scope.actionAddCommentReady = function(comment){
        $scope.getLastComment(comment._id);
    };
    
    $scope.getLastComment = function (commentId){
        var comment = new Comment();
        comment.id = commentId;
        comment.params = {
            'ref[profile]':'yes'
        };
        comment.ready = $scope.getLastCommentReady;
        comment.findById();
    };
    
    $scope.getLastCommentReady = function(comment){
        if(!Array.isArray($scope.page.ref_comment)){
            $scope.page.ref_comment = [];
        }
        
        $scope.page.ref_comment.unshift(comment);
        $scope.newComment.text = '';
        
        //add post
//        previewLinkService.title = $scope.page.title;
//        previewLinkService.text = $scope.page.text;
//        previewLinkService.url = $scope.page.url;
//        previewLinkService.image = $scope.page.ref_image.image_small;
//        
//        $scope.postNew = {};
//        $scope.postNew.text = comment.text+previewLinkService.getHTML();
//        $scope.postNew.ref_profile = $scope.profile._id;
//
//        var post = new Post();
//        post.data = $scope.postNew;
//        post.ready = $scope.addPostReady;
//        post.add();
    };
    
    $scope.addPostReady = function(post){
        
    };

    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.init();
    });
});

app.controller('GalleryIndex', function($scope, $stateParams, previewLinkService, Page, Comment) {
    
     $scope.aryGalleryUpdate = [];
     $scope.aryComment = [];
     
    $scope.init = function() {
        $scope.getGalleryUpdated();
    };
    
    $scope.getGalleryUpdated = function() {
        var page = new Page();
        page.params = {
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'search[and][location]': 'galeria',
            'search[and][active]': 'true',
            'sort': '-date_updated',
            'limit': '10'
        };
        page.ready = $scope.getGalleryUpdatedReady;
        page.findAll();

    };

    $scope.getGalleryUpdatedReady = function(aryGallery) {

        if (!Array.isArray(aryGallery)) {
            aryGallery = new Array(aryGallery);
        }
        for (var i in aryGallery) {
            var gallery = aryGallery[i];
            $scope.aryGalleryUpdate.push(gallery);
        }
        console.log($scope.aryGalleryUpdate);
        $scope.getComment();
    };


    $scope.getComment = function() {
            var comment = new Comment();
            comment.ready = $scope.getCommentReady;
            comment.findAll();

    };
    
    $scope.getCommentReady = function(aryComment) {

        if (!Array.isArray(aryComment)) {
            aryComment = new Array(aryComment);
        }
        for (var i in aryComment) {
            var comment = aryComment[i];
            $scope.aryComment.push(comment);
        }
    };
    
    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.init();
    });
});