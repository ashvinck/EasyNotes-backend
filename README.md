# Easy Notes Backend

This is the backend repository for the Easy Notes application. The backend is responsible for handling user authentication, and interaction with the MongoDB database. It provides the necessary APIs for the frontend to communicate with and manage the whole application.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To set up and run the Easy Notes backend, follow these steps:

1. Clone this repository:

   ```shell
   git clone https://github.com/ashvinck/EasyNotes-backend
   cd EasyNotes-backend
   ```

2. Install Dependencies

   ```shell
   npm install
   ```

3. Configure the environment variables

   - Create a .env file in the root directory and specify the following variables:
   - MONGO_URI: MongoDB connection string
   - PORT: Port for the server to listen on
   - ACCESS_TOKEN_SECRET: A secret string for issuing and verification of the access token
   - REFRESH_TOKEN_SECRET: A secret string for issuing and verification of the refresh token
   - REFRESH_TOKEN_EXPIRY: 10d
   - ACCESS_TOKEN_EXPIRY: 1d
   - NODEMAILER_ADMIN_EMAIL: Configure your username for sending emails.
   - NODEMAILER_ADMIN_PASSWORD: Configure your password for Nodemailer.
   - CORS_ORIGIN: Explicitly specify the urls which will access this site


4. Start the server

   ```shell
   npm run dev
   ```

## API Endpoints

The backend provides the following endpoints:

- `/auth/register` : for registering user.
- `/auth/login` : for user login.
- `/auth/verify-email/:verificationToken` : for verifying email after registration.
- `/auth/forgot-password` : to send email for resetting password.
- `/auth/reset-password/:resetToken` : for resetting password.
- `/auth/refresh-token` : for verification of refresh token.

- `/user/:username/view-all-notes` : for retrieving all notes.
- `/user/:username/add-new-note` : for adding new note.
- `/user/:username/get-note/:id` : for retrieving note by Id.
- `/user/:username/update-note/:id` : to update note by Id.
- `/user/:username/delete-note/:id` : for deleting note.
- `/user/:username/update-category/:id` : for updating category of particular note.

## Contributing

I welcome contributions to the EasyNotes backend! If you have ideas for improvements, bug fixes, or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Front end Repo

The link to the [frontend repo](https://github.com/ashvinck/EasyNotes-frontend) can be found here.
