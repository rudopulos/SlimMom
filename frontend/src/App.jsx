import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Calculator = React.lazy(() => import("./pages/Calculator"));
const Diary = React.lazy(() => import("./pages/Diary"));

function App() {
  return (
    <BrowserRouter basename="/SlimMom">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/calculator"
          element={
            <Suspense fallback={<Loader />}>
              <Calculator />
            </Suspense>
          }
        />
        <Route
          path="/diary"
          element={
            <Suspense fallback={<Loader />}>
              <Diary />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
