import React, { useState } from "react";
import '../styles/Sign.css';
import { useContext } from 'react';
import { Globals } from './universalContent/content_1';


const Register=()=>{
  const [load,setLoad]=useState(false)
  const LogOut = () => {
    console.log("clearing...")
    localStorage.clear();
  };

    window.onload=LogOut();
    const [profilePic,setProfNme]=useState();
    const {hostname} = useContext(Globals);
    const [flasher_2,setFlash2]=useState(" ");
    const [ uniqueID , generateUnq ] = useState(Math.floor(Math.random() * 1000000));
    const takeData=()=>{
      const fname=document.querySelector(".fname").value;
      const lnmae=document.querySelector(".lname").value;
      const Phonenumber=document.querySelector(".pnumb").value;
      const Email=document.querySelector(".emiol").value;
      const username=document.querySelector(".uzrnme").value;
      const pasiword=document.querySelector(".paswod").value;
      if(fname.length !== 0 && lnmae.length !==0 )
      {
        if(Phonenumber.length===10)
        {
          if(Email.length>5)
          {
            if(username.length>4)
            {
              if(pasiword.length>5)
              {
                //console.log(infoObj)
                // change it put in fetch .
                const infoObj=
                {
                  firstname : fname,
                  lastname : lnmae,
                  username : username,
                  password : pasiword,
                  phonenumber : Phonenumber,
                  email :Email,
                  //profile : `${uniqueID}_profile`,
                  profile : profilePic,
                  uniqueID : uniqueID
                }
                createUser(infoObj);
              }
              else 
              {
                setFlash2("Password must be atleast have 5 characters.");
                setTimeout(()=>setFlash2(" "),2000);
              }
            }
            else 
            {
              setFlash2("Username must be atleast have 5 characters.");
              setTimeout(()=>setFlash2(" "),2000);
            }
          }
          else 
          {
            setFlash2("Email not found .");
            setTimeout(()=>setFlash2(" "),2000);
          }
        }
        else 
        {
          setFlash2("Phone number invalied .");
          setTimeout(()=>setFlash2(" "),2000);
        }
      }
      else 
      {
        setFlash2("Enter firstname and lastname .");
        setTimeout(()=>setFlash2(),2000);
      }
    }
    const createUser=(data)=>{
      console.log(data)
      fetch(`${hostname}/newUser`,
      {
        method:'POST',
        headers :{
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then((res)=>{
        if(res.ok)
        {
          //localStorage.setItem("uniqueID", data.uniqueID);
          console.log("User created .",data.uniqueID);
          setFlash2("User created .");
          handleSubmit();
        }
        else{
          console.log("Duplication .");
        }
        return res.json();
      })
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log("Failed to fetch : ",err);
      })
    }
    //const uniqueID = JSON.parse(localStorage.getItem("uniqueID"));
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = () => {
      const file = document.querySelector(".profil").files[0];
      if(file){
        const modifiedFileName = `${uniqueID}_profile.${file.name.split('.').pop()}`;
        console.log(modifiedFileName);
        setProfNme(modifiedFileName);
        const modifiedFile = new File([file], modifiedFileName, { type: file.type });
        setSelectedFile(modifiedFile);
      }
    };
  
    const handleSubmit = () => {
      // Create a FormData object and append the modified file
      setLoad(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      setFlash2("Uploading Profile Please wait .");
      // Send the form data to the backend
      fetch(`${hostname}/User/Image`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          setLoad(false)
          if (res.ok) {
            console.log('File uploaded successfully');

          } else {
            console.log('Failed to upload file');
            setFlash2("Profile upload failed .")
          }
          setTimeout(()=>setFlash2(" "),2000);
          window.location.href='/LogIN';
        })
        .catch((err) => {
          console.log('Error uploading file:', err);
        });
    };
  
    return (
        <>
        <div className="outerDI" style={{height: '100vh'}}>
        <div className="form-container">
          <p className="title">Register</p>
          <div className="form">
            <div className="input-group">
              <label htmlFor="First Name">First Name</label>
              <input type="text" name="username" id="username" className="fname" placeholder="" />
            </div>
            <div className="input-group">
              <label htmlFor="Last Name">Last Name</label>
              <input type="text" name="username" id="username" className="lname" placeholder="" />
            </div>
            <div className="input-group">
              <label htmlFor="username">Phonenumber</label>
              <input type="text" name="username" id="username" className="pnumb" placeholder="" />
            </div>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input type="Email" name="username" id="username" className="emiol" placeholder="" />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="Email" name="username" id="username" className="uzrnme" placeholder="" />
            </div>
            <div className="input-group">
                <label htmlFor="profil">Profile</label>
                <input type="file" name="image" id="profil" className="profil" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="paswod" placeholder="" />
            </div>
            <div className="outerFac"><a className="toLogin" href="/LogIN">Have an account ?</a></div>
            <button type='button' className="sign regi"  onClick={takeData}>Register</button>
          </div>
          <p className='flash_1'>
        {flasher_2}
      </p>
        </div>
        </div>
        {load && <div className="pop_up_container">
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
        }
      </>
    )
}

export  default Register;