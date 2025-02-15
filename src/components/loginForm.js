import { useDispatch, useSelector } from "react-redux";
import { updateField, loginSuccess, loginFail } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, message, token } = useSelector((state) => state.auth);
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
            console.log('pesan : ', result.message)

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
        <div>
            <h2>Login</h2>
            {message && <p style={{ color: status === "success" ? "green" : "red" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
                <button type="submit" disabled={loading}>Login</button>
            </form>
            <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </div>
    );
}

export default LoginForm;