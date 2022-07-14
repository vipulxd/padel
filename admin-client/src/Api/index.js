import axios from "axios";

const ApiEnum = {
    login: '/api/admin/login',
    register: '/api/admin/register',
    forgotPassword: '/api/admin/forget-password',
    agents: '/api/admin/agents',
    agentLocation: '/api/admin/location',
    agentRegister: '/api/agent/register',

}
const baseUrl = 'https://padel-config-api0server.herokuapp.com'
const token = localStorage.getItem('token')

export function login(payload) {
    const data = {...payload}
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.login}`, data).then((response) => (
        response.data))
}

export function register(payload) {
    const data = {...payload}
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.register}`, data).then(response =>
        response.data)
}

export function createAgent(payload) {
    const data = {...payload};
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.agentRegister}`, {data}, {headers: {'x-access-token': token}}).then((response) => response.data)
}

export function getAgentLocationByid(payload,from,to) {
    const data = payload;
    return axios.get(`${baseUrl}${ApiEnum.agentLocation}/${data}/${from}/${to}`, {
        headers: {'x-access-token': token},
        data
    }).then((response => response.data))
}

export function getAgentInAssociatedToAdmin() {
    return axios.get(`${baseUrl}${ApiEnum.agents}`, {
        headers: {'x-access-token': token},
    }).then((response)=> response.data)
}
