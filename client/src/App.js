import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Private Routes/Home";
import Login from "./components/Public Routes/Login";
import SignUp from "./components/Public Routes/SignUp";
import { Bounce, ToastContainer } from "react-toastify";
import PrivateRoute from "./components/Private Routes/PrivateRoutes";
import PublicRoutes from "./components/Public Routes/PublicRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicRoutes />}>
              <Route index element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
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
