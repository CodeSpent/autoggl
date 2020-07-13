# Autoggl
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Automatically track your time on projects with Toggl. Autoggl creates Toggl projects for your code workspaces and initiates timers while you're working automatically.

## Features

- **Automatic Toggl Tracking**
    - When you open a workspace, Autoggl will get or create a Toggl project for this workspace and track your time working automatically.


## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `autoggl.enabled`: enable/disable Toggl tracking
* `autoggl.togglApiToken`: your Toggl API token
* `autoggl.workspaceId`: your preferred Toggl workspace ID
* `autoggl.activeTimeEntryId`: currently active Toggl time entry resource ID

## Installation
*Disclaimer: Autoggl is currently only available as a pre-release, but will be added to the extensions market once stable!*

### Manual Installation
- Navigate to [Releases](https://github.com/CodeSpent/autoggl/releases).
- Download the VSIX file for the release you want to install.
- Open VSCode and select the *Extensions* icon on the Workbench Sidebar.
- Select the *meatballs* (3 dots) menu in the top right of the Extensions panel.
- Select *Install from VSIX...* from the list, and select the downloaded VSIX file.

## Getting Started
### Configure Toggl
To configure the extension, open your command palette (CTRL/CMD + Shift + P) and select **Autoggl: Configure** to start the configuration wizard.

You will need a Toggl API Token located in your [Toggl Profile](https://toggl.com/app/profile) and on successful authentication you'll be asked to select from your available workspaces.

## Known Issues
Only thing worse than known issues is unknown issues. Please report all issues in the [Issue Tracker](https://github.com/autoggl/issues/).

## Contributing
**Autoggl** is fully open source and exists largely to help devs that are new to OSS acclimate to the environment. All contributions are welcome and appreciated. :)

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for steps for contributing!

## Release Notes

### 0.0.1

Initial Nightly Release
- Add automatic project tracking
- Add commands to enable/disable project tracking globally


-----------------------------------------------------------------------------------------------------------
