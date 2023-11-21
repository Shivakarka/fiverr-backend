# Fiverr Clone API

This project is a backend server for a Fiverr clone application. It's built with Node.js, Express JS, and MongoDB.

Deployed Link: https://fiverr-backend-alpha.vercel.app/

## Features

- User authentication and authorization
- Gig creation and management
- Conversation and messaging between users
- Order creation and management
- Review system
- Payments using Stripe

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Express.js
- MongoDB

### Installing

1. Clone the repository

   ```
   git clone https://github.com/Shivakarka/fiverr-backend.git
   ```

2. Install dependencies

   ```
    cd fiverr-backend
    npm install
   ```

3. Create .env file in root directory and add the following variables

   ```
    MONGO_URI=<YOUR_MONGO_DB_URI>
    JWT_KEY=<YOUR_SECRET_KEY>
    STRIPE=<YOUR_STRIPE_SECRET_KEY>
   ```

4. Start the server
   ```
   npm start
   ```

The server will start running at http://localhost:8800.

## API Endpoints

- `/api/users`
- `/api/gigs`
- `/api/conversations`
- `/api/messages`
- `/api/reviews`
- `/api/orders`
- `/api/auth`

## Error Handling

The server has a built-in error handling middleware for handling all errors that occur while running the server.

## License

The MIT License
