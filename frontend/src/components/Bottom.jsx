import { Link } from "react-router-dom";

export default function({title,path,to}){
    return(
       <div className="flex justify-center pt-1 ">
             <div className=" text-white text-md  ">
            {title}
            </div>
            <Link className="text-teal-300 pl-2 underline"to={to}>{path}</Link>
       </div>
    )
}