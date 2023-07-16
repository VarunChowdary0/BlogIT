import React from 'react'
import '../../styles/homePage.css';
import { useContext } from 'react';
import { Globals } from '../universalContent/content_1';
import { useState , useEffect } from 'react';

export default function Right() {

    const {hostname} = useContext(Globals);
    const {following,addFollowing}=useContext(Globals);
    const {username}=useContext(Globals)
    const {viewUser,setViewUser}=useContext(Globals);
   const {fullname}=useContext(Globals);
   const { profile_path } =  useContext(Globals)
   const  { uniqueID}=useContext(Globals);
   const {UserArray, setUserArray} = useContext(Globals);

   useEffect(() => {
     const getUsernames = () => {
      //console.log(following);
       fetch(`${hostname}/GetUsernames`, {
         method: 'GET',
       })
         .then((res) => {
           if (res.ok) {
             return res.json();
           }
         })
         .then((data) => {
           const userArray = data['document'];
          // console.log(userArray[0]['uniqueID']);
           setUserArray(userArray);
           //console.log(UserArray);
         })
         .catch((err) => {
           console.log('Error fetching the user Array:', err);
         });
     };
 
     getUsernames();
   }, []);
   const stopLoad=()=>{
       changeLoad(false);
   }
   const [load,changeLoad]=useState(true);
   if(UserArray.length!==0)
   {
       //console.log(UserArray);
       if(load)
       {
           stopLoad();
       }
   }
   const logout=()=>{
    localStorage.clear();
    window.location.href='/';
   }

   const seeUser=(u_id)=>{
    setViewUser();
    setViewUser(u_id);
    localStorage.setItem("SeeUser",JSON.stringify(u_id));
    if(viewUser!==undefined)
    {
      window.location.href='/view';
    }
    //console.log(viewUser)
   }

   const followSomeOne = (u_id) => {
    fetch(`${hostname}/manage/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uniqueID: uniqueID,
        newFollowing: u_id
      })
    })
      .then((res) => {
        if (res.ok) {
        //  console.log("Ok");
          return res.json();
        } else {
          console.log("Failed");
        }
      })
      .then((data) => {
        const response = data;
        //console.log(response['data']);
        addFollowing(response['data']['following']);
        localStorage.setItem("userDATA",JSON.stringify(response['data']));
      })
      .catch((err) => {
        console.log("Server Error: ", err);
      });
  };

  const UnfollowSomeOne = (u_id) => {
    fetch(`${hostname}/manage/unfollow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uniqueID: uniqueID,
        unfollowing: u_id
      })
    })
      .then((res) => {
        if (res.ok) {
        //  console.log("Ok");
          return res.json();
        } else {
          console.log("Failed");
        }
      })
      .then((data) => {
        const response = data;
       // console.log(response['data']);
        addFollowing(response['data']['following']);
        localStorage.setItem("userDATA",JSON.stringify(response['data']));
      })
      .catch((err) => {
        console.log("Server Error: ", err);
      });
  };
  
  
  return (
    <>
    { load ?
       <div className="right_part">
       <div className='test_ii loader_biu'>
       <div className="spinner-container">
           <div className="spinner">
               <div className="spinner">
                   <div className="spinner">
                       <div className="spinner">
                               <div className="spinner">
                                   <div className="spinner"></div>
                               </div>
                           </div>
                       </div>
               </div>
           </div>
           </div>
       </div>
   </div>
    : <div className="right_part">
    <div className="right_top">
        <div className="cont_min_1">
            <div className="prof_990">
                <img src={`${hostname}/images/${profile_path}`} alt=""/>
            </div>
            <div className="cont_523">
                <div className="uzrnem_23">
                    {username}
                </div>
                <div className="_ful_nam">
                    {fullname}
                </div>
            </div>
            <div className='logOut'><i onClick={logout} className="fa-solid fa-right-from-bracket"></i></div>
        </div>
    </div>
    <div className="inner_right">
        <div className="dooper">
            <div className="main_h_90">
              Following
              <div className="friends_block">
              {UserArray.map((ele, index) => {
                    if (ele['username'] !== username && following.find(item => item === ele['uniqueID']) !== undefined) {
                        return (
                        <li className="frnd_121" key={index} >
                           <div className="frnd_121"  onClick={()=>{seeUser(ele['uniqueID'])}}>
                             <div className="frd_prf">
                              <img src={`${hostname}/images/${ele['profile']}`} alt="" />
                             </div>
                              <div className="frd_inffo">
                              <div className="uzrnem_23">{`${ele['firstname']} ${ele['lastname']}`}</div>
                              <div className="_ful_nam">{`${ele['username']}`}</div>
                            </div>
                           </div>
                            <div className="follow_icn"onClick={()=>{UnfollowSomeOne(ele['uniqueID'])}}>unfollow</div>
                        </li>
                        );
                    }
                    return null;
                    })}
              </div>
            </div>
            <div className="main_h_90 suggest_0">
              Suggested for you
              <div className="friends_block">
              {UserArray.map((ele, index) => {
                    if (ele['username'] !== username && following.find(item => item === ele['uniqueID']) === undefined) {
                        return (
                        <li className="frnd_121" key={index} >
                           <div className="frnd_121"  onClick={()=>{seeUser(ele['uniqueID'])}}>
                             <div className="frd_prf">
                              <img src={`${hostname}/images/${ele['profile']}`} alt="" />
                             </div>
                              <div className="frd_inffo">
                              <div className="uzrnem_23">{`${ele['firstname']} ${ele['lastname']}`}</div>
                              <div className="_ful_nam">{`${ele['username']}`}</div>
                            </div>
                           </div>
                            <div className="follow_icn" onClick={()=>{followSomeOne(ele['uniqueID'])}}>follow</div>
                        </li>
                        );
                    }
                    return null;
                    })}
              </div>
            </div>
        </div>
    </div>
</div>}
</>
  )
}
