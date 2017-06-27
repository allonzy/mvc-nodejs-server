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
const nameSpaceHandler_1 = require("./utils/nameSpaceHandler");
const readConfig_1 = require("./utils/readConfig");
let object = readConfig_1.recursiveIncludeJson('/config', 'config.json');
console.log(object);
exports.parameter = JSON.parse(fs.readFileSync('./config/parameter.json'));
;
let config = JSON.parse(fs.readFileSync('./config/config.json'));
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
    nameSpaceHandler_1.getNameSpace("app/**/views/partials/*.hbs", "app\/(.*)\/views\/partials\/(.*).hbs", '.', function (file, nameSpace) {
        hbs.registerPartial(nameSpace, file);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvc2VydmVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0QkFBMEI7QUFDMUIsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6Qyw2REFBcUQ7QUFDckQsNkRBQTREO0FBRTVELDhDQUE4QztBQUM5QywrREFBc0Q7QUFDdEQsbURBQXVEO0FBUXZELElBQUksTUFBTSxHQUFHLGlDQUFvQixDQUFDLFNBQVMsRUFBQyxhQUFhLENBQUMsQ0FBQTtBQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRVQsUUFBQSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztBQUFBLENBQUM7QUFDL0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztBQUN0RCxRQUFBLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNkLFFBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QyxXQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoQyxXQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BE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QUFJLElBQUksR0FBRyxpQkFBUyxDQUFDLE1BQU0sQ0FBQztBQUM1QixXQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2VydmVyLmpzXG4vLyBpbXBvcnQgKiBhcyBwYXJhbWV0ZXIgZnJvbSAnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSc7XG5pbXBvcnQgKiBhcyBoYnMgZnJvbSAnaGJzJztcbmltcG9ydCAqIGFzIGhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQge3VzZUV4cHJlc3NTZXJ2ZXJ9IGZyb20gXCJyb3V0aW5nLWNvbnRyb2xsZXJzXCI7XG5pbXBvcnQgKiBhcyB1bmlxdWVWYWxpZGF0b3IgZnJvbSdtb25nb29zZS11bmlxdWUtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tJ2V4cHJlc3MtZXJyb3ItaGFuZGxlcidcbmltcG9ydCAqIGFzIGxheW91dHMgZnJvbSAnaGFuZGxlYmFycy1sYXlvdXRzJztcbmltcG9ydCB7Z2V0TmFtZVNwYWNlfSBmcm9tICcuL3V0aWxzL25hbWVTcGFjZUhhbmRsZXInO1xuaW1wb3J0IHtyZWN1cnNpdmVJbmNsdWRlSnNvbn0gZnJvbSAnLi91dGlscy9yZWFkQ29uZmlnJ1xuaW1wb3J0ICogYXMgZ2xvYiBmcm9tICdnbG9iJztcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZGVjbGFyZSB2YXIgX19kaXJuYW1lO1xubGV0IG9iamVjdCA9IHJlY3Vyc2l2ZUluY2x1ZGVKc29uKCcvY29uZmlnJywnY29uZmlnLmpzb24nKVxuY29uc29sZS5sb2cob2JqZWN0KTtcbi8vID09PT09PT09PT09PT09RXhwb3J0IGNvbXBvbmVudCwgKGNhbiBiZSBuZWVkZWQgZnJvbSBjb250cm9sbGVycykgPT09PT09PT09PT09PT09PVxuZXhwb3J0IGxldCBwYXJhbWV0ZXIgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9jb25maWcvcGFyYW1ldGVyLmpzb24nKSk7O1xubGV0IGNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuL2NvbmZpZy9jb25maWcuanNvbicpKTtcbmV4cG9ydCBsZXQgYXBwID0gZXhwcmVzcygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBhcHAgdy8gZXhwcmVzc1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT1TZXQgdXAgZXhwcmVzcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJy93ZWInKSk7ICAgICAgICAgICAgICAgICBcdFx0XHRcdC8vIHNldCB0aGUgc3RhdGljIGZpbGVzIGxvY2F0aW9uIC9wdWJsaWMvaW1nIHdpbGwgYmUgL2ltZyBmb3IgdXNlcnNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsnZXh0ZW5kZWQnOid0cnVlJ30pKTsgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IHR5cGU6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nIH0pKTsgLy8gcGFyc2UgYXBwbGljYXRpb24vdm5kLmFwaStqc29uIGFzIGpzb25cbmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBIYW5kbGViYXJzICh0ZW1wbGF0aW5nIHN5c3RlbSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBoYnNQYXJhbSA9IHBhcmFtZXRlci52aWV3LnZpZXdfZW5naW5lLmhhbmRsZWJhcnM7XG5cblxuLy8gQWRkIHRoZSBsYXlvdXQgc3lzdGVtIHRvIGhhbmRsZWJhcnNcbmhicy5yZWdpc3RlckhlbHBlcihsYXlvdXRzKGhhbmRsZWJhcnMpKTtcblxuXG5cbi8vVE9ETyByZWFkIGRpcmVjdG9yeSBmcm9tIHBhcmFtZXRlcnNcbi8vIHNldCBwYXJhbWV0ZXIgZnJvbSBwYXJhbWV0ZXIuanNvblxuaWYoaGJzUGFyYW0ucGFydGlhbHNfZGlyKXtcblx0aGJzLnJlZ2lzdGVyUGFydGlhbHMoX19kaXJuYW1lICtcIi9cIisgaGJzUGFyYW0ucGFydGlhbHNfZGlyKTtcblx0Z2V0TmFtZVNwYWNlKFwiYXBwLyoqL3ZpZXdzL3BhcnRpYWxzLyouaGJzXCIsXCJhcHBcXC8oLiopXFwvdmlld3NcXC9wYXJ0aWFsc1xcLyguKikuaGJzXCIsJy4nLGZ1bmN0aW9uKGZpbGUsbmFtZVNwYWNlKXtcblx0XHRoYnMucmVnaXN0ZXJQYXJ0aWFsKG5hbWVTcGFjZSxmaWxlKTtcblx0fSk7XG59XG5cbmlmKHBhcmFtZXRlci52aWV3LmJhc2VEaXIpe1xuXHRhcHAuc2V0KCd2aWV3cycsW3BhcmFtZXRlci52aWV3LmRpcmVjdG9yeSwnYXBwLyoqL3ZpZXdzLyddKTtcbn1cblxuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGJzJyk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT1FcnJvciBoYW5kbGluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5zd2l0Y2gocGFyYW1ldGVyLmVudil7XG5cdGNhc2UgJ2Rldic6XG5cdFx0Ly8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuXHRcdC8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuXHRcdGFwcC51c2UobW9yZ2FuKCdkZXYnKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRicmVhaztcdFx0XG5cdGNhc2UgJ3Byb2QnOlxuXHRcdC8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuXHRcdC8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5cdFx0YXBwLnVzZShtb3JnYW4oJ2NvbW1vbicsIHsgc2tpcDogZnVuY3Rpb24ocmVxLCByZXMpIHsgcmV0dXJuIHJlcy5zdGF0dXNDb2RlIDwgNDAwIH0sIHN0cmVhbTogX19kaXJuYW1lICsgJ3Zhci9sb2dzL3Byb2QubG9nJyB9KSk7XG5cdFx0YnJlYWs7XG59XG5cbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCl7XG5cdGNvbnNvbGUubG9nKGFwcC5nZXQoJ3ZpZXdzJykpO1xuXHRsZXQgc3RhdHVzID0gKGVyci5odHRwQ29kZSk/ZXJyLmh0dHBDb2RlOjUwMDtcblx0cmVzLnN0YXR1c3N0YXR1c1xuXHRsZXQgZXJyb3JQYWdlID0gZnMuZXhpc3RzU3luYyhhcHAuZ2V0KCd2aWV3cycpKycvZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnKT8nZXJyb3ItcGFnZXMvJytzdGF0dXMrJy5oYnMnXG5cdFx0XHQ6J2Vycm9yLXBhZ2VzL2RlZmF1bHQuaGJzJztcblx0aWYgKHJlcS5hY2NlcHRzKCdodG1sJykpIHtcblx0XHRyZXMucmVuZGVyKGVycm9yUGFnZSwge1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOiBlcnIsXG5cdFx0XHR1cmw6IHJlcS51cmwsXG5cdFx0XHRjb250YWN0OnBhcmFtZXRlci5jb250YWN0XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSBpZiAocmVxLmFjY2VwdHMoJ2pzb24nKSkge1xuXHRcdHJlcy5zZW5kKHtcblx0XHRcdHN0YXR1czpzdGF0dXMsXG5cdFx0XHRlcnJvcjplcnIsXG5cdFx0XHRjb250YWN0OnBhcmFtZXRlci5jb250YWN0XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PSBEYXRhYmFzZSBjb25uZWN0IChtb25nb29zZSkgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBkYiA9IHBhcmFtZXRlci5kYXRhYmFzZTtcbmxldCBkYkNvbm5lY3RVcmkgPSBkYi5kcml2ZXIrXCI6Ly9cIlxuICAgICsoKGRiLnVzZXJuYW1lICYmIGRiLnBhc3N3b3JkKT9cbiAgICAgICAgKGRiLnVzZXJuYW1lKyc6JytkYi5wYXNzd29yZCtcIkBcIik6JydcbiAgICApXG4gICAgK2RiLmhvc3RcbiAgICArKGRiLnBvcnQ/KCc6JytkYi5wb3J0KTonJylcbiAgICArXCIvXCIrZGIuZGJuYW1lXG47XG4vL0FkZCBwbHVnaW4gdG8gbW9uZ29vc2UgXG5tb25nb29zZS5wbHVnaW4odW5pcXVlVmFsaWRhdG9yKTtcbi8vQ29ubmVjdCB0byBNb25nbyBkYlxubW9uZ29vc2UuY29ubmVjdChkYkNvbm5lY3RVcmkpO1xuY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gXCIrZGJDb25uZWN0VXJpKTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09IFNldCB1cCB0aGUgcm91dGluZyBvZiB0aGUgYXBwID09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJlZ2lzdGVyIGNvbnRyb2xsZXJcbnVzZUV4cHJlc3NTZXJ2ZXIoYXBwLCB7XG5cdGRlZmF1bHRFcnJvckhhbmRsZXI6IGZhbHNlLCAvLyB3ZSB1c2UgY3VzdG9tIGVycm9yIGhhbmRsZXIgXG4gICAgY29udHJvbGxlcnM6W19fZGlybmFtZStcIi9hcHAvKi9jb250cm9sbGVycy8qey5qcywudHN9XCJdLFxuICAgIG1pZGRsZXdhcmVzOiBbX19kaXJuYW1lICsgXCIvbm9kZV9tb2R1bGVzLyoqL21pZGRsZXdhcmVzLyp7LmpzLC50c31cIl1cbn0pO1xuYXBwLnVzZShyb3V0ZXIpO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVN0YXJ0IHRoZSBzZXJ2ZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCBzZXJ2ID0gcGFyYW1ldGVyLnNlcnZlcjtcbmFwcC5saXN0ZW4oc2Vydi5wb3J0LHNlcnYuaG9zdCk7XG5jb25zb2xlLmxvZyhcIkFwcCBsaXN0ZW5pbmcgXCIrc2Vydi5ob3N0K1wiOlwiK3NlcnYucG9ydCk7XG5cbiJdfQ==