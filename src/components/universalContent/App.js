import  { useState } from 'react'
import Boiler from '../boiler';
import SignIn from '../signIn';
import Register from '../signUp';
import Left from '../homePage/left';
import Middle from '../homePage/middle';
import Right from '../homePage/right';
import Menu_Mob from '../homePage/menu_Mob';
import Blog_float from '../homePage/blog_float';
import Profile from '../homePage/profile'
import ApiCaller from './ApiCaller';
import GetPostData from './GetPostData';
import AllPosts from './GetAllPosts';
import OtherProfile from '../homePage/OtherProfile';
import GetUserInfo from './UpdateUserData';
import Explore from '../homePage/explore';
import Suggestions from '../homePage/suggestions';
import AddPost from '../homePage/AddPost';

//----------------------------------

import { Globals } from './content_1';

// import Notification from './MainValues';

//------------------
import {
        createBrowserRouter,
        RouterProvider,
        } from "react-router-dom";

const router = createBrowserRouter([
  {
    path : '/',
    element : 
    <> 
    {(JSON.parse(localStorage.getItem('signInStatus'))) ? <div className='main'>
      <Left/>
      <GetPostData/>
      <Middle/>
      <Right/>
      <Menu_Mob/>
      <Blog_float/>
      <AllPosts/>
      <GetUserInfo/>
    </div>: <Boiler/>}
    
    </>
   },
   {
    path : '/Add',
    element:
    <>
    {!JSON.parse(localStorage.getItem('signInStatus')) ? 
  <div className='main'>NOT logged</div>
  :
  <div className='main'>
    <Left/>
    <Suggestions/>
    <Right/>
    <Menu_Mob/>
    <Blog_float/>
    <GetPostData/>
    <GetUserInfo/>
    <AllPosts/>
  </div>}
  </>
   },
    {
      path : "/SignUp",
      element: <Register/>
    },
    {
      path : '/LogIN',
      element : <SignIn/>
    },
    {
      path:'/profile',
      element:
      <>
        {!JSON.parse(localStorage.getItem('signInStatus')) ? 
      <div className='main'>NOT logged</div>
      :
      <div className='main'>
        <Left/>
        <Profile/>
        <Right/>
        <Menu_Mob/>
        <Blog_float/>
        <GetPostData/>
        <GetUserInfo/>
        <AllPosts/>
      </div>}
      </>
    },
    {
      path:'/view',
      element : 
      <>
      {!JSON.parse(localStorage.getItem('signInStatus')) 
      ?
        <SignIn/>
      :
        <div className='main'>
          <Left/>
          <OtherProfile/>
          <Right/>
          <Menu_Mob/>
          <Blog_float/>
          <GetPostData/>
          <GetUserInfo/>
          <AllPosts/>
        </div>
    }
      </>
    },
    {
      path : '/explore',
      element : 
      <>
      <div className='main'>
        <Left/>
        <GetPostData/>
        <Explore/>
        <Right/>
        <Menu_Mob/>
        <Blog_float/>
        <AllPosts/>
        <GetUserInfo/>
      </div>
      </>
    }
    ]);

 

export default function App() {
    const hostname = `http://localhost:1232`;
/*    server \|/         local /|\ */
   //  const hostname = 'https://blogit-backend-8-jlkvkcl94289082477.onrender.com'
   // const hostname = 'https://blog-it-backend-sandy.vercel.app';
    const [serverOnline,setStatus]=useState(false);  
    const [UserArray, setUserArray] = useState([]);
    const [viewUser,setViewUser]=useState(localStorage.getItem('SeeUser')||undefined);
    const UserData=JSON.parse(localStorage.getItem('userDATA'))||' ';
    const [profile_path,updateProfile]=useState(UserData['profile']);
    const [following,addFollowing]=useState(UserData['following']||[]);
    const [followers,addFollowers]=useState(UserData['followers']||[]);
    const [following_A,addFollowing_A]=useState(UserData['following']||[]);
    const [followers_A,addFollowers_A]=useState(UserData['followers']||[]);
    const [location,ChangeLocation]=useState(UserData['location']||'Add location ?');
    const [Bio,changeBio]=useState(UserData['Bio']||'Add Bio ?');
    const uniqueID = UserData['uniqueID']
    const [showEditorPopUp,setEditorPopUp]=useState(false)
    const [AddPostPopUp,changePopUpPost]=useState(false);
    const [Notification,setNotification]=useState(4)
    const [newMessagesCount,setMsgCount]=useState(1);
    const [username,setUsername]=useState(UserData['username']||' ');
    const [fullname,setFullName]=useState(`${UserData['firstname']} ${UserData['lastname']}`||' ');
  return (
    <Globals.Provider value={{newMessagesCount,
                              Notification,
                              Bio,
                              UserArray,
                              viewUser,
                              UserData,
                              username,
                              following_A,
                              followers_A,
                              fullname,
                              hostname,
                              location,
                              profile_path,
                              serverOnline,
                              uniqueID,
                              AddPostPopUp,
                              showEditorPopUp,
                              following,
                              followers,
                              changeBio,
                              addFollowing,
                              setStatus,
                              setUserArray,
                              setViewUser,
                              setNotification,
                              setMsgCount,
                              ChangeLocation,
                              setFullName,
                              updateProfile,
                              addFollowers,
                              addFollowers_A,
                              changePopUpPost,
                              addFollowing_A,
                              setEditorPopUp,
                              setUsername}}>
                                <ApiCaller/>
        <RouterProvider router={router}/>
    </Globals.Provider>
  )
}
