import Bottom from "../components/Bottom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Input from "../components/Input";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Signin(){
    const [userName,setUser]= useState("")
    const [password,setPass]= useState("")
    const navigate = useNavigate()
    return(
        <div className="grid place-content-center h-screen ">
            <div className="  w-auto h-auto border-4 shadow-sm border-teal-300">
            <Heading  title={"Sign in"}/>
            <SubHeading title={"Enter your credentials to access your acoount"}/>
            <br></br>
            <Input onChange={e=>setUser(e.target.value)} title={"Email"} placeH={"amanjha09@gmail.com"}/>
            <Input onChange={e=>setPass(e.target.value)} title={"Paasword"} placeH={123456}/>
            <div className="flex place-content-center">
            <Button href={"http://localhost:5173/dashboard"}onClick={async ()=>{
                let res= await axios.post("http://localhost:3000/api/v1/user/signin",{
                    userName,
                    password
                })
                localStorage.setItem("token",res.data.token)
                navigate('/dashboard')
            }}title={"Sign in"}/>
            </div>
            <Bottom title={"Dont't have an account?"} to={"/signup"} path={"sign up"}/>
           </div>

       </div>

    )
}