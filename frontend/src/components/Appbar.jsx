export default function Appbar(){
    return(
        <div className="m-10 border-2 border-teal-300 rounded-md flex justify-between">
            <div className="text-3xl text-teal-300 font-semibold ml-4">PayTM</div>
            <div className="flex mx-3">
                <div className="text-xl text-teal-300 m-3">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-teal-100 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl text-slate-900 text-bold cursor-pointer">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}