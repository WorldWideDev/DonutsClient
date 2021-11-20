import React, { SetStateAction } from "react";
import Donut from "../../GlobalTypes/Donut";

export default interface DonutFormProps {
    setDonuts: React.Dispatch<SetStateAction<Donut[]>>
};