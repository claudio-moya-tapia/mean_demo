/**
 * Controller PageView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Page} Page factory
 */
app.controller('PageView', function($scope, $stateParams, $filter, Page, Post, Comment, previewLinkService) {

    $scope.page = {};
    $scope.newComment = {};
    $scope.newComment.text = '';
    $scope.newComment.ref_page = '';
    $scope.aryPages = [];

    $scope.init = function() {
        var page = new Page();
        page.id = $stateParams.id;
        page.params = {
            'ref[profile]': 'yes',
            'ref[image]': 'yes',
            'ref[image_related]': 'yes',
            'ref[comment.profile]': 'yes',
            'ref[comment][sort]': '-date_created'
        };
        page.ready = $scope.actionInitReady;
        page.findById();
    };

    $scope.actionInitReady = function(page) {
        $scope.page = page;
        $scope.newComment.ref_page = $scope.page._id;
        $scope.getPagesRelated(page.location);
    };

    $scope.getPagesRelated = function(location) {
        var locations = "";
        $scope.showGallery = false;
        $scope.showHeader = false;
        switch (location) {
            case "noticia":
                locations = "noticia";
                $scope.title = "Otras Noticias";
                $scope.banner = "Noticias";
                $scope.index = "news";
                $scope.showHeader = true;
                 break;
            case "interior":
                locations = "interior";
                $scope.title = "Otras Paginas Interior";
                $scope.banner = "Paginas Interior";
                $scope.index = "interior";
                break;
            case "galeria":
                locations = "galeria";
                $scope.title = "Otras Galerías";
                $scope.banner = "Galerías";
                $scope.showGallery = true;
                $scope.index = "gallery";
                $scope.showHeader = true;
                break;
            case "banner":
                locations = "banner";
                $scope.title = "Otros Banners";
                $scope.banner = "Banner";
                $scope.index = "banner";
                break;
            case "menu_home":
                locations = "menu_home";
                $scope.title = "Otros Menu Home";
                $scope.banner = "Menu";
                $scope.index = "menu_home";
                break;
            case "slider":
                locations = "slider";
                $scope.title = "Otros Slider";
                $scope.banner = "Slider";
                $scope.index = "slider";
                break;
            default:
                break;
        }
        var page = new Page();
        page.params = {
            'ref[image]': 'yes',
            'search[and][active]': true,
            'search[and][location]': locations,
            'sort': '-date_updated',
            'limit': '4'
        };
        page.ready = $scope.getPagesRelatedReady;
        page.findAll();
    };

    $scope.getPagesRelatedReady = function(aryPages) {
        if (!Array.isArray(aryPages)) {
            $scope.aryPages = new Array(aryPages);
        } else {
            $scope.aryPages = aryPages;
        }
    };

    $scope.actionAddComment = function() {
        
        $scope.newComment.source = $scope.index;

        var comment = new Comment();
        comment.data = $scope.newComment;
        comment.ready = $scope.actionAddCommentReady;
        comment.add();
    };

    $scope.actionAddCommentReady = function(comment) {
        $scope.getLastComment(comment._id);
    };

    $scope.getLastComment = function(commentId) {
        var comment = new Comment();
        comment.id = commentId;
        comment.params = {
            'ref[profile]': 'yes'
        };
        comment.ready = $scope.getLastCommentReady;
        comment.findById();
    };

    $scope.getLastCommentReady = function(comment) {
        if (!Array.isArray($scope.page.ref_comment)) {
            $scope.page.ref_comment = [];
        }

        $scope.page.ref_comment.unshift(comment);
        $scope.newComment.text = '';

    };

    $scope.addPostReady = function(post) {

    };
    
    
    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.init();
    });
});