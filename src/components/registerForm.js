import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/registerSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            {message && <p style={{ color: status === "success" ? "green" : "red" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" disabled={status === "loading"}>Register</button>
                <button type="button" onClick={() => dispatch(resetForm())}>Reset</button>
            </form>
        </div>
    );
}

export default RegisterForm;