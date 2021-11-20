import React, { useState, useEffect, FC } from "react";
import APIService from "../Services/APIService";
import Donut from "../GlobalTypes/Donut";
import DonutForm from "./DonutForm/DonutForm";
import DonutTable from "./DonutTable/DonutTable";
import './App.scss';
const TempApp:FC = () => {
    const [donuts, setDonuts] = useState<Donut[]>([]);
    useEffect(() => {
        (async () => {
            console.log("APP EFFECT")
            await APIService.get()
                .then(res => setDonuts(res.data))
                .catch(err => console.dir(err));
        })(); 
    }, [])
    return (
        <div className="container">
            <DonutForm setDonuts={setDonuts} />
            <DonutTable donuts={donuts} setDonuts={setDonuts}></DonutTable>
        </div>
    )
}
export default TempApp;