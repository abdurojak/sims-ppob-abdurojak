import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopMenu from "../components/topMenu";
import Profile from "../components/profile";
import Balance from "../components/balance";
import ServicePayment from "../components/servicePayment";

function Payment() {
    const location = useLocation();
    const service = location.state || {};

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
                <p style={{ fontSize: "18px", margin: "5px 0" }}>Pembayaran</p>

                <ServicePayment service={service} />
            </div>
        </div>
    );
}

export default Payment;