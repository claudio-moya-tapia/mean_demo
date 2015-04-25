app.directive('ngJustifyGallery', function() {

    var ngJustifyGallery = {
        restrict: 'C',
        link: JustifyGallery
    };

    var imgCount = 0;
    var imgLoaded = 0;

    function JustifyGallery(scope, element, attrs) {

        var imgCountLocal = imgCount;
        imgCount++;

        element.bind('load', function() {
            imgLoaded++;

            if (imgCount == imgLoaded) {
                
                $('.swipeboxExample').justifiedGallery({
                    lastRow: 'nojustify',
                    rowHeight: 100,
                    rel: 'gallery2',
                    margins: 1
                });
                
                imgCount = 0;
                imgLoaded = 0;
            }
        });
    }
    ;

    return ngJustifyGallery;
});