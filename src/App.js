import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import LoginForm from "./components/loginForm";
import Home from "./pages/homePage";
import TopUp from "./pages/topupPage";
import Transaction from "./pages/transactionPage";
import Akun from "./pages/akunPage";
import Payment from "./pages/paymentPage";

function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/home" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/home" />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/topup" element={token ? <TopUp /> : <Navigate to="/login" />} />
        <Route path="/transaction" element={token ? <Transaction /> : <Navigate to="/login" />} />
        <Route path="/account" element={token ? <Akun /> : <Navigate to="/login" />} />
        <Route path="/payment" element={token ? <Payment /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;