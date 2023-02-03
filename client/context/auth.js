import React, {useEffect, useState, createContext} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const AuthContext = createContext();



const AuthProvider = ({children}) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    }) 

    useEffect(()=>{
        const loadFromAsyncStorage = async () => {
            let date = await AsyncStorage.getItem("@auth");
            const AS = JSON.parse(data);
            setState({...state, user: AS.user, token: AS.token})
        }
        loadFromAsyncStorage();
    },[state])

    return ( 
        <AuthContext.Provider value={{state,setState}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;