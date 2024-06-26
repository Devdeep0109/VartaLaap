import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {

  const [loading ,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const  signup = async({fullName ,username , password ,confirmPassword ,gender}) =>{
    const success = handleInputError({fullName ,username , password ,confirmPassword ,gender})
    
    if(!success)
        return;

    setLoading(true);
    try{
        const res = await fetch("/api/auth/signup",{
            method: "POST",
            headers : {"Content-type" : "application/json"},
            body: JSON.stringify({fullName ,username , password ,confirmPassword ,gender})
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        //local storage
        localStorage.setItem("chat-user" ,JSON.stringify(data));
        //context
        setAuthUser(data);
    }
    catch(error){
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
  }
  return {loading ,signup};

}

export default useSignUp;


//handleinputsError

function handleInputError({fullName ,username , password ,confirmPassword ,gender}){

    if(!fullName || !username || !password || !confirmPassword  || !gender){
        toast.error("Please fill all the fields");
        return false;    
    }

    if(password !== confirmPassword){
        console.log("me giving these error");
        toast.error("password donot match to confirm password");
        return false
    }
    if(password.length < 6){
        toast.error("password must be of 6 characters");
        return false
    }
    return true;
}
