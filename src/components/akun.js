import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile, updateProfileImage } from "../redux/profileSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Akun() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { email, first_name, last_name, profile_image, status } = useSelector((state) => state.profile);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ email, first_name, last_name });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        setFormData({ email, first_name, last_name });
    }, [email, first_name, last_name]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        setShowLogoutModal(true)
    };

    const handleLogoutConfirm = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleSave = async () => {
        const result = await dispatch(updateProfile(formData));

        if (result.meta.requestStatus === "fulfilled") {
            setModalMessage(result.payload.message || "Profil berhasil diperbarui!");
        } else {
            setModalMessage(result.payload?.message || "Gagal memperbarui profil!");
        }

        setShowModal(true);
        setIsEditing(false);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const handleImageClick = () => {
        setShowUploadModal(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setSelectedFile(file);
        } else {
            alert("Hanya file JPG atau PNG yang diperbolehkan!");
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        console.log("File yang dikirim:", selectedFile);

        const result = await dispatch(updateProfileImage(selectedFile)); // Kirim file langsung

        if (result.meta.requestStatus === "fulfilled") {
            setModalMessage(result.payload.message || "Gambar berhasil diperbarui!");
        } else {
            setModalMessage(result.payload || "Gagal mengunggah gambar!");
        }

        setShowModal(true);
        setShowUploadModal(false);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "auto", textAlign: "center" }}>
            {status === "loading" ? <p>Loading...</p> : status === "error" ? <p style={{ color: "red" }}>Gagal memuat profil</p> : (
                <>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={(profile_image && profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null" ? profile_image : 'assets/ProfilePhoto.png') || "/default-profile.png"}
                            alt="Profile"
                            style={{ width: "100px", height: "100px", borderRadius: "50%", cursor: "pointer" }}
                            onClick={handleImageClick}
                        />
                        <div
                            onClick={handleImageClick}
                            style={{
                                position: "absolute",
                                bottom: "5px",
                                right: "5px",
                                background: "white",
                                borderRadius: "50%",
                                padding: "5px",
                                cursor: "pointer",
                                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                                fontSize: "10px"
                            }}
                        >
                            ✏️
                        </div>
                    </div>
                    <h3>{first_name} {last_name}</h3>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={true}
                        style={{ width: "97%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                    />

                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={{ width: "97%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                    />

                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={{ width: "97%", padding: "8px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                    />

                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Simpan
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "white",
                                    color: "red",
                                    border: "1px solid red",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Batalkan
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditClick}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "white",
                                    color: "red",
                                    border: "1px solid red",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Edit Profil
                            </button>
                            <button
                                onClick={handleLogout}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </>
            )}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        paddingBlock: "20px",
                        paddingInline: "40px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        borderRadius: "10px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000
                    }}
                >
                    <div style={{ fontSize: "40px", paddingBottom: "20px" }}>
                        {modalMessage.includes("berhasil") ? "✅" : "❌"}
                    </div>
                    {modalMessage}
                </div>
            )}

            {showUploadModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        borderRadius: "10px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000,
                    }}
                >
                    <h3>Upload Gambar</h3>
                    <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
                    <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px", background: "red", color: "white", borderRadius: "5px", cursor: "pointer", border: "none" }}>
                        Simpan
                    </button>
                    <button onClick={() => setShowUploadModal(false)} style={{ marginTop: "10px", padding: "10px", background: "white", color: "red", border: "1px solid red", borderRadius: "5px", cursor: "pointer" }}>
                        Batal
                    </button>
                </div>
            )}
            {showLogoutModal && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px", textAlign: "center", zIndex: 1000 }}>
                    <h3>Konfirmasi Logout</h3>
                    <p>Apakah Anda yakin ingin logout?</p>
                    <button onClick={handleLogoutConfirm} style={{ marginRight: "10px", padding: "10px", background: "red", color: "white", borderRadius: "5px", cursor: "pointer", border: "none" }}>Ya, Logout</button>
                    <button onClick={() => setShowLogoutModal(false)} style={{ padding: "10px", background: "white", color: "red", border: "1px solid red", borderRadius: "5px", cursor: "pointer" }}>Batal</button>
                </div>
            )}
        </div>
    );
}

export default Akun;