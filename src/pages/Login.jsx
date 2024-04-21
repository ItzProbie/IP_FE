import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Requests from "../api/ApiList";
import { useToast } from "../components/ui/use-toast";
import Loader from "../components/loader";
const Login = () => {

    const [ showPassword, setShowPassword ] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        localStorage.clear();
    }, []);

    function inputValidation(){
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
        }
        return true;
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        if(inputValidation()){

            setLoading(true);

           try{

                const payload = {
                    email : email , password : password
                };

                const data = await Requests.login(payload);

                if(data.data.success){
                    toast({
                        title: "Welcome Back",
                        description: "Logged In Successfully",
                        
                      });
                    localStorage.setItem('userToken' , data.data.token);
                    localStorage.setItem('userEmail' , email);
                    localStorage.setItem('userImage' , data.data.dp);
                    navigate("/home");
                }

           }catch(err){
                if(err.message.includes('404')){
                    toast({
                        variant : "destructive",
                        title: "User not registered",
                        description: "Please SignUp first",
                        
                    });
                }
                else if(err.message.includes('401')){
                    toast({
                        variant : "destructive",
                        title: "Invalid Login Credentials",                        
                    });
                }
                else{
                    toast({
                        variant : "destructive",
                        title: "Error",
                        description : "Something went wrong please try again later"                        
                    });
                }
           }
           finally{
            setLoading(false);
           }

        }




    }

    return (
        <div>
            {
                loading ? (<Loader/>) :
                (

                    <div className="flex flex-col items-center justify-center min-h-[80vh]">
                        <div className="flex flex-col items-start gap-5 min-h-[50vh] min-w-[28vw] m-14 p-14 
                        shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">

                            <Label htmlFor="email" className="text-lg" name="email" value={email}>Email ID</Label>
                            <Input type="email" placeholder="Email" id="email" className="text-lg" onChange={(e) => setEmail(e.target.value)}></Input>
                            <Label htmlFor="password" className="text-lg" name="password" value={password}>Password</Label>
                            <Input type={showPassword ? "text" : "password"} placeholder="Password" id="password" className="text-lg" onChange={(e) => setPassword(e.target.value)}></Input>
                            <Button className="text-lg m-y-3" onClick={onSubmitHandler}>Submit</Button>

                        </div>
                </div>

                )
            }
        </div>
    );
};
export default Login;