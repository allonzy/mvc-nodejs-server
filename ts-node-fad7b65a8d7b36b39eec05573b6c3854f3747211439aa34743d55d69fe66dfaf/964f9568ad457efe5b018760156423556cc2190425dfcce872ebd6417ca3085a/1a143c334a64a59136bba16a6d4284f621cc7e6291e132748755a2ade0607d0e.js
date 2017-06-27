"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("file-system");
exports.recursiveIncludeJson = function (rootDir, fileName, object) {
    let includedObject = JSON.parse(fs.readFileSync(rootDir + '/' + fileName));
    if (includedObject.includes) {
        let includes = includedObject.includes;
        delete (includedObject.includes);
        includes.foreach(function (includedFile) {
            exports.recursiveIncludeJson(rootDir, includedFile, includedObject);
            Object.assign(object, includedObject);
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvcmVhZENvbmZpZy50cyIsInNvdXJjZXMiOlsiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvcmVhZENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUV2QixRQUFBLG9CQUFvQixHQUFHLFVBQVUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNO0lBQ2xFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkUsRUFBRSxDQUFBLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQTtRQUN0QyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBUyxZQUFZO1lBQ3JDLDRCQUFvQixDQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsY0FBYyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0FBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuXG5leHBvcnQgbGV0IHJlY3Vyc2l2ZUluY2x1ZGVKc29uID0gZnVuY3Rpb24gKHJvb3REaXIsZmlsZU5hbWUsb2JqZWN0KXtcblx0bGV0IGluY2x1ZGVkT2JqZWN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocm9vdERpcisnLycrZmlsZU5hbWUpKTtcblx0aWYoaW5jbHVkZWRPYmplY3QuaW5jbHVkZXMpe1xuXHRcdGxldCBpbmNsdWRlcyA9IGluY2x1ZGVkT2JqZWN0LmluY2x1ZGVzXG5cdFx0ZGVsZXRlIChpbmNsdWRlZE9iamVjdC5pbmNsdWRlcyk7XG5cdFx0aW5jbHVkZXMuZm9yZWFjaChmdW5jdGlvbihpbmNsdWRlZEZpbGUpe1xuXHRcdFx0cmVjdXJzaXZlSW5jbHVkZUpzb24ocm9vdERpcixpbmNsdWRlZEZpbGUsaW5jbHVkZWRPYmplY3QpO1xuXHRcdFx0T2JqZWN0LmFzc2lnbihvYmplY3QsaW5jbHVkZWRPYmplY3QpO1xuXHRcdH0pXG5cdH1cbn07Il19