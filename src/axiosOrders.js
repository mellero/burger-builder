import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://burger-builder-1d10b.firebaseio.com/",
    params: {}
});

export default instance;