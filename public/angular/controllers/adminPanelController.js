/**
 * Controller AdminPanelIndex
 * @param {$scope} $scope DOM manipulation
 */
app.controller('AdminPanelIndex', function($scope) {

});

/**
 * Controller AdminPanelList
 * @param {$scope} $scope DOM manipulation
 * @param {AdminPanel} AdminPanel factory
 */
app.controller('AdminPanelList', function($scope, AdminPanel) {

    $scope.actionCount = function() {

        var adminPanel = new AdminPanel();
        adminPanel.params = {
            count: true
        };
        adminPanel.ready = $scope.actionCountReady;
        adminPanel.findAll();
    };
    $scope.actionCountReady = function(count) {

        $scope.count = parseInt(count);
        $scope.actionFind();
    };
    $scope.actionFind = function() {
        var adminPanel = new AdminPanel();
        adminPanel.params = $scope.params;
        adminPanel.ready = $scope.actionFindReady;
        adminPanel.findAll();
    };
    $scope.actionFindReady = function(aryAdminPanel) {
        if(Array.isArray(aryAdminPanel)) {
            $scope.aryAdminPanel = aryAdminPanel;
        } else {
            $scope.aryAdminPanel = new Array(aryAdminPanel);
        } 
    };
    $scope.actionDelete = function() {
        var adminPanel = new AdminPanel();
        adminPanel.id = $scope.deleteId;
        adminPanel.ready = $scope.actionDeleteReady;
        adminPanel.delete();
    };
    $scope.actionDeleteReady = function(adminPanel) {
        $scope.deleteId = '';
        $scope.init();
    };
    $scope.init = function() {
        $scope.actionCount();
    };
    $scope.init();
});

/**
 * Controller AdminPanelNew
* @param {$scope} $scope DOM manipulation
* @param {$location} $location service
 * @param {AdminPanel} AdminPanel factory
 */
app.controller('AdminPanelNew', function($scope, $location, AdminPanel) {

    $scope.actionSubmit = function() {

        var adminPanel = new AdminPanel();
        adminPanel.data = $scope.adminPanel;
        adminPanel.ready = $scope.actionSubmitReady;
        adminPanel.add();
    };
    $scope.actionSubmitReady = function(adminPanel) {
        $location.path('admin-panel/edit/' + adminPanel._id);
    };
    $scope.init = function() {
        $scope.submitTitle = 'Crear';
    };
    $scope.init();
});

/**
 * Controller AdminPanelEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {AdminPanel} AdminPanel factory
 */

app.controller('AdminPanelEdit', function($scope, $stateParams, AdminPanel) {

    $scope.actionSubmit = function() {

        var adminPanel = new AdminPanel();
        adminPanel.id = $scope.adminPanel._id;
        adminPanel.data = $scope.adminPanel;
        adminPanel.ready = $scope.actionSubmitReady;
        adminPanel.error = $scope.actionSubmitError;
        adminPanel.update();
    };
    $scope.actionSubmitError = function(adminPanel) {
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html(adminPanel);
        $scope.init();
    };
    $scope.actionSubmitReady = function(adminPanel) {
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('hidden');
        $('#alert_msg').html('Datos guardados exitosamente');
        $scope.init();
    };
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';
        var adminPanel = new AdminPanel();
        adminPanel.id = $stateParams.id;
        adminPanel.ready = $scope.actionInitReady;
        adminPanel.findById();
    };
    $scope.actionInitReady = function(adminPanel) {
        $scope.adminPanel = adminPanel;
    };
    $scope.$on('uploader.getFiles()', function(event, aryFiles) {
        $scope.aryFiles = aryFiles;
    });
    $scope.init();
});

/**
 * Controller AdminPanelView
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {AdminPanel} AdminPanel factory
 */

app.controller('AdminPanelView', function($scope, $stateParams, AdminPanel) {

    $scope.init = function() {
        var adminPanel = new AdminPanel();
        adminPanel.id = $stateParams.id;
        adminPanel.ready = $scope.actionInitReady;
        adminPanel.findById();
    };
    $scope.actionInitReady = function(adminPanel) {
        $scope.adminPanel = adminPanel;
    };
    $scope.init();
});
