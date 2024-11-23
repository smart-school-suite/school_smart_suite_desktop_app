import { useState } from "react"
function Scrollableinput(){
    const [ selectedList, setSelectedList ] = useState([ {
        id:"sec1",
        lable:"Lable one"
    }]);
    function Add_selected_item(id, lable){
        const find_item = selectedList.find((items) => items.id === id)
        if(find_item){
             toast.error("Already Added");
        }
        else{
            setSelectedList((prevalue) => {
                const copied_array = [...prevalue];
                copied_array.push({
                   id,
                   lable
                });
            });
        }
    }
    function remove_item(id){
        const find_item = selectedList.find((items) => items.id === id);
        if(find_item){
            selectedList((prevalue) => {
                 const copied_array = [...prevalue];
                 copied_array.filter((items) => items.id !== items.id);
            });
            toast.success("Item removed succesfully");
        }
        else{
            toast.error("Item not found")
        }
    }
    return(
        <>
         <div className="incremetable_input w-100">
    <div className="p-1 bg-white rounded-3 border gainsboro-color d-flex flex-row gap-2">
         {
           selectedList.length > 0 ?   selectedList.map((items, index) => {
            return(
                <>
                <button key={items.id} className="border-none border bg-white d-flex flex-row w-25 p-2 gainsboro-color rounded-3 justify-content-between">
            <span>{items.lable}</span>
            <span className="pointer-cursor"
             onClick={() => {
                 remove_item(items.id)
             }}
            >ic</span>
        </button>
                </>
            )
         }) : <span>Select from the list below</span>
         }
    </div>
   <div className="d-flex flex-row gap-3 mt-3">
    {
        data.map((items, index) => {
            return(
                <>
                <button
             onClick={() => {
                Add_selected_item(items.id, items.lable)
             }}
             key={items.id + index}
             className="border-none px-3 py-2 rounded-3"
            >{items.lable}</button>
                </>
            )
        })
    }
   </div>
</div>
        </>
    )
}
export default Scrollableinput;