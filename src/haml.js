"use strict";
exports.__esModule = true;
var vscode = require("vscode");
var completion = {
    provideCompletionItems: function (document, position, token, context) {
        console.log('provide');
        var c = new vscode.CompletionItem('Hello World!');
        return [c];
    }
};
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('haml', completion, null));
}
exports.activate = activate;
