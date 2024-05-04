import {
    Avatar,
    AvatarImage,
  } from "../components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState,Suspense } from "react";
import { useToast } from "../components/ui/use-toast";
import Requests from "../api/ApiList";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
import { PiImagesFill } from "react-icons/pi";
import { Input } from "../components/ui/input";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loader from "../components/loader";
import FormData from 'form-data';
import { CloudCog } from "lucide-react";


const Profile = () => {

    const [internships , setInternships] = useState([]);
    const {toast} = useToast();
    const [file , setFile] = useState();
    const {loading , setLoading} = useContext(AppContext);

    const handleDPChange = (prop) => {

        const handlefilesubmit = async() => {

            const formData = new FormData();
            console.log(prop.files[0])
            formData.append('image', prop.files[0])
            console.log(formData)
            try{
                const res = await Requests.changedp(formData)
                localStorage.setItem('userImage', res.data.user.image)
                toast({
                  title : "Profile picture updated !"  
                });
            }catch(error){
console.log(error) ;        
toast({
    title : "There was an error !"  ,
    variant : 'destructive'
  })   }
        }
        handlefilesubmit()
        // setFile();
    }

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
    setLoading(true);

    const getInternships = async() => {

        try{

            const data = await Requests.getInternshipDetails();

            console.log(data);
            setInternships(data.data.internships);

        }catch(err){
            console.log(err);
        }finally{
            
        }

    } 
    getInternships(); 
    console.log("Internships");
    console.log(internships);
    setLoading(false);

    },[]);
    console.log(internships);
    return (
        <>
        <Suspense fallback={<Loader/>}> 
        {
            internships ? (

                <div className="flex flex-col justify-center items-center m-14 md:p-14 py-4">
            <div className="flex flex-col justify-center items-center border-2 mb-16 md:p-16 py-4">
            <div className="border-[12px] rounded-full">
                <Avatar className = " h-[8rem] w-[8rem] border border-3 border-white">
                    <AvatarImage src={localStorage.getItem("userImage")} alt="@shadcn" />
                </Avatar>     
            </div> 
            <span className="translate-x-14 -translate-y-14 h-6 w-6 hover:scale-150 transition-all transition cursor-pointer" ><PiImagesFill className="h-7 w-7" color="violet"/><Input type='file' accept="image/*" className=" -translate-y-8 border-none" name="image" onChange={(e) => handleDPChange(e.target)}/></span>
            <div className="flex flex-col justify-center items-start">
                <p className="text-xl m-4 p-4 font-bold text-blue-300">{localStorage.getItem("userName")}</p>
            </div>
            <div className="flex flex-col justify-center items-start p-7">
                <div className="flex flex-col justify-center items-start p-4 m-3">
                    <p className="text-lg ">{`Role : ${localStorage.getItem("userRole")}`}</p>
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

            <div className="w-11/12 flex flex-row flex-wrap justify-evenly items-stretch gap-4 ">
            {
                internships.map((i) => {return(
                
                   
       
                        <>
                        <Card className="w-[350px] h-[fit-content] my-auto text-center flex-shrink-0 ">
                        <CardHeader className='!h-[fit-content] my-auto'>
                            <CardTitle>{`${i.domain[0]}`}</CardTitle>
                            <CardDescription>{`Provider : ${i.createdBy.firstName} ${i.createdBy.lastName}`}</CardDescription>
                            <CardDescription>{`ID : ${i.createdBy.id}`}</CardDescription>
                            <CardDescription>{`${i.description}`}</CardDescription>
                            {localStorage.getItem("userRole")==="Student" && <CardDescription className='flex flex-row mx-auto'>State : <p className={`${i.state === "accepted" ? 'text-green-400': i.state === 'rejected' ? 'text-red-700' : 'text-yellow-300'}`}>{i.state}</p></CardDescription> }
                            <CardDescription><b className="text-blue-400">Start Date </b>:  {new Date(i.startDate).toLocaleDateString("en-GB")}</CardDescription>
                            <CardDescription><b className="text-blue-400">End Date </b>: {new Date(i.endDate).toLocaleDateString("en-GB")}</CardDescription>

                        </CardHeader>


                        <CardFooter >
                        
                        </CardFooter>

                    </Card>

                    <div className="h-[250px] overflow-y-scroll border-2 rounded-md my-4">

                       {
                           localStorage.getItem("userRole")==="Teacher" && (
                               <Card className="w-[350px] flex-shrink-0 ">
                            <CardHeader className='border-none my-2'>
                                {i.applicants.map((j) => {
                                    return localStorage.getItem("userId") !== j.id && (
                                        <div className='flex flex-col  items-center border-2 rounded shadow-md justify-evenly mb-4'>
                                            <CardTitle className='border-t-2 border-b-2 w-[100%] text-center border-slate-400 py-2 my-2 text-sky-200'>Applicant</CardTitle>
                                            <CardDescription>Provider : {` ${j.firstName} ${j.lastName}`}</CardDescription>
                                            <CardDescription>{`Department : ${j.dept}`}</CardDescription>
                                            <CardDescription>{`ID : ${j.id}`}</CardDescription>
                                            <CardDescription className='flex flex-row'>State : <p className={`${j.state === "accepted" ? 'text-green-400': j.state === 'rejected' ? 'text-red-700' : 'text-yellow-300'}`}>{j.state}</p></CardDescription>
                                            <CardDescription><Button className="m-3" onClick={() => {accepter({internshipId : i._id ,studentId : j._id})}}>Accept</Button><Button onClick={() => {rejector({internshipId : i._id ,studentId : j._id})}}>Reject</Button></CardDescription>
                                        </div>
                                    );
                                })}
                            </CardHeader>
    
    
    
                            <CardFooter >
                            
                            </CardFooter>
    
                        </Card>
                        )
                    }
                    </div>
                    </>
                    
                    
                   
                    
                )})
            }
            {
                internships.map((i) => {return(
                
                   
       
                        <>
                      <Card className="w-[350px] h-[fit-content] my-auto text-center flex-shrink-0 ">
                        <CardHeader>
                            {/* {i.domain.map((j) => {
                                return <CardTitle key={j._id}>{`${j}`}</CardTitle>
                            })} */}
                            <CardTitle>{`${i.domain[0]}`}</CardTitle>
                            <CardDescription>{`Provider : ${i?.createdBy.firstName} ${i?.createdBy.lastName}`}</CardDescription>
                            <CardDescription>{`${i?.description}`}</CardDescription>
                            {localStorage.getItem("userRole")==="Student" && <CardDescription className='flex flex-row mx-auto'>State : <p className={`${i.state === "accepted" ? 'text-green-400': i.state === 'rejected' ? 'text-red-700' : 'text-yellow-300'}`}>{i.state}</p></CardDescription>}
                            <CardDescription><b className="text-blue-400">Start Date </b>:  {new Date(i.startDate).toLocaleDateString("en-GB")}</CardDescription>
                            <CardDescription><b className="text-blue-400">End Date </b>: {new Date(i.endDate).toLocaleDateString("en-GB")}</CardDescription>

                        </CardHeader>


                        <CardFooter >
                        
                        </CardFooter>

                    </Card>

                    <div className="h-[240px] overflow-y-scroll border-2 rounded-md my-4">

                       {
                           localStorage.getItem("userRole")==="Teacher" && (
                               <Card className="w-[350px] flex-shrink-0 ">
                            <CardHeader>
                                {i.applicants.map((j) => {
                                    return localStorage.getItem("userId") !== j.id && (
                                        <div className='flex flex-col  items-center border-2 rounded shadow-md justify-evenly mb-4'>
                                                                                    <CardTitle className='border-t-2 border-b-2 w-[100%] text-center border-slate-400 py-2 my-2 text-sky-200'>Applicant</CardTitle>
                                            <CardDescription>{`Provider : ${j.firstName} ${j.lastName}`}</CardDescription>
                                            <CardDescription>{`Department : ${j.dept}`}</CardDescription>
                                            <CardDescription>{`ID : ${j.id}`}</CardDescription>
                                            <CardDescription className='flex flex-row'>State : <p className={`${j.state === "accepted" ? 'text-green-400': j.state === 'rejected' ? 'text-red-500' : 'text-yellow-300'}`}>{j.state}</p></CardDescription>
                                            <CardDescription><Button className="m-3" onClick={() => {accepter({internshipId : i._id ,studentId : j._id})}}>Accept</Button><Button onClick={() => {rejector({internshipId : i._id ,studentId : j._id})}}>Reject</Button></CardDescription>
                                        </div>
                                    );
                                })}
                            </CardHeader>
    
    
    
                            <CardFooter >
                            
                            </CardFooter>
    
                        </Card>
                        )
                    }
                    </div>
                    </>
                    
                    
                   
                    
                )})
            }
</div>  

            </div>  
 
        </div>

): <Loader/>
}
</Suspense>
        </>
    );
};

export default Profile;