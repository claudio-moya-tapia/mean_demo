/**
 * Factory Category
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Category', function(activeRecordService) {

    function Category(){
        this.model = 'category';
    }

    Category.prototype = activeRecordService;

    return Category;
});
