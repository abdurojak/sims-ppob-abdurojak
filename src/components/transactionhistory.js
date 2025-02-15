import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../redux/transactionHistorySlice";

function TransactionHistory() {
    const dispatch = useDispatch();
    const { records, offset, limit, status, message } = useSelector((state) => state.transactionHistory);

    useEffect(() => {
        dispatch(fetchTransactionHistory({ offset: 0, limit: 5 }));
    }, [dispatch]);

    const handleShowMore = () => {
        dispatch(fetchTransactionHistory({ offset: offset + limit, limit }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p style={{ color: "red" }}>{message}</p>}
            <ul style={{ width: "97%", padding: 0, listStyle: "none" }}>
                {records.map((item) => (
                    <li key={item.invoice_number} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        width: "100%",
                        borderBottom: "1px solid #ddd"
                    }}>
                        <div>
                            <b style={{ color: item.transaction_type === "TOPUP" ? "green" : "red" }}>
                                {item.transaction_type === "TOPUP" ? "+" : "-"} Rp {item.total_amount.toLocaleString()}
                            </b>
                            <br />
                            <small style={{ color: 'grey' }}>{new Date(item.created_on).toLocaleString()}</small>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            {item.description}
                        </div>
                    </li>
                ))}
            </ul>
            {records.length > 0 && (
                <button onClick={handleShowMore} style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "16px",
                    paddingBottom: "50px"
                }}>
                    Show More
                </button>
            )}
        </div>
    );
}

export default TransactionHistory;