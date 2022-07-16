import axios from "axios";

const ApiEnum = {
    login: '/api/admin/login',
    register: '/api/admin/register',
    forgotPassword: '/api/admin/forget-password',
    agents: '/api/admin/agents',
    agentLocation: '/api/admin/location',
    agentRegister: '/api/agent/register',
    livelocations: '/api/admin/live',
    assignTaskApi : '/api/admin/task',
    getAllTaskApi:'/api/admin/tasks'

}
const baseUrl = 'https://padel-config-api0server.herokuapp.com'

/**
 * Admin login
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export function login(payload) {
    const data = {...payload}
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.login}`, data).then((response) => (
        response.data))
}

/**
 * Admin register
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export function register(payload) {
    const data = {...payload}
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.register}`, data).then(response =>
        response.data)
}

/**
 * Create Agents
 * @param payload
 * @returns {Promise<T>}
 */
export function createAgent(payload) {
    const token = localStorage.getItem('token')
    const data = {...payload};
    JSON.stringify(data)
    return axios.post(`${baseUrl}${ApiEnum.agentRegister}`, data, {headers: {'x-access-token': token}}).then((response) => response.data).catch(e=>e.message)
}

/**
 * Get agents locations based on ID
 * @param payload
 * @param from
 * @param to
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getAgentLocationByid(payload, from, to) {
    const token = localStorage.getItem('token')
    const data = payload;
    return axios.get(`${baseUrl}${ApiEnum.agentLocation}/${data}/${from}/${to}`, {
        headers: {'x-access-token': token},
        data
    }).then((response => response.data))
}

/**
 * Get agent associated to admin
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getAgentInAssociatedToAdmin() {
    const token = localStorage.getItem('token')

    return axios.get(`${baseUrl}${ApiEnum.agents}`, {
        headers: {'x-access-token': token},
    }).then((response) => response.data)

}

/**
 * Get live locations for an agent
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getLiveLocations() {
    const token = localStorage.getItem('token');
    return axios.get(`${baseUrl}${ApiEnum.livelocations}`, {
        headers: {'x-access-token': token},
    }).then((response) => response.data)
}

/**
 * Assign task to an agent for a given location
 * @param agent_id
 * @param latitude
 * @param longitude
 * @param task_subject
 * @param task_message
 * @returns {Promise<AxiosResponse<any>>}
 */
export function assignTaskToAnAgent(agent_id, latitude, longitude, task_subject, task_message) {
    console.log(agent_id)
    const token = localStorage.getItem('token')
    const data = {
        latitude, longitude, task_subject, task_message
    }
    JSON.stringify(data)
    if (token) {
        return axios.post(`${baseUrl}${ApiEnum.assignTaskApi}/${agent_id}`,
            data
        , {
            headers: {'x-access-token': token}
        }).then((response) => response.data)
    }
}

export function getAllTasks(){
    const token = localStorage.getItem('token')
    return axios.get(`${baseUrl}${ApiEnum.getAllTaskApi}`,{headers :{'x-access-token':token}})
        .then((response)=>response.data)
}