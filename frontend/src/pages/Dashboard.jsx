import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import User from "../components/User";
import axios from "axios";

export default function Dashboard(){
    const[value,setValue]=useState(0)
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        }).then(async(res)=>{
            let value = await res.data.balance
            setValue(value)
        })
    },[])
    return(
        <div >
            <Appbar/>
            <Balance value={value}/>
            <User/>
        </div>
    )
}
