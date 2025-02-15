import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../redux/balanceSlice";

function Balance() {
    const dispatch = useDispatch();
    const balanceState = useSelector((state) => state.balance) || {};
    const { balance = 0, status, message } = balanceState;
    const [showBalance, setShowBalance] = useState(false);

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    return (
        <div
            style={{
                backgroundImage: `url(assets/BackgroundSaldo.png)`,
                backgroundColor: "red",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "left",
                color: "#fff",
                minWidth: window.innerWidth < 1000 ? "300px" : "800px",
            }}
        >
            <p style={{ fontSize: "18px" }}>Saldo anda</p>

            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "error" ? (
                <p style={{ color: "red" }}>{message}</p>
            ) : (
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {showBalance ? `Rp ${balance.toLocaleString()}` : "Rp •••••••"}
                </p>
            )}

            <p
                onClick={() => setShowBalance(!showBalance)}
                style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "inline-block",
                }}
            >
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
            </p>
        </div>
    );
}

export default Balance;
