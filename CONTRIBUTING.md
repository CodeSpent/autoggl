# Contributing

**Autoggl** uses [Commitizen](https://github.com/commitizen/cz-cli) for commit message consistency, [Husky](https://github.com/typicode/husky) for pre-commit hooks, [Eslint](https://github.com/eslint/eslint) for linting, and [Prettier](https://github.com/prettier/prettier) for formatting.

**Please only use VSCode as your editor when working on Autoggl. This will allow the extension configuration to help you identify common issues.**

## Choosing an issue
- Navigate to the [Issues Tracker](https://github.com/codespent/autoggl/issues/).
- Select the issue you want to work on (or create the issue/feature request if it doesn't exist).
- Comment on the selected issue with a clear message that you'd like to work on it (please don't leave it to guessing to avoid doubled effort, make it clear that you intend to work on it).
- You'll be assigned the issue to let other contributors know that you're on it!

## Steps to contribute
- Fork repository
- Create your branch from `base` with `git checkout -b feature/myFeature`
- When staging your changes, use `git commit` **without** `-m` flag to use the Commitizen wizard.
- Push your changes to your fork then open a pull request from your fork to the Autoggl repo.

*Note: Any pull requests opened that do not follow the Commitizen pattern will be rejected. Please open an issue if Commitizen isn't working for you and we can work through it together.*

## Debugging
VSCode provides a *Visual Studio Code extension preview* debugger that will launch an isolated VSCode instance for you to debug with. To launch this:

- Navigate to `extension.js` and press `F5` or from the *Command Palette* run `Debug: Select and Start Debugging`,
- From the *QuickPick* select `VSCode Extension Development (preview)`.
- Debugger should start automatically, otherwise press the green *play* button in the debugger toolbar to start debugging.
