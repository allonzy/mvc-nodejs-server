"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, required: true },
    text: { type: String }
});
exports.UserSchema.methods = {
    html: function () {
        return ("<h1>" + this.title.trim() + "</h1>" + +this.text.trim());
    }
};
exports.Todo = mongoose_1.model("Todo", exports.UserSchema);
//# sourceMappingURL=Todo.js.map