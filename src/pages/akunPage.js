import { useState } from "react";
import { Link } from "react-router-dom";
import TopMenu from "../components/topMenu";

function Akun() {
    return (
        <div>
            <TopMenu activePage="account" />

            <div style={{ padding: "20px" }}>
                <h2>Transaction Page</h2>
                <p>Isi halaman ini nanti.</p>
            </div>
        </div>
    );
}

export default Akun;