import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/profileSlice";

function Profile() {
    const dispatch = useDispatch();
    const { first_name, last_name, profile_image, status, message } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (status === "loading") return <p>Loading profile...</p>;
    if (status === "error") return <p style={{ color: "red" }}>{message}</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "left", textAlign: "left" }}>
            {profile_image && (
                <img
                    src={profile_image}
                    alt="Profile"
                    width="75"
                    height="75"
                    style={{ borderRadius: "50%", marginBottom: "10px" }}
                />
            )}
            <p style={{ fontSize: "18px", margin: "5px 0" }}>Selamat datang,</p>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: "0" }}>
                {first_name} {last_name}
            </h2>
        </div>
    );
}

export default Profile;