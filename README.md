# URL Shortner

- This repository contains the backend code for a full-stack URL Shortener Application that focuses on URL shortening, click statistics, user management, and robust authentication and authorization features. 

- The backend is built using Node.js and Express, and it integrates with MongoDB for data storage.

**NOTE :** The frontend is handled separately.

## Features
- User Registration: Create a new user account.
- Account Activation: Activate the created account using the link sent to your email.
- Login: Secure login with JWT-based session management.
- Forgot Password: Reset passwords via an email-based reset.
- URL Shortening: Convert long URLs into shorter, manageable links.
- Redirection: Automatically redirect users from short URLs to their original destinations.
- Click Tracking: Monitor and record clicks on shortened URLs.
- Dashboard: View URL statistics, including total URLs shortened, monthly summaries, and click counts for each URL.

## Endpoints

### User Management

- **POST**  /api/auth/register - Register a new user
- **GET**   /api/auth/activate/:token - Activate our account
- **POST**  /api/auth/login - Log in a user
- **POST**  /api/auth/forgot-password - Initiate password reset process
- **POST**  /api/auth/reset-password/:id/:token - Complete password reset process

### URL Shortening 
- **POST**  /api/url/shorten - Shorten a new URL
- **GET**   /api/url/shortUrl/:shortUrl - Redirect to the original URL
- **GET**   /api/url/stats - Get click statistics for a shortened URL
- **GET**   /api/url/all - Getting all urls

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB Atlas**: Cloud-based MongoDB service for database storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Nodemailer**: For sending reset links via email.
- **bcryptjs**: For hashing passwords.
- **dotenv**: For managing environment variables.
- **cors**: For handling Cross-Origin Resource Sharing.
- **nodemon**: For automatically restarting the server during development.
