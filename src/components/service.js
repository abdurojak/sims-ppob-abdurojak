import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/serviceSlice";

function Services() {
    const dispatch = useDispatch();
    const { services, status, message } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    if (status === "loading") return <p>Loading services...</p>;
    if (status === "error") return <p style={{ color: "red" }}>{message}</p>;

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" }}>
                {services.map((service) => (
                    <div key={service.service_code} style={{ textAlign: "center", padding: "10px" }}>
                        <img src={service.service_icon} alt={service.service_name} width="50" height="50" />
                        <p>{service.service_name}</p>
                        {/* <small>Rp {service.service_tariff.toLocaleString()}</small> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;