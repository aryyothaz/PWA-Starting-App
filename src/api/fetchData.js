import axios from 'axios';

const URL = 'https://aryrie.ga/api/stations/register';

export const fetchData = async (query) => {
    const {data} = await axios.post(URL,{
        key: '0123456789'
    });

    return data;
}