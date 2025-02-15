import { useState, useEffect } from "react";
import TopMenu from "../components/topMenu";
import Profile from "../components/profile";
import Balance from "../components/balance";
import TopUpForm from "../components/topUp";

function TopUp() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            <TopMenu activePage="topup" />
            <div style={{ padding: "20px", paddingTop: "80px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        alignItems: "center",
                        paddingBottom: "20px",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    <Profile />
                    <Balance />
                </div>
                <p style={{ fontSize: "18px", margin: "5px 0" }}>Silahkan masukan</p>
                <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: "0" }}>
                    Nominal Top Up
                </h2>
                <TopUpForm />
            </div>
        </div>
    );
}

export default TopUp;