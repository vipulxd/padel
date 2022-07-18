enum AUTHAPI {
    login = '/api/agent/login',
    register = '/api/agent/register'
}
enum locationApi {
    location = '/api/agent/location',
  pickup = '/api/agent/assignments/',
  updateStatus = '/api/agent/task/'
}
enum pickupStatus {
    pending = 'PENDING',
    inprogress = 'IN PROGRESS',
    completed = 'COMPLETED'
}

export {AUTHAPI,locationApi,pickupStatus}
