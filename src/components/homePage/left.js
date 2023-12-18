import React, { useState } from 'react'
import { useContext } from 'react';
import { Globals } from '../universalContent/content_1';
import '../../styles/homePage.css';

export default function Left() {
   // const hostname = `http://localhost:1232`;
    /*    server \|/         local /|\ */
    const {AddPostPopUp , changePopUpPost } =useContext(Globals);
    const {hostname} = useContext(Globals)
    const { profile_path } =  useContext(Globals)
   const {newMessagesCount,setMsgCount}=useContext(Globals)
   const {Notification,setNotification}=useContext(Globals)
   const {username}=useContext(Globals)
   const {fullname}=useContext(Globals);
   const openProfile=()=>{
    window.location.href='/profile';
   }
   const openHome=()=>{
    window.location.href='/';
   }
   const openExplore=()=>{
    window.location.href='/explore'
   }
   const showPopUp=()=>{
    console.log("pop_up")
    changePopUpPost(true);
   }
  return (
    <>
      <div className="fake_left"></div>
        <div className="left_part">
            <div className="menu_contents">
                <div className="menus_" onClick={()=>openHome()}>
                    <i className="fa-solid fa-house"></i>
                    Home</div>
                <div className="menus_" onClick={()=>openExplore()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    Explore</div>
                <div className="menus_ bell">
                    <i className="fa-solid fa-bell"></i>
                    <div className="count_">{Notification}</div>
                    Notification</div>
                <a href='https://chat-room-kohl-pi.vercel.app/o' target='_blank'
                 className="menus_ bell">
                    <i className="fa-solid fa-message"></i>
                    <div className="msgi count_">{newMessagesCount}</div>
                    Messages
                    <div className=' HoverEffect_message'>
                            <p>
                                You will be redirected to our Chatting Platform
                            </p>
                    </div>
                </a>
                <div className="menus_" onClick={()=>openProfile()}>
                    <i className="fa-solid fa-user"></i>
                    Profile</div>
                <div className="menus_">
                    <i className="fa-solid fa-bug"></i>
                    Report</div>
            </div>
            <div className="under_left">
                <button className="blog_butt" onClick={showPopUp}>Blog</button>
            </div>
            <div className="userData_s" onClick={()=>openProfile()}  >
                <div className="prof_1">
                    <img src={`${hostname}/images/${profile_path}`} alt=""/>
                </div>
                <div className="content_Txt">
                    <div className="Ful_nme">{fullname}</div>
                    <div className="usrnme_s">{username}</div>
                </div>
            </div>
        </div>
    </>
  )
}
