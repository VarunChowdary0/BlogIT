import React, { useState } from 'react'
import '../../styles/Edit.css';
import { Globals } from '../universalContent/content_1';
import { useContext } from 'react';
export default function EditInfo() {



    const [editFlasher,setEdiFlash]=useState(" ");
    const { uniqueID}=useContext(Globals);
    const { profile_path,updateProfile } =useContext(Globals)
    const { hostname}=useContext( Globals)
    const { Bio,changeBio}=useContext( Globals);
    const {username}=useContext(Globals)
    const {fullname}=useContext(Globals);
    const {showEditorPopUp,setEditorPopUp}=useContext(Globals);
    const {location,ChangeLocation} = useContext(Globals);


    const closeEditorPopUp=()=>{
        setEditorPopUp(false);
    }


    const [showPswdEditorPopUp,setPswdEditor]=useState(false);
    const closePopUp_paswd=()=>{
        setPswdEditor(false)
     //   console.log(showPswdEditorPopUp);
    }

    const [showProfileEditorPopUp,setProfileEditor]=useState(false);
    const closePopUp_Profile=()=>{
        setProfileEditor(false);
    }
    const [showLocationEditorPopUp,setLocationEditor]=useState(false);
    const closePopUp_Locati=()=>{
        setLocationEditor(false);
    }
    const [showPrivEditorPopUp,setPrivEditor]=useState(false);
    const closePopUp_Priv=()=>{
        setPrivEditor(false);
    }

    const [showLocationBioPopUp,setBioEditor]=useState(false)
    const closePopUp_Bio=()=>{
        setBioEditor(false)
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const [FileName,setFileName]=useState();

    const updateTheProfileString = () => {
        const info = {
          uniqueID: uniqueID, // The unique ID of the user
          profile: FileName, // The name of the file to update the profile with
        };
        console.log(info)
      
        fetch(`${hostname}/update/profile/path`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info), // Convert the info object to a JSON string and include it in the request body
        })
          .then((res) => {
            if (res.ok) {
              console.log('File uploaded successfully');
              setEdiFlash('Image Updated.');
              setTimeout(() => {closePopUp_Profile()}, 1000);
              return res.json();
            } else {
              console.log('Failed to upload file');
              setEdiFlash('Upload failed.');
              setTimeout(() => setEdiFlash(''), 3000);
            }
          })
          .then((data)=>{
            const response=data;
            const Data = response['data']
            localStorage.setItem("userDATA",JSON.stringify(Data));
            //console.log(data);
            const responce_DATA=data['profile'];
           // console.log(responce_DATA);
           updateProfile(responce_DATA);
           // localStorage.setItem("userDATA",JSON.stringify(data))
          })
          .catch((err)=>{
            console.log("Something went wrong :",err);
          })

      };
    const handleFileChange = () => {
      const file = document.querySelector(".newPrf").files[0];
      if(file){
        const modifiedFileName = `${uniqueID}_profile.${file.name.split('.').pop()}`;
        setFileName(modifiedFileName);
      // console.log(modifiedFileName);
        const modifiedFile = new File([file], modifiedFileName, { type: file.type });
        setSelectedFile(modifiedFile);
      }
    };
    const handleSubmit = () => {
        // Create a FormData object and append the modified file
      //  setLoad(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        // Send the form data to the backend
        fetch(`${hostname}/User/Image`, {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            if (res.ok) {
              //console.log('File uploaded successfully');
              updateTheProfileString();
            } else {
              console.log('Failed to upload file');
            }
          })
          .catch((err) => {
            console.log('Error uploading file:', err);
          });
      };
      const uploadImage=()=>{
        if(selectedFile!==null)
        {
            handleSubmit();
        }
        else{
            setEdiFlash('Please select an image .')
        }
      }

      //-----------  Change Password .

      const UpdatePassword=(info)=>{
        fetch(`${hostname}/edit/userInfo/password`,{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(info)
        })
        .then((res)=>{
            if(res.ok){
                setEdiFlash("Password has been Changed .");
                setTimeout(()=>setEdiFlash(" "),1500)
                //return res.json()
            }
            else
            {
                setEdiFlash("Old password in incorrect .");
               document.querySelector(".old_pwd").value='';
                setTimeout(()=>setEdiFlash(" "),1000)
                return res.json();
            }
        })
        .then((data)=>{
            const response=data;
            setEdiFlash(response['message ']);
            document.querySelector(".new_pwd").value='';
            document.querySelector(".reEnter_pwd").value="";
            setTimeout(()=>setEdiFlash(" "),1000)
        })
        .catch((err)=>{
            console.log("Error connecting :",err);
        })
      }

      const handlePWchange = () =>{
        const old_PassWD=document.querySelector(".old_pwd").value||'';
        const new_PassWD=document.querySelector(".new_pwd").value||'';
        const ReEnter_PassWD=document.querySelector(".reEnter_pwd").value||'';

        

        if(old_PassWD.trim()!=='')
        {
            if(new_PassWD.trim()!=='')
            {
                setEdiFlash(" ")
                if(ReEnter_PassWD.trim()!=='')
                {
                    setEdiFlash(" ")
                    if(ReEnter_PassWD===new_PassWD)
                    {
                        //console.log(old_PassWD,new_PassWD,ReEnter_PassWD);
                        const info = {
                            uniqueID :uniqueID,
                            pswd_old : old_PassWD,
                            pswd_new : new_PassWD
                        }
                        setEdiFlash(" ")
                        UpdatePassword(info);
                    }
                    else
                    {
                        setEdiFlash("conformation not matched")
                        setTimeout(()=>setEdiFlash(" "),1000)
                    }
                }
                else
                {
                    setEdiFlash('Conform your password .')
                    setTimeout(()=>setEdiFlash(" "),1000)
                }
            }
            else
            {
                setEdiFlash('Enter New password .');
                setTimeout(()=>setEdiFlash(" "),1000)
            }
        }
        else
        {
            setEdiFlash('Enter Old password .')
            setTimeout(()=>setEdiFlash(" "),1000)
        }

      }

      //--------------- Add location .

      const updateLocation=(info)=>{
        fetch(`${hostname}/edit/userInfo/location`,{
            method : 'POST',
            headers :{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(info)
        })
        .then((res)=>{
            if(res.ok){
                setEdiFlash("Location Updated .");
               ChangeLocation(info['location']);
                setTimeout(()=>setEdiFlash(" "),1000)
                return res.json()
            }
            else
            {
                setEdiFlash("Try again .");
                setTimeout(()=>setEdiFlash(" "),1000)
            }
        })
        .then((data)=>{
            const response=data;
            const Data = response['data']
            localStorage.setItem("userDATA",JSON.stringify(Data));
        })
        .catch((err)=>{
            console.log("Error :",err);
        })
      }

      const handleLocation=()=>{
        const location = document.querySelector(".location_changer").value||' ';
        if(location.trim()!=='')
        {
            console.log(location);
            const info={
                uniqueID: uniqueID,
                location : location
            }
            updateLocation(info);
        }
        else{
            setEdiFlash('Enter Location .')
            setTimeout(()=>setEdiFlash(" "),1000)
        }
      }
      //---------- Bio
      
      const UpdateBio=(info)=>{
        fetch(`${hostname}/edit/userInfo/Bio`,{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(info)
        })
        .then((res)=>{
            if(res.ok){
                setEdiFlash("Bio has been Changed .");
                changeBio(info['Bio']);
                return res.json();
            }
            else
            {
               document.querySelector(".bio_taker").value='';
                return res.json();
            }
        })
        .then((data)=>{
            const response=(data);  
            const Data=(response['data']);
            localStorage.setItem("userDATA",JSON.stringify(Data));
            setTimeout(()=>setEdiFlash(" "),1000)
        })
        .catch((err)=>{
            console.log("Error connecting :",err);
        })
      }

      const handleBio=()=>{
        const Bio = document.querySelector(".bio_taker").value||' ';
        if(Bio.trim()!=='')
        {
            console.log(Bio);
            const info={
                uniqueID: uniqueID,
                Bio : Bio
            }
            UpdateBio(info);
        }
        else
        {
            setEdiFlash('Empty .')
            setTimeout(()=>setEdiFlash(" "),1000)
        }
      }
  return (
    <>
        {
         showEditorPopUp &&
            <div className="pop_up_container_edit">
           <div className='inner_container_edit'>
                <div className="line_001">
                        <div className="inner_cont_pup" >
                            <i className="fa-solid fa-xmark fa-xl" onClick={closeEditorPopUp}></i>
                        </div>
                    </div>
                    <div className='inner_line_01 line1_edit'>
                        <div className='frd_prf'>
                            <img src={`${hostname}/images/${profile_path}`} alt=""/>
                        </div>
                        <div className='block_-2'>
                                <div className='uzrnem_23'>{fullname}</div>
                                <div className='_ful_nam'>{username}</div>
                        </div>
                    </div>
                    <div className='line_2_edit'>
                            <div className='sub_line_1'>
                                <div onClick={()=>setPswdEditor(true)}>Change Password</div>
                                {
                                   showPswdEditorPopUp 
                                   ?
                                    <div className='inner_hidden_boxes_edit'>
                                        <div className='edit_profile_box'>
                                            <div className='cancle_outer'>
                                                <div className='cancle_inner' onClick={()=>closePopUp_paswd()} >
                                                  <i className="fa-solid fa-xmark fa-xl" ></i>
                                                </div>
                                            </div>
                                        <div className='inp_box_001'>
                                            <input type='password' placeholder='Old password' className='old_pwd'/>
                                        </div>
                                        <div className='inp_box_001'>
                                            <input type='password' placeholder='New password' className='new_pwd'/>
                                            </div>
                                            <div className='inp_box_001'>
                                                <input type='password' placeholder='conform password' className='reEnter_pwd'/>
                                            </div>
                                            <p>{editFlasher}</p>
                                            <div className='save_butt_edit'>
                                                <button onClick={()=>{handlePWchange()}} >Change</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                            <div className='sub_line_1'>
                                <div onClick={()=>setProfileEditor(true)}>Change Profile</div>
                                {
                                   showProfileEditorPopUp 
                                   ?
                                    <div className='inner_hidden_boxes_edit edi_prf'>
                                        <div className='edit_profile_box'>
                                            <div className='cancle_outer'>
                                                <div className='cancle_inner' onClick={()=>closePopUp_Profile()} >
                                                  <i className="fa-solid fa-xmark fa-xl" ></i>
                                                </div>
                                            </div>
                                        <div className='inp_box_001 prof_updater'>
                                            <input type='file' name="image" className='newPrf' accept="image/*" onChange={handleFileChange}/>
                                        </div>
                                            <p>{editFlasher}</p>
                                            <div className='save_butt_edit'>
                                                <button onClick={uploadImage} >Update</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                            <div className='sub_line_1'>
                               <div onClick={()=>setLocationEditor(true)}> Edit location</div>
                               {
                                   showLocationEditorPopUp 
                                   ?
                                    <div className='inner_hidden_boxes_edit edi_loc'>
                                        <div className='edit_profile_box'>
                                            <div className='cancle_outer'>
                                                <div className='cancle_inner' onClick={()=>closePopUp_Locati()} >
                                                  <i className="fa-solid fa-xmark fa-xl" ></i>
                                                </div>
                                            </div>
                                        <div className='inp_box_001'>
                                            <input type='text' className='location_changer' placeholder={location}/>
                                        </div>
                                            <p>{editFlasher}</p>
                                            <div className='save_butt_edit'>
                                                <button onClick={handleLocation} >Change</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                            <div className='sub_line_1'>
                                <div onClick={()=>setPrivEditor(true)}>Privacy setting</div>
                                {
                                   showPrivEditorPopUp 
                                   ?
                                    <div className='inner_hidden_boxes_edit edi_prf'>
                                        <div className='edit_profile_box'>
                                            <div className='cancle_outer'>
                                                <div className='cancle_inner' onClick={()=>closePopUp_Priv()} >
                                                  <i className="fa-solid fa-xmark fa-xl" ></i>
                                                </div>
                                            </div>
                                        <div className='inp_box_001'>
                                            <input type='text' placeholder='Old password'/>
                                        </div>
                                        <div className='inp_box_001'>
                                            <input type='text' placeholder='New password'/>
                                            </div>
                                            <div className='inp_box_001'>
                                                <input type='text' placeholder='conform password'/>
                                            </div>
                                            <p>flasher</p>
                                            <div className='save_butt_edit'>
                                                <button >Change</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                            <div className='sub_line_1'>
                               <div onClick={()=>setBioEditor(true)}> Edit Bio</div>
                               {
                                   showLocationBioPopUp
                                   ?
                                    <div className='inner_hidden_boxes_edit edi_prf'>
                                        <div className='edit_profile_box'>
                                            <div className='cancle_outer'>
                                                <div className='cancle_inner' onClick={()=>closePopUp_Bio()} >
                                                  <i className="fa-solid fa-xmark fa-xl" ></i>
                                                </div>
                                            </div>
                                        <div className='inp_box_001'>
                                            <textarea className='bio_taker' placeholder={Bio}></textarea>
                                        </div>
                                            <p>{editFlasher}</p>
                                            <div className='save_butt_edit'>
                                                <button onClick={()=>handleBio()} >Change</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                    </div>
                </div>
        </div>
        }
    </>
  )
}
