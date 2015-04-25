/**
 * AngularJS main app
 * @name angularApp standard name
 * @param {AngularUIRouter} ui.router module for url route manager
 * @param {InfiniteScroll} infinite-scroll infinite scroll to load more content
 * @param {BlueImpFileUpload} blueimp.fileupload file uploader
 */
var app = angular.module('angularApp', [
    'ui.router',
    'infinite-scroll',
    'blueimp.fileupload',
    'youtube-embed',
    'ui.sortable',
    'ui.bootstrap'
]);

/**
 * AngularJS app configuration
 * @param {stateProvider} $stateProvider State Manager for urls (ui.router)
 * @param {urlRouterProvider} $urlRouterProvider Watch the $location (ui.router)
 */
app.config(function($stateProvider, $urlRouterProvider) {

    /**
     * Automatic $stateProvider manager
     */
    var method = '';
    var state = '';
    var url = '';
    var templateUrl = '';
    var provider = '';
    var aryMethod = new Array();

    var aryProvider = [
        'birthday',
        'admin-page-internal',
        'admin-slider',
        'admin-gallery',
        'admin-footer',
        'admin-banner',
        'admin-menu-home',
        'admin-news',
        'gallery',
        'news',
        'group-post', /** Created at 2015-03-31T14:47:04.544Z **/
        'admin-page',
        'admin-panel', /** Created at 2015-03-25T00:01:17.700Z **/
        'category', /** Created at 2015-03-24T10:59:09.267Z **/
        'page', /** Created at 2015-03-17T15:24:26.959Z **/
        'post-share',
        'friend', /** Created at 2015-02-18T15:41:43.259Z **/
        'group', /** Created at 2015-02-18T15:01:58.555Z **/
        'profile', /** Created at 2015-02-17T00:12:57.312Z **/
        'wall-post', /** Created at 2015-02-15T20:12:49.773Z **/
        'wall', /** Created at 2015-02-15T20:11:48.054Z **/
        'post-like', /** Created at 2015-02-15T20:09:34.478Z **/
        'comment', /** Created at 2015-02-15T20:03:48.443Z **/
        'post', /** Created at 2015-02-15T20:00:23.363Z **/
        'video', /** Created at 2015-02-15T19:57:13.916Z **/
        'index'
    ];

    for (var i in aryProvider) {

        provider = aryProvider[i];

        switch (provider) {
            case 'index':
                aryMethod = ['home'];
                break;
            case 'group':
                aryMethod = ['index', 'menu', 'search', 'member', 'list', 'new', 'view', 'edit', 'delete'];
                break;
            default :
                aryMethod = ['index', 'list', 'new', 'view', 'edit', 'delete'];
                break;
        }

        for (var x in aryMethod) {
            method = aryMethod[x];

            switch (method) {
                case 'home':
                    url = '/' + method;
                    break;
                case 'index':
                    url = '/' + provider;
                    break;
                case 'menu':
                    url = '/' + provider + '/' + method;
                    break;
                case 'search':
                    url = '/' + provider + '/' + method;
                    break;
                case 'member':
                    url = '/' + provider + '/' + method;
                    break;
                case 'list':
                    url = '/' + provider + '/' + method;
                    break;
                case 'view':
                    url = '/' + provider + '/:id';
                    break;
                case 'new':
                    url = '/' + provider + '/' + method;
                    break;
                case 'edit':
                    url = '/' + provider + '/' + method + '/:id';
                    break;
                case 'delete':
                    url = '/' + provider + '/' + method + '/:id';
                    break;
            }

            templateUrl = provider + '/' + method;

            state = provider.replace(/\W+(.)/g, function(x, chr) {
                return chr.toUpperCase();
            });

            state = state.charAt(0).toUpperCase() + state.slice(1);
            state += method.charAt(0).toUpperCase() + method.slice(1);

            $stateProvider.state(state, {
                url: url,
                templateUrl: templateUrl,
                controller: state
            });
        }
    }

    $urlRouterProvider.otherwise('home');
});

/**
 * AngularJS app init
 * @param {$state} $state Transitioning to a new state (ui.router)
 */
app.run(function() {

});

/**
 * HTML Filter
 */
app.filter('htmlEncode', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});