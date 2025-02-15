import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topUp } from "../redux/topupSlice";

function TopUp() {
    const dispatch = useDispatch();
    const { status, message, data } = useSelector((state) => state.topUp);
    const [amount, setAmount] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];
    const isValidAmount = amount >= 10000 && amount <= 1000000;

    const handleTopUp = () => {
        if (isValidAmount) {
            setShowConfirmModal(true);
        }
    };

    const confirmTopUp = () => {
        dispatch(topUp(amount));
        setShowConfirmModal(false);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            <div style={{ display: "flex", width: "100%", flexDirection: isMobile ? "column" : "row" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "10px",
                        marginRight: isMobile ? "0px" : "10px",
                        minWidth: isMobile ? "400%" : "700px"
                    }}
                >
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Masukkan nominal Top Up"
                        style={{ width: "97%", padding: "10px", fontSize: "16px" }}
                    />

                    <button
                        onClick={handleTopUp}
                        disabled={!isValidAmount}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: isValidAmount ? "red" : "gray",
                            color: "white",
                            border: "none",
                            cursor: isValidAmount ? "pointer" : "not-allowed",
                            fontSize: "16px",
                        }}
                    >
                        Top Up
                    </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "10px" }}>
                    {presetAmounts.map((value) => (
                        <button
                            key={value}
                            onClick={() => setAmount(value)}
                            style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                cursor: "pointer",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            Rp {value.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            {showConfirmModal && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px 40px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px", textAlign: "center", display: "flex", flexDirection: "column", zIndex: 1000 }}>
                    <img src="/assets/Logo.png" alt="Logo" style={{ width: "50px", marginBottom: "10px", alignSelf: "center" }} />
                    <p>Anda yakin untuk Top Up sebesar</p>
                    <span style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>Rp {amount.toLocaleString()} ?</span>
                    <button
                        onClick={confirmTopUp}
                        style={{
                            padding: "10px",
                            color: "red",
                            border: "none",
                            backgroundColor: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                            flex: 1
                        }}
                    >
                        Ya, lanjutkan top up
                    </button>

                    <button
                        onClick={() => setShowConfirmModal(false)}
                        style={{
                            padding: "10px",
                            color: "grey",
                            border: "none",
                            backgroundColor: "transparent",
                            fontWeight: "bold",
                            cursor: "pointer",
                            flex: 1
                        }}
                    >
                        Batalkan
                    </button>
                </div>
            )}

            {status === "success" || status === "error" ? (
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
                        {status === "success" ? "✅" : "❌"}
                    </div>
                    Top Up Sebesar
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Rp {amount.toLocaleString()}
                    </span>
                    {status === "success" ? "berhasil!" : "gagal!"}
                    <a href="/" style={{ color: "red", textDecoration: "none", fontWeight: "bold", paddingTop: "20px" }}>
                        Kembali ke Beranda
                    </a>
                </div>
            ) : null}
        </div>
    );
}

export default TopUp;