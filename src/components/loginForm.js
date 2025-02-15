import { useDispatch, useSelector } from "react-redux";
import { updateField, loginSuccess, loginFail } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, message } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, value: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://take-home-test-api.nutech-integrasi.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (result.status === 0) {
                setStatus("success");
                dispatch(loginSuccess(result.data));
                setTimeout(() => setRedirect(true), 2000);
            } else {
                setStatus("error");
                dispatch(loginFail(result));
            }
        } catch (error) {
            setStatus("error");
            dispatch(loginFail({ status: 500, message: "Network Error" }));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (redirect) navigate("/home");
    }, [redirect, navigate]);

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <img src="/assets/Logo.png" alt="SIMS PPOB Logo" width="40" height="40" />
                    <h1 style={{ fontSize: "20px", margin: 0 }}>SIMS PPOB</h1>
                </div>
                {message && <p style={{ color: status === "success" ? "green" : "red" }}>{message}</p>}
                <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "300px" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                        style={{ width: "93%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                        style={{ width: "93%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: "100%", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Masuk
                    </button>
                </form>
                <p style={{ marginTop: "10px" }}>
                    Belum punya akun? registrasi<Link to="/register" style={{ color: "red", textDecoration: "none", fontWeight: "bold" }}> disini</Link>
                </p>
            </div>
            <div style={{ width: "50%" }}>
                <img src="/assets/IllustrasiLogin.png" alt="Login Illustration" style={{ width: "100%" }} />
            </div>
        </div>
    );
}

export default LoginForm;