# DashPilot


**DashPilot** is a professional-grade, responsive dashboard application built with [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

 It includes dynamic data visualization using [Chart.js](https://www.chartjs.org/) and state management via [Zustand](https://zustand-demo.pmnd.rs/). 
 
 Authentication is handled through [NextAuth.js](https://next-auth.js.org/), and the app is fully tested with **Jest** and **Cypress**.

You can view the live deployed demo on Vercel: (https://dashpilot-app.vercel.app)



## Technical Test: Completion Checklist

Task 1: Authentication with Next.js
    ✅ Secure routes using NextAuth.js

    ✅ Implement email/password-based authentication (via CredentialsProvider)

    ✅ Do not use third-party providers (Google, GitHub, Facebook)

Task 2: Component Development
UI Components
    ✅ Create a UI Kit for the project (shared/ui)

    ✅ Implement modern, polished component styling using Tailwind CSS

    ✅ Add a theme system with multiple options (dark/light)

Custom Hook
    ✅ Create custom reusable hooks (useTheme, useUserTable, useUserDetail, etc.)

Task 3: Dashboard Generation
    ✅ Build a dashboard page with summary components

    ✅ Display multiple charts using Chart.js:

    Age bar chart

    Gender pie chart

    Birth year line chart

    Weight distribution chart

Task 4: Large Dataset Handling
    ✅ Use a dataset with 1000+ records (mocked)

    ✅ Display data efficiently using:

    ✅ Pagination

    ✅ Search with debounce

    ✅ Detail view per user

Task 5: Performance Optimisation
    ✅ Use Next.js App Router and server components

    ✅ Apply server-side rendering for key pages

    ✅ Use streaming for optimized UX

    ✅ Ensure responsive mobile performance with Lighthouse compliance

Task 6: Testing
    ✅ Unit tests with Jest + React Testing Library

    ✅ End-to-End tests with Cypress

    ✅ Test critical paths:

    Login flow

    Dataset table interactions

    User detail view

Task 7: Documentation
    ✅ Write a complete README.md with:

    Project setup

    Architecture overview

    Deployment instructions

    ✅ Provide a .env.example file

    ✅ Organize codebase with clean, maintainable structure


## ⚙️ Scripts

# Development server
npm run dev

# Production build
npm run build && npm run start

# Lint check
npm run lint

# Unit tests (Jest + React Testing Library)
npm run test

# E2E tests (Cypress)
npm run test:e2e

# All tests
npm run test:all


## 🔐 Demo credentials: You can sign in using the following users:

- **Email**: jose@test.com  
  **Password**: Password111@

- **Email**: ana@test.com  
  **Password**: Password222@


## 📁 Project Structure

src/
│
├── app/ # App routing and page-level components
│ ├── login/ # Login page
│ ├── dashboard/ # Main dashboard view
│ ├── dataset/ # Dataset list & dynamic [id] detail pages
│ └── api/auth/ # NextAuth credentials config
│
├── entities/user/ # Domain logic: services, store, types
│
├── features/ # UI and logic modules
│ ├── dashboard/ # Charts and dashboard components
│ └── dataset/ # Table, detail view, pagination
│
├── shared/ # Shared logic and UI
│ ├── api/ # Axios instance & auth helpers
│ ├── hooks/ # Custom reusable hooks
│ ├── lib/ # Mock data for dev/testing
│ ├── providers/ # Global providers (Theme, Auth, etc.)
│ └── ui/ # Header, Footer, ThemeSelector
│
├── assets/images/ # Project images
│
└── styles/ # Global styles


## 🌐 Features

✅ Authenticated login with NextAuth (mock users only)

✅ Responsive and accessible design with Tailwind CSS

✅ User dataset list and detail views

✅ Reusable components and custom hooks

✅ Theme selection with persistent dark/light mode

✅ Global state using Zustand

✅ Charts: bar, pie, and line via Chart.js

✅ Unit tests with Jest

✅ E2E tests with Cypress


## 🧪 Testing:

Unit tests: Located next to their components/services

E2E tests: Cypress specs in cypress/e2e/

Run all tests: npm run test:all


## 🔐 Authentication:

Uses CredentialsProvider from NextAuth

User credentials are defined in shared/lib/mockUsers.ts

No external DB: suitable for demos or test environments


## 🌈 Theme Management

Uses custom useTheme hook

Saves theme in localStorage

Accessible through UI switch (ThemeSelector)


## 📊 Dashboard Visualizations

Includes real-time charts and filters:

1. AgeBarChart

2. GenderPieChart

3. BirthYearLineChart

4. WeightDistributionChart

## 📂 .env.local (Use this structure)
NEXTAUTH_SECRET=your-secret-here


## 🛠 Tech Stack
1. Tool	Description
2. Next.js 15	Framework for hybrid React apps
3. React 19	UI library
4. TypeScript	Typed superset of JavaScript
5. Tailwind CSS	Utility-first CSS framework
6. Chart.js	Data visualization charts
7. Zustand	Lightweight global state manager
8. NextAuth.js	Authentication and session mgmt.
9. Jest	Unit testing framework
10. Cypress	End-to-end testing


## ✅ Linting & Formatting
ESLint + TypeScript config in .eslintrc, using eslint-config-next

Tailwind with PostCSS


## 🚀 Deployment
To deploy in Vercel:

Set NEXTAUTH_SECRET in your Vercel environment variables.

Build and deploy as standard Next.js app.


## 📂 License
This project is licensed under the MIT License.


## 👨‍💻 Author
Built by Bogdan Necatu a senior software engineer with experience in frontend architecture, scalable interfaces, clean code principles and modern tooling.