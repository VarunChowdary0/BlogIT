import React from 'react'
import '../../styles/homePage.css';
import { Globals } from '../universalContent/content_1';
import { useContext } from 'react';
export default function Menu_Mob() {
    const {Notification,setNotification}=useContext(Globals)
    const openProfile=()=>{
        window.location.href='/profile';
       }
       const openHome=()=>{
        window.location.href='/';
       }
       const openExplore=()=>{
        window.location.href='/explore'
       }

  return (
        <div className="menu_hidden_mob">
        <div className="inner_menu_set">
            <div className="menus_" onClick={()=>openHome()}>
                <i className="fa-solid fa-house fa-2xl"></i>
            </div>
            <div className="menus_" onClick={()=>openExplore()}>
                <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
            </div>
            <div className="menus_ bell">
                <i className="fa-solid fa-bell fa-2xl"></i>
                <div className="count_ hidenn_ui">{Notification}</div>
            </div>
            <div className="menus_" onClick={()=>openProfile()}>
                <i className="fa-solid fa-user fa-2xl"></i>
            </div>
            <div className="menus_">
                <i className="fa-solid fa-bug fa-2xl"></i>
            </div>
        </div>
    </div>
  )
}
