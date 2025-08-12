# Auth0 React Demo

A simple React single page application with Auth0 authentication integration.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- User login/logout with Auth0
- User profile display
- Protected routes and content
- TypeScript support
- Responsive design

## Setup Instructions

### 1. Auth0 Configuration

1. Create an Auth0 account at [https://auth0.com](https://auth0.com)
2. Create a new Auth0 application:
   - Go to Applications > Create Application
   - Choose "Single Page Application"
   - Select React as the technology
3. Configure your Auth0 application:
   - **Allowed Callback URLs**: `http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

### 2. Environment Variables

Update the `.env` file with your Auth0 configuration:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000
```

Replace:
- `your-auth0-domain` with your Auth0 domain
- `your-auth0-client-id` with your Auth0 application client ID

### 3. Installation

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Components

- **LoginButton**: Handles user authentication
- **LogoutButton**: Handles user logout
- **Profile**: Displays authenticated user information
- **Loading**: Shows loading state during authentication

## Usage

1. Click "Log In" to authenticate with Auth0
2. Complete the authentication flow
3. View your profile information
4. Click "Log Out" to end the session

## Built With

- React 18
- TypeScript
- Auth0 React SDK
- Create React App

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Additional Resources

- [Auth0 React Quickstart](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 React SDK Documentation](https://github.com/auth0/auth0-react)
