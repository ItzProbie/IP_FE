import { createContext , useState } from "react";
import Requests from "../api/ApiList";

export const AppContext = createContext();

export default function AppContextProvider({children})
{

    const [domains , setDomains] = useState([]);
    const [internships , setInternships] = useState([]);
    const [applications , setApplications] = useState([]);
    const [loading , setLoading] = useState(false);
    
    
    async function fetchDomains(){

        setLoading(true);
        try{

            const data = await Requests.getDomains();
            setDomains(data.data.domain);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    async function fetchInternships(){

        setLoading(true);
        try{
            const data = await Requests.getInternship();
            
            setInternships(data.data.internships);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
        

    }

    const value = {
        loading , domains , setDomains , fetchDomains , setLoading , internships , setInternships , fetchInternships , applications , setApplications
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}