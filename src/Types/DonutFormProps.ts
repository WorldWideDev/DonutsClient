import React, { SetStateAction } from "react";
import Donut from "./Donut";

export default interface DonutFormProps {
    setDonuts: React.Dispatch<SetStateAction<Donut[]>>,
    donuts: Donut[]
};