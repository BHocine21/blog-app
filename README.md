
# Blog App

An interface where users can view articles, log in to their account and add/delete articles.


## Installation

Install the project with npm :

```bash
  // Install all dependencies.
  npm install

  // Run the project.
  npm start
```

## Libraries used
| Library      | Version | Description                           |
|:-------------|:--------|:--------------------------------------|
| `react`      | ^18.2.0 | React core code                       |
| `react-dom`  | ^18.2.0 | Package provides DOM-specific methods |
| `react-router-dom`  | ^6.4.5 | React route manager |
| `typescript`  | ^4.9.4 | Microsoft solution that aims to improve and secure the production of JavaScript code |
| `rxjs`| ^7.6.0 | Reactive programming library using Observables to facilitate asynchronous code composition |
| `vite`  | ^4.0.0 | Build tool that aims to provide a faster and leaner development experience |
| `eslint`  | ^8.29.0 | Static code analysis tool for identifying problematic patterns found in JavaScript code |



## Features

Through this app, here are some functionalities :
- View articles : On the home, all articles are displayed and the user can click on it to get more details of an article.

- Login : If the user is not authenticated yet. On the navigation bar, the button 'Log in' is displayed and allow user to login. There are some validation rules that are implemented :
  - If email or password isn't filled, an error message is displayed to inform user that fields are required.
  - If email value has no valid format, an error is displayed to inform user about it.
  - If password length is less than 6 characters, an error is displayed to inform user that password is too short.
  - If filled credentials don't match with any registered account, an error is displayed to inform user about it.

- Logout : Only if the user is authenticated. The button is present in nav bar, when clicking on it, user local storage is cleared and login button reappear.

- Create article : Only if the user is authenticated. A button is displayed on top of the home page and will redirect the user when clicking on it to the article creation page. The page contains a form which allows user to create a new article. All fields are required, if the user submits the form without filling all the fields, an error message is displayed.

- Delete article: Only if user the is authenticated and it's an article which he created. A delete button appear in the bottom of the page which allow him to delete the current article. Admin user can delete any article of his choice.

## Test Accounts

|Email|Password| Role|
|--|--|--|
|gary.lewis@gmail.com|gary.lewis@gmail.com  |Admin|
|angela.armstrong@gmail.com|angela.armstrong@gmail.com |Customer|
|thomas.pettis@gmail.com|thomas.pettis@gmail.com  |Customer|

## Bugs/Next steps
Functionnal side :
- Fix image size in the home page (sizes should be identical).
- Add loader on the login button and other buttons which trigger some process.
- Add restriction on file format when uploading images to create a new article.
- Display file name when importing an article image.
- Fix issue when clicking on a created article (caused by the image).
- Fix article block size on the home page when adding or deleting articles

Code side :
- Encrypt local storage data (user information) and decrypt on consumption case.
- Manage session expiration.
- Use more rxjs features.
- Use fake back-end for getting articles, adding and deleting article.
- Add 'Not found' page when redirecting to innexisting route.
- Make fields validation on change event instead of submit event.

## Authors

[@BHocine21](https://github.com/BHocine21)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hocine-bouhlala-407025132/)

