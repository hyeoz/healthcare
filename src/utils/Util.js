import axios from "axios";

export const getHost = () => {
    return "http://49.50.167.136:9871/api";
}

export const getEthnicityList = async () => {
    const data = await axios.get(`${getHost()}/ethnicity/list`);
    return data.data;
}
export const getGenderList = async () => {
    const data = await axios.get(`${getHost()}/gender/list`);
    return data.data;
}
export const getRaceList = async () => {
    const data = await axios.get(`${getHost()}/race/list`);
    return data.data;
}