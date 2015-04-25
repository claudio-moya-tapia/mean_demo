/**
 * Controller PageView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Page} Page factory
 */
app.controller('NewsView', function($scope, $stateParams, $filter, Page, Post, Comment, previewLinkService) {

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
            'ref[comment.profile]': 'yes',
            'ref[comment][sort]': '-date_created'
        };
        page.ready = $scope.actionInitReady;
        page.findById();
    };

    $scope.actionInitReady = function(page) {
        $scope.page = page;
        $scope.newComment.ref_page = $scope.page._id;
        $scope.getPagesRelated();
    };

    $scope.getPagesRelated = function() {
        var page = new Page();
        page.params = {
            'ref[image]': 'yes',
            'search[and][active]': true,
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

/**
 * Controller NewsIndex
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Page} Page factory
 */
app.controller('NewsIndex', function($scope, $stateParams, Page) {

    $scope.searchNews = {};
    $scope.searchNews.title = '';
    $scope.aryOtherNews = [];
    $scope.aryNews = [];
    $scope.aryComment = [];
    $scope.newsSkip = 0;
    $scope.newsLimit = 10;
    $scope.newsSort = '-date_updated';
    $scope.activeLoadMore = false;
    $scope.searchQueue = [];
    $scope.searchQueueComplete = [];
    $scope.searchQueueBusy = false;
    $scope.isReload = false;
    $scope.searchNewsQueue = [];
    $scope.searchNewsQueueComplete = [];
    $scope.searchNewsQueueBusy = false;

    $scope.init = function() {
        $scope.getNewsProminent();
    };

    $scope.getNewsProminent = function() {

        var page = new Page();
        page.params = {
            'fields':'_id, ref_profile, ref_image, title, date_created',
            'ref[profile][fields]': '_id, full_name',
            'ref[image][fields]': 'image_small',
            'search[and][location]': 'noticia',
            'search[and][active]': 'true',
            'search[and][prominent]': 'true',
            'sort': $scope.newsSort,
            'limit': '4'
        };
        page.ready = $scope.getNewsProminentReady;
        page.findAll();
    };

    $scope.getNewsProminentReady = function(aryNews) {

        if (!Array.isArray(aryNews)) {
            aryNews = new Array(aryNews);
        }
        for (var i in aryNews) {
            var news = aryNews[i];
            $scope.aryNews.push(news);
        }

        $scope.activeLoadMore = true;

        if ($scope.isReload) {
            $scope.actionLoadMore();
        }
    };

    $scope.processQueue = function() {

        if ($scope.searchQueue.length > $scope.searchQueueComplete.length) {
            if (!$scope.searchQueueBusy) {
                $scope.searchQueueBusy = true;
                $scope.getOtherNews();
            }
        }
    };

    $scope.actionLoadMore = function() {

        if ($scope.activeLoadMore) {
            $scope.searchQueue.push(true);
            $scope.processQueue();
        }
    };

    $scope.getOtherNews = function() {
        var page = new Page();
        page.params = {
            'fields':'_id, ref_profile, ref_image, title, date_created',
            'ref[profile][fields]': '_id, full_name',
            'ref[image][fields]': 'image_small',
            'search[and][location]': 'noticia',
            'search[and][active]': 'true',
            'search[and][prominent]': 'false',
            'limit': $scope.newsLimit,
            'skip': $scope.newsSkip,
            'sort': $scope.newsSort
        };
        page.ready = $scope.getOtherNewsReady;
        page.findAll();
    };

    $scope.getOtherNewsReady = function(aryOtherNews) {

        if (aryOtherNews.length > 0) {
            $scope.activeLoadMore = true;
            $scope.aryNews = $scope.aryNews.concat(aryOtherNews);
            $scope.newsSkip += $scope.newsLimit;
        } else {
            $scope.activeLoadMore = false;
        }

        $scope.searchQueueComplete.push(true);
        $scope.searchQueueBusy = false;
        $scope.processQueue();
    };

    /**
     * Reload News
     */
    $scope.reloadNews = function(sort) {
        $scope.newsSkip = 0;
        $scope.newsSort = sort + 'date_updated';
        $scope.isReload = true;
        $scope.aryNews = [];
        $scope.searchQueue = [];
        $scope.searchQueueComplete = [];
        $scope.searchQueueBusy = false;

        if ($scope.searchNews.title.length > 0) {
            $scope.actionSearch();
        }else{
            $scope.getNewsProminent();
        }
    };

    /**
     * Find news
     */
    $scope.actionSearch = function() {

        if ($scope.searchNews.title.length > 0) {

            $scope.activeLoadMore = false;
            $scope.searchNewsQueue.push(true);
            $scope.processNewsQueue();
        } else {
            $scope.aryNews = [];
            $scope.activeLoadMore = true;
            $scope.newsSkip = 0;
            $scope.getNewsProminent();
        }
    };

    $scope.processNewsQueue = function() {
        if ($scope.searchNewsQueue.length > $scope.searchNewsQueueComplete.length) {
            if (!$scope.searchNewsQueueBusy) {
                $scope.searchNewsQueueBusy = true;
                $scope.findNews();
            }
        }
    };

    $scope.findNews = function() {
       
        var page = new Page();
        page.params = {
            'fields':'_id, ref_profile, ref_image, title, date_created',
            'ref[profile][fields]': '_id, full_name',
            'ref[image][fields]': 'image_small',
            'search[and][location]': 'noticia',
            'search[and][active]': 'true',
            'search[and][title]': '*' + $scope.searchNews.title + '*',
            'sort': $scope.newsSort,
            'limit': false
        };
        page.ready = $scope.findNewsReady;
        page.findAll();
    };

    $scope.findNewsReady = function(aryNews) {

        if (Array.isArray(aryNews)) {
            $scope.aryNews = aryNews;
        } else {
            $scope.aryNews = new Array(aryNews);
        }

        $scope.searchNewsQueueComplete.push(true);
        $scope.searchNewsQueueBusy = false;
        $scope.processNewsQueue();
    };

    /**
     * index.getProfile()
     */
    $scope.$on('index.getProfile()', function(event, profile) {
        $scope.profile = profile;
        $scope.init();
    });
});