/**
 * Factory Page
 * @extends activeRecordService
 * @param {activeRecordService} activeRecordService
 * @return {activeRecordService} activeRecordService overwrited to controller
 */
app.factory('Page', function(activeRecordService) {

    function Page(){
        this.model = 'page';
    }

    Page.prototype = activeRecordService;

    return Page;
});
