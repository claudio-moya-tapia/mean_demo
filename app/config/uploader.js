/**
 * File uploader Blueimp jQuery File Uploader
 * @see jQuery-File-Upload https://github.com/blueimp/jQuery-File-Upload
 * @see jquery-file-upload-middleware https://github.com/aguidrevitch/jquery-file-upload-middleware
 * @requires ImageMagik http://www.imagemagick.org/
 */
module.exports = function(app, dirname) {

    var moment = require('moment');
    var path = require('path');
    var upload = require('jquery-file-upload-middleware');
    var date = moment().format('YYYY') + '/';
    date += moment().format('MM') + '/';
    date += moment().format('DD');
    
    upload.configure({
        uploadDir: dirname + '/public/upload/' + date,
        uploadUrl: '/upload/' + date,
        tmpDir: dirname + '/public/upload/tmp',
        ssl: false,
        hostname: null, // in case your reverse proxy doesn't set Host header, ex 'google.com'
        maxPostSize: 10000000, // 10MB
        minFileSize: 1,
        maxFileSize: 10000000, // 10MB
        acceptFileTypes: /\.(gif|jpe?g|png)$/i,
        imageTypes: /\.(gif|jpe?g|png)$/i,
        imageVersions: {
            "large": {
                width: 600,
                height: 600
            },
            "medium": {
                width: 300,
                height: 600
            },
            "small": {
                width: 150,
                height: 600
            }
        },
        imageArgs: ['-auto-orient'],
        accessControl: {
            allowOrigin: '*',
            allowMethods: 'POST'
        }
    });

    app.use('/upload', upload.fileHandler());

    upload.on('begin', function(fileInfo, req, res) {

        var extension = path.extname(fileInfo.name);
        var file = path.basename(fileInfo.name, extension);

        fileInfo.name = moment().format('YYYY-MM-DD_HH-mm-ss-SSS')+ '__' + file + extension;
    });

    return upload;
};