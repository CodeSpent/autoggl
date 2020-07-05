const vscode = require("vscode");
const toggl = require("./toggl");

async function activate(context) {
  const configureToggl = vscode.commands.registerCommand(
    "autoggl.configureToggl",
    async () => {
      let apiToken = await vscode.window.showInputBox({
        password: true,
        ignoreFocusOut: true,
        placeHolder: "API Token",
        prompt: "Get your API Token at https://toggl.com/app/profile",
      });

      if (!apiToken || apiToken === "" || apiToken === undefined) {
        vscode.window.showErrorMessage(
          "No token provided. If a token is configured already, it will not be replaced."
        );
        return;
      }

      let tokenValidation = await toggl.validateApiToken(apiToken);

      if (tokenValidation.success) {
        // To prevent potential permissions issues when modifying configuration
        // and for sake of supporting alternative .vscode/ locations, we must
        // update the global configuration rather than the autoggl configuration
        // alone. Third argument in update() method should be `true` to setGlobal
        // and getConfiguration() should be called without a section.

        await vscode.workspace
          .getConfiguration()
          .update("autoggl.togglApiToken", apiToken, true);

        // Verify successful update of configuration value
        if (
          vscode.workspace.getConfiguration("autoggl").get("togglApiToken") ===
          apiToken
        ) {
          vscode.window.showInformationMessage(
            "Toggl API token updated successfully!"
          );
        } else {
          vscode.window.showErrorMessage(
            "Unable to update Toggl API token. Please try updating in settings manually."
          );
        }
      } else {
        vscode.window.showErrorMessage(
          `Toggl Token Error: ${tokenValidation.error}`
        );
      }

      let workspaces = await toggl.getUserWorkspaces(apiToken);

      // Vscode QuickPick takes in an array of strings for selection
      // so we'll map over the workspaces to get the names array
      // then get the matching object to configure id.
      let workspaceNames = workspaces.map((workspace) => {
        return workspace.name;
      });

      let selectedWorkspaceName = await vscode.window.showQuickPick(
        workspaceNames,
        {
          canPickMany: false,
          ignoreFocusOut: true,
          placeHolder: "Select a workspace..",
        }
      );

      let selectedWorkspaces = await workspaces.filter(
        (workspace) => workspace.name === selectedWorkspaceName
      );

      await vscode.workspace
        .getConfiguration()
        .update("autoggl.workspaceId", selectedWorkspaces[0].id, true);

      vscode.window.showInformationMessage(
        `Autoggl: Set ${selectedWorkspaceName} as active Workspace.`
      );
    }
  );

  const enable = vscode.commands.registerCommand("autoggl.enable", async () => {
    await vscode.workspace
      .getConfiguration()
      .update("autoggl.enabled", true, true);
    if (vscode.workspace.getConfiguration().get("autoggl.enabled") === true) {
      vscode.window.showInformationMessage("Autoggl: Tracking Enabled");
    } else {
      vscode.window.showErrorMessage(
        "Autoggl: Unable to enable Autoggl. Try enabling manually in settings."
      );
    }
  });

  const disable = vscode.commands.registerCommand(
    "autoggl.disable",
    async () => {
      await vscode.workspace
        .getConfiguration()
        .update("autoggl.enabled", false, true);
      if (
        vscode.workspace.getConfiguration().get("autoggl.enabled") === false
      ) {
        vscode.window.showInformationMessage("Autoggl: Tracking Disabled");
      } else {
        vscode.window.showErrorMessage(
          "Autoggl: Unable to disable Autoggl. Try disabling manually in settings."
        );
      }
    }
  );

  // Register our commands to context
  context.subscriptions.push(configureToggl);
  context.subscriptions.push(enable);
  context.subscriptions.push(disable);

  // Start project tracking if currently enabled
  if (vscode.workspace.getConfiguration("autoggl").get("enabled")) {
    let apiToken = vscode.workspace
      .getConfiguration("autoggl")
      .get("togglApiToken");
    let workspaceId = vscode.workspace
      .getConfiguration("autoggl")
      .get("workspaceId");

    let openedProjectName = vscode.workspace.workspaceFolders[0].name;
    let togglProjects = await toggl.getWorkspaceProjects(apiToken, workspaceId);

    let togglProjectNames = togglProjects.map((project) => {
      return project.name;
    });

    let currentProjectId;

    if (togglProjectNames.includes(openedProjectName)) {
      currentProjectId = togglProjects.filter(
        (project) => project.name === openedProjectName
      )[0].id;
    } else {
      let createdProject = await toggl.createProject(
        apiToken,
        openedProjectName,
        workspaceId
      );
      currentProjectId = createdProject.id;
    }
  }
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
