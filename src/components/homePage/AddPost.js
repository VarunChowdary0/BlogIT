import React from 'react'
import '../../styles/AddPost.css';
import { Globals } from '../universalContent/content_1';
import { useContext , useState} from 'react';
export default function AddPost() {
    const [buffer_what,change_buff]=useState(false)
    const { UserData}=useContext(Globals)
    const {username}=useContext(Globals)
   const {fullname}=useContext(Globals);
    const {AddPostPopUp,changePopUpPost } =useContext(Globals);
    const {hostname}=useContext(Globals)
    const {uniqueID} = useContext(Globals);
    const { profile_path } = useContext(Globals)
    const [postname,setPostName]=useState(' ')
    const [selectedFile, setSelectedFile] = useState('null');
    //const postIndex=UserData['Posts'].length;
    const PostIdArray = JSON.parse(localStorage.getItem("PostIdArray"))||[];
    const [postID,changePostId]=useState(`${uniqueID}-${Math.floor(Math.random()*100000000)}-${PostIdArray.length+1}`);

    const handlePostImg = () => {
        //console.log("callwed")
        changePostId(`${uniqueID}-${Math.floor(Math.random()*100000000)}-${PostIdArray.length+1}`)
         const file = document.querySelector(".post_img").files[0];
         const modifiedFileName = `${postID}-post.${file.name.split('.').pop()}`;
         setPostName(modifiedFileName)
         console.log('file_name',modifiedFileName);
         console.log('postID',postID);
        const modifiedFile = new File([file], modifiedFileName, { type: file.type });
        setSelectedFile(modifiedFile);
      }


      const takeData=()=>{
        const blog = document.querySelector('.blog_1').value || " ";
        const  location= document.querySelector('.location_inputer').value || " ";
        const accessability= document.querySelector('.selector_access').value;
         if(blog.length !== 0)
         {
                 const dataObj_1={
                     blog : blog,
                     location : location,
                     private_Post : eval(`${accessability==='false'? false : true }`),
                     uniqueID_p : uniqueID,
                     profile_p : profile_path,
                     postID : postID ,
                     fullname : fullname,
                     postImage : postname,
                     likes :{
                        likedBy : [''],
                        count : 0
                     },
                     comments : {
                        count : 0,
                        commentBLOCK:
                        []
                     }

                 }
                 createPost(dataObj_1);
                 console.log(dataObj_1)
         }
         else{
            console.log("blog must not be empty")
     }
        // write fetch a

      }
      const handleSubmit = () => {
        // Create a FormData object and append the modified file
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        // Send the form data to the backend
            fetch(`${hostname}/User/Image`, {
            method: 'POST',
            body: formData,
            })
            .then((res) => {
                if (res.ok) {
                console.log('File uploaded successfully');
                    change_buff(false)
                } else {
                console.log('Failed to upload file');
                    change_buff(false)
                }
            })
            .catch((err) => {
                console.log('Error uploading file:', err);
            });
      };

      const closePopUp=()=>{
        changePopUpPost(false);
      }

      const createPost=(postInfo)=>{
        change_buff(true);
            fetch(`${hostname}/upload-post`,
            {
                method : 'POST',
                headers :{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(postInfo)
            })
            .then((res)=>{
                if(res.ok)
                {
                    console.log("posted");
                    if(selectedFile!==null)
                    {
                        handleSubmit();
                        setTimeout(clearSelectedFile(),2000)
                    }
                }
                else{
                    console.log('failed to post');
                }
                return res.json();
            })
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log("Failed to fetch: ",err);
            })
      }
       const clearSelectedFile=()=>{
        setSelectedFile(null);
       }

       
  return (
        <>
            {AddPostPopUp && 
    <div className="pop_up_container">
        { buffer_what ? 
            <div className='buffer_what'>
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
            :
            <div className="post_popUp">
            <div className="line_001">
                <div className="inner_cont_pup" onClick={closePopUp}>
                    <i className="fa-solid fa-xmark fa-xl"></i>
                </div>
            </div>
            <div className="line_002">
                <div className='inner_line_01'>
                    <div className='frd_prf'>
                        <img src={`${hostname}/images/${profile_path}`} alt=""/>
                    </div>
                    <div className='block_-2'>
                            <div className='uzrnem_23'>{fullname}</div>
                            <div className='_ful_nam'>{username}</div>
                    </div>
                </div>
                <div className='inner_line_02'>
                    <textarea maxLength={1000} className='blog_1' rows={10}  placeholder='BlogIt....'></textarea>
                </div>
                <div className='inner_line_03'>
                <label htmlFor="post_img" className="fileInputButton">
               Add photo ?
                    <input className='post_img' type='file' accept="image/*" onChange={handlePostImg}></input>
                </label>
                    
                </div>
                <div className='inner_line_04'>
                   <select  className='selector_access' default={false}>
                    <option value={false}>public</option>
                    <option value={true}>private</option>
                   </select>
                </div>
                <div className='inner_line_05'>
                    <input type='text' className='location_inputer'  placeholder='Add location'/>
                </div>
                <div className='inner_line_06'>
                    <button  className='postButton' onClick={takeData}>Post</button>
                </div>
            </div>
        </div>
        }

        
   </div>}
        </>
  )
}
