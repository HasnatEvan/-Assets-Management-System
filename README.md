# Assets Management System

## Overview

The **Assets Management System** is a platform designed to help organizations manage employee asset requests, asset management, and other related operations. It provides separate features for employees and HR managers.

### Features

- **User Authentication**: Login, Sign-up, and Social Login (Google, Facebook, etc.).
- **HR Manager**: Asset management, employee management, request approval, package selection, and payment integration.
- **Employee**: Asset request, request status tracking, and company-related information.
- **Payment Integration**: HR managers can select packages and make payments to increase team size.
- **Reports and Analytics**: Pie charts for asset returnability statistics and other useful analytics.

## Tech Stack

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Integration for package payment
- **PDF Generation**: React-PDF (for asset request print functionality)

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed on your local machine.
- **MongoDB** server running or a cloud MongoDB instance.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/assets-management-system.git
    ```

2. **Navigate to the project folder**:
    ```bash
    cd assets-management-system
    ```

3. **Install dependencies for both frontend and backend**:

   - Frontend (React):
     ```bash
     cd client
     npm install
     ```

   - Backend (Node.js):
     ```bash
     cd server
     npm install
     ```

4. **Environment Configuration**:  
   Create a `.env` file in the `server/` directory with the following variables:

    ```bash
    MONGO_URI=your_mongo_connection_url
    JWT_SECRET=your_jwt_secret_key
    PAYMENT_API_KEY=your_payment_api_key
    ```

5. **Start the development servers**:

   - Frontend (React):
     ```bash
     cd client
     npm start
     ```

   - Backend (Node.js):
     ```bash
     cd server
     npm run dev
     ```

---

### Running the Application

Once both the frontend and backend are running, you can access the **Assets Management System** in your browser at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

### Live Demo

You can check out the live version of the application here:  
[Live Demo](https://mange-95052.web.app)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
