"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("file-system");
const hbs = require("hbs");
const handlebars = require("handlebars");
const routing_controllers_1 = require("routing-controllers");
const uniqueValidator = require("mongoose-unique-validator");
const layouts = require("handlebars-layouts");
var dir = 'app';
registerPartialsFromRoot('app', '');
function registerPartialsFromRoot(rootDir, namespace) {
    fs.readdir(rootDir, function (err, rootItems) {
        if (err) {
            throw new Error(err);
        }
        rootItems.forEach(function (file) {
            let path = dir + "/" + file;
            fs.stat(path, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    let namespace = file;
                    let viewsDir = path + "/views/partials";
                    if (fs.existsSync(viewsDir)) {
                        registerPartialsDir(viewsDir, namespace);
                    }
                    else {
                        registerPartialsFromRoot(path, namespace + '.' + file);
                    }
                }
            });
        });
    });
}
function registerPartialsDir(rootDir, namespace) {
    fs.stat(rootDir, function (err, stat) {
        if (stat && stat.isDirectory()) {
            fs.readdir(rootDir, function (err, items) {
                if (err) {
                    throw new Error(err);
                }
                items.forEach(function (file) {
                    registerPartialsDir(rootDir + "/" + file, namespace + "." + file);
                });
            });
        }
        else {
            console.log(rootDir + " : " + namespace);
            return;
        }
    });
}
exports.parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
exports.app = express();
exports.router = express.Router();
exports.app.use(express.static('/web'));
exports.app.use(bodyParser.urlencoded({ 'extended': 'true' }));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
exports.app.use(methodOverride());
let hbsParam = exports.parameter.view.view_engine.handlebars;
hbs.registerHelper(layouts(handlebars));
if (hbsParam.partials_dir) {
    hbs.registerPartials(__dirname + "/" + hbsParam.partials_dir);
    hbs.registerPartials(__dirname + "app/");
}
if (exports.parameter.view.baseDir) {
    exports.app.set('views', [exports.parameter.view.directory, 'app/**/views/']);
}
exports.app.set('view engine', 'hbs');
switch (exports.parameter.env) {
    case 'dev':
        exports.app.use(morgan('dev'));
        break;
    case 'prod':
        exports.app.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400; }, stream: __dirname + 'var/logs/prod.log' }));
        break;
}
exports.app.use(function (err, req, res, next) {
    console.log(exports.app.get('views'));
    let status = (err.httpCode) ? err.httpCode : 500;
    res.statusstatus;
    let errorPage = fs.existsSync(exports.app.get('views') + '/error-pages/' + status + '.hbs') ? 'error-pages/' + status + '.hbs'
        : 'error-pages/default.hbs';
    if (req.accepts('html')) {
        res.render(errorPage, {
            status: status,
            error: err,
            url: req.url,
            contact: exports.parameter.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            status: status,
            error: err,
            contact: exports.parameter.contact
        });
    }
});
let db = exports.parameter.database;
let dbConnectUri = db.driver + "://"
    + ((db.username && db.password) ?
        (db.username + ':' + db.password + "@") : '')
    + db.host
    + (db.port ? (':' + db.port) : '')
    + "/" + db.dbname;
mongoose.plugin(uniqueValidator);
mongoose.connect(dbConnectUri);
console.log("Connected to " + dbConnectUri);
routing_controllers_1.useExpressServer(exports.app, {
    defaultErrorHandler: false,
    controllers: [__dirname + "/app/*/controllers/*{.js,.ts}"],
    middlewares: [__dirname + "/node_modules/**/middlewares/*{.js,.ts}"]
});
exports.app.use(exports.router);
let serv = exports.parameter.server;
exports.app.listen(serv.port, serv.host);
console.log("App listening " + serv.host + ":" + serv.port);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUk5QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDaEIsd0JBQXdCLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLGtDQUFtQyxPQUFPLEVBQUMsU0FBUztJQUNuRCxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRSxTQUFTO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtZQUUvQixJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUU1QixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJO2dCQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUEsQ0FBQztvQkFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUMsaUJBQWlCLENBQUM7b0JB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LEdBQUcsQ0FBQyxlQUFlLEdBQUMsWUFBWSxDQUFDLENBQUM7QUFJMUMsc0NBQWdCLENBQUMsV0FBRyxFQUFFO0lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7SUFDdkIsV0FBVyxFQUFDLENBQUMsU0FBUyxHQUFDLCtCQUErQixDQUFDO0lBQ3ZELFdBQVcsRUFBRSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztDQUN2RSxDQUFDLENBQUM7QUFDSCxXQUFHLENBQUMsR0FBRyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBR2hCLElBQUksSUFBSSxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDO0FBQzVCLFdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXJ2ZXIuanNcbi8vIGltcG9ydCAqIGFzIHBhcmFtZXRlciBmcm9tICcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbic7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcbmltcG9ydCAqIGFzIGhicyBmcm9tICdoYnMnO1xuaW1wb3J0ICogYXMgaGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCB7dXNlRXhwcmVzc1NlcnZlcn0gZnJvbSBcInJvdXRpbmctY29udHJvbGxlcnNcIjtcbmltcG9ydCAqIGFzIHVuaXF1ZVZhbGlkYXRvciBmcm9tJ21vbmdvb3NlLXVuaXF1ZS12YWxpZGF0b3InO1xuaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20nZXhwcmVzcy1lcnJvci1oYW5kbGVyJ1xuaW1wb3J0ICogYXMgbGF5b3V0cyBmcm9tICdoYW5kbGViYXJzLWxheW91dHMnO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgZGlyID0gJ2FwcCc7XG5yZWdpc3RlclBhcnRpYWxzRnJvbVJvb3QoJ2FwcCcsJycpO1xuZnVuY3Rpb24gcmVnaXN0ZXJQYXJ0aWFsc0Zyb21Sb290IChyb290RGlyLG5hbWVzcGFjZSl7XG5cdGZzLnJlYWRkaXIocm9vdERpciwgZnVuY3Rpb24gKGVyciwgcm9vdEl0ZW1zKSB7XG5cdFx0aWYgKGVycil7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyKTtcblx0XHR9XG5cdFx0Ly8gRm9yIGV2ZXJ5IGZpbGUgaW4gdGhlIGxpc3Rcblx0XHRyb290SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuXHRcdFx0Ly8gRnVsbCBwYXRoIG9mIHRoYXQgZmlsZVxuXHRcdFx0bGV0IHBhdGggPSBkaXIgKyBcIi9cIiArIGZpbGU7XG5cdFx0XHQvLyBHZXQgdGhlIGZpbGUncyBzdGF0c1xuXHRcdFx0ZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXJyLCBzdGF0KSB7XG5cdFx0XHRcdC8vIElmIHRoZSBmaWxlIGlzIGEgZGlyZWN0b3J5XG5cdFx0XHRcdGlmIChzdGF0ICYmIHN0YXQuaXNEaXJlY3RvcnkoKSl7XG5cdFx0XHRcdFx0bGV0IG5hbWVzcGFjZSA9IGZpbGU7XG5cdFx0XHRcdFx0bGV0IHZpZXdzRGlyID0gcGF0aCtcIi92aWV3cy9wYXJ0aWFsc1wiO1xuXHRcdFx0XHRcdGlmIChmcy5leGlzdHNTeW5jKHZpZXdzRGlyKSkge1xuXHRcdFx0XHRcdFx0cmVnaXN0ZXJQYXJ0aWFsc0Rpcih2aWV3c0RpcixuYW1lc3BhY2UpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmVnaXN0ZXJQYXJ0aWFsc0Zyb21Sb290KHBhdGgsbmFtZXNwYWNlKycuJytmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuLy9SZWdpc3RlciBhIHBhcnRpYWwgZGlyZWN0b3J5IHJlY3Vyc2l2ZWx5IHdpdGggYSBuYW1lc3BhY2UgKHRlc3QuYml0ZS4uLilcbmZ1bmN0aW9uIHJlZ2lzdGVyUGFydGlhbHNEaXIocm9vdERpcixuYW1lc3BhY2Upe1xuXHRmcy5zdGF0KHJvb3REaXIsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcblx0XHRpZiAoc3RhdCAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpe1xuXHRcdFx0ZnMucmVhZGRpcihyb290RGlyLCBmdW5jdGlvbiAoZXJyLCBpdGVtcykge1xuXHRcdFx0XHRpZiAoZXJyKXtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG5cdFx0XHRcdFx0cmVnaXN0ZXJQYXJ0aWFsc0Rpcihyb290RGlyK1wiL1wiK2ZpbGUsbmFtZXNwYWNlK1wiLlwiK2ZpbGUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKHJvb3REaXIrXCIgOiBcIituYW1lc3BhY2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fSk7XG5cbn1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmRlY2xhcmUgdmFyIF9fZGlybmFtZTtcblxuLy8gPT09PT09PT09PT09PT1FeHBvcnQgY29tcG9uZW50LCAoY2FuIGJlIG5lZWRlZCBmcm9tIGNvbnRyb2xsZXJzKSA9PT09PT09PT09PT09PT09XG5leHBvcnQgbGV0IHBhcmFtZXRlciA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9wYXJhbWV0ZXIuanNvbicpKTtcbmV4cG9ydCBsZXQgYXBwID0gZXhwcmVzcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBhcHAgdy8gZXhwcmVzc1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT1TZXQgdXAgZXhwcmVzcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy93ZWInKSk7ICAgICAgICAgICAgICAgICBcdFx0XHRcdC8vIHNldCB0aGUgc3RhdGljIGZpbGVzIGxvY2F0aW9uIC9wdWJsaWMvaW1nIHdpbGwgYmUgL2ltZyBmb3IgdXNlcnNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBIYW5kbGViYXJzICh0ZW1wbGF0aW5nIHN5c3RlbSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBoYnNQYXJhbSA9IHBhcmFtZXRlci52aWV3LnZpZXdfZW5naW5lLmhhbmRsZWJhcnM7XG5cblxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcbmhicy5yZWdpc3RlckhlbHBlcihsYXlvdXRzKGhhbmRsZWJhcnMpKTtcblxuLy8gc2V0IHBhcmFtZXRlciBmcm9tIHBhcmFtZXRlci5qc29uXG5pZihoYnNQYXJhbS5wYXJ0aWFsc19kaXIpe1xuXHRoYnMucmVnaXN0ZXJQYXJ0aWFscyhfX2Rpcm5hbWUgK1wiL1wiKyBoYnNQYXJhbS5wYXJ0aWFsc19kaXIpO1xuXHRoYnMucmVnaXN0ZXJQYXJ0aWFscyhfX2Rpcm5hbWUgK1wiYXBwL1wiKTtcbn1cblxuaWYocGFyYW1ldGVyLnZpZXcuYmFzZURpcil7XG5cdGFwcC5zZXQoJ3ZpZXdzJyxbcGFyYW1ldGVyLnZpZXcuZGlyZWN0b3J5LCdhcHAvKiovdmlld3MvJ10pO1xufVxuXG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYnMnKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PUVycm9yIGhhbmRsaW5nID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnN3aXRjaChwYXJhbWV0ZXIuZW52KXtcblx0Y2FzZSAnZGV2Jzpcblx0XHQvLyBkZXZlbG9wbWVudCBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2RldicpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdGJyZWFrO1x0XHRcblx0Y2FzZSAncHJvZCc6XG5cdFx0Ly8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG5cdFx0Ly8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcblx0XHRhcHAudXNlKG1vcmdhbignY29tbW9uJywgeyBza2lwOiBmdW5jdGlvbihyZXEsIHJlcykgeyByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPCA0MDAgfSwgc3RyZWFtOiBfX2Rpcm5hbWUgKyAndmFyL2xvZ3MvcHJvZC5sb2cnIH0pKTtcblx0XHRicmVhaztcbn1cblxuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KXtcblx0Y29uc29sZS5sb2coYXBwLmdldCgndmlld3MnKSk7XG5cdGxldCBzdGF0dXMgPSAoZXJyLmh0dHBDb2RlKT9lcnIuaHR0cENvZGU6NTAwO1xuXHRyZXMuc3RhdHVzc3RhdHVzXG5cdGxldCBlcnJvclBhZ2UgPSBmcy5leGlzdHNTeW5jKGFwcC5nZXQoJ3ZpZXdzJykrJy9lcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicycpPydlcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicydcblx0XHRcdDonZXJyb3ItcGFnZXMvZGVmYXVsdC5oYnMnO1xuXHRpZiAocmVxLmFjY2VwdHMoJ2h0bWwnKSkge1xuXHRcdHJlcy5yZW5kZXIoZXJyb3JQYWdlLCB7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6cGFyYW1ldGVyLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09IERhdGFiYXNlIGNvbm5lY3QgKG1vbmdvb3NlKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IGRiID0gcGFyYW1ldGVyLmRhdGFiYXNlO1xubGV0IGRiQ29ubmVjdFVyaSA9IGRiLmRyaXZlcitcIjovL1wiXG4gICAgKygoZGIudXNlcm5hbWUgJiYgZGIucGFzc3dvcmQpP1xuICAgICAgICAoZGIudXNlcm5hbWUrJzonK2RiLnBhc3N3b3JkK1wiQFwiKTonJ1xuICAgIClcbiAgICArZGIuaG9zdFxuICAgICsoZGIucG9ydD8oJzonK2RiLnBvcnQpOicnKVxuICAgICtcIi9cIitkYi5kYm5hbWVcbjtcbi8vQWRkIHBsdWdpbiB0byBtb25nb29zZSBcbm1vbmdvb3NlLnBsdWdpbih1bmlxdWVWYWxpZGF0b3IpO1xuLy9Db25uZWN0IHRvIE1vbmdvIGRiXG5tb25nb29zZS5jb25uZWN0KGRiQ29ubmVjdFVyaSk7XG5jb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBcIitkYkNvbm5lY3RVcmkpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT0gU2V0IHVwIHRoZSByb3V0aW5nIG9mIHRoZSBhcHAgPT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUmVnaXN0ZXIgY29udHJvbGxlclxudXNlRXhwcmVzc1NlcnZlcihhcHAsIHtcblx0ZGVmYXVsdEVycm9ySGFuZGxlcjogZmFsc2UsIC8vIHdlIHVzZSBjdXN0b20gZXJyb3IgaGFuZGxlciBcbiAgICBjb250cm9sbGVyczpbX19kaXJuYW1lK1wiL2FwcC8qL2NvbnRyb2xsZXJzLyp7LmpzLC50c31cIl0sXG4gICAgbWlkZGxld2FyZXM6IFtfX2Rpcm5hbWUgKyBcIi9ub2RlX21vZHVsZXMvKiovbWlkZGxld2FyZXMvKnsuanMsLnRzfVwiXVxufSk7XG5hcHAudXNlKHJvdXRlcik7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09U3RhcnQgdGhlIHNlcnZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHNlcnYgPSBwYXJhbWV0ZXIuc2VydmVyO1xuYXBwLmxpc3RlbihzZXJ2LnBvcnQsc2Vydi5ob3N0KTtcbmNvbnNvbGUubG9nKFwiQXBwIGxpc3RlbmluZyBcIitzZXJ2Lmhvc3QrXCI6XCIrc2Vydi5wb3J0KTtcblxuIl19