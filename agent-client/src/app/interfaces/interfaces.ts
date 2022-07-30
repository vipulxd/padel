import {DeviceId} from "@capacitor/device";

export interface AUTHRESPONSE {
    admin_id: string
    agent_id:string
    createdat: string
    name: string
    password: string
    role:string
    token: string
    username:string
}
 export interface LOCATIONINFO {
   device_id ?: string;
    lat: number,
    lng: number,
    createdAt: string,
    acc: number,
}
export  interface LOCATIONRESPONSE {
    accuracy: number
    agent_id: number
    createdat: string
    id: number
    latitude: number
    longitude: number
}

