import { SetStateAction } from "react";
import Donut from "../../GlobalTypes/Donut";

export default interface DonutTableProps {
    donuts:Donut[],
    setDonuts:React.Dispatch<SetStateAction<Donut[]>>
};