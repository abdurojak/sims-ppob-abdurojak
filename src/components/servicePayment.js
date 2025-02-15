import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeTransaction, resetTransaction } from "../redux/transactionSlice";

function ServicePayment({ service }) {
    const dispatch = useDispatch();
    const { status, message, data } = useSelector((state) => state.transaction);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirm = () => {
        dispatch(makeTransaction(service.service_code));
        setShowConfirmModal(false);
    };

    const closeModal = () => {
        dispatch(resetTransaction());
    };

    if (!service.service_code) return null;

    return (
        <div style={{ marginTop: "20px", padding: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <img src={service.service_icon} alt={service.service_name} width="30" height="30" />
                {service.service_name}
            </div>
            <input
                type="number"
                value={service.service_tariff}
                disabled
                placeholder="Masukkan nominal Top Up"
                style={{ width: "97%", padding: "10px", fontSize: "16px", marginBlock: "20px" }}
            />
            <button
                onClick={() => setShowConfirmModal(true)}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Bayar
            </button>

            {/* Modal Konfirmasi */}
            {showConfirmModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "20px 40px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        borderRadius: "10px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000
                    }}
                >
                    <img src="/assets/Logo.png" alt="Logo" style={{ width: "50px", marginBottom: "10px", alignSelf: "center" }} />
                    <p>Anda yakin untuk membayar layanan</p>
                    <span style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>{service.service_name} ?</span>
                    <button
                        onClick={handleConfirm}
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
                        Ya, lanjutkan pembayaran
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
                    {status === "success" ? (
                        <>
                            Pembayaran {data?.service_name} sebesar
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                Rp {data?.total_amount?.toLocaleString()}
                            </span>{" "}
                            berhasil!
                        </>
                    ) : (
                        <>{message}</>
                    )}
                    <a href="/" style={{ color: "red", textDecoration: "none", fontWeight: "bold", paddingTop: "20px" }} onClick={closeModal}>
                        Kembali ke Beranda
                    </a>
                </div>
            ) : null}
        </div>
    );
}

export default ServicePayment;