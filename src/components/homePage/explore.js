import React, { useContext, useState } from 'react'
import '../../styles/homePage.css';
import { Globals } from '../universalContent/content_1';


export default function Explore() {
    
    const { hostname }= useContext(Globals)
    const { username } =useContext(Globals)
    const [AllPostsRaw  , UpdateAllPosts ] = useState(JSON.parse(localStorage.getItem("AllPosts"))||[]);
   // console.log(AllPostsRaw[0])
    const AllPostsOrder = AllPostsRaw;
    const AllPosts = AllPostsOrder.reverse();
   // const likesCounts = AllPosts.map(post => post.likes!==undefined ? console.log(post.likes.count):console.log("0"));
    const changeMessage=()=>{
        const textInp=document.querySelector(".search_boxi").value;
        if(textInp!==null)
        {
            console.log(textInp)
        }
    }

    const updater=(liker,index)=>{
        fetch(`${hostname}/update/likes`,{
            method :'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(liker)
          })
              .then((res)=>{
                  if(res.ok){ 
                    // localUpdater(index,liker);
                      return res.json()
                  }
              })
              .then((data)=>{
                   console.log(data['message']);
              })
              .catch(err=>{
                  console.log("update error : ",err);
              })
    }

    const [recentLikes, modifyRecentLikes] = useState([]);
    const [recentUnLikes, modifyRecentUnLikes] = useState([]);
    const LikePost = (postId, likedby, index) => {
        if(likedby && !likedby.includes(username))
        {
            console.log(recentLikes)
            const liker = {
              postID: postId,
              likes: {
                likedBy: [...likedby, username], // Add the current user's username to the existing likedBy array
                count: likedby.length + 1 // Increment the likes count by 1
              }
            };
            if( AllPostsOrder[index].likes!==undefined)
            {
                AllPostsOrder[index].likes.count++;
                AllPostsOrder[index].likes.likedBy = [...likedby, username];
            }
           // eval(document.querySelectorAll(".modifyLike")[index].innerHTML)++;

            // if (likeElements.length > index) {
            // const likeCount = likeElements[index];
           // console.log(likeCount.innerHTML);

          //  console.log(liker);
            updater(liker,index);
            modifyRecentLikes(recentLikes.filter((item) => item !== index));
        }
        else {
            console.log("Remove like.");
           // eval(document.querySelectorAll(".modifyLike")[index].innerHTML)--;
           AllPostsOrder[index].likes.count--;
           
            const indexToRemove = likedby.indexOf(username);
            if (indexToRemove !== -1) {
              likedby.splice(indexToRemove, 1);
            }
          
            const liker = {
              postID: postId,
              likes: {
                likedBy: likedby,
                count: likedby.length
              }
            };
          
            //console.log(liker);
            updater(liker,index)
            
            modifyRecentUnLikes(recentLikes.filter((item) => item !== index));
          }
          
    };
    const commentSender=(commenter)=>{
        fetch(`${hostname}/update/comments`,{
            method : 'POST',
            headers :{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(commenter)
        })
        .then((res)=>{
            if(res.ok){
                console.log("comment addded .")
            }
            else{
                console.log("failed to comment");
            }
        })
        .catch((err)=>{
            console.log("fetch error: ",err);
        })
    }

    const localUpdater=(index,liker)=>{
        console.log("localUpdater called .")
        AllPostsOrder[index].likes=liker;
      //  console.log(AllPostsOrder,AllPosts);
        UpdateAllPosts(AllPostsOrder.reverse());
    }

    // const localUpadter2=(AllPostsOrder)=>{
    //     UpdateAllPosts(AllPostsOrder);
    // }
 // console.log(AllPosts[0]['comments']['commentBLOCK'][0]['comment'])
 const [comments, setComments] = useState([]);

 const AddComment = (postID, index, CB) => {
    
    const Mycomment = {
        username: username,
        comment: comments[index]
      };
    if (comments[index] && comments[index].trim() !== "") {
     // console.log(comments[index]);
      const commenter = {
        postID: postID,
        comments: {
          commentBLOCK: [
            ...CB,Mycomment
          ],
          count: CB.length + 1
        }
      };
      AllPostsOrder[index].comments.count++;
        AllPostsOrder[index].comments.commentBLOCK = [...AllPostsOrder[index].comments.commentBLOCK, Mycomment];
       setComments([]);
        UpdateAllPosts(AllPostsOrder);
      console.log(commenter);
      commentSender(commenter);
    }   
  };
  

  const handleInputChange = (index, event) => {
    const updatedComments = [...comments]; // Create a copy of the comments array
    updatedComments[index] = event.target.value; // Update the value at the specific index
    setComments(updatedComments);
  };
  return (
    <div className="middle_part">
            <div className="inner_Middle">
                <div className="search_top_bar">
                    <div className="seach_bar_1">
                        <input className='search_boxi' type="text" name='search' placeholder="Search in BlogIT"/>
                        <div className="srch_buton" onClick={()=>changeMessage()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div className="test_ii">
                   <div className="post_block">
                   {AllPostsOrder.map((ele,index)=>{
                                    if(ele['postImage']===" "){
                                        return (
                                        <li className="img_post" key={index}>
                                            <div className="userINFO_00">
                                                <div className="prof_img_001">
                                                <img src={`${hostname}/images/${ele['profile_p']}`}  alt=""/> 
                                                </div>
                                                <div className="userNmae322">
                                                    {ele['fullname']}
                                                </div>
                                                <div className="Add_frd">
                                                    <i className="fa-solid fa-user-plus fa-xl"></i>
                                                </div>
                                            </div>
                                            <div className="pic_212"></div>
                                            <div className="post_info_090">
                                                    <p  className="discription_001">
                                                    {ele['blog']}
                                                    </p>
                                                <div className="responces_009">
                                                    <div className="likes">

                                                    <i
                                                        style={
                                                            ele.likes !== undefined && ele.likes.likedBy.includes(username)
                                                            ? recentUnLikes.includes(index)
                                                                ? { color: 'white' }
                                                                : { color: 'red' }
                                                            : recentLikes.includes(index)
                                                            ? recentUnLikes.includes(index)
                                                                ? { color: 'white' }
                                                                : { color: 'red' }
                                                            : { color: 'white' }
                                                        }
                                                        className="fa-solid fa-sharp fa-heart fa-xl "
                                                        onClick={() =>
                                                            LikePost(
                                                            ele.postID,
                                                            ele.likes !== undefined ? ele.likes.likedBy : [],
                                                            index
                                                            )
                                                        }
                                                        ></i>



                                                        <p className='modifyLike'>{(ele.likes!==undefined) ? ele.likes.count : 0 } </p>
                                                    </div>
                                                    <details className="comments">
                                                    <summary className="comment_summ">
                                                        <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                                                        <p>{(ele.comments!==undefined) ? ele.comments.count : 0 }</p>
                                                    </summary>
                                                    <div className="commenter_22">
                                                        <div className="other_comts">
                                                        { <div className="other_comts">
                                                            {ele.comments !== undefined ? ele.comments.commentBLOCK .map((com_info ,index_) => {
                                                                return (
                                                                    <li className="frnd_121 ech_cmt" key={index_}>
                                                                        <div className="frd_inffo">
                                                                            <div className="uzrnem_23">
                                                                            <i className="fa-solid fa-user"></i>  {com_info.username}
                                                                            </div>
                                                                            <div className="commen_txt">
                                                                            <i className="fa-solid fa-arrow-right"></i>  {com_info.comment}
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }) : <div></div>}
                                                        </div> }

                                                        </div>
                                                        <div className="comm_boxi" >
                                                          <input key={index}  className='commentInputBox' name='comment' type="text" placeholder="Add Comment"  value={comments[index]||''}  onChange={(event) => handleInputChange(index, event)} />
                                                                <div className="save_cmt">
                                                                     <i className="fa-solid fa-arrow-right" onClick={() => AddComment(ele.postID, index ,ele.comments !== undefined ? ele.comments.commentBLOCK : []) }></i>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </details>
                                                </div>
                                            </div>
                                        </li>);
                                    }
                                    else{
                                        return (
                                        <li className="img_post" key={index}>
                                        <div className="userINFO_00">
                                            <div className="prof_img_001">
                                               <img src={`${hostname}/images/${ele['profile_p']}`}  alt=""/>                                </div>
                                            <div className="userNmae322">
                                                 {ele['fullname']}
                                            </div>
                                            <div className="Add_frd">
                                                <i className="fa-solid fa-user-plus fa-xl"></i>
                                            </div>
                                        </div>
                                        <div className="pic_212">
                                              <img src={`${hostname}/images/${ele['postImage']}`}  alt=""/>                            </div>
                                        <div className="post_info_090">
                                          <p  className="discription_001">
                                                    {ele['blog']}
                                          </p>
                                            <div className="responces_009">
                                                <div className="likes">
                                                <i
                                                        style={
                                                            ele.likes !== undefined && ele.likes.likedBy.includes(username)
                                                            ? recentUnLikes.includes(index)
                                                                ? { color: 'white' }
                                                                : { color: 'red' }
                                                            : recentLikes.includes(index)
                                                            ? recentUnLikes.includes(index)
                                                                ? { color: 'white' }
                                                                : { color: 'red' }
                                                            : { color: 'white' }
                                                        }
                                                        className="fa-solid fa-sharp fa-heart fa-xl "
                                                        onClick={() =>
                                                            LikePost(
                                                            ele.postID,
                                                            ele.likes !== undefined ? ele.likes.likedBy : [],
                                                            index
                                                            )
                                                        }
                                                ></i>
                                                    <p className='modifyLike'>{(ele.likes!==undefined) ? ele.likes.count : 0 }</p>
                                                </div>
                                                <details className="comments">
                                                    <summary className="comment_summ">
                                                        <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                                                        <p>{(ele.comments!==undefined) ? ele.comments.count : 0 }</p>
                                                    </summary>
                                                    <div className="commenter_22">
                                                        <div className="other_comts">
                                                        { <div className="other_comts">
                                                            {ele.comments !== undefined ? ele.comments.commentBLOCK .map((com_info ,index_) => {
                                                                return (
                                                                    <li className="frnd_121 ech_cmt" key={index_}>
                                                                        <div className="frd_inffo">
                                                                            <div className="uzrnem_23">
                                                                            <i className="fa-solid fa-user"></i> {com_info.username}
                                                                            </div>
                                                                            <div className="commen_txt">
                                                                            <i className="fa-solid fa-arrow-right"></i>  {com_info.comment}
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            }) : <div></div>}
                                                        </div> }

                                                        </div>
                                                        <div className="comm_boxi" >
                                                          <input key={index}  className='commentInputBox' name='comment' type="text" placeholder="Add Comment"   onChange={(event) => handleInputChange(index, event)} />
                                                                <div className="save_cmt">
                                                                     <i className="fa-solid fa-arrow-right" onClick={() => AddComment(ele.postID, index ,ele.comments !== undefined ? ele.comments.commentBLOCK : []) }></i>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                        </li>
                                        )
                                    }
                                })}
                   </div>
                </div>
            </div>
        </div>
  )

                            }