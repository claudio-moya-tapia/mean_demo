function MeanController() {
    this.auth = [];
}

MeanController.prototype.generator = function() {

    this.res.render('mean/generator.html', {
        layout: 'layout/empty.html'
    });
};

MeanController.prototype.models = function() {

    var fs = require("fs");
    var path = require("path");

    var p = 'app/models/';
    var aryModels = new Array();
    var self = this;

    fs.readdir(p, function(err, files) {

        for (var i in files) {

            if (files[i].search('.bkp') == -1) {
                var Schema = require('app/models/' + files[i]);
                aryModels.push(Schema.modelName);
            }
        }

        self.modelsRes(aryModels.sort());
    });
};

MeanController.prototype.modelsRes = function(aryModels) {
    this.res.json(aryModels);
};

MeanController.prototype.create = function() {

    try {

        if (this.req.body.mainClass != '') {

            var fs = require('fs');
            var self = this;
            var mainClass = this.req.body.mainClass;
            var modelFile = this.req.body.modelFile;
            var aryOption = this.req.body.options;
            var aryCode = this.req.body.code;
            var viewPath = 'app/views/' + mainClass.replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
            
            var aryFiles = new Array();
            aryFiles['model'] = 'app/models/' + modelFile + '.js';
            aryFiles['api'] = 'app/controllers/api' + mainClass.charAt(0).toUpperCase() + mainClass.slice(1) + 'Controller.js';
            aryFiles['ctrl'] = 'app/controllers/' + mainClass + 'Controller.js';
            aryFiles['htmlList'] = viewPath + '/list.html';
            aryFiles['htmlNew'] = viewPath + '/new.html';
            aryFiles['htmlEdit'] = viewPath + '/edit.html';
            aryFiles['htmlView'] = viewPath + '/view.html';
            aryFiles['angularController'] = 'public/angular/controllers/' + mainClass + 'Controller.js';
            aryFiles['angularFactory'] = 'public/angular/factory/' + mainClass + 'Factory.js';

            if (!fs.existsSync(viewPath)) {
                fs.mkdirSync(viewPath);
            }

            for (var i in aryOption) {
                var option = aryOption[i];
                var code = aryCode[i];
                var localFile = aryFiles[option];
                var date = new Date();
                var backup = aryFiles[option] + '.bkp';
                backup += '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '_';
                backup += date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

                if (fs.existsSync(localFile)) {
                    fs.writeFileSync(backup, fs.readFileSync(localFile));
                }

                fs.writeFile(localFile, code, function(err) {
                    if (err)
                        throw err;

                    self.angular(mainClass.toLowerCase());
                });
            }

            this.res.json('ok');
        }
    } catch (e) {
        this.res.json('error ' + e.toString());
    }
};

MeanController.prototype.angular = function() {
    try {
        var fs = require('fs');
        var model = this.req.body.model;

        if (typeof model !== 'undefined') {
            var localFile = 'public/angular/app.js';
            var aryProvider = fs.readFileSync(localFile).toString().split("var aryProvider = [");
            var date = new Date();
            var dateUpdated = '/** Created at ' + date.toJSON() + ' **/';
            var backup = localFile + '.bkp';
            backup += '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '_';
            backup += date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

            var items = aryProvider[1].split('\n');

            var isNew = true;
            for (var i in items) {

                if (items[i].search("'" + model + "'") != -1) {
                    isNew = false;
                    break;
                }

                if (items[i].search('];') != -1) {
                    break;
                }
            }

            if (isNew) {
                aryProvider[1] = "var aryProvider = [\n        '" + model + "'," + dateUpdated + aryProvider[1];

                var newContent = aryProvider.join('');

                fs.writeFileSync(backup, fs.readFileSync(localFile));

                fs.writeFile(localFile, newContent, function(err) {
                    if (err)
                        throw err;
                });
            }

            this.res.json('ok');
        }

    } catch (e) {
        this.res.json('error ' + e.toString());
    }
};

MeanController.prototype.angular_template = function() {

    try {
        var fs = require('fs');
        var model = this.req.body.mainClass;

        //controller
        var localFile = 'app/views/layout/main.html';
        var html = fs.readFileSync(localFile).toString().split('<!-- Controllers -->');
        var date = new Date();
        var dateUpdated = '<!-- Created at ' + date.toJSON() + ' -->';
        var backup = localFile + '.bkp';
        backup += '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '_';
        backup += date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

        var aryScript = html[1].split('<script type="text/javascript" src="/angular/controllers/');

        var isNewController = true;
        for (var i in aryScript) {
            if (aryScript[i].search(model + 'Controller.js') != -1) {
                isNewController = false;
                break;
            }
        }

        var aryScript = html[1].split('<script type="text/javascript" src="/angular/factory/');

        var isNewFactory = true;
        for (var i in aryScript) {
            if (aryScript[i].search(model + 'Factory.js') != -1) {
                isNewFactory = false;
                break;
            }
        }

        if (isNewController) {
            var code = '<!-- Controllers -->\n        <script type="text/javascript" src="/angular/controllers/' + model + 'Controller.js"></script>' + dateUpdated;
            html[1] = code + html[1];
        }

        if (isNewFactory) {
            var html = html.join('').toString().split('<!-- Factory -->');
            var code = '<!-- Factory -->\n        <script type="text/javascript" src="/angular/factory/' + model + 'Factory.js"></script>' + dateUpdated;
            html[1] = code + html[1];
        }

        if (isNewController || isNewFactory) {
            var newContent = html.join('').toString();

            fs.writeFileSync(backup, fs.readFileSync(localFile));

            fs.writeFile(localFile, newContent, function(err) {
                if (err)
                    throw err;
            });
        }

        this.res.json('ok');
    } catch (e) {
        this.res.json('error ' + e.toString());
    }
};

MeanController.prototype.check = function() {

    var aryAtributes = new Array();

    try {
      
        var Schema = require('app/models/' + this.req.params.id);

        for (var atribute in Schema.schema.tree) {

            if ((atribute != 'id') && (atribute != '_id') && (atribute != '__v')) {
                var item = Schema.schema.tree[atribute];
                
                for (var subAtribute in item) {

                    if (item.length == 1) {

                        name = atribute;
                        type = item[0].ref;

                        aryAtributes.push({
                            'type': type,
                            'name': name,
                            'is_array': true
                        });
                    }

                    if (subAtribute == 'type') {
                        var name = '';
                        var type = '';

                        if (item[subAtribute].name == 'ObjectId') {
                            type = item.ref;
                        } else {
                            type = item[subAtribute].name;
                        }

                        name = atribute;

                        aryAtributes.push({
                            'type': type,
                            'name': name,
                            'is_array': false
                        });
                    }
                }
            }
        }

        this.res.json(aryAtributes);

    } catch (e) {
        this.res.json(aryAtributes);
    }
};

module.exports = new MeanController();