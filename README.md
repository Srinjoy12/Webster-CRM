# Mini CRM Xeno

Mini CRM Xeno is a modern, AI-powered Customer Relationship Management (CRM) application designed to streamline campaign management and audience segmentation. It features a Next.js frontend and a Node.js/Express.js backend.

## 🚀 Local Setup Instructions

### Prerequisites

*   Node.js (v16.x or later recommended)
*   npm or yarn
*   MySQL Server
*   RabbitMQ (Optional, if message queuing features are actively used)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-url> # Navigate to the project root
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd mini-crm-backend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `mini-crm-backend` directory. Add the following variables:
    ```env
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_mysql_database_name
    PORT=3001 # Or any port you prefer for the backend

    GROQ_API_KEY=your_groq_api_key

    # For Google OAuth (Passport.js)
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    SESSION_SECRET=your_session_secret

    # For RabbitMQ (if used)
    RABBITMQ_URL=amqp://guest:guest@localhost:5672 # Example URL

    # Add any other necessary backend environment variables
    ```
    *Ensure your MySQL server is running and the database is created.*

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The backend server should now be running (typically on `http://localhost:3001` or the `PORT` you specified).

### Frontend Setup

1.  **Navigate to the frontend directory (from project root):**
    ```bash
    cd ../mini-crm-frontend
    # or from project root:
    # cd mini-crm-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the `mini-crm-frontend` directory. Add the following variables:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-super-secret-nextauth-key # Generate a strong secret

    # URL of your backend API
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api # Adjust if your backend runs on a different port or path
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application should now be running on `http://localhost:3000`.

## ✨ Features

*   **Integrated Landing Page:** Professionally designed landing page to showcase the CRM's capabilities.
*   **User Authentication:** Secure sign-up and login functionality (supports Google OAuth).
*   **Dashboard:** At-a-glance view of key CRM metrics.
*   **Campaign Management:**
    *   Create and manage marketing campaigns.
    *   View campaign history and status.
*   **Audience Segmentation:**
    *   Define audience segments using a rule builder based on customer attributes.
    *   Visually construct audience segments (conceptual/in-progress).
    *   Preview audience size based on defined rules.
*   **AI-Powered Capabilities:**
    *   **AI Message Assistant:** Generate marketing message suggestions based on campaign objectives.
    *   **AI Segment Rule Generation:** Convert natural language descriptions of target audiences into structured segment rules.
*   **Modern UI/UX:** Clean, responsive design built with Tailwind CSS, Material UI, and Radix UI.

## 🏗️ Architecture Diagram (Textual Description)

The Mini CRM Xeno application follows a client-server architecture:

*   **Frontend (Client-Side):**
    *   Built with **Next.js** (React framework) for UI, routing (utilizing both Pages Router and App Router), and server-side rendering capabilities.
    *   Styling is handled by **Tailwind CSS**, with additional UI components from **Material UI** and **Radix UI**.
    *   Client-side state management and data fetching are managed using **TanStack React Query**.
    *   Authentication is handled by **NextAuth.js**.
    *   Interactive diagrams and flows (e.g., segment builder) use **React Flow**.
    *   Communicates with the backend via RESTful APIs using **Axios**.
    *   **Key Directories:**
        *   `app/`: Contains newer Next.js App Router routes (e.g., for the landing page).
        *   `pages/`: Contains Next.js Pages Router routes for core CRM functionalities.
        *   `components/`: Houses reusable React components, including UI elements for dashboard, campaigns, segments, and the landing page.
        *   `styles/` (or `app/globals.css`): Contains global styles and Tailwind CSS configuration.
        *   `public/`: Stores static assets like images and fonts.
        *   `utils/`: Includes utility functions, such as API communication helpers.

*   **Backend (Server-Side):**
    *   Built with **Node.js** and the **Express.js** framework.
    *   Handles business logic, API endpoints, and data persistence.
    *   User authentication is implemented using **Passport.js** with the `passport-google-oauth20` strategy for Google Sign-In.
    *   Interacts with a **MySQL** database (using the `mysql2` driver) for storing CRM data.
    *   Integrates with the **Groq AI API** for AI-powered features like message generation and audience rule creation.
    *   Uses `amqplib` for potential integration with **RabbitMQ** for message queuing and asynchronous tasks.
    *   API documentation can be served using `swagger-jsdoc` and `swagger-ui-express`.

*   **Database:**
    *   **MySQL** is used as the primary relational database.

*   **AI Integration:**
    *   Leverages the **Groq AI API** to provide intelligent assistance within the CRM workflow, such as generating marketing copy and suggesting audience segmentation rules.

*   **Message Queuing (Optional):**
    *   **RabbitMQ** can be used for handling background tasks or ensuring reliable message delivery between services if certain features are scaled or require it.

## 🤖 Summary of AI Tools and Other Tech Used

### Core Technologies:

*   **Frontend:**
    *   Framework: Next.js (v15+)
    *   Language: JavaScript/TypeScript
    *   UI: React (v19+), Tailwind CSS, Material UI, Radix UI
    *   State Management: TanStack React Query
    *   Charting: Recharts
    *   Diagramming: React Flow
    *   Authentication: NextAuth.js
    *   HTTP Client: Axios
    *   Icons: Lucide React
*   **Backend:**
    *   Runtime: Node.js
    *   Framework: Express.js
    *   Language: JavaScript
    *   Database ORM/Driver: `mysql2` (for MySQL)
    *   Authentication: Passport.js (`passport-google-oauth20`)
    *   API Documentation: Swagger (`swagger-jsdoc`, `swagger-ui-express`)
    *   Message Queuing: `amqplib` (for RabbitMQ)
    *   Environment Management: `dotenv`
    *   CORS: `cors`
*   **Database:** MySQL

### AI Tools:

*   **Groq AI API:** Used for:
    *   Generating marketing message suggestions.
    *   Converting natural language queries into audience segmentation rules.

### Development & Tooling:

*   Package Managers: npm
*   Version Control: Git
*   Backend Dev Server: `nodemon`
*   Frontend Dev Server: Next.js CLI (`next dev --turbopack`)
*   Linting: ESLint
*   CSS Processing: PostCSS, Autoprefixer (primarily for frontend)

## ⚠️ Known Limitations or Assumptions

*   **Full Functionality Dependency:** The application's complete functionality relies on correctly configured external services:
    *   A running and accessible MySQL database instance.
    *   Valid Groq API key.
    *   Correctly configured Google Cloud Project for Google OAuth 2.0.
    *   A running RabbitMQ instance (if features dependent on it are critical).
*   **Backend Data Seeding:** Initial data (e.g., for dropdowns, initial user roles if any) might need to be seeded manually or via scripts.
*   **Frontend Placeholder Data:** Some UI sections in the frontend might still use placeholder data until fully integrated with backend APIs (adapted from frontend README).
*   **Error Handling:** Comprehensive error handling across all API interactions, user flows, and backend services should be continuously improved.
*   **Testing:** The project requires a robust testing strategy (unit, integration, end-to-end tests) for both frontend and backend to ensure reliability.
*   **Scalability:** While core technologies are scalable, specific configurations and optimizations might be needed for very large user loads or data volumes (e.g., database indexing, query optimization, load balancing for backend, frontend performance for large lists).
*   **Security:** Security best practices (input validation, XSS prevention, CSRF protection, secure session management, API rate limiting, etc.) should be diligently applied and regularly reviewed.
*   **Environment Parity:** Ensure development, staging (if any), and production environments are as similar as possible to avoid environment-specific issues.
*   **Detailed AI Model Configuration:** Specific Groq model versions or fine-tuning details are not specified and might need adjustment based on performance and cost.
*   **RabbitMQ Usage:** The extent and necessity of RabbitMQ integration depend on specific features; if not heavily used, it might be an optional dependency.

## ☁️ Deployment

The Next.js frontend can be deployed to various platforms that support Node.js applications. The backend is a standard Node.js application and can be deployed similarly.

### Frontend (Next.js):

*   **Vercel** (Recommended for Next.js projects, offers seamless deployment from a Git repository)
*   **Netlify**
*   **Render**
*   **AWS Amplify**
*   **Google Cloud Run**
*   **Azure App Service**

To deploy the frontend, connect your public GitHub repository to one of these services and follow their specific instructions for Next.js applications. Ensure your build command is `npm run build` (or `yarn build` for `mini-crm-frontend`) and your environment variables (like `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_API_BASE_URL`) are configured in the deployment platform's settings.

### Backend (Node.js/Express.js):

The backend can be deployed to platforms like:

*   **Heroku**
*   **Render**
*   **AWS Elastic Beanstalk**
*   **Google Cloud Run / App Engine**
*   **Azure App Service**
*   A traditional Virtual Private Server (VPS) with Node.js and a process manager like PM2.

Ensure all necessary environment variables (database credentials, API keys, etc.) are set up in the chosen deployment environment.

## 📹 Project Showcase

To effectively demonstrate the capabilities of Mini CRM Xeno, consider creating a demo video (e.g., max 7 minutes). This video could cover:

*   Key features implemented across the frontend and backend.
*   How the application addresses CRM and campaign management challenges.
*   Significant architectural choices or trade-offs made during development.
*   A clear explanation of the AI features and their integration into the user workflow. 