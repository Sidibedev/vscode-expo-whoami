
const vscode = require("vscode");
const cp = require('child_process')

/**
 * @param {vscode.ExtensionContext} context
 */
let emailOption = {
  prompt: "Email/Username: ",
}
let passwordOption = {
  prompt: "Password: ",
  password: true
}
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "expowhoami.expowhoami",
    function () {
    cp.exec('expo whoami', (err, stdout, stderr) => {
    vscode.window.showInformationMessage("Current Expo account :  " +stdout, "Login").then((selection) => {
       
      if(selection == "Login"){
          handleLogin()
      }
       
    })
});

    }
  );

  context.subscriptions.push(disposable);
}
const logUser = (email,password) => {
  cp.exec(`expo logout`, () => {
    cp.exec(`expo signin -u ${email} -p ${password}`, (err, stdout, stderr) => {
      if(stdout.includes("Success")){
        vscode.window.showInformationMessage(stdout)
      }else {
        vscode.window.showInformationMessage("Email or password incorrect!", "Retry").then((selection) => {if(selection == "Retry"){
          handleLogin()
        }})
      }
    })
    
    
  })
}
const handleLogin = () => {
  // Show input to log user
  vscode.window.showInputBox(emailOption).then(email => {
    if (!email) return;
    
    // show the next dialog, etc.
    vscode.window.showInputBox(passwordOption).then(password => {
      if (!password) return;

      logUser(email,password)
    })
  });
}
// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
