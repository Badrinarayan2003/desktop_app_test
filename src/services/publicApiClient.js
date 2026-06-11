import axios from "axios";
import { AUTHBASE_URL } from "../config/urls";


const publicApiClient = axios.create({
    baseURL: AUTHBASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default publicApiClient;