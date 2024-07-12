import axios from "axios";

axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

export default instance