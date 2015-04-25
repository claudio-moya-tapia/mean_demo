/**
 * PreviewLinkService
 * Used to create an HTML code for a external link
 */
app.service('previewLinkService', function($http) {

    this.title = '';
    this.text = '';
    this.url = '';
    this.image = '';

    this.getHTML = function() {

        this.text = this.text.replace(/<\/?[^>]+>/gi, '');

        if (this.text.length > 20) {
            this.text = this.text.substr(0, 20) + ' ...';
        }

        var html = '';

        if (this.image != '') {
            html += '<div class="row preview-link">';
            html += '   <div class="col-md-3">';
            html += '       <a href="' + this.url + '">';
            html += '           <img class="img-responsive ng-justify-gallery" src="' + this.image + '" />';
            html += '       </a>';
            html += '   </div>';
            html += '   <div class="col-md-9">';
            html += '       <a href="' + this.url + '">';
            html += '           <strong>' + this.title + '</strong>';
            html += '       </a>';
            html += '       <p>' + this.text + '</p>';
            html += '       <div class="row">';
            html += '           <a href="' + this.url + '" class="btn btn-info btn-xs pull-right">';
            html += '               <i class="fa fa-external-link-square"></i> Ver mas';
            html += '           </a>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';
        }else{
            html += '<div class="row preview-link">';
            html += '   <div class="col-md-12">';
            html += '       <a href="' + this.url + '">';
            html += '           <strong>' + this.title + '</strong>';
            html += '       </a>';
            html += '       <p>' + this.text + '</p>';
            html += '       <div class="row">';
            html += '           <a href="' + this.url + '" class="btn btn-info btn-xs pull-right">';
            html += '               <i class="fa fa-external-link-square"></i> Ver mas';
            html += '           </a>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';
        }

        this.title = '';
        this.text = '';
        this.url = '';
        this.image = '';

        return html;
    };
});