import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../redux/bannerSlice";

function Banner() {
    const dispatch = useDispatch();
    const { banners, status, message } = useSelector((state) => state.banner);

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch]);

    if (status === "loading") return <p>Loading banners...</p>;
    if (status === "error") return <p style={{ color: "red" }}>{message}</p>;

    return (
        <div>
            <h3>Temukan promo menarik</h3>
            <div style={{ display: "flex", overflowX: "auto" }}>
                {banners.map((banner, index) => (
                    <div key={index} style={{ margin: "10px", textAlign: "center" }}>
                        <img src={banner.banner_image} alt={banner.banner_name} width="300" height="150" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Banner;