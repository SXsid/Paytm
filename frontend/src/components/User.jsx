import { useEffect, useState } from "react";
import Input from "./Input";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function useDebounce (input){
  const [debounce,setDebounce]= useState(input)
  useEffect(()=>{
    let id =setTimeout(()=>{
        setDebounce(input)
    },500)
    return ()=>{
      clearTimeout(id)
    }
  },[input])

  return debounce;
}

export default function User(){
    const [users,setUsers]= useState([])
    const [input,setInput] = useState("")
    const debounce = useDebounce(input)
    
    useEffect( ()=>{
       async function user(){
        let res= await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+debounce,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')

            }
        })
        setUsers(()=>[...res.data.users])
       }
       user()


    },[debounce])
    return(
        <div className="mt-5 mx-12 px-4">
            <Input onChange={e=>setInput(e.target.value)}title={"Users"} placeH={"Search users"}/>
            {users.map(user=><Users user={user}/>)}
        </div>
    )
}
function Users({user}){
    const navigate = useNavigate()
    return(
        <div className="flex justify-between mt-5 mx-5 ">
            <div className="flex">
                <div className="flex justify-center bg-teal-100 rounded-full mt-1 pt-1 h-10 w-10">
                    <div className="text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="text-teal-300 underline mt-2 px-2">
                        {user.firstName} {user.lastName}
                </div>


            </div>
            <div onClick={()=>{
                navigate('/send?id='+user._Id+'&name='+user.firstName)
            }}className=" border-2 text-center w-fit p-3 font-medium text-teal-300 bg-transparent rounded-2xl border-teal-300 cursor-pointer">
                Send Money
            </div>

        </div>
    )
}
