import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Requests from "../api/ApiList";
import { useToast } from "../components/ui/use-toast";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Calendar } from "../components/ui/calendar";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../components/ui/input-otp"

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
    const [otp , setOtp] = useState('');
    const { toast } = useToast();

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

        let payload = {
            firstName , lastName , email , password , id : regId , mentor : mentorEmail , dept , otp : parseInt(otp)
        };
        console.log(payload);
        try{

            
            const data = await Requests.signup(payload);
    
            console.log(data);

        }catch(err){
            console.log(err);
            console.log(otp);
        }


    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        if(validInputs()){

            let payload = {
                email
            }

            try{

                let otpResponse = await Requests.sendotp(payload);
                console.log(otpResponse);

                if(otpResponse.data.success){
                    setIsOTPSent(true);
                }

            }catch(err){
                console.log(err);
                toast({
                    variant : "destructive",
                    title: "OTP Not Sent",                         
                });
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

    useEffect(() => {

    }, [role]);

    return(
        <>
        {
            isOTPSent ? (
            
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

                                <div className="flex flex-col justify-center items-start gap-y-4">
                                    <Label className="text-base">Date Of Birth</Label>
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow"
                                    />
                                </div>

                                <div className="flex flex-col justify-center items-center min-w-[30%] min-h-[90%] gap-y-4 mb-7">
                                    
                                    {/* <Label className="text-base">Role</Label>
                                    <RadioGroup value={role} onChange={(value) => {console.log(value)}}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Student" id="r1" />
                                            <Label htmlFor="r1" className="text-base">Student</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Teacher" id="r2" />
                                            <Label htmlFor="r2" className="text-base">Teacher</Label>
                                        </div>
                                    </RadioGroup> */}
                                    
                                    
                                    <div className="flex flex-col justify-between items-center">
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

                                    <div className="flex flex-col justify-between items-center">
                                        <Label className="text-base mb-3">Department</Label>
                                        <div className="flex justify-around items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="ETCCheckbox"
                                            name="ETC"
                                            checked={dept === "ETC"}
                                            onChange={handleChangeDept}
                                            className="text-base rounded-full appearance-none border border-gray-300 h-3 w-3 flex-shrink-0 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 "
                                            />
                                        <Label htmlFor="studentCheckbox" className="text-base">ETC</Label>
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
                                        <Label htmlFor="teacherCheckbox" className="text-base">IT </Label>
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
                                        <Label htmlFor="teacherCheckbox" className="text-base">CS </Label>
                                    </div>
                                        
                                       
                                    

                                    {/* <Label className="text-base">Department</Label>

                                    <RadioGroup defaultValue="ETC" onChange={((value) => setDept(value))}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ETC" id="r1" />
                                            <Label htmlFor="r1" className="text-base">ETC</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="IT" id="r2" />
                                            <Label htmlFor="r2" className="text-base">IT</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CS" id="r3" />
                                            <Label htmlFor="r3" className="text-base">CS</Label>
                                        </div>
                                    </RadioGroup> */}

                                </div>

                            </div>

                            
                            <Label htmlFor="email" className="text-base" name="email" value={email}>Email ID</Label>
                            <Input type="email" placeholder="Email" id="email" className="text-lg" onChange={(e) => setEmail(e.target.value)}></Input>
                            <Label htmlFor="password" className="text-base" name="password" value={password}>Password</Label>
                            <Input type="text" placeholder="Password" id="password" className="text-lg" onChange={(e) => setPassword(e.target.value)}></Input>
                            
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
    );

};

export default Signup;