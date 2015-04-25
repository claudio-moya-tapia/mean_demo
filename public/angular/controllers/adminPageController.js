/**
 * Controller PageList
 * @param {$scope} $scope DOM manipulation
 * @param {Page} Page factory
 */
app.controller('AdminPageList', function($scope, Page) {

    $scope.sortableOptions = {};
    $scope.aryPageOrder = [];
    $scope.params = {};
    $scope.search = {};
    $scope.search.location = {};
    $scope.location = {};
    /**
     * Action Update Order
     */
    $scope.actionUpdateOrder = function() {

        for (var x in $scope.aryPage) {

            var order = parseInt(x) + 1;

            $scope.aryPageOrder.push({
                '_id': $scope.aryPage[x]._id,
                'order': order
            });
        }

        $scope.updateOrder();
    };

    $scope.updateOrder = function() {
        if ($scope.aryPageOrder.length > 0) {

            var page = new Page();
            page.id = $scope.aryPageOrder[0]._id;
            page.data.order = $scope.aryPageOrder[0].order;
            page.ready = $scope.updateOrderReady;
            page.update();

        } else {
            $.bootstrapGrowl('Datos guardados exitosamente', {
                type: 'success',
                allow_dismiss: false,
                offset: {from: 'bottom', amount: 20},
                align: 'left'
            });
        }
    };

    $scope.updateOrderReady = function() {
        $scope.aryPageOrder.shift();
        $scope.updateOrder();
    };

    /**
     * Action Find
     */
    $scope.actionFind = function() {

        var title = $scope.params['search[and][title]'];

        if (typeof title !== 'undefined') {
            $scope.params['search[and][title]'] = '*' + title + '*';
        }

        $scope.params['search[in][location]'] = $scope.location;
        $scope.params['ref[image]'] = 'yes';
        $scope.params['sort'] = 'order';

        var page = new Page();
        page.params = $scope.params;
        page.ready = $scope.actionFindReady;
        page.findAll();
    };

    $scope.actionFindReady = function(aryPage) {
        if (Array.isArray(aryPage)) {
            $scope.aryPage = aryPage;
        } else {
            $scope.aryPage = new Array(aryPage);
        }
    };

    /**
     * Action Count
     */
    $scope.actionCount = function() {

        var page = new Page();
        page.params = {
            'search[in][location]': $scope.location,
            count: true
        };
        page.ready = $scope.actionCountReady;
        page.findAll();
    };

    $scope.actionCountReady = function(count) {

        $scope.params['search[in][location]'] = $scope.location;

        $scope.count = parseInt(count);
        $scope.actionFind();
    };

    /**
     * Action Delete
     */
    $scope.actionDelete = function() {
        var page = new Page();
        page.id = $scope.deleteId;
        page.ready = $scope.actionDeleteReady;
        page.delete();
    };

    $scope.actionDeleteReady = function(page) {
        $scope.deleteId = '';
        $scope.actionCount();
    };

    /**
     * Init
     */
    $scope.init = function(location) {

        $scope.location = location;
        $scope.actionCount();
    };

});

/**
 * Controller PageNew
 * @param {$scope} $scope DOM manipulation
 * @param {$location} $location service
 * @param {Page} Page factory
 */
app.controller('AdminPageNew', function($scope, $location, Page) {

    $scope.page = {};
    $scope.page.url_external = '';
    $scope.showFooter = false;
    $scope.title = '';
    $scope.location = '';
    $scope.url = '';

    $scope.actionSubmit = function() {

        var page = new Page();
        page.data = $scope.page;
        page.ready = $scope.actionSubmitReady;
        page.add();
    };

    $scope.actionSubmitReady = function(page) {
        $location.path($scope.url + '/edit/' + page._id);
    };

    $scope.init = function(location, url) {
        $scope.location = location;
        $scope.url = url;
        $scope.submitTitle = 'Crear';

        if (location == 'footer_tu_fch,footer_actualidad,footer_servicios,footer_areas_de_servicio,footer_mas_info') {
            $scope.showFooter = true;
        }
    };
});

/**
 * Controller PageEdit
 * @param {scope} $scope DOM manipulation
 * @param {stateParams} $stateParams
 * @param {Page} Page factory
 * @param {Page} Image factory
 */
app.controller('AdminPageEdit', function($scope, $stateParams, Page, Image) {

    $scope.title = '';
    
    /**
     * Page defaults
     */
    $scope.page = {};
    $scope.page.url_external = '';
 
    /**
     * Image defaults
     */
    $scope.image = {};
    $scope.image.url = 'http://placehold.it/200x90';
 
    /**
     * Show / Hide fields
     */
    $scope.showFooter = false;
    $scope.showBajada = false;
    $scope.showTexto = true;
    $scope.showGaleria = true;

    /**
     * New files uploaded
     */
    $scope.imageNew = {};
    $scope.aryImageNew = [];
    $scope.aryImageNewTmp = [];
    $scope.isNewImage = false;
    $scope.isNewArrayImage = false;
    
    /**
     * Action Submit
     */
    $scope.actionSubmit = function() {

        if ($scope.isNewImage) {
            $scope.uploadImage();

        } else
        if ($scope.isNewArrayImage) {
            $scope.insertImages();

        } else {
            $scope.update();
        }
    };

    /**
     * Update
     */
    $scope.update = function() {

        try {
            
            if (typeof $scope.page.ref_image !== 'undefined') {
                $scope.page.ref_image = $scope.page.ref_image._id;
            }
            
            for (var x in $scope.page.ref_image_related) {
                $scope.page.ref_image_related[x] = $scope.page.ref_image_related[x]._id;
            }

            var page = new Page();
            page.id = $scope.page._id;
            page.data = $scope.page;
            page.ready = $scope.actionSubmitReady;
            page.error = $scope.actionSubmitError;
            page.update();
            
        } catch (e) {
            $scope.actionSubmitError(e.message);
        }
    };
    
    $scope.actionSubmitReady = function() {

        $scope.$broadcast('uploader.clearFiles()');

        $scope.isNewImage = false;
        $scope.isNewArrayImage = false;
        $scope.aryImageNew = [];
        $scope.aryImageNewTmp = [];

        $.bootstrapGrowl('Datos guardados exitosamente', {
            type: 'success',
            allow_dismiss: false,
            offset: {from: 'bottom', amount: 20},
            align: 'left'
        });

        $scope.init();
    };

    $scope.actionSubmitError = function(message) {
        
        $scope.$broadcast('uploader.clearFiles()');

        $scope.isNewImage = false;
        $scope.isNewArrayImage = false;
        $scope.aryImageNew = [];
        $scope.aryImageNewTmp = [];
        
        $.bootstrapGrowl('Error: '+message, {
            type: 'danger',
            allow_dismiss: false,
            offset: {from: 'bottom', amount: 20},
            align: 'left'
        });
        
        $scope.init();
    };

    /**
     * New Image
     */
    $scope.uploadImage = function() {

        var image = new Image();
        image.data = {
            'image_original': $scope.imageNew.url,
            'image_small': $scope.imageNew.smallUrl,
            'image_medium': $scope.imageNew.mediumUrl,
            'image_large': $scope.imageNew.largeUrl,
            'image_name': $scope.imageNew.originalName
        };
        image.ready = $scope.uploadImageReady;
        image.add();
    };

    $scope.uploadImageReady = function(image) {

        $scope.page.ref_image = image;

        if ($scope.isNewArrayImage) {
            $scope.insertImages();
        } else {
            $scope.update();
        }

    };

    /**
     * New Array of Images
     */
    $scope.insertImages = function() {

        if ($scope.aryImageNewTmp.length < $scope.aryImageNew.length) {

            var file = $scope.aryImageNew[$scope.aryImageNewTmp.length];

            var image = new Image();
            image.data = {
                'image_original': file.url,
                'image_small': file.smallUrl,
                'image_medium': file.mediumUrl,
                'image_large': file.largeUrl,
                'image_name': file.originalName
            };
            image.ready = $scope.insertImagesReady;
            image.add();

        } else {

            for (var x in $scope.aryImageNewTmp) {
                $scope.page.ref_image_related.unshift($scope.aryImageNewTmp[x]);
            }

            $scope.update();
        }
    };

    $scope.insertImagesReady = function(image) {
        $scope.aryImageNewTmp.push(image);
        $scope.insertImages();
    };

    /**
     * Remove Images
     */
    $scope.removeImageNormal = function(index) {
        $scope.page.ref_image_related.splice(index, 1);
    };

    $scope.removeImageNew = function(index) {
        $scope.aryImageNew.splice(index, 1);
    };

    /**
     * Init
     */
    $scope.init = function() {
        $scope.submitTitle = 'Guardar';

        var page = new Page();
        page.id = $stateParams.id;
        page.params = {
            'ref[image]': 'yes',
            'ref[image_related]': 'yes'
        };
        page.ready = $scope.actionInitReady;
        page.findById();
    };

    $scope.actionInitReady = function(page) {
        $scope.page = page;

        if (typeof $scope.page.ref_image !== 'undefined') {
            $scope.image.url = $scope.page.ref_image.image_medium;
        }

        switch ($scope.page.location) {
            case 'footer_tu_fch':
                $scope.showFooter = true;
                $scope.showGaleria = false;
                break;
            case 'footer_actualidad':
                $scope.showFooter = true;
                $scope.showGaleria = false;
                break;
            case 'footer_servicios':
                $scope.showFooter = true;
                $scope.showGaleria = false;
                break;
            case 'footer_areas_de_servicio':
                $scope.showFooter = true;
                $scope.showGaleria = false;
                break;
            case 'footer_mas_info':
                $scope.showFooter = true;
                $scope.showGaleria = false;
                break;
            case 'noticia':
                $scope.showNoticia = true;
                $scope.showBajada = true;
                break;
            case 'galeria':
                $scope.showBajada = true;
                $scope.showTexto = false;
                break;
            case 'banner':

                break;
            case 'menu_home':

                break;
            case 'slider':
                $scope.showGaleria = false;
                break;
            case 'interior':

                break;
            default:
                $scope.showNoticia = false;
                $scope.showFooter = false;
                break;
        }
    };

    /**
     * Watchers
     */
    $scope.$watch('page.url_external', function() {

        if (!$scope.page.url_external) {
            $scope.page.url = '/#/page/' + $scope.page._id;
        } else {
            $scope.page.url = '';
        }
    });

    /**
     * Uploaded broadcast response
     */
    $scope.$on('uploader.getFiles()', function(event, aryFiles, sourceId) {

        if (sourceId == 'fileupload') {
            $scope.isNewImage = true;
            $scope.imageNew = aryFiles[aryFiles.length - 1];
            $scope.image.url = $scope.imageNew.mediumUrl;

        } else {

            $scope.isNewArrayImage = true;
            $scope.aryImageNew = aryFiles;
        }

    });
    
    /**
     * init
     */
    $scope.init();
});