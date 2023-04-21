import axios from "axios";
export let post = async(apiLink, data) => {
    let response = axios.post(apiLink, data)
    return response;
}