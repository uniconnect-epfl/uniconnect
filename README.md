# Project description

Uniconnect is a social app that facilitates peer-to-peer connections between students and helps to easily find people who have same
interests. This repository is a codebase for both iOS and Android versions of the Uniconnect application.

# Development

## Installation

There are no special requirements to start developing and collaborating on this project. React Native Expo toolkit is used in this project.
Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine, it will be used to install and manage packages.

Clone the repository and open the terminal. You should be able to run `npx expo --help` which will display all commands available in the Expo CLI.
Then run `npm install` in order to install all packages listed in `package.json` file. This file contains both developer and code dependencies. Code
dependencies are all libraries that are installed and used in our project's codebase and are needed to run the project. This list is appended to each time a new library is installed
via `npm install library-name`. Developer dependencies are the libraries that are needed to write and correctly format code in Typescript.

Go ahead and install Expo Go app on your mobile device. You will want to inspect the components and screens that you will be developing in your app and
this is where Expo Go comes into play. Each time you start your development session, open the terminal and type `npx expo start --go`. After it loads, you will
see a QR code that you will need to scan using either the Expo Go app or your camera and it will run your app locally on the mobile device without needing to build
the code each time. _Please make sure to be connected on the same wi-fi on both your machine and your phone, otherwise the app will not load on your phone_. When you
edit the code, all the changes are directly reflected on your app instance in your phone without needing to reload the app.

## Working and commiting

For each feature or fix that you are working on you will need to create a separate branch. Please name the branches coherently and try to keep them short, e.g. `add-google-login` or `create-offer-screen`.
ESLint code formatter is also used here. It is a strict tool that will ask you to adhere to best code writing and formatting practices (e.g. code indents and spacing, no unused variables). It will sometimes make you mad for its' scrict requirements, but please be assured that it will have a great payoff. Lint can be executed using a command `npm run lint`. You will not need to do it explicitly each time and the consensus is to run the linter before each commit. This is why we have implemented a pre-commiter(husky) that will execute lint and some other tasks automatically each time you do `git commit`. If you see your commit getting rejected because of problems related to lint, you will need to fix all of them to make the commit pass. Do `npm run lint --fix` to get some of the problems fixed automatically by Lint.

Also, please adhere to the commit message conventions presented [here](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index).

After you are done with the feature and have pushed all the changes, you should open a Pull Request on Github. You will need to write an explicit description for your changes and for the visual functionalities
attach screenshots and/or a demo of the feature. After the Pull Request is opened, you will need to get it reviewed and approved by at least one person. You will see their remarks on the code and other comments on
a Github thread. Also, the Continuous Integration(CI) will need to pass before you can merge into `main`.

## Project structure

The entry file is `App.tsx`. You could think of it as a main function that is launched upon execution of the app. There is an `assets` folder for images and other assets. Another folder `components` is for the components such as buttons, list items, bottom bars, search bars, cards etc. Components will be used in `screens` where a screen can be `LoginScreen`, `HomeScreen`, `OptionsScreen` or any other screen that is used in the app. There are also config files and folders such as `.husky`, `app.json`, `tsconfig.json` or `node_modules` where node modules are the source files for all the libraries that are installed as listed by `package.json`.

# Testing

More to come on this part. We will use local tests as well as Sonar tools.

# Build

## Building the APK

It is taken care by Expo Application Services (EAS). We will create an EAS account for the project. Install EAS locally with `npm install -g expo-cli` and then build with `eas build`. The application will be built on-cloud and an APK will be downloaded from the EAS Dashboard.

# Backend

More to come on this part.

# Resources

- [Figma](https://www.figma.com/files/team/1352617570760695336)
- [Rules for Commit](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
