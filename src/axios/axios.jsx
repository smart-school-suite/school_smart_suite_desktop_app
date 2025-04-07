import axios from "axios";
import { useSelector } from "react-redux";
export default axios.create({
    baseURL:"http://127.0.0.1:8000/api/api/v1/",
    withCredentials:true,
    withXSRFToken:true
})
