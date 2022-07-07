interface AUTHRESPONSE {
    admin_id: string
    agent_id:string
    createdat: string
    name: string
    password: string
    role:string
    token: string
    username:string
}
 interface LOCATIONINFO {
    lat: number,
    lng: number,
    createdAt: string,
    acc: number,
}
 interface LOCATIONRESPONSE {
    accuracy: number
    agent_id: number
    createdat: string
    id: number
    latitude: number
    longitude: number
}

export {AUTHRESPONSE, LOCATIONINFO, LOCATIONRESPONSE}
