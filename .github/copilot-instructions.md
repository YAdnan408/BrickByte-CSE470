# Copilot Instructions for BrickByte Frontend

## Project Overview
- This is a React single-page application (SPA) bootstrapped with Vite for fast development and HMR.
- Routing is managed via `react-router-dom` in `src/App.jsx`.
- Tailwind CSS is used for styling, configured in `tailwind.config.js` and `postcss.config.js`.
- The main entry point is `src/main.jsx`, which renders the `App` component.

## Key Directories & Files
- `src/`: All source code. Pages are in `src/pages/` (e.g., `Home.jsx`, `About.jsx`, `Profile.jsx`, `SignIn.jsx`, `SignOut.jsx`).
- `public/`: Static assets served directly.
- `index.html`: Main HTML template for Vite.
- `vite.config.js`: Vite configuration (customize build, plugins, etc.).
- `eslint.config.js`: ESLint rules for code quality.
- `tailwind.config.js`, `postcss.config.js`: Tailwind and PostCSS setup.

## Routing Pattern
- All routes are defined in `src/App.jsx` using `<Routes>` and `<Route>` from `react-router-dom`.
- Example:
  ```jsx
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signout" element={<SignOut />} />
  </Routes>
  ```
- Page components are imported from `src/pages/`.

## Build & Run Workflow
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Styling Conventions
- Use Tailwind utility classes for all styling. Avoid custom CSS unless necessary.
- Global styles are in `src/index.css`.

## Linting & Quality
- Run `npx eslint .` to check code quality.
- ESLint config is in `eslint.config.js`.

## Integration Points
- No backend integration is present in this codebase. All logic is client-side.
- Static assets (images, etc.) are in `src/assets/` and referenced in components as needed.

## Patterns & Conventions
- Page components are function components in `src/pages/`.
- Use React hooks for state and effects.
- Prefer named exports for components.
- Keep business logic inside page/component files; avoid global state unless necessary.

## Example: Adding a New Page
1. Create `src/pages/NewPage.jsx`:
   ```jsx
   export default function NewPage() {
     return <div>New Page</div>;
   }
   ```
2. Add route in `src/App.jsx`:
   ```jsx
   import NewPage from "./pages/NewPage";
   // ...existing code...
   <Route path="/new" element={<NewPage />} />
   // ...existing code...
   ```

---
For questions about build, routing, or conventions, see the files listed above for examples.
