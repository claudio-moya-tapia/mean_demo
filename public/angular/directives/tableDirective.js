app.directive('ngTable', function() {

    var ngTable = {
        restrict: 'C', //class as <div class="ng-sort"></div>
        scope: false, //
        link: Table //constructor
    };

    /**
     * Sort directive
     * @param {$scope} scope AngularJS local scope
     * @param {jqLite} element jQuery lite AngularJS built-in
     * @param {type} atributes
     */
    function Table(scope, element, atributes) {
        /**
         * Atributes
         */
        scope.params = {};
        scope.params.skip = 0;
        scope.params.limit = 10;
        scope.params.sort = null;

        scope.search = {};
        scope.count = 0;
        scope.pagePrev = 0;
        scope.pageNext = 0;
        scope.aryPagination = 0;
        scope.deleteId = '';

        /**
         * Methods
         */
        scope.searchReset = function() {
            var skip = scope.params.skip;
            var limit = scope.params.limit;
            var sort = scope.params.sort;

            scope.params = {};
            scope.params.skip = skip;
            scope.params.limit = limit;
            scope.params.sort = sort;
        };

        scope.searchField = function(field,type) {
            
            if (scope.search[field].length == 0) {
                scope.searchReset();
                scope.actionFind();
            }
            
            if (scope.search[field].length > 1) {
                
                if(type == 'date'){
                    
                    scope.params['search[greater][' + field + ']'] = scope.search[field];
                    scope.params['search[lower][' + field + ']'] = scope.search[field];
                }else{
                    scope.params['search[and][' + field + ']'] = scope.search[field];
                }
                
                scope.actionFind();
            } else {
                scope.searchReset();
            }
        };

        scope.sortField = function(field) {

            scope.params.sort = field;

            var caret = element.find('.field-' + field + '.caret-up-down');
            
            if (caret.hasClass('dropdown')) {
                caret.removeClass('dropdown').addClass('dropup');
                scope.params.sort = '-' + scope.params.sort;
            } else {
                caret.removeClass('dropup').addClass('dropdown');
                scope.params.sort = scope.params.sort.replace('-', '');
            }

            scope.actionFind();
        };

        scope.goToPage = function(page) {
            
            if (scope.params.limit > scope.count) {
                scope.params.skip = 0;
            } else {
                scope.params.skip = (page * scope.params.limit) - scope.params.limit;
            }
            
            scope.actionFind();
        };

        scope.btnPrev = function() {
            
            if (scope.params.limit > scope.count) {
                scope.params.skip = 0;
            } else {
                scope.params.skip -= parseInt(scope.params.limit);
            }
            
            scope.actionFind();
        };

        scope.btnNext = function() {

            if (scope.params.limit > scope.count) {
                scope.params.skip = 0;
            } else {
                scope.params.skip += parseInt(scope.params.limit);
            }

            scope.actionFind();
        };
        
        scope.pagination = function() {
            var pages = Math.ceil(scope.count / scope.params.limit);

            scope.aryPagination = new Array();
            for (var i = 1; i <= pages; i++) {
                scope.aryPagination.push(i);
            }

            if ((pages > 1) && (scope.params.limit <= scope.count)) {
                element.find('.next').removeClass('hidden');
            } else {
                element.find('.next').addClass('hidden');
            }

            if (scope.params.limit > scope.count) {
                scope.skip = 0;
                element.find('.next').addClass('hidden');
                element.find('.prev').addClass('hidden');
            }

            scope.actionFind();
        };
        
        scope.confirmDelete = function(itemId) {
            scope.deleteId = itemId;
        };
        
        scope.deleteField = function() {
            scope.actionDelete();
        };
        
        scope.deleteCancel = function() {
            scope.deleteId = '';
        };

        /**
         * Events
         */
        scope.$watch('params.skip', function(skip) {

            if (skip > 0) {
                element.find('.prev').removeClass('hidden');
            } else {
                element.find('.prev').addClass('hidden');
            }

            var nextSkip = parseInt(scope.params.skip) + parseInt(scope.params.limit);

            if (nextSkip >= scope.count) {
                element.find('.next').addClass('hidden');
            } else {
                element.find('.next').removeClass('hidden');
            }

        });
        
        scope.$watch('params.limit', function(limit, limitOld) {

            if (limit != limitOld) {
                scope.pagination();
            }
        });
    }

    return ngTable;
});