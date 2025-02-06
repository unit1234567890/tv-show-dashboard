# TV Show Dashboard

## Introduction

The **TV Show Dashboard** is a frontend developer assignment designed to showcase best practices in Vue.js, clean architecture, reusable components, and efficient data handling. This project effectively categorizes TV shows by genre, sorts them by rating, and provides an intuitive user experience with search functionality and a detailed show view.

## Features

- **Grouped TV shows by genre**
- **Sorted shows by rating** within each genre
- **Search functionality** to find TV shows by name
- **Detailed view of a TV show** with comprehensive information
- **Responsive and mobile-friendly UI**
- **Reusable components** for efficiency and maintainability
- **Optimized API fetching strategy** to handle large datasets smoothly
- **Minimalistic and visually appealing UI design**

## Architectural Decisions

### Efficient Data Fetching Strategy

The **TVMaze API** does not provide a direct endpoint for fetching shows by genre. Instead, the **Show index** endpoint returns paginated data with up to **250 shows per page**.

#### Fetching shows from the first page only
**Why?**
- Each page contains up to **250 shows**, and there are **over 200 pages**, meaning there are **more than 100,000 shows**. Fetching them all would require excessive API requests and slow down the UI. Given that shows should be sorted by genre and by rating within each genre, fetching all shows would be inefficient.

#### Storing Fetched Shows in Pinia Store
- **Pinia Store (`showStore.ts`)** holds fetched shows, preventing redundant API calls.
- Show details are **cached separately** for quick search.

#### Optimized Search Mechanism
- **Debounced API calls** prevent excessive requests during fast user input.
- **Search results are cached** to optimize repeated queries.

#### Genre-Based Grouping & Sorting
- Shows are **grouped by genre** and **sorted by rating** (`showsSorting.ts`).
- Genres are **sorted alphabetically** for better user experience.

🔹 **Benefits:**
- **Fast initial load** – Users see relevant content instantly.
- **Efficient API usage** – No redundant requests.
- **Search optimization** – Cached results enhance performance.
- **Maintainable architecture** – Separation of concerns for UI, data fetching, and business logic.

### Reusable Component Architecture

To ensure maintainability and flexibility, I built the UI using reusable Vue components:

- **`ShowCard.vue`**
    - Used in both **HomePage** and **ShowDetailsPage** pages.
    - Supports different views via a `isDetailed` prop.

- **`EmptyState.vue`**
    - Displayed when no shows match a search.

- **`LoadingIndicator.vue`**
    - Ensures users see a loading state while data is being fetched.

### State Management with Pinia
- Centralized show data using **Pinia Store (`showStore.ts`)**.
- Makes it easy to manage and update the global state across components.

### API & Business Logic Separation
- API calls are handled in `showsApi.ts`.
- Data transformation logic (e.g., **grouping by genre, sorting by rating**) is managed in `showsSorting.ts`.
- UI state management and interactions are handled in `useShowsListing.ts` (Vue Composable).

### Styling
- Followed **BEM methodology** for clear and maintainable CSS.
- Used **flexbox & grid** for responsiveness.
- Ensured a visually appealing UI with minimal yet effective design.

## Functional Requirements Checklist

✅ **Group TV shows by genre** using data from [TVMaze API](http://www.tvmaze.com/api).

✅ **Horizontal scrolling lists** for each genre.

✅ **Sort TV shows by rating** within each genre.

✅ **Search feature** to find shows by name.

✅ **Detailed screen** for each show.

✅ **Reusable components** for UI consistency and flexibility.

✅ **Optimized performance** for handling data efficiently.

✅ **Responsive design** for both mobile and desktop.

## Technical Implementation

✅ Built with **Vue.js**.

✅ Used **TypeScript** for better code maintainability.

✅ **Minimal scaffolding tools** – Focused on custom implementation.

✅ Included **unit tests** (with Vitest).

✅ No console errors – Ensured a smooth runtime experience.

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (Developed with `v21.7.1`)
- [npm](https://www.npmjs.com/) (Developed with `10.6.0`)

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/unit1234567890/tv-show-dashboard
   ```

2. Navigate to the project directory:
   ```bash
   cd tv-show-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   ```bash
   http://localhost:5173/
   ```

6. Run unit tests:
   ```bash
   npm run test
   ```
