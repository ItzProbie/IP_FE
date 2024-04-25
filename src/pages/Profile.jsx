import {
    Avatar,
    AvatarImage,
  } from "../components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"


const Profile = () => {

    const [internships , setInternships] = useState([]);
    const {toast} = useToast();

    async function accepter(props){

        const {studentId , internshipId} = props;

        const payloadA = {
            studentId , internshipId
        };

        try{
            const data = await Requests.acceptIntern(payloadA);

            console.log(data);
            toast({
                title : "Intern Accepted"
            });
        }catch(err){
            console.log(err);
            toast({
                title : "Error"
            });
        }

    }
    async function rejector(props){

        const {studentId , internshipId} = props;

        const payloadA = {
            studentId , internshipId
        };

        try{
            const data = await Requests.rejectIntern(payloadA);

            console.log(data);
            toast({
                title : "Intern Rejected"
            });

            

        }catch(err){
            console.log(err);
            toast({
                title : "Error"
            });
        }

    }

    useEffect(() => {

    const getInternships = async() => {

        try{

            const data = await Requests.getInternshipDetails();

            console.log(data);
            setInternships(data.data.internships);

        }catch(err){
            console.log(err);
        }

    } 
    getInternships(); 
    console.log(internships);


    },[]);

    return (
        <div className="flex flex-col justify-center items-center m-14 p-14 ">
            <div className="flex flex-col justify-center items-center border-2 mb-16 p-16">
            <div className="border-[12px] rounded-full">
                <Avatar className = " h-[8rem] w-[8rem] border border-3 border-white">
                    <AvatarImage src={localStorage.getItem("userImage")} alt="@shadcn" />
                </Avatar>     
            </div>   
            <div className="flex flex-col justify-center items-start">
                <p className="text-xl m-4 p-4 font-bold">{localStorage.getItem("userRole")}</p>
            </div>
            <div className="flex flex-col justify-center items-start p-7">
                <div className="flex flex-col justify-center items-start p-4 m-3">
                    <p className="text-lg font-bold">{`Name : ${localStorage.getItem("userName")}`}</p>
                    <p className="text-lg ">{` ID : ${localStorage.getItem("userId")}`}</p>
                    <p className="text-lg ">{` Email : ${localStorage.getItem("userEmail")}`}</p>
                </div>
            </div>  
            <div className="flex flex-col justify-center items-center gap-7 mb-7">
                <Link to="/login">
                <Button className="text-lg m-y-3" variant="secondary">

                        <span style={{ background: 'radial-gradient(circle at 10% 20%, rgb(210, 36, 129) 0%, rgb(152, 75, 215) 90%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>SignOut</span>

                </Button>
                </Link>
            <span className="text-2xl" style={{ background: 'radial-gradient(circle at 10% 20%, rgb(210, 36, 129) 0%, rgb(152, 75, 215) 90%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Internships</span>    
            </div>

            <div className="w-11/12 flex flex-row flex-wrap justify-start items-stretch gap-4 ">
            {
                internships.map((i) => {return(
                
                   
       
                        <>
                        <Card className="w-[350px] flex-shrink-0 ">
                        <CardHeader>
                            {i.domain.map((j) => {
                                return <CardTitle key={j._id}>{`${j}`}</CardTitle>
                            })}
                            <CardDescription>{`Provider : ${i.createdBy.firstName} ${i.createdBy.lastName}`}</CardDescription>
                            <CardDescription>{`${i.description}`}</CardDescription>
                            {localStorage.getItem("userRole")==="Student" && <CardDescription>{`State : ${i.state}`}</CardDescription> }
                            <CardDescription>Start Date :  {new Date(i.startDate).toLocaleDateString("en-GB")}</CardDescription>
                            <CardDescription>End Date : {new Date(i.endDate).toLocaleDateString("en-GB")}</CardDescription>

                        </CardHeader>


                        <CardFooter >
                        
                        </CardFooter>

                    </Card>

                    
                       {
                        localStorage.getItem("userRole")==="Teacher" && (
                            <Card className="w-[350px] flex-shrink-0 ">
                            <CardHeader>
                                {i.applicants.map((j) => {
                                    return localStorage.getItem("userId") !== j.id && (
                                        <>
                                            <CardTitle>Applicant</CardTitle>
                                            <CardDescription>{`Provider : ${j.firstName} ${j.lastName}`}</CardDescription>
                                            <CardDescription>{`Department : ${j.dept}`}</CardDescription>
                                            <CardDescription>{`ID : ${j.id}`}</CardDescription>
                                            <CardDescription><Button className="m-3" onClick={() => {accepter({internshipId : i._id ,studentId : j._id})}}>Accept</Button><Button onClick={() => {rejector({internshipId : i._id ,studentId : j._id})}}>Reject</Button></CardDescription>
                                        </>
                                    );
                                })}
                            </CardHeader>
    
    
    
                            <CardFooter >
                            
                            </CardFooter>
    
                        </Card>
                        )
                       }
                    </>
                    
                    
                   
                    
                )})
            }
</div>  

            </div>  
 
        </div>
    );
};

export default Profile;