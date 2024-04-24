import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "../components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Calendar } from "../components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../components/ui/popover"
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";


const Internships = () => {

    const {internships , fetchInternships} = useContext(AppContext);
    const [internshipId , setInternshipId] = useState("");
    const {loading , applications , setLoading , setApplications} = useContext(AppContext);
    const navigate = useNavigate();
    const {toast} = useToast();

    useEffect(() => {
        if(internships.length===0)fetchInternships();
    })

    const handleApply = async() => {

        try{

            if(localStorage.getItem("userRole")!=="Student"){
                toast({
                    variant : "destructive",
                    title: "Only Students can apply",
                });
                return;
            }


            setLoading(true);
            console.log(internshipId);
            const data = await Requests.applyInternship({internshipId : internshipId});
            console.log(data);

            toast({

                title: "Applied Successfully",

            });

            setApplications(...applications , internshipId);
            navigate("/home");

        }catch(err){
            if(err?.message.includes("405")){
                toast({
                    variant : "destructive",
                    title: "Error",
                    description: "User Already registered",
                });
            }
            else if(err?.message.includes("401")){
                navigate("/login");
            }else{
                toast({
                    variant : "destructive",
                    title: "Error",
                    description: "Please try again",
                });
                console.log(err);
            }

        }finally{
            setLoading(false);
        }

    }

    return(
        <>
       {
        loading ? (<Loader/>) : (


            <div className="flex justify-center items-center mt-11">
       {
            loading ? (<Loader/>) :  (
            <div className="w-11/12 flex flex-row flex-wrap justify-start items-stretch gap-4 ">
                        
            {
                internships.map((i) => {return(
                
                   
                    i.State && (
                        <Card className="w-[350px] flex-shrink-0 " key={i._id}>
                        <CardHeader>
                            {i.domain.map((j) => {
                                return <CardTitle key={j._id}>{`${j.name}`}</CardTitle>
                            })}
                            <CardDescription>{`Mentor : ${i.createdBy.firstName} ${i.createdBy.lastName}`}</CardDescription>
                            <CardDescription>{`${i.description}`}</CardDescription>
                            <CardDescription>{new Date(i.startDate).toLocaleDateString("en-GB")}</CardDescription>
                            <CardDescription>{new Date(i.endDate).toLocaleDateString("en-GB")}</CardDescription>

                        </CardHeader>


                        <CardFooter >
                        <Popover>
                            <PopoverTrigger asChild>
                                {
                                    localStorage.getItem("userRole")==="Student" && (<Button onClick={() => setInternshipId(i._id)} >Apply</Button>)
                                }
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Apply</h4>
                                    <p className="text-sm text-muted-foreground">
                                    Are you sure you want to apply for this internship
                                    </p>
                                    <Button onClick={() =>  handleApply() } variant="secondary" className=" hover:bg-[#02c69f]">Yes</Button>
                                </div>
                                
                                </div>
                            </PopoverContent>
                            </Popover>
                        </CardFooter>

                    </Card>
                    )
                   
                    
                )})
            }
</div>)
       }
       </div>

        )
       }
       </>
    )





};

export default Internships;