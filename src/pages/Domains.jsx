import { useContext , useEffect } from "react";
import * as React from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const Domains = () => {

    const {domains , fetchDomains} = useContext(AppContext);
    const {loading} = useContext(AppContext);

    useEffect(() => {

        if(domains.length===0)fetchDomains();
    },[]);

    return (
        <>
            {
                loading ? (<Loader/>) : (
                    <>

                        {
                            (localStorage.getItem("userRole")==="Teacher" || localStorage.getItem("userRole")==="Admin") && (
                                
                                <div className="flex flex-row justify-around items-center m-5 p-5 mr-14 ml-14 border border-1 rounded-full translate-y-20">
                                    <Link to="/internship/createInternship"><Button className="bg-[#02c69f]">Create Internship</Button></Link>
                                    <Link to="/domain/createDomain"><Button className="bg-[#02c69f]">Create Domain</Button></Link>
                                    {
                                        localStorage.getItem("userRole")==="Admin" && <Link to="/domain/deleteDomain"><Button className="bg-[#02c69f]">Delete Domain</Button></Link>
                                    }
                                </div>

                            )
                        }

                    <div className="w-11/12 flex flex-row justify-start items-center m-14 p-14 gap-4 flex-wrap">
                        
                        {
                            domains.map((i) => {return(
                            
                                <Card className="w-[350px]" key={i._id}>
                                    <CardHeader>
                                        <CardTitle>Domain</CardTitle>
                                        <CardDescription>{`${i.name}`}</CardDescription>
                                    </CardHeader>
                                    
                                </Card>
                                
                            )})
                        }
                    </div>
                    </>

                )
            }
        </>
    ); 

}

export default Domains;