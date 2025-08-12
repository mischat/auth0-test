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

#### Create Auth0 Account and Application

1. Create an Auth0 account at [https://auth0.com](https://auth0.com)
2. Create a new Auth0 application:
   - Go to **Applications** → **Create Application**
   - Choose **"Single Page Application"**
   - Select **React** as the technology
   - Click **Create**

#### Configure Application Settings

3. In your newly created application, go to the **Settings** tab:
   - **Allowed Callback URLs**: `http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`
   - **Allowed Origins (CORS)**: `http://localhost:3000`
   - Click **Save Changes**

#### Configure Application URIs for Production (Optional)

For production deployment, also add your production URLs:
- **Allowed Callback URLs**: `http://localhost:3000,https://yourdomain.com`
- **Allowed Logout URLs**: `http://localhost:3000,https://yourdomain.com`
- **Allowed Web Origins**: `http://localhost:3000,https://yourdomain.com`
- **Allowed Origins (CORS)**: `http://localhost:3000,https://yourdomain.com`

#### Enable Required Grant Types

4. In the **Settings** tab, scroll down to **Advanced Settings**:
   - Click **Grant Types**
   - Ensure **Authorization Code**, **Refresh Token**, and **Implicit** are checked
   - Click **Save Changes**

#### Configure Token Settings

5. Still in **Advanced Settings**:
   - Click **OAuth**
   - Set **JsonWebToken Signature Algorithm** to **RS256**
   - **OIDC Conformant**: Should be enabled (this is usually the default)
   - Click **Save Changes**

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

### 3. User Metadata Configuration (Optional)

This application supports displaying custom user metadata in JWT tokens. To set this up:

#### Step 1: Add User Metadata in Auth0 Dashboard

1. Go to **User Management** → **Users** in your Auth0 Dashboard
2. Find and click on your user
3. Scroll to the **Metadata** section
4. Click **Edit** next to **user_metadata**
5. Add your custom metadata in JSON format, for example:
   ```json
   {
     "sms_id": "5",
     "preferences": {
       "theme": "dark",
       "notifications": true
     }
   }
   ```

#### Step 2: Create Auth0 Action to Include Metadata in JWT

1. In your Auth0 Dashboard, go to **Actions** → **Flows**
2. Click on **Login**
3. Click the **+** (plus) button to add a custom action
4. Choose **Build from scratch**
5. Name it "Add User Metadata to Token"
6. Use the following code:

```javascript
/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://stake.alluvial.finance/'; // Use your own namespace URL
  
  // Add user_metadata to the token
  if (event.user.user_metadata) {
    api.idToken.setCustomClaim(`${namespace}user_metadata`, event.user.user_metadata);
    api.accessToken.setCustomClaim(`${namespace}user_metadata`, event.user.user_metadata);
  }
};

/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
```

7. Click **Save** and then **Deploy**
8. Drag the action into your Login flow
9. Click **Apply**

#### Step 3: Update the Profile Component

The Profile component in this application is already configured to display custom metadata from JWT tokens. After setting up the Action:

1. Log out of the application
2. Log back in to trigger the Action
3. Your custom metadata will appear in the "Custom Metadata from JWT" section

**Note**: Replace `https://stake.alluvial.finance/` with your own namespace URL. This doesn't need to be a real URL, just a valid URI format to avoid claim name conflicts.

### 4. Additional Auth0 Configuration

#### Social Connections (Optional)

To enable social login providers:

1. Go to **Authentication** → **Social** in your Auth0 Dashboard
2. Enable desired providers (Google, Facebook, GitHub, etc.)
3. Configure each provider with their respective client IDs and secrets
4. Go to **Applications** → Your App → **Connections**
5. Enable the social connections you want to use

#### Database Connections

1. Go to **Authentication** → **Database**
2. Your default database connection should already be enabled
3. Go to **Applications** → Your App → **Connections**
4. Ensure **Username-Password-Authentication** is enabled

#### Login/Logout URLs for Different Environments

**Development:**
- Callback URL: `http://localhost:3000`
- Logout URL: `http://localhost:3000`

**Staging:**
- Callback URL: `https://your-staging-domain.com`
- Logout URL: `https://your-staging-domain.com`

**Production:**
- Callback URL: `https://your-production-domain.com`
- Logout URL: `https://your-production-domain.com`

#### API Configuration (If Using Management API)

If you plan to use Auth0's Management API for updating user metadata programmatically:

1. Go to **Applications** → **APIs**
2. Click on **Auth0 Management API**
3. Go to **Machine to Machine Applications**
4. Authorize your React application
5. Select the scopes you need (e.g., `read:users`, `update:users`, `update:users_app_metadata`)

### 5. Environment Configuration

#### Development Environment

Create a `.env` file in your project root:

```env
REACT_APP_AUTH0_DOMAIN=your-dev-domain.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-dev-client-id
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000
REACT_APP_AUTH0_AUDIENCE=https://your-dev-domain.us.auth0.com/api/v2/
```

#### Production Environment

For production, set these environment variables in your hosting platform:

```env
REACT_APP_AUTH0_DOMAIN=your-prod-domain.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-prod-client-id
REACT_APP_AUTH0_CALLBACK_URL=https://yourdomain.com
REACT_APP_AUTH0_AUDIENCE=https://your-prod-domain.us.auth0.com/api/v2/
```

### 6. Security Best Practices

1. **Never expose sensitive credentials**: Client secrets should never be used in a React app
2. **Use HTTPS in production**: Always use HTTPS for production Auth0 URLs
3. **Validate JWT tokens**: The Auth0 React SDK handles this automatically
4. **Implement proper logout**: Use Auth0's logout functionality to clear sessions
5. **Regular token refresh**: The SDK handles automatic token refresh

### 7. Troubleshooting

#### Common Issues

**"Callback URL mismatch" error:**
- Ensure your callback URLs in Auth0 match exactly what your app is using
- Check for trailing slashes and protocol (http vs https)

**"Origin not allowed" CORS error:**
- Add your domain to **Allowed Web Origins** in Auth0 application settings
- For local development, use `http://localhost:3000` (not `http://127.0.0.1:3000`)

**Custom claims not appearing in JWT:**
- Ensure your Action is deployed and active in the Login flow
- Check that your namespace URL is valid (must be a valid URI)
- Verify user metadata exists in the Auth0 user profile

**"Login required" errors:**
- Check that your Auth0 domain and client ID are correct
- Ensure your application type is set to "Single Page Application"

#### Debug Steps

1. **Check the browser console** for any Auth0 errors
2. **Verify environment variables** are loaded correctly
3. **Test authentication flow** step by step
4. **Check Auth0 logs** in the Auth0 Dashboard under **Monitoring** → **Logs**
5. **Validate JWT tokens** using [jwt.io](https://jwt.io)

#### Getting Help

- **Auth0 Community**: [https://community.auth0.com](https://community.auth0.com)
- **Auth0 Documentation**: [https://auth0.com/docs](https://auth0.com/docs)
- **Auth0 React SDK Issues**: [https://github.com/auth0/auth0-react/issues](https://github.com/auth0/auth0-react/issues)

### 8. Installation

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
