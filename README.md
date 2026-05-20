# BloomDay — Community Event Hosting Platform

BloomDay is a modern community-driven event hosting platform that allows users to create, discover, manage, and share memorable events ranging from intimate celebrations to large-scale gatherings.

The platform focuses on creating beautiful event experiences while providing a responsive and production-style frontend experience for both guests and authenticated users.

---

# Features

## Public Platform Experience

- Public homepage accessible without authentication
- Browse hosted community events publicly
- View event details without logging in
- Responsive desktop and mobile landing experience
- Community statistics section
- Hosted event showcase carousel
- Event status badges:
  - Upcoming
  - Past Event
  - Private Event

---

## Event Management

- Create and customize events
- Event image uploads
- Public/private event visibility
- Event crowdfunding support
- Event discovery and browsing
- Hosted events history
- Personalized event pages

---

## User Experience Improvements

- Responsive desktop-first homepage improvements
- Hero landing section with platform CTA
- Public/private navigation flow
- Create-event cancel and back navigation
- Logged-in and logged-out user experiences
- Mobile navigation support
- Quick-access dashboard links

---

## Admin Features

- Admin-only user management dashboard
- Registered users analytics
- Platform operational visibility
- Community metrics display

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- React Router DOM
- Tailwind CSS
- Material UI (MUI)
- Embla Carousel
- Formik + Yup
- Axios
- Date-fns
- Lucide React Icons

---

# Getting Started

## Prerequisites

- Node.js v18+
- npm v9+

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bloomday-client.git
cd bloomday-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
REACT_APP_API_BASE_URL=http://localhost:3100
```

Example for production:

```env
REACT_APP_API_BASE_URL=https://your-production-api.com
```

---

### 4. Start development server

```bash
npm start
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm test
```

Runs the test suite.

```bash
npm run eject
```

Ejects from Create React App.

---

# Project Structure

```txt
src/
├── components/          # Shared reusable UI components
├── pages/               # Application pages
├── services/            # API service logic
├── utils/               # Utility functions
├── types/               # Shared TypeScript types
├── assets/              # Static assets
└── styles/              # Global styling
```

---

# Recent Frontend Improvements

- Added public homepage browsing experience
- Added hosted events public showcase
- Added responsive desktop homepage redesign
- Added community stats section
- Added admin users dashboard
- Added create event cancel/back navigation
- Added event status badges
- Added responsive mobile navigation improvements
- Added public event details support
- Improved logged-in/logged-out UX separation

---

# Platform Capabilities

BloomDay supports:

- Community event hosting
- Event visibility controls
- Guest engagement
- Crowdfunding workflows
- Public event discovery
- Responsive browsing experience
- Admin operational tooling

---

# Contributing

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push to GitHub

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

- React.js
- Tailwind CSS
- Material UI
- Embla Carousel
- Lucide Icons
- Unsplash
- Create React App