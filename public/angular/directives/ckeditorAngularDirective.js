app.directive('ngCkeditorAngular', function() {
    var ngCkeditorAngular = {
        require: 'ngModel',
        restrict: 'C',
        link: CkeditorAngular //constructor
    };
    function CkeditorAngular(scope, element, atributes, ngModel) {
        
        var config = {
            language: 'es',
            toolbar: [
                {name: 'document', items:['NewPage']},
                {name: 'styles', items: ['Format']},
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat']},
                {name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']},
                {name: 'links', items: ['Link', 'Unlink']},
                {name: 'insert', items: ['Image', 'Table', 'PageBreak', 'Source']}
            ]
        };
        
        var editor = CKEDITOR.replace(atributes.id, config);

        /**
         * Callback function to check when ngModel changes the value from $scope
         * similar to $scope.$watch
         * If condition check for undefined
         */
        ngModel.$render = function() {
            
            editor.on('change', function(evt) {
                ngModel.$setViewValue(evt.editor.getData());
            });
            
            if (typeof ngModel.$modelValue !== 'undefined') {
                editor.setData(ngModel.$modelValue);
            }
        };
    }

    return ngCkeditorAngular;
});