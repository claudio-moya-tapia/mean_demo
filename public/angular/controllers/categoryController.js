/**
 * Controller CategoryIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('CategoryIndex', function($scope) {

});

/**
 * Controller CategoryList
 * @param {$scope} $scope DOM manipulation
 * @param {Category} Category factory
 */
app.controller('CategoryList', function($scope, Category) {

    $scope.actionCount = function() {

        var category = new Category();
        category.params = {
            count: true
        };
        category.ready = $scope.actionCountReady;
        category.findAll();
    };
    $scope.actionCountReady = function(count) {

        $scope.count = parseInt(count);
        $scope.actionFind();
    };
    $scope.actionFind = function() {
        var category = new Category();
        category.params = $scope.params;
        category.ready = $scope.actionFindReady;
        category.findAll();
    };
    $scope.actionFindReady = function(aryCategory) {
        if(Array.isArray(aryCategory)) {
            $scope.aryCategory = aryCategory;
        } else {
            $scope.aryCategory = new Array(aryCategory);
        } 
    };
    $scope.actionDelete = function() {
        var category = new Category();
        category.id = $scope.deleteId;
        category.ready = $scope.actionDeleteReady;
        category.delete();
    };
    $scope.actionDeleteReady = function(category) {
        $scope.deleteId = '';
        $scope.init();
    };
    $scope.init = function() {
        $scope.actionCount();
    };
    $scope.init();
});

/**
 * Controller CategoryNew
* @param {$scope} $scope DOM manipulation
* @param {$location} $location service
 * @param {Category} Category factory
 */
app.controller('CategoryNew', function($scope, $location, Category) {

    $scope.actionSubmit = function() {

        var category = new Category();
        category.data = $scope.category;
        category.ready = $scope.actionSubmitReady;
        category.add();
    };
    $scope.actionSubmitReady = function(category) {
        $location.path('category/edit/' + category._id);
    };
    $scope.init = function() {
        $scope.submitTitle = 'Crear';
    };
    $scope.init();
});

/**
 * Controller CategoryEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Category} Category factory
 */

app.controller('CategoryEdit', function($scope, $stateParams, Category) {

    $scope.actionSubmit = function() {

        var category = new Category();
        category.id = $scope.category._id;
        category.data = $scope.category;
        category.ready = $scope.actionSubmitReady;
        category.error = $scope.actionSubmitError;
        category.update();
    };
    $scope.actionSubmitError = function(category) {
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html(category);
        $scope.init();
    };
    $scope.actionSubmitReady = function(category) {
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html('Datos guardados exitosamente');
        $scope.init();
    };
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';
        var category = new Category();
        category.id = $stateParams.id;
        category.ready = $scope.actionInitReady;
        category.findById();
    };
    $scope.actionInitReady = function(category) {
        $scope.category = category;
    };
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.aryFiles = aryFiles;
    });
    $scope.init();
});

/**
 * Controller CategoryView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Category} Category factory
 */

app.controller('CategoryView', function($scope, $stateParams, Category) {

    $scope.init = function() {
        var category = new Category();
        category.id = $stateParams.id;
        category.ready = $scope.actionInitReady;
        category.findById();
    };
    $scope.actionInitReady = function(category) {
        $scope.category = category;
    };
    $scope.init();
});
