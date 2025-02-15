import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/serviceSlice";
import { useNavigate } from "react-router-dom";

function Services() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { services, status, message } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    if (status === "loading") return <p>Loading services...</p>;
    if (status === "error") return <p style={{ color: "red" }}>{message}</p>;

    const handleServiceClick = (service) => {
        navigate(`/payment`, { state: service });
    };

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" }}>
                {services.map((service) => (
                    <div
                        key={service.service_code}
                        onClick={() => handleServiceClick(service)}
                        style={{
                            textAlign: "center",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        <img src={service.service_icon} alt={service.service_name} width="50" height="50" />
                        <p>{service.service_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;