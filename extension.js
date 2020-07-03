// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const toggl = require("./toggl");

/**
 * @param {vscode.ExtensionContext} context
 */

// Autoggl configuration section. Dotted names not needed
// when referencing autoggl configuration directly.
const config = vscode.workspace.getConfiguration("autoggl");

function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "autoggl-auto.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from autoggl-auto!");
    }
  );

  // Configure Toggl integration for user
  const configure = vscode.commands.registerCommand(
    "autoggl.configure",
    async () => {
      vscode.window
        .showInputBox({
          password: true,
          ignoreFocusOut: true,
          placeHolder: "API Token",
          prompt: "Get your API Token at https://toggl.com/app/profile",
        })
        .then((apiToken) => {
          // Ensure a token is provided before continuing.
          if (!apiToken || apiToken === "" || apiToken === undefined) {
            vscode.window.showErrorMessage(
              "Toggl Token Error: No token provided."
            );

            return;
          }
          toggl.validateApiToken(apiToken).then((tokenValidation) => {
            if (tokenValidation.success) {
              // To prevent potential permissions issues when modifying configuration
              // and for sake of supporting alternative .vscode/ locations, we must
              // update the global configuration rather than the autoggl configuration
              // alone. Third argument in update() method should be `true` to setGlobal
              // and getConfiguration() should be called without a section.
              vscode.workspace
                .getConfiguration()
                .update("autoggl.togglApiToken", apiToken, true)
                .then(() => {
                  // Verify successful update of configuration value
                  if (config.get("togglApiToken") === apiToken) {
                    vscode.window.showInformationMessage(
                      "Toggl API token updated successfully!"
                    );
                  } else {
                    vscode.window.showErrorMessage(
                      "Unable to update Toggl API token. Please try updating in settings manually."
                    );
                  }
                });
            } else {
              vscode.window.showErrorMessage(
                `Toggl Token Error: ${tokenValidation.error}`
              );
            }
          });
        });
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(configure);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
