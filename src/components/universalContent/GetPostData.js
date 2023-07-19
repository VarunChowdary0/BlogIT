import React from 'react'
import { Globals } from './content_1'
import { useContext } from 'react'; 

const GetPostData=()=>{
        const {uniqueID} = useContext(Globals);
        const { hostname } = useContext (Globals)
        if(uniqueID!==null)
        {
            const fetch_Post_Data=()=>{
                fetch(`${hostname}/GetUserPosts`,{
                    method : 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({'uniqueID_p':uniqueID})
                })
                .then((res)=>{
                    if(res.ok)
                    {
                       // console.log("Fetched the postID's");
                        return res.json()
                    }
                    else{
                        console.log("Some-thing went wrong ... ");
                        localStorage.clear();
                        window.location.href='/';
                    }
                })
                .then((data)=>{
                    //console.log(data[0]);
                    localStorage.setItem("PostIdArray",JSON.stringify(data));
                })
                .catch((err)=>{
                    console.log("Fetch error while getting PostID's : ",err);
                })
            }

            fetch_Post_Data();
            //setTimeout(()=>fetch_Post_Data(),10000)
    }

}

export default GetPostData;
