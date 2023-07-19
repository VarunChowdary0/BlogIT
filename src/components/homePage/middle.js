import React, { useContext, useState } from 'react';
import '../../styles/homePage.css';
import { Globals } from '../universalContent/content_1';

export default function Middle() {
  const { hostname } = useContext(Globals);
  const { following, addFollowing } = useContext(Globals);
  const { username } = useContext(Globals);
  const {viewUser,setViewUser}=useContext(Globals);
  const [AllPostsRaw, UpdateAllPosts] = useState(
    JSON.parse(localStorage.getItem('AllPosts')) || []
  );

  const AllPostsOrder = AllPostsRaw.map((post) => post); // Create a copy of AllPostsRaw

  const updater = (liker, index) => {
    fetch(`${hostname}/update/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(liker),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data['message']);
      })
      .catch((err) => {
        console.log('update error : ', err);
      });
  };

  const [recentLikes, modifyRecentLikes] = useState([]);
  const [recentUnLikes, modifyRecentUnLikes] = useState([]);

  const LikePost = (postId, likedby, index) => {
    if (likedby && !likedby.includes(username)) {
      console.log(recentLikes);
      const liker = {
        postID: postId,
        likes: {
          likedBy: [...likedby, username],
          count: likedby.length + 1,
        },
      };
      if (AllPostsOrder[index].likes !== undefined) {
        AllPostsOrder[index].likes.count++;
        AllPostsOrder[index].likes.likedBy = [...likedby, username];
      }
      updater(liker, index);
      modifyRecentLikes(recentLikes.filter((item) => item !== index));
    } else {
      console.log('Remove like.');
      AllPostsOrder[index].likes.count--;
      const indexToRemove = likedby.indexOf(username);
      if (indexToRemove !== -1) {
        likedby.splice(indexToRemove, 1);
      }
      const liker = {
        postID: postId,
        likes: {
          likedBy: likedby,
          count: likedby.length,
        },
      };
      updater(liker, index);
      modifyRecentUnLikes(recentLikes.filter((item) => item !== index));
    }
  };

  const commentSender = (commenter) => {
    fetch(`${hostname}/update/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commenter),
    })
      .then((res) => {
        if (res.ok) {
          console.log('comment added.');
        } else {
          console.log('failed to comment');
        }
      })
      .catch((err) => {
        console.log('fetch error: ', err);
      });
  };

  const [comments, setComments] = useState([]);

  const AddComment = (postID, index, CB) => {
    const Mycomment = {
      username: username,
      comment: comments[index],
    };

    if (comments[index] && comments[index].trim() !== '') {
      AllPostsOrder[index].comments.count++;
      AllPostsOrder[index].comments.commentBLOCK.push(Mycomment);

      setComments([]);
      UpdateAllPosts(AllPostsOrder);

      const commenter = {
        postID: postID,
        comments: {
          commentBLOCK: [...CB, Mycomment],
          count: CB.length + 1,
        },
      };

      commentSender(commenter);
    }
  };

  const handleInputChange = (index, event) => {
    comments[index] = event.target.value;
    setComments([...comments]);
  };
  const seeUser=(u_id)=>{
    setViewUser();
    setViewUser(u_id);
     localStorage.setItem("SeeUser",JSON.stringify(u_id));
     if(viewUser!==undefined)
     {
       window.location.href='/view';
     }
   // console.log(u_id)
   }

  return (
    <div className="middle_part">
      <div className="inner_Middle">
        <div className="search_top_bar">
          <div className="seach_bar_1">
            <input className="search_boxi" type="text" name="search" placeholder="Search in BlogIT" />
            <div className="srch_buton" >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="test_ii">
          <div className="post_block">
            {AllPostsOrder.map((ele, index) => {
              if (following.find((item) => item === ele['uniqueID_p']) !== undefined) {
                if (ele['postImage'] === ' ') {
                  return (
                    <li className="img_post" key={index}>
                      <div className="userINFO_00" onClick={()=>{seeUser(ele['uniqueID_p'])}}>
                        <div className="prof_img_001">
                          <img src={`${hostname}/images/${ele['profile_p']}`} alt="" />
                        </div>
                        <div className="userNmae322">{ele['fullname']}</div>
                        <div className="Add_frd">
                          <i className="fa-solid fa-ghost fa-xl"></i>
                        </div>
                      </div>
                      <div className="pic_212"></div>
                      <div className="post_info_090">
                        <pre className="discription_001 blog_nwsn">{ele['blog']}</pre>
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
                              className="fa-solid fa-sharp fa-heart fa-xl"
                              onClick={() =>
                                LikePost(
                                  ele.postID,
                                  ele.likes !== undefined ? ele.likes.likedBy : [],
                                  index
                                )
                              }
                            ></i>
                            <p className="modifyLike">{ele.likes !== undefined ? ele.likes.count : 0}</p>
                          </div>
                          <details className="comments">
                            <summary className="comment_summ">
                              <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                              <p>{ele.comments !== undefined ? ele.comments.count : 0}</p>
                            </summary>
                            <div className="commenter_22">
                              <div className="other_comts">
                                <div className="other_comts">
                                  {ele.comments !== undefined ? (
                                    ele.comments.commentBLOCK.map((com_info, index_) => {
                                      return (
                                        <li className="frnd_121 ech_cmt" key={index_}>
                                          <div className="frd_inffo">
                                            <div className="uzrnem_23">
                                              <i className="fa-solid fa-user"></i> {com_info.username}
                                            </div>
                                            <div className="commen_txt">
                                              <i className="fa-solid fa-arrow-right"></i> {com_info.comment}
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              </div>
                              <div className="comm_boxi">
                                <input
                                  key={index}
                                  className="commentInputBox"
                                  name="comment"
                                  type="text"
                                  placeholder="Add Comment"
                                  value={comments[index] || ''}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                                <div className="save_cmt">
                                  <i
                                    className="fa-solid fa-arrow-right"
                                    onClick={() =>
                                      AddComment(
                                        ele.postID,
                                        index,
                                        ele.comments !== undefined ? ele.comments.commentBLOCK : []
                                      )
                                    }
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </details>
                        </div>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li className="img_post" key={index}>
                      <div className="userINFO_00" onClick={()=>{seeUser(ele['uniqueID_p'])}}>
                        <div className="prof_img_001">
                          <img src={`${hostname}/images/${ele['profile_p']}`} alt="" />
                        </div>
                        <div className="userNmae322">{ele['fullname']}</div>
                        <div className="Add_frd">
                          { <i className="fa-solid fa-ghost fa-xl"></i> }
                        </div>
                      </div>
                      <div className="pic_212">
                        <img src={`${hostname}/images/${ele['postImage']}`} alt="" />
                      </div>
                      <div className="post_info_090">
                        <pre className="discription_001">{ele['blog']}</pre>
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
                              className="fa-solid fa-sharp fa-heart fa-xl"
                              onClick={() =>
                                LikePost(
                                  ele.postID,
                                  ele.likes !== undefined ? ele.likes.likedBy : [],
                                  index
                                )
                              }
                            ></i>
                            <p className="modifyLike">{ele.likes !== undefined ? ele.likes.count : 0}</p>
                          </div>
                          <details className="comments">
                            <summary className="comment_summ">
                              <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                              <p>{ele.comments !== undefined ? ele.comments.count : 0}</p>
                            </summary>
                            <div className="commenter_22">
                              <div className="other_comts">
                                <div className="other_comts">
                                  {ele.comments !== undefined ? (
                                    ele.comments.commentBLOCK.map((com_info, index_) => {
                                      return (
                                        <li className="frnd_121 ech_cmt" key={index_}>
                                          <div className="frd_inffo">
                                            <div className="uzrnem_23">
                                              <i className="fa-solid fa-user"></i> {com_info.username}
                                            </div>
                                            <div className="commen_txt">
                                              <i className="fa-solid fa-arrow-right"></i> {com_info.comment}
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              </div>
                              <div className="comm_boxi">
                                <input
                                  key={index}
                                  className="commentInputBox"
                                  name="comment"
                                  type="text"
                                  placeholder="Add Comment"
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                                <div className="save_cmt">
                                  <i
                                    className="fa-solid fa-arrow-right"
                                    onClick={() =>
                                      AddComment(
                                        ele.postID,
                                        index,
                                        ele.comments !== undefined ? ele.comments.commentBLOCK : []
                                      )
                                    }
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </details>
                        </div>
                      </div>
                    </li>
                  );
                }
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
