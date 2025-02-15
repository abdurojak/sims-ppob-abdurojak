import { useState } from "react";
import { Link } from "react-router-dom";
import TopMenu from "../components/topMenu";
import AkunForm from "../components/akun";

function Akun() {
    return (
        <div>
            <TopMenu activePage="account" />

            <div style={{ padding: "80px" }}>
                <AkunForm />
            </div>
        </div>
    );
}

export default Akun;