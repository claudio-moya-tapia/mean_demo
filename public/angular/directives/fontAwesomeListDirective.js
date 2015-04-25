app.directive('ngFontAwesomeList', function() {

    var ngFontAwesomeList = {
        require: 'ngModel',
        restrict: 'C', //class as <div class="ng-dateTimePicker"></div>
        link: FontAwesomeList //constructor
    };

    function FontAwesomeList(scope, element, atributes, ngModel) {

        element.find('a').on('click', function(e) {
            e.preventDefault();
            
            var className = element.find(this).find('i').attr('class');
            
            scope.$apply(function() {
                ngModel.$setViewValue(className);
                scope.fawsSelect = 0;
            });
        });
    }

    return ngFontAwesomeList;
});