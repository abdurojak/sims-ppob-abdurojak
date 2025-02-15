import RegisterForm from "../components/registerForm";
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <div>
            <h2>Register</h2>
            <RegisterForm />
            <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
        </div>
    );
}

export default RegisterPage;
