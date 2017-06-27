"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("file-system");
exports.recursiveIncludeJson = function (rootDir, fileName, object) {
    let includedObject = JSON.parse(fs.readFileSync(rootDir + '/' + fileName));
    if (includedObject.includes) {
        let includes = includedObject.includes;
        delete (includedObject.includes);
        console.log(includes);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvcmVhZENvbmZpZy50cyIsInNvdXJjZXMiOlsiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvcmVhZENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUV2QixRQUFBLG9CQUFvQixHQUFHLFVBQVUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNO0lBQ2xFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkUsRUFBRSxDQUFBLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQTtRQUN0QyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFLdkIsQ0FBQztBQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcblxuZXhwb3J0IGxldCByZWN1cnNpdmVJbmNsdWRlSnNvbiA9IGZ1bmN0aW9uIChyb290RGlyLGZpbGVOYW1lLG9iamVjdCl7XG5cdGxldCBpbmNsdWRlZE9iamVjdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHJvb3REaXIrJy8nK2ZpbGVOYW1lKSk7XG5cdGlmKGluY2x1ZGVkT2JqZWN0LmluY2x1ZGVzKXtcblx0XHRsZXQgaW5jbHVkZXMgPSBpbmNsdWRlZE9iamVjdC5pbmNsdWRlc1xuXHRcdGRlbGV0ZSAoaW5jbHVkZWRPYmplY3QuaW5jbHVkZXMpO1xuXHRcdGNvbnNvbGUubG9nKGluY2x1ZGVzKTsvKlxuXHRcdGluY2x1ZGVzLmZvcmVhY2goZnVuY3Rpb24oaW5jbHVkZWRGaWxlKXtcblx0XHRcdHJlY3Vyc2l2ZUluY2x1ZGVKc29uKHJvb3REaXIsaW5jbHVkZWRGaWxlLGluY2x1ZGVkT2JqZWN0KTtcblx0XHRcdE9iamVjdC5hc3NpZ24ob2JqZWN0LGluY2x1ZGVkT2JqZWN0KTtcblx0XHR9KSovXG5cdH1cbn07Il19