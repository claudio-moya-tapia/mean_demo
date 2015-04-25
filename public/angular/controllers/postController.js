/**
 * Controller PostIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('PostIndex', function($scope) {

});

/**
 * Controller PostList
 * @param {$scope} $scope DOM manipulation
 * @param {Post} Post factory
 */
app.controller('PostList', function($scope, Post) {

    $scope.actionCount = function() {

        var post = new Post();
        post.params = {
            count: true
        };
        post.ready = $scope.actionCountReady;
        post.findAll();
    };
    $scope.actionCountReady = function(count) {

        $scope.count = parseInt(count);
        $scope.actionFind();
    };
    $scope.actionFind = function() {
        var post = new Post();
        post.params = $scope.params;
        post.ready = $scope.actionFindReady;
        post.findAll();
    };
    $scope.actionFindReady = function(aryPost) {
        if(Array.isArray(aryPost)) {
            $scope.aryPost = aryPost;
        } else {
            $scope.aryPost = new Array(aryPost);
        } 
    };
    $scope.actionDelete = function() {
        var post = new Post();
        post.id = $scope.deleteId;
        post.ready = $scope.actionDeleteReady;
        post.delete();
    };
    $scope.actionDeleteReady = function(post) {
        $scope.deleteId = '';
        $scope.init();
    };
    $scope.init = function() {
        $scope.actionCount();
    };
    $scope.init();
});

/**
 * Controller PostNew
* @param {$scope} $scope DOM manipulation
* @param {$location} $location service
 * @param {Post} Post factory
 */
app.controller('PostNew', function($scope, $location, Post) {

    $scope.actionSubmit = function() {

        var post = new Post();
        post.data = $scope.post;
        post.ready = $scope.actionSubmitReady;
        post.add();
    };
    $scope.actionSubmitReady = function(post) {
        $location.path('post/edit/' + post._id);
    };
    $scope.init = function() {
        $scope.submitTitle = 'Crear';
    };
    $scope.init();
});

/**
 * Controller PostEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Post} Post factory
 */

app.controller('PostEdit', function($scope, $stateParams, Post) {

    $scope.actionSubmit = function() {

        var post = new Post();
        post.id = $scope.post._id;
        post.data = $scope.post;
        post.ready = $scope.actionSubmitReady;
        post.error = $scope.actionSubmitError;
        post.update();
    };
    $scope.actionSubmitError = function(post) {
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html(post);
        $scope.init();
    };
    $scope.actionSubmitReady = function(post) {
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html('Datos guardados exitosamente');
        $scope.init();
    };
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';
        var post = new Post();
        post.id = $stateParams.id;
        post.ready = $scope.actionInitReady;
        post.findById();
    };
    $scope.actionInitReady = function(post) {
        $scope.post = post;
    };
    $scope.init();
});
