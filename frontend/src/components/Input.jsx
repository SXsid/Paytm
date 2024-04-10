export default function Input({title,placeH,onChange}){
    return <div className="pt-2 px-4">
        <div className="text-teal-300 text-sm font-medium p-2">{title}</div>
        <input onChange={onChange} className= "border-teal-300  border-2  text-slate-900 rounded-sm w-full" placeholder={placeH}/>
    </div>
}