import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState , useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Requests from "../api/ApiList";
import { useToast } from "../components/ui/use-toast";
import Loader from "../components/loader";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../components/ui/input-otp"
import { AppContext } from "../context/AppContext";

const Signup = () => {

    const [email , setEmail] = useState('');
    const [mentorEmail , setMentorEmail] = useState('');
    const [password , setPassword] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [regId , setRefId] = useState('');
    const [date , setDate] = useState(new Date());
    const [dept, setDept] = useState('ETC');
    const [role , setRole] = useState("Student");
    const [isOTPSent , setIsOTPSent] = useState(false);
    const {loading , setLoading} = useContext(AppContext);
    const [otp , setOtp] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();

    function validInputs(){
        
        if (email === "") {
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials", 
                description : "Confirm your Email"                         
            });
            return false;
        } else if (!email.includes("@")) {
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Email"                       
            });
            return false;
        } else if(role === "Student" && mentorEmail === ""){
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials", 
                description : "Confirm your Mentor's Email"                         
            });
            return false;
        } else if (role === "Student" && !mentorEmail.includes("@")) {
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Mentor's Email"                       
            });
            return false;
        } else if (password === "") {
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Password"                     
            });
            return false;
        } else if (password.length < 6) {
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Password"                     
            });
            return false;
        }else if(firstName === "" || lastName === ""){
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Name"                     
            });
            return false;
        }else if(regId === ""){
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Registration ID"                     
            });
            return false;
        }else if(date === ""){
            toast({
                variant : "destructive",
                title: "Invalid Login Credentials",   
                description : "Confirm your Birth Date"                     
            });
            return false;
        }
        return true;

    }

    const submitOTPHandler = async() => {
        
        if(otp.length !== 6){
            toast({
                variant : "destructive",
                title: "Invalid OTP", 
                description : "Confirm Your OTP"                         
            });
            return;
        }

        let payloadOTP = {
            firstName , lastName , email , password , id : regId , mentor: (role === "Student") ? mentorEmail : undefined, dept , otp  , role
        };
        console.log(payloadOTP);
        try{
            setLoading(true);
            
            const data = await Requests.signup(payloadOTP);
    
            console.log(data);

            if(data.data.success){
                toast({
                    title : "Registration Successfull"
                });
                navigate("/login");
            }

        }catch(err){
            console.log(err);
            if(err.message.includes('404')){
                toast({
                    variant : "destructive",
                    title: "Invalid Data",      
                });
            }
           else{
            toast({
                variant : "destructive",
                title: "Error",
                description: "Something went wrong , plz try again later",
                
            });

           }

        }
        finally{
            setLoading(false);
        }


    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        if(validInputs()){

            let payload = {
                email
            }

            try{
                setLoading(true);
                console.log(otp);
                let otpResponse = await Requests.sendotp(payload);
                console.log(otpResponse);

                if(otpResponse.data.success){
                    setIsOTPSent(true);
                    toast({
                        title : "OTP Sent"
                    });
                }

            }catch(err){
                console.log(err);
                if(err.message.includes('401')){
                    toast({
                        variant : "destructive",
                        title: "Registered User",
                        description: "Please Login",
                    });
                    navigate("/login");
                }
                else{
                    toast({
                        variant : "destructive",
                        title: "OTP Not Sent",                         
                    });
                }
            }finally{
                setLoading(false);
            }

        }
    }

    const handleChangeRole = (e) => {
        const { name } = e.target;
        if (name === "Student") {
          setRole("Student");
        } else if (name === "Teacher") {
          setRole("Teacher");
        }
      };

    const handleChangeDept = (e) => {
        const { name } = e.target;
        if (name === "ETC") {
          setDept("ETC");
        } else if (name === "IT") {
          setDept("IT");
        }else if (name === "CS") {
          setDept("CS");
        }
      };


    return(
        <>
        {    
            loading ? (<Loader/>) : (
            <>
            {
                isOTPSent ? (
                // OTP-PAGE
                <div className="flex flex-col items-center justify-center min-h-[80vh] gap-y-11">
                    <Label className="text-xl">Enter Your OTP</Label>
                    <InputOTP maxLength={6} value = {otp} onChange = {((e) => setOtp(e))}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                    </InputOTP>

                    <Button className="text-lg" onClick={submitOTPHandler}>Submit</Button>
                </div>) : (
                    <div>
                
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                            <div className="flex flex-col items-start gap-5 min-h-[50vh] min-w-[28vw] m-14 p-14
                            shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">

                                <div className="flex flex-col md:flex-row justify-start items-center gap-5">

                                    <div className="flex flex-col justify-center items-start gap-y-4">

                                        <Label htmlFor="firstname" className="text-base" name="firstname" value={firstName}>First Name</Label>
                                        <Input type="text" placeholder="First Name" id="firstname" className="text-lg" onChange={(e) => setFirstName(e.target.value)}></Input>

                                    </div>
                                    <div className="flex flex-col justify-center items-start gap-y-4">

                                        <Label htmlFor="lastname" className="text-base" name="lastname" value={lastName}>Last Name</Label>
                                        <Input type="text" placeholder="Last Name" id="lastname" className="text-lg" onChange={(e) => setLastName(e.target.value)}></Input>

                                    </div>
                                
                                

                                </div>

                                
                                
                                
                                <Label htmlFor="regId" className="text-base" name="regId" value={regId}>Registration ID</Label>
                                <Input type="text" placeholder="Registration Id" id="regId" className="text-lg" onChange={(e) => setRefId(e.target.value)}></Input>

                                <div className="flex flex-col md:flex-row justify-start items-center gap-14">


                                    <div className="flex flex-col md:flex-row justify-between items-center gap-[100%] gap-y-4 mb-7">                                  
                                        
                                        {/* Department */}
                                        <div>

                                            <div className="flex flex-col justify-between items-center">
                                                <Label className="text-base mb-3">Department</Label>
                                                <div className="flex justify-around items-center gap-[27px] ">
                                                <input
                                                    type="checkbox"
                                                    id="ETCCheckbox"
                                                    name="ETC"
                                                    checked={dept === "ETC"}
                                                    onChange={handleChangeDept}
                                                    className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 "
                                                    />
                                                <Label htmlFor="ETCCheckbox" className="text-base">ETC</Label>
                                                </div>
                                            </div>
                                                
                                            <div className="flex justify-around items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="ITCheckbox"
                                                    name="IT"
                                                    checked={dept === "IT"}
                                                    onChange={handleChangeDept}
                                                    className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                                                    />
                                                <Label htmlFor="ITCheckbox" className="text-base">{`IT `}</Label>
                                            </div>
                                                
                                            <div className="flex justify-around items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="CSCheckbox"
                                                    name="CS"
                                                    checked={dept === "CS"}
                                                    onChange={handleChangeDept}
                                                    className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                                                    />
                                                <Label htmlFor="CSCheckbox" className="text-base">{`CS `}</Label>
                                            </div>

                                        </div>

                                        {/* Role */}
                                        <div>
                                            
                                            <div className="flex flex-col justify-between items-start -translate-y-[12%]">
                                                <Label className="text-base mb-3">Role</Label>
                                                <div className="flex justify-around items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="studentCheckbox"
                                                    name="Student"
                                                    checked={role === "Student"}
                                                    onChange={handleChangeRole}
                                                    className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 "
                                                    />
                                                <Label htmlFor="studentCheckbox" className="text-base">Student</Label>
                                                </div>
                                            </div>
                                                
                                            <div className="flex justify-around items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="teacherCheckbox"
                                                    name="Teacher"
                                                    checked={role === "Teacher"}
                                                    onChange={handleChangeRole}
                                                    className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                                                    />
                                                <Label htmlFor="teacherCheckbox" className="text-base">Teacher</Label>
                                            </div>

                                        </div>
                                            
                                    </div>

                                </div>

                                
                                <Label htmlFor="email" className="text-base" name="email" value={email}>Email ID</Label>
                                <Input type="email" placeholder="Email" id="email" className="text-lg" onChange={(e) => setEmail(e.target.value)}></Input>
                                <Label htmlFor="password" className="text-base" name="password" value={password}>Password</Label>
                                <Input type="password" placeholder="Password" id="password" className="text-lg" onChange={(e) => setPassword(e.target.value)}></Input>
                                
                                {
                                    role === "Student" && (
                                        <>
                                            <Label htmlFor="mentorEmail" className="text-base" name="mentorEmail" value={mentorEmail}>Mentor's Mail ID</Label>
                                            <Input type="email" placeholder="Mentor's Mail ID" id="mentorEmail"  className="text-lg" onChange={(e) => setMentorEmail(e.target.value)}></Input>
                                        </>
                                    )                             
                                }

                                <div className="flex flex-row justify-center items-center min-w-[100%] gap-5">
                                <Button className="text-lg m-y-3" onClick={onSubmitHandler}>Submit</Button>
                                </div>

                            </div>
                    </div>

            </div>
                )
            }
            </>
    )}
        </>
    );

};

export default Signup;