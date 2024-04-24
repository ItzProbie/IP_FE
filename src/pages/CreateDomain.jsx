import { useContext, useState } from "react";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/loader";

const CreateDomain = () => {

    const [domain , setDomain] = useState("");
    const {loading} = useContext(AppContext);
    const {toast} = useToast();
    const navigate = useNavigate();

    const onSubmitHandler = async() => {
       
        if(domain.length<2){
            toast({
                variant : "destructive",
                title: "Invalid Domain Name",
                description: "Please enter a valid domain name",
            });
            return;
        }

        const payload = {
            name : domain
        }

        try{
            const data = await Requests.createdomain(payload);
            console.log(data.data);

            toast({
                title: "Domain Created Successfully",
            });

            navigate("/home");

        }catch(err){

            if(err.message.includes("401")){
                navigate("/login");
                return;
            }

            if(err.message.includes("403")){
                toast({
                    variant : "destructive",
                    title: "Domain Exists",
                    description: "Cant create duplicate Domains",
                });
            }

            toast({
                variant : "destructive",
                title: "Error",
                description: "Please try again",
            });
            console.log(err);
        }



    }

    return (

        <>
        {
            loading ? (<Loader/>) : 
            (<div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="flex flex-col items-center justify-center gap-5 min-h-[50vh] min-w-[28vw] m-14 p-14
            shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">
                
                <Label htmlFor="domainName" className="text-lg">Domain Name</Label>
                <Input value = {domain} onChange = {(e) => setDomain(e.target.value)} placeholder="Domain Name"/>
                
                <div className="flex flex-row justify-center items-center min-w-[100%] gap-5">

                <Button className="text-base m-y-3" onClick={onSubmitHandler}>Submit</Button>

                </div>

            </div>
    </div>)

    }
    </>

    );

};

export default CreateDomain;