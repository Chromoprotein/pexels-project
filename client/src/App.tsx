import React from 'react';
import ResultsPage from './pages/ResultsPage.tsx';
import SplashPage from './pages/SplashPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FullImagePage from './pages/FullImagePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "results",
    element: <ResultsPage />,
  },
  {
    path: "fullImage/:id",
    element: <FullImagePage />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}