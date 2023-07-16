
import { Globals } from './content_1';
import { useContext } from 'react';
import React from 'react';


const ApiCaller=()=>{
    const {serverOnline,setStatus} = useContext(Globals)
    const { hostname } = useContext (Globals)
    const Call_API=()=>{
    fetch(`${hostname}/`,
    {
        method:'GET',
    })
    .then((res)=>{
        if(res.ok){
            console.log("online");
            setTimeout(()=>Call_API(),300000);
            setStatus(true);
            return res;
        }
        else{
            setTimeout(()=>console.log("waiting..."),1000)
            setTimeout(()=>Call_API(),1000);
        }
    })
    .then((data)=>{
        //console.log(data);
    })
    .catch(err=>{
        console.log("Failed to fetch: ",err);
        Call_API();
    })
    }
    Call_API();
}

export default ApiCaller;
