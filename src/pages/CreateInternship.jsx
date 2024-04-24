import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useState , useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "../lib/utils"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea"
 


const CreateInternship = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [domain , setDomain] = useState();
    const [description , setDescription] = useState();
    const {domains , fetchDomains} = useContext(AppContext);
    const {loading , setLoading} = useContext(AppContext);
    const {toast} = useToast();
    const navigate = useNavigate();
    

    const onSubmitHandler = async() => {
        if(domain===""){

            toast({
                variant : "destructive",
                title: "Invalid Domain",
                description: "Please select a domain",
            });
            return;

        }

        const payload = {
            domain , startDate , endDate , description
        };

        try{

            setLoading(true);

            const data = await Requests.createInternship(payload);

            toast({
                title: "Internship Created Successfully",
            });
            navigate("/home");

        }catch(err){

            toast({
                variant : "destructive",
                title: "Error",
                description: "Please try again",
            });
            console.log(err);

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {

        if(domains.length===0)fetchDomains();
    },[]);



    return (

        <div className="flex flex-col items-center justify-center min-h-[80vh]">
                        <div className="flex flex-col items-start gap-5 min-h-[50vh] min-w-[28vw] m-14 p-14
                        shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">

                            <Label className="text-base">Domain</Label>
                            <Select onValueChange={(val) => setDomain(val)}>
                            <SelectTrigger className="w-[180px] text-base">
                                <SelectValue placeholder="Select a domain"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Domains</SelectLabel>
                                    {
                                        domains.map((i) => {
                                            return <SelectItem key={i._id} value={i.name}>{`${i.name}`}</SelectItem>;
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                            </Select> 

                            <Label htmlFor="description" >Description or Problem Statement</Label>
                            <Textarea placeholder="Problem Statement" value={description} onChange = {(e) => setDescription(e.target.value)}/>
                            
                            <Label className="text-base">Start Date</Label>
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>


                            <Label className="text-base">End Date</Label>
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <div className="flex flex-row justify-center items-center min-w-[100%] gap-5">



                            <Button className="text-base m-y-3" onClick={onSubmitHandler}>Submit</Button>

                            </div>

                        </div>
                </div>

    );

};

export default CreateInternship;