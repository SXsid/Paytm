export default function Balance({value}){
    
    return(
        <div className="flex my-5 mx-10 px-5 ">
            <div className="text-lg text-teal-300 font-medium px-4">Your balance :</div>
            <div className="text-lg text-teal-300 font-medium underline">{value}</div>
        </div>
    )
}