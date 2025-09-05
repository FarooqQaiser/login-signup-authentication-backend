import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

const Layout = lazy(() => import("./components/Layout"));
const PublicRoutes = lazy(() =>
  import("./components/Public Routes/PublicRoutes")
);
const SignUp = lazy(() => import("./components/Public Routes/SignUp"));
const Login = lazy(() => import("./components/Public Routes/Login"));
const PrivateRoutes = lazy(() =>
  import("./components/Private Routes/PrivateRoutes")
);
const Home = lazy(() => import("./components/Private Routes/Home"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading Page...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PublicRoutes />}>
                <Route index element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
