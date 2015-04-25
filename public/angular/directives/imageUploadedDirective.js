app.directive('ngImageUploaded', function() {

    var ngImageUploaded = {
        restrict: 'C',
        link: ImageUploaded
    };

    var imgCount = 0;
    var imgLoaded = 0;

    function ImageUploaded(scope, element, attrs) {

        var imgCountLocal = imgCount;
        imgCount++;
        
        element.bind('load', function() {
            imgLoaded++;
            
            if (imgCount == imgLoaded) {
                
                scope.active = function(){
                    return false;
                };

                imgCount = 0;
                imgLoaded = 0;
            }
        });
    }
    ;

    return ngImageUploaded;
});