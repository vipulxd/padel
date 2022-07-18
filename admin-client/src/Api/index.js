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
    getAllTaskApi:'/api/admin/tasks/'

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
        .catch(e=>{
            handleError(e.response.status)
        })
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
        .catch(e=>{
            handleError(e.response.status)
        })
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
        .catch(e=>{
            handleError(e.response.status)
        })
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
        .catch(e=>{
            handleError(e.response.status)
        })
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
        .catch(e=>{
            handleError(e.response.status)
        })

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
        .catch(e=>{
            handleError(e.response.status)
        })
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
            .catch(e=>{
                handleError(e.response.status)
            })
    }
}

export function getAllTasks(created_after){
    // created_after is the date after which you can see all the pickup locations assigned by the admin user to their agents .

    const token = localStorage.getItem('token')
    return axios.get(`${baseUrl}${ApiEnum.getAllTaskApi}${created_after}`,{headers :{'x-access-token':token}})
        .then((response)=>response.data)
        .catch(e=>{
            handleError(e.response.status)
        })
}

/**
 * Based on server response status we can easily show snackbar or show some other function to the user
 * @param status
 */
function handleError(status){
    switch(status){
    //Remove auth token this will redirect the page to authentication page
        case 401 : {
            localStorage.removeItem('token');
        }
    }
}
