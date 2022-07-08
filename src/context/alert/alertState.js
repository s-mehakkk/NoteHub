import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const displayAlert = (type, message)=>{
        setAlert({type, message})
        setTimeout(() => {
            setAlert({});
        }, 2000);
    }
    const [alert, setAlert] = useState({})
    return (
        <AlertContext.Provider value={{alert, displayAlert}}>
            {props.children}
        </AlertContext.Provider>

    )
}

export default AlertState