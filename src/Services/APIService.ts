import axios, { AxiosResponse } from 'axios';
import Donut from '../GlobalTypes/Donut';

const API_PREFIX = "http://localhost:8080";

export default class APIService {
    static async get(id?:number):Promise<AxiosResponse> {
        return await axios.get(`${API_PREFIX}/${ id ?? ""}`);
    }
    static async post(donut:Donut):Promise<AxiosResponse> {
        return await axios.post(API_PREFIX, donut); 
    }
    static async patch(donut:Donut):Promise<AxiosResponse> {
        return await axios.patch(`${API_PREFIX}/${donut.id}`, donut);
    }
    static async delete(id:number):Promise<AxiosResponse> {
        return await axios.delete(`${API_PREFIX}/${id}`);
    }
}
