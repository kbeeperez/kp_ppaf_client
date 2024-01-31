import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function LogOut(){
    localStorage.removeItem("token")
    const forceRefresh = useOutletContext();
    const navigate = useNavigate()
    forceRefresh()

    useEffect(()=>{
        navigate("/")
    },[])
    return(<></>)
}