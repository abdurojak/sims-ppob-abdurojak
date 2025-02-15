import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/registerSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.register);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, value: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("https://take-home-test-api.nutech-integrasi.com/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setMessage(result.message);

            if (result.status === 0) {
                setStatus("success");
                dispatch(resetForm());

                setTimeout(() => navigate("/login"), 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Network Error. Please try again.");
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <img src="/assets/Logo.png" alt="SIMS PPOB Logo" width="40" height="40" />
                    <h1 style={{ fontSize: "20px", margin: 0 }}>SIMS PPOB</h1>
                </div>

                {message && <p style={{ color: status === "success" ? "green" : "red", textAlign: "center" }}>{message}</p>}

                <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "300px" }}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required style={inputStyle} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />

                    <button type="submit" disabled={status === "loading"} style={buttonStyle}>
                        Registrasi
                    </button>
                </form>

                <p style={{ marginTop: "10px", textAlign: "center" }}>
                    Sudah punya akun? login <Link to="/login" style={{ color: "red", textDecoration: "none", fontWeight: "bold" }}>di sini</Link>
                </p>
            </div>
            <div style={{ width: "50%" }}>
                <img src="/assets/IllustrasiLogin.png" alt="Register Illustration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
        </div>
    );
}

const inputStyle = {
    width: "94%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px"
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
};

export default RegisterForm;