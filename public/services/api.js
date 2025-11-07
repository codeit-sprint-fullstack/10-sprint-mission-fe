import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app',
    timeout : 5000,
})

export default instance;
