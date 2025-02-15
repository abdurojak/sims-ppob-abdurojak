import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopMenu from "../components/topMenu";
import Profile from "../components/profile";
import Balance from "../components/balance";
import TransactionHistory from "../components/transactionhistory";

function Transaction() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            <TopMenu activePage="transaction" />
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
                <h3>Semua Transaksi</h3>
                <TransactionHistory />
            </div>
        </div>
    );
}

export default Transaction;