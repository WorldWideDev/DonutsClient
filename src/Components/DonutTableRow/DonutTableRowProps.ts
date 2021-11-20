import { SetStateAction } from "react";
import Donut from "../../GlobalTypes/Donut";

export default interface DonutTableRowProps {
    setDonuts: React.Dispatch<SetStateAction<Donut[]>>,
    donuts:Donut[],
    donut: Donut
};