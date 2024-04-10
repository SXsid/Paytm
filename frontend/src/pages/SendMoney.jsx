import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import axios from "axios";
import { useState } from "react";

export default function Send(){
    const [params]= useSearchParams()
    const id= params.get('id')
    const name = params.get('name')
    const [amount,setAmount]=useState(0)
    const navigate =useNavigate()
    return(
        
        <div className="grid place-content-center h-screen">
            {amount }{id}
            <div className="w-80 h-auto border-2 border-green-500">
                <br></br>
                <Heading title={"Send Money"}/>
                <br></br>
                <div className="flex">
                    <div className="rounded-full mt-2 h-10 w-10 bg-green-500  flex justify-center mx-3 ">
                        <div className="text-lg font-bold text-white">
                            {name[0]}
                        </div>
                    </div>
                    <div className="text-xl text-white font-bold mx-2 mt-2 pt-1">
                        {name}
                    </div>
                </div>
                <Input onChange={e =>setAmount(e.target.value)}title={"Amount(in Rs)"} placeH={"Enter Amount"}/>
                <div className="flex justify-center my-5 ">
                <div className=" border-2 text-center w-fit p-3 font-medium text-white bg-green-700  rounded-2xl border-white cursor-pointer" onClick={()=>{
                    axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount:amount

                    },{
                        headers:{
                            Authorization:"Bearer "+localStorage.getItem('token')
                        }
                    }).then(async res =>{
                        alert(res.data.message)
                        navigate('/dashboard')
                    })
                }}>
                intiate Transfer
                </div>
                </div>
            </div>
        </div>
    )
}