import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TopMenu({ activePage }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            position: "fixed",
            top: 0,
            left: 0,
            width: window.innerWidth < 768 ? "90%" : "98%",
            backgroundColor: "white",
            zIndex: 1000,
            borderBottom: "0.5px solid #D3D3D3"
        }}>
            <Link to="/home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "black" }}>
                <img src="/assets/Logo.png" alt="SIMS PPOB Logo" width="40" height="40" />
                <h1 style={{ fontSize: "20px", margin: 0 }}>SIMS PPOB</h1>
            </Link>

            {isMobile ? (
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
                    >
                        ☰
                    </button>
                    {isOpen && (
                        <div style={{
                            position: "absolute",
                            right: 0,
                            top: "100%",
                            background: "white",
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            borderRadius: "5px",
                            overflow: "hidden",
                            minWidth: "120px"
                        }}>
                            <Link to="/topup" style={menuStyle(activePage === "topup")}>Top Up</Link>
                            <Link to="/transaction" style={menuStyle(activePage === "transaction")}>Transaction</Link>
                            <Link to="/account" style={menuStyle(activePage === "account")}>Akun</Link>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ display: "flex", gap: "20px" }}>
                    <Link to="/topup" style={menuStyle(activePage === "topup")}>Top Up</Link>
                    <Link to="/transaction" style={menuStyle(activePage === "transaction")}>Transaction</Link>
                    <Link to="/account" style={menuStyle(activePage === "account")}>Akun</Link>
                </div>
            )}
        </div>
    );
}

const menuStyle = (isActive) => ({
    textDecoration: "none",
    color: isActive ? "red" : "black",
    fontWeight: isActive ? "bold" : "normal",
    display: "block",
    padding: "10px 15px"
});

export default TopMenu;