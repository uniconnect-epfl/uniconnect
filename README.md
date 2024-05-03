[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uniconnect-epfl_uniconnect&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=uniconnect-epfl_uniconnect)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=uniconnect-epfl_uniconnect&metric=coverage)](https://sonarcloud.io/summary/new_code?id=uniconnect-epfl_uniconnect)

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

Here is a rough overview of the architecture of the app:

<img width="1360" alt="Screenshot 2024-05-03 at 10 35 08" src="https://github.com/uniconnect-epfl/uniconnect/assets/91114548/cfa554e7-8723-4c23-a995-473414f78b65">


- The entry file is `App.tsx`. You could think of it as a main function that is launched upon execution of the app.
- There is an `assets` folder for images and other assets. Another folder `components` is for the components such as buttons, list items, bottom bars, search bars, cards etc.
- Components will be used in `screens` where a screen can be `LoginScreen`, `HomeScreen`, `OptionsScreen` or any other screen that is used in the app.
- Navigation stacks and tabs are defined in the `navigation` folder.
- Unit tests and end-to-end tests are sotred in `__tests__`.
- All firebase config files and files containing firebase API are contained in `firebase` folder. This is how we intend to keep it in the future - code logic containing calls to firebase functionalities should be contained in files stored under `firebase`. E.g. `Login.ts` which contains a function that calls the firebase API to authenticate a user.
- There are also config files and folders such as `.husky`, `app.json`, `tsconfig.json` or `node_modules` where node modules are the source files for all the libraries that are installed as listed by `package.json`.
- `.github` folder contains CI workflows that you can inspect and manage.


# Testing

SonarCloud automatically performs code analysis whenever a new PR is opened. Each member is responsible to fix or acknowledge issues raised by SonarCloud. It will not be possible to merge into `main` until SonarCloud allows to.

## Unit testing

For unit testing we are using the framework jest. For the expo configuration, you can see some documentation [here](https://docs.expo.dev/develop/unit-testing/).

In order to run all tests you can run `npm run test`.

The test will always run with coverage report on. You can see the coverage report in terminal but you can also go see them afterwards by navigating to `coverage/lcov-report` and opening the file `index.html` with a web browser.

## End-to-end testing

End-to-end testing is performed using a `maestro` framework. In order to test, you will need to build and have a working Android APK.

1. Run `npm start`.
2. Select either Android or iOS Simulator
3. In another terminal, run `maestro test flow.yaml`

More information on how to use maestro can be found [here](https://maestro.mobile.dev/platform-support/react-native).

# Build

## Building the APK

It is taken care by Expo Application Services (EAS). We will create an EAS account for the project. Install EAS locally with `npm install -g expo-cli` and then build with `eas build`. The application will be built on-cloud and an APK will be downloaded from the EAS Dashboard.

*Note: an automatic CI workflow is set up to build a new APK each time `main` branch is updated.*

# Backend

Firebase and it's functionalities are used: authentication, database and cloud functions.

# Resources

- [Figma](https://www.figma.com/files/team/1352617570760695336)
- [Rules for Commit](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
