
const vscode = require("vscode");
const cp = require('child_process')


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "expowhoami.expowhoami",
    function () {
    cp.exec('expo whoami', (err, stdout, stderr) => {
    vscode.window.showInformationMessage("Current Expo account :  " +stdout)
    if (err) {
      vscode.window.showInformationMessage("Something went wrong")
    }
});

    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
