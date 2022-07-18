import {Outlet, useNavigate} from "react-router";
import {Navbar} from "./Navbar";
import {useEffect} from "react";


export function Shell() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/authentication');
        }
    },[])

    return (
        <>
            <div>
                <Navbar/>
                <Outlet/>
            </div>
        </>
    )
}
