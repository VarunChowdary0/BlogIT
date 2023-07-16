import React from 'react'
import { Globals } from './content_1'
import { useContext } from 'react'; 


const  AllPosts=()=>{
    const {uniqueID} = useContext(Globals);
    const { hostname } = useContext (Globals)
    if(uniqueID!==null)
    {
        const retrive_1=()=>{
            //console.log("retriving _posts. ");
            fetch(`${hostname}/AllUserData`,{
                method : 'GET',
            })
            .then((res)=>{
                if(res.ok)
                {
                    //console.log("Fetched the postID's");
                    return res.json()
                }
                else{
                    console.log("Some-thing went wrong ... ");
                }
            })
            .then((data)=>{
                //console.log(data['document']);
                localStorage.setItem("AllPosts",JSON.stringify(data['document']));
            })
            .catch((err)=>{
                console.log("Fetch error while getting PostID's : ",err);
            })
        }

        retrive_1();
        setTimeout(()=>retrive_1(),100000);
}
}

export default AllPosts