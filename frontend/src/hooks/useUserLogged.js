import { useEffect, useState } from "react"
import { useAppState } from "../App";
import { useNavigate } from "react-router-dom";

export function useUserLogged(loggedTo=null, notLoggedTo=null){
    /* Returns True if the user is logged */
    const navigate = useNavigate();

    const [logged, setLogged] = useState(false);
    const { isUserActive } = useAppState();

    useEffect(()=>{

        const navigateTo = (url=null)=>{
            if(url !== null){
                try{
                    navigate(url)
                }catch{
                    Error("URL not available");
                }
            }
        }

        if(isUserActive()){
            setLogged(true);
            navigateTo(loggedTo)

        }else{
            setLogged(false);
            navigateTo(notLoggedTo)
        }
    },[isUserActive, loggedTo, notLoggedTo, navigate])

    return logged
}