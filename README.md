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

## Known Issues
- When the user has 0 existing projects in Toggl, starting an initial timer fails.


## Release Notes

### 0.0.1

Initial Nightly Release
- Add automatic project tracking
- Add commands to enable/disable project tracking globally


-----------------------------------------------------------------------------------------------------------
