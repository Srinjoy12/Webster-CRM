# Mini CRM Xeno - Frontend

## 🚀 Overview

Mini CRM Xeno is a modern, AI-powered Customer Relationship Management (CRM) application designed to streamline campaign management and audience segmentation. This frontend project, built with Next.js and Tailwind CSS, provides an intuitive user interface for managing marketing campaigns, leveraging AI for content generation, and analyzing campaign performance. It features a responsive design, a user-friendly dashboard, and seamless integration of various CRM functionalities.

The project also includes an integrated landing page, adapted from the 'roy-web-genesis' repository, to showcase the CRM's capabilities and provide a professional entry point for users.

## ✨ Features

*   **Integrated Landing Page:** Professionally designed landing page to attract and inform potential users.
*   **User Authentication:** Secure sign-up and login functionality.
*   **Dashboard:** At-a-glance view of key metrics like Total Contacts, Active Campaigns, New Leads, and Conversion Rate.
*   **Campaign Management:**
    *   **Campaign Creation:** Form to define campaign details, target audience, and message content.
    *   **Campaign History:** Table view of all past and current campaigns with status, audience size, and date.
*   **Audience Segmentation:**
    *   **Classic Rule Builder:** Define audience segments using logical rules (AND/OR) based on customer attributes (e.g., spend, visits, inactivity).
    *   **Visual Block Segment Builder (Conceptual):** Interface for visually constructing audience segments (implementation in progress).
    *   **Audience Preview:** Estimate the size of the target audience based on defined rules.
*   **AI-Powered Features:**
    *   **AI Message Assistant:** Generate compelling marketing message suggestions based on campaign objectives.
    *   **AI Segment Rule Generation:** Convert natural language descriptions of target audiences into structured segment rules.
*   **Modern UI/UX:**
    *   Clean, responsive design built with Tailwind CSS.
    *   Consistent styling across landing page, authentication pages, and CRM dashboard.
    *   Themed sections for AI interactions to provide a futuristic feel.

## 💻 Tech Stack

*   **Frontend:**
    *   Next.js (React Framework)
    *   React
    *   Tailwind CSS (Utility-first CSS framework)
    *   `@hello-pangea/dnd` (Drag and drop for segment builder)
    *   `next-auth` (Authentication)
    *   Potentially other UI libraries/icons as needed (e.g., Lucide React, Recharts - though some were for the original landing page)
*   **Styling:** PostCSS, Autoprefixer
*   **API Communication:** Axios (via `utils/api.js`)
*   **Linting/Formatting:** (Assumed: ESLint, Prettier - standard for Next.js)

*(Backend technology is assumed to be separate and interacted with via API calls.)*

## ⚙️ Local Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd mini-crm-frontend
    ```

2.  **Install dependencies:**
    Make sure you have Node.js (v16.x or later recommended) and npm/yarn installed.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the `mini-crm-frontend` directory. Add any necessary environment variables (e.g., for NextAuth, API base URL).
    Example:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-super-secret-key

    # Example API URL (if your backend runs elsewhere)
    # NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running on [http://localhost:3000](http://localhost:3000).

5.  **(If applicable) Ensure the backend server is running:**
    This frontend interacts with a backend API. Make sure your backend server is running and accessible.

## 🏗️ Architecture

### Frontend Architecture

The frontend is built using Next.js, leveraging its features for routing (App Router for `/landing`, Pages Router for other CRM functionalities like `/signup`, `/login`, `/campaigns`), server-side rendering, and static site generation where applicable.

*   **`pages/` directory:** Contains most of the application routes (e.g., `campaigns.js`, `login.js`, `signup.js`, `_app.js`).
*   **`app/` directory:** Contains the new App Router based routes (e.g., `landing/page.tsx`).
*   **`components/` directory:** Houses reusable React components that make up the UI. This includes:
    *   Core UI elements (e.g., `CampaignForm.js`, `SegmentBuilder.js`, `CampaignHistory.js`, `Dashboard.js`).
    *   Landing page specific components (under `components/landing/`).
    *   Shared UI elements (e.g., form inputs, buttons - though many are styled directly with Tailwind).
*   **`styles/` (or `app/globals.css`):** Contains global styles and Tailwind CSS configuration.
*   **`public/` directory:** Stores static assets like images and fonts. Landing page assets are under `public/landing-assets/`.
*   **`utils/` directory:** Includes utility functions, such as `api.js` for making API calls to the backend.

### Backend Interaction

The frontend communicates with a separate backend service via RESTful APIs for:
*   User authentication.
*   Fetching and saving campaign data.
*   Generating AI message suggestions.
*   Generating AI segment rules.
*   Previewing audience sizes.

*(A visual architecture diagram should be created by the developer to further illustrate component interactions and data flow, including the backend.)*

## 🤖 AI Tools and Integration

AI is integrated to enhance user productivity and campaign effectiveness:

1.  **AI Message Assistant (`CampaignForm.js`):**
    *   Users input a campaign objective (e.g., "Re-engage inactive customers").
    *   An API call is made to `generateMessageSuggestionsFromObjective` (assumed backend endpoint).
    *   The backend (presumably using an LLM) generates multiple message suggestions tailored to the objective.
    *   Suggestions are displayed to the user, who can then choose one to populate the campaign message field.

2.  **AI Segment Rule Generation (`SegmentBuilder.js`):**
    *   Users describe their target audience in natural language (e.g., "Customers who spent more than 5000 and visited more than 10 times").
    *   An API call is made to `generateRulesFromNaturalQuery` (assumed backend endpoint).
    *   The backend (presumably using an LLM) parses the query and translates it into structured segment rules (field, operator, value).
    *   These rules automatically populate the segment builder.

These AI features aim to simplify complex tasks and provide creative assistance, directly embedding intelligent capabilities within the CRM workflow.

## ⚠️ Known Limitations or Assumptions

*   **Placeholder Data:** Some sections like "Total Contacts," "New Leads," and "Conversion Rate" on the Dashboard currently display "N/A" and would require backend integration for real data. Recent Activity and Upcoming Tasks also use placeholder content alongside some dynamic data.
*   **Backend Dependency:** The application heavily relies on a functional backend API for data persistence, AI features, and authentication. This README assumes such a backend exists.
*   **Visual Block Segment Builder:** This feature is more conceptual at this stage and its full implementation is pending.
*   **Error Handling:** While basic error handling is present (e.g., for AI generation), comprehensive error handling across all API interactions and user flows could be further enhanced.
*   **Testing:** No specific testing setup (Jest, React Testing Library) is detailed, which would be crucial for a production application.
*   **Scalability (Frontend):** While Next.js and Tailwind are scalable, frontend performance for very large datasets (e.g., in Campaign History) might need further optimization (pagination, virtualization).
*   **Full Feature Parity with "ClientEase":** The UI overhaul aimed to match the "ClientEase" reference, but some minor stylistic differences or functionalities might exist.

## 🤔 Approach and Trade-offs

*   **UI Overhaul (MUI to Tailwind CSS):** The campaign management sections were initially built or conceptualized with Material-UI components. A significant trade-off was made to refactor these components to use Tailwind CSS for a more custom, modern, and consistent look and feel, aligning with the "ClientEase" reference image and the new landing page aesthetics. This involved more manual styling but offered greater design flexibility.
*   **Landing Page Integration:** The landing page was integrated by directly copying and adapting its React components into the Next.js project rather than using an iframe. This allows for tighter integration and potentially better performance but required resolving pathing issues, removing `react-router-dom`, and adapting styles.
*   **Iterative Development:** The project has been built iteratively, addressing UI bugs, module not found errors, and styling conflicts as they arose. This involved frequent installations of npm packages and adjustments to Tailwind and PostCSS configurations.
*   **AI Feature Integration:** AI features were added to existing forms and builders, aiming for a non-intrusive user experience where AI assists rather than dictates.
*   **Routing:** The project uses a mix of Next.js Pages Router (for core CRM app) and App Router (for the new `/landing` page), which is a common approach during incremental adoption of new Next.js features.


