const vscode = require("vscode");
const toggl = require("./toggl");

function activate(context) {
  const authenticateToggl = vscode.commands.registerCommand(
    "autoggl.authenticateToggl",
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
                  if (
                    vscode.workspace
                      .getConfiguration("autoggl")
                      .get("togglApiToken") === apiToken
                  ) {
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

  const enable = vscode.commands.registerCommand("autoggl.enable", async () => {
    return vscode.workspace
      .getConfiguration()
      .update("autoggl.enabled", true, true)
      .then(() => {
        vscode.window.showInformationMessage("Autoggl: Tracking Enabled");
      });
  });

  const disable = vscode.commands.registerCommand(
    "autoggl.disable",
    async () => {
      vscode.workspace
        .getConfiguration()
        .update("autoggl.enabled", false, true)
        .then(() => {
          vscode.window.showInformationMessage("Autoggl: Tracking Disabled");
        });
    }
  );

  context.subscriptions.push(authenticateToggl);
  context.subscriptions.push(enable);
  context.subscriptions.push(disable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
