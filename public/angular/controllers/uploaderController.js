/**
 * Controller UploaderController
 * @param {$scope} $scope DOM manipulation
 */
app.controller('UploaderController', function($scope) {

    $scope.aryFiles = [];
    $scope.default = "fileupload";

    /**
     * Handle Response from jQuery-File-Uploader
     * @param {Object} e event object
     * @param {Array} data full data object
     * @returns {Array} aryFiles Uploaded files
     * @example On the parent controller add a listener
     * and get the current uploads in a clean array
     * 
     * $scope.$on('uploader.getFiles()', function(event, aryFiles) {
     *   $scope.aryFiles = aryFiles;
     * });
     */
    $scope.handleResponse = function(e, data) {
        
        if (e.target.id.length > 0){
            $scope.default = e.target.id;
        }
        
        if(data.result.files.length > 0){
            $scope.aryFiles.push(data.result.files[0]);
            $scope.$emit('uploader.getFiles()', $scope.aryFiles, $scope.default);
        }
    };
    
    $scope.$on('uploader.clearFiles()', function() {
        $scope.aryFiles = [];
    });

    /**
     * jQuery-File-Uploader options
     */
    $scope.options = {
        url: 'upload',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        handleResponse: $scope.handleResponse
    };
});