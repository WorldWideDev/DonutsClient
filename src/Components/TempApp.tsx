import React, { useState, useEffect, FC } from "react";
import APIService from "../Services/APIService";
import Donut from "../Types/Donut";
import DonutForm from "./DonutForm";
import DonutTable from "./DonutTable";
import './TempApp.scss';
const TempApp:FC = () => {
    const [donuts, setDonuts] = useState<Donut[]>([]);
    useEffect(() => {
        (async () => {
            await APIService.get()
                .then(res => setDonuts(res.data))
                .catch(err => console.dir(err));
        })(); 
    }, [])
    return (
        <div className="container">
            <DonutForm donuts={donuts} setDonuts={setDonuts} />
            <DonutTable donuts={donuts}></DonutTable>
        </div>
    )
}
export default TempApp;