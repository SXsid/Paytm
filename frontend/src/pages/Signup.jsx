import { useState } from "react";
import Bottom from "../components/Bottom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Input from "../components/Input";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export default function Signup(){
    const [firstName,setFirst]= useState("")
    const [lastName,setLast]= useState("")
    const [userName,setUser]= useState("")
    const [password,setPass]= useState("")
    const navigate = useNavigate()
    return(
       <div className="grid place-content-center h-screen ">
        
         <div className="  w-auto h-auto border-4 shadow-sm border-teal-300">
            <Heading  title={"Sign Up"}/>
            <SubHeading title={"Enter your information to create an  acoount"}/>
            <br></br>
            <Input onChange={e=>setFirst(e.target.value)}title={"First Name"} placeH={"aman"}/>
            <Input onChange={e=>setLast(e.target.value)}title={"Last Name"} placeH={"jha"}/>
            <Input onChange={e=>setUser(e.target.value)}title={"Email"} placeH={"amanjha09@gamil.com"}/>
            <Input onChange={e=>setPass(e.target.value)}title={"Paasword"} placeH={123456}/>
            <div className="flex place-content-center">
            <Button onClick={async()=>{
                let res= await axios.post("http://localhost:3000/api/v1/user/signup",{
                    userName,
                    firstName,
                    lastName,
                    password
                })
                alert(res.data.message)
                
                navigate('/signin')
                
            }}title={"Sign up"}/>
            </div>
            <Bottom title={"Already have an account?"} to={"/signin"} path={"sign in"}/>

        </div>
       </div>
    )
}