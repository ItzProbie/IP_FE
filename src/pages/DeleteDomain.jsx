import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";
import { useNavigate } from "react-router-dom";

const DeleteDomain = () => {

    const [domain , setDomain] = useState("");
    const {toast} = useToast();
    const navigate = useNavigate();

    const onSubmitHandler = async() => {

        try{

            const data = await Requests.deleteDomain(domain);
            console.log(data);
            toast({
                variant : "destructive",
                title: "Domain Deleted Successfully",
            });
            navigate("/domains")

        }catch(err){
            console.log(err);
            if(err.message.includes("404")){
                toast({
                    title: "Invalid Domain Name",
                    description: "Domain does not exist",
                });
            }else{
                toast({
                    variant : "destructive",
                    title: "Error",
                    description: "Please try again",
                });
            }
        }

    }


    return (

        <div className="flex justify-center items-center m-14 p-14">
            
            <div className="border border-1 flex-col justify-center items-center gap-5 min-h-[50vh] min-w-[28vw] m-7 p-7">
            
            <Label htmlFor="domainName" className="">Domain Name</Label>
            <Input value = {domain} onChange = {(e) => setDomain(e.target.value)} placeholder="Domain Name"/>
            <Button onClick={onSubmitHandler}>Submit</Button>

            </div>

        </div>

    );
};

export default DeleteDomain;