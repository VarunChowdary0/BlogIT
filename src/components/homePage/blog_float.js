import React from 'react'
import '../../styles/homePage.css';
import { Globals } from '../universalContent/content_1';
import { useContext } from 'react';
import AddPost from './AddPost';

export default function Blog_float() {
  const {AddPostPopUp , changePopUpPost } =useContext(Globals);
  const {newMessagesCount,setMsgCount}=useContext(Globals)
  const showPopUp=()=>{
    console.log("pop_up")
    changePopUpPost(true);
   }
  const openSugg=()=>{
    window.location.href='/add';
  }
  return (
    
    <>
      <div className="AddBlog_hidd"  onClick={showPopUp}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </div>
      <div className="top_menu_hider">
        <div className="hid_menu_left"><i className="fa-solid fa-at fa-xl" onClick={()=>{openSugg()}}></i></div>
        <div className="hid_menu_right">
          <div className="menus_ bell">
                  <i className="fa-solid fa-message fa-2xl"></i>
                  <div className="msgi count_ hidenn_ui ui_alt_mas">{newMessagesCount}</div>
              </div>
          </div>
        </div>
        <AddPost/>
    </>
  )
}
