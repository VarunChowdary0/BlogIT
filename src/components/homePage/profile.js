import React from 'react';
import '../../styles/homePage.css';
import '../../styles/profile.css';
import { useContext } from 'react';
import { Globals } from '../universalContent/content_1';
import { useState, useEffect } from 'react';
import EditInfo from './EditInfo';

export default function Profile() {
  const { hostname } = useContext(Globals);
  const { profile_path } = useContext(Globals);
  const { uniqueID } = useContext(Globals);
  const { following, addFollowing } = useContext(Globals);
  const { viewUser, setViewUser } = useContext(Globals);
  const { followers } = useContext(Globals);
  const { username } = useContext(Globals);
  const { Bio } = useContext(Globals);
  const { fullname } = useContext(Globals);
  const { showEditorPopUp, setEditorPopUp } = useContext(Globals);
  const [UserArray, setUserArray] = useState([]);
  const [AllPostsRaw, UpdateAllPosts] = useState(
    JSON.parse(localStorage.getItem('PostIdArray')) || []
  );
  const AllPostsOrder = AllPostsRaw;
  const { location } = useContext(Globals);

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
          // localUpdater(index,liker);
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
          likedBy: [...likedby, username], // Add the current user's username to the existing likedBy array
          count: likedby.length + 1, // Increment the likes count by 1
        },
      };
      if (AllPostsOrder[index].likes !== undefined) {
        AllPostsOrder[index].likes.count++;
        AllPostsOrder[index].likes.likedBy = [...likedby, username];
      }
      // eval(document.querySelectorAll(".modifyLike")[index].innerHTML)++;

      // if (likeElements.length > index) {
      // const likeCount = likeElements[index];
      // console.log(likeCount.innerHTML);

      //  console.log(liker);
      updater(liker, index);
      modifyRecentLikes(recentLikes.filter((item) => item !== index));
    } else {
      console.log('Remove like.');
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
          count: likedby.length,
        },
      };

      //console.log(liker);
      updater(liker, index);

      modifyRecentUnLikes(recentLikes.filter((item) => item !== index));
    }
  };

  const localUpdater = (index, liker) => {
    console.log('localUpdater called .');
    AllPostsOrder[index].likes = liker;
    //  console.log(AllPostsOrder,AllPosts);
    UpdateAllPosts(AllPostsOrder);
  };

  // const localUpadter2=(AllPostsOrder)=>{
  //     UpdateAllPosts(AllPostsOrder);
  // }
  // console.log(AllPosts[0]['comments']['commentBLOCK'][0]['comment'])
  const [comments, setComments] = useState([]);

  ///console.log(followers);

  const AddComment = (postID, index, CB) => {
    const Mycomment = {
      username: username,
      comment: comments[index],
    };
    if (comments[index] && comments[index].trim() !== '') {
      // console.log(comments[index]);
      const commenter = {
        postID: postID,
        comments: {
          commentBLOCK: [...CB, Mycomment],
          count: CB.length + 1,
        },
      };
      AllPostsOrder[index].comments.count++;
      AllPostsOrder[index].comments.commentBLOCK = [
        ...AllPostsOrder[index].comments.commentBLOCK,
        Mycomment,
      ];
      setComments([]);
      UpdateAllPosts(AllPostsOrder);
      console.log(commenter);
    }
  };

  const handleInputChange = (index, event) => {
    const updatedComments = [...comments]; // Create a copy of the comments array
    updatedComments[index] = event.target.value; // Update the value at the specific index
    setComments(updatedComments);
  };

  // change the total fetch route
  useEffect(() => {
    const getUsernames = () => {
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
          setUserArray(userArray);
          // console.log(UserArray);
        })
        .catch((err) => {
          console.log('Error fetching the user Array:', err);
        });
    };

    getUsernames();
  }, []);
  const stopLoad = () => {
    changeLoad(false);
  };
  const [load, changeLoad] = useState(true);
  if (UserArray.length !== 0) {
    //console.log(UserArray);
    if (load) {
      stopLoad();
    }
  }
  const openEditorPopUp = () => {
    setEditorPopUp(true);
    console.log(showEditorPopUp);
  };

  const seeUser = (u_id) => {
    setViewUser();
    setViewUser(u_id);
    localStorage.setItem('SeeUser', JSON.stringify(u_id));
    if (viewUser !== undefined) {
      window.location.href = '/view';
    }
    //console.log(viewUser)
  };
  const followSomeOne = (u_id) => {
    fetch(`${hostname}/manage/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uniqueID: uniqueID,
        newFollowing: u_id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          //  console.log("Ok");
          return res.json();
        } else {
          console.log('Failed');
        }
      })
      .then((data) => {
        const response = data;
        //console.log(response['data']);
        addFollowing(response['data']['following']);
        localStorage.setItem('userDATA', JSON.stringify(response['data']));
      })
      .catch((err) => {
        console.log('Server Error: ', err);
      });
  };

  const UnfollowSomeOne = (u_id) => {
    fetch(`${hostname}/manage/unfollow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uniqueID: uniqueID,
        unfollowing: u_id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          //  console.log("Ok");
          return res.json();
        } else {
          console.log('Failed');
        }
      })
      .then((data) => {
        const response = data;
        // console.log(response['data']);
        addFollowing(response['data']['following']);
        localStorage.setItem('userDATA', JSON.stringify(response['data']));
      })
      .catch((err) => {
        console.log('Server Error: ', err);
      });
  };
  return (
    <div className="middle_part">
      {load ? (
        <div className="inner_Middle">
          <div className="search_top_bar">
            <div className="seach_bar_1">
              <input type="text" placeholder="Search in BlogIT" />
              <div className="srch_buton">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
          <div className="test_ii loader_biu">
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
      ) : (
        <div className="inner_Middle">
          <div className="search_top_bar">
            <div className="seach_bar_1">
              <input type="text" placeholder="Search in BlogIT" />
              <div className="srch_buton">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
          <div className="test_ii profile_block">
            <div className="sector_1_profile">
              <div className="line_-1">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="profile_circle">
                <img src={`${hostname}/images/${profile_path}`} alt="profile" />
              </div>
            </div>
            <div className="sector_2_profile">
              <div className="fullname">{fullname}</div>
              <div className="user_name">{username}</div>
              <div className="posts_info">
                <a href="#Posts_div">
                  <div className="div_count">
                    <div className="count">{AllPostsOrder.length}</div>
                    <div className="tillt">POSTS</div>
                  </div>
                </a>
                <a href="#Followers_div">
                  <div className="div_count">
                    <div className="count">{followers.length}</div>
                    <div className="tillt">Followers</div>
                  </div>
                </a>
                <a href="#Following_div">
                  <div className="div_count">
                    <div className="count">{following.length}</div>
                    <div className="tillt">Following</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="bio_txt">{Bio}</div>
            <div className="location_info">
              <i className="fa-solid fa-location-dot"></i>
              {location}
            </div>
            <div className="add_info_block">
              <div className="info_add_butt" onClick={() => openEditorPopUp()}>
                Add
              </div>
              <div className="info_add_butt" onClick={() => openEditorPopUp()}>
                Edit
              </div>
            </div>
            <div id="Posts_div" className="sector_3">
              <div className="post">
                {AllPostsOrder.map((ele, index) => {
                  if (ele['postImage'] === ' ') {
                    return (
                      <li className="img_post" key={index}>
                        <div className="userINFO_00">
                          <div className="prof_img_001">
                            <img
                              src={`${hostname}/images/${ele['profile_p']}`}
                              alt=""
                            />
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
                          <p className="discription_001">{ele['blog']}</p>
                          <div className="responces_009">
                            <div className="likes">
                              <i
                                style={
                                  ele.likes !== undefined &&
                                  ele.likes.likedBy.includes(username)
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
                                    ele.likes !== undefined
                                      ? ele.likes.likedBy
                                      : [],
                                    index
                                  )
                                }
                              ></i>

                              <p className="modifyLike">
                                {ele.likes !== undefined ? ele.likes.count : 0}
                              </p>
                            </div>
                            <details className="comments">
                              <summary className="comment_summ">
                                <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                                <p>
                                  {ele.comments !== undefined
                                    ? ele.comments.count
                                    : 0}
                                </p>
                              </summary>
                              <div className="commenter_22">
                                <div className="other_comts">
                                  {' '}
                                  <div className="other_comts">
                                    {ele.comments !== undefined
                                      ? ele.comments.commentBLOCK.map(
                                          (com_info, index_) => {
                                            return (
                                              <li
                                                className="frnd_121 ech_cmt"
                                                key={index_}
                                              >
                                                <div className="frd_inffo">
                                                  <div className="uzrnem_23">
                                                    <i className="fa-solid fa-user"></i>{' '}
                                                    {com_info.username}
                                                  </div>
                                                  <div className="commen_txt">
                                                    <i className="fa-solid fa-arrow-right"></i>{' '}
                                                    {com_info.comment}
                                                  </div>
                                                </div>
                                              </li>
                                            );
                                          }
                                        )
                                      : <div></div>}
                                  </div>{' '}
                                </div>
                                <div className="comm_boxi">
                                  <input
                                    key={index}
                                    className="commentInputBox"
                                    name="comment"
                                    type="text"
                                    placeholder="Add Comment"
                                    value={comments[index] || ''}
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                  />
                                  <div className="save_cmt">
                                    <i
                                      className="fa-solid fa-arrow-right"
                                      onClick={() =>
                                        AddComment(
                                          ele.postID,
                                          index,
                                          ele.comments !== undefined
                                            ? ele.comments.commentBLOCK
                                            : []
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
                        <div className="userINFO_00">
                          <div className="prof_img_001">
                            <img
                              src={`${hostname}/images/${ele['profile_p']}`}
                              alt=""
                            />
                          </div>
                          <div className="userNmae322">
                            {ele['fullname']}
                          </div>
                          <div className="Add_frd">
                            <i className="fa-solid fa-user-plus fa-xl"></i>
                          </div>
                        </div>
                        <div className="pic_212">
                          <img
                            src={`${hostname}/images/${ele['postImage']}`}
                            alt=""
                          />
                        </div>
                        <div className="post_info_090">
                          <p className="discription_001">{ele['blog']}</p>
                          <div className="responces_009">
                            <div className="likes">
                              <i
                                style={
                                  ele.likes !== undefined &&
                                  ele.likes.likedBy.includes(username)
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
                                    ele.likes !== undefined
                                      ? ele.likes.likedBy
                                      : [],
                                    index
                                  )
                                }
                              ></i>
                              <p className="modifyLike">
                                {ele.likes !== undefined ? ele.likes.count : 0}
                              </p>
                            </div>
                            <details className="comments">
                              <summary className="comment_summ">
                                <i className="fa-solid fa-sharp fa-comment fa-xl"></i>
                                <p>
                                  {ele.comments !== undefined
                                    ? ele.comments.count
                                    : 0}
                                </p>
                              </summary>
                              <div className="commenter_22">
                                <div className="other_comts">
                                  {' '}
                                  <div className="other_comts">
                                    {ele.comments !== undefined
                                      ? ele.comments.commentBLOCK.map(
                                          (com_info, index_) => {
                                            return (
                                              <li
                                                className="frnd_121 ech_cmt"
                                                key={index_}
                                              >
                                                <div className="frd_inffo">
                                                  <div className="uzrnem_23">
                                                    <i className="fa-solid fa-user"></i>{' '}
                                                    {com_info.username}
                                                  </div>
                                                  <div className="commen_txt">
                                                    <i className="fa-solid fa-arrow-right"></i>{' '}
                                                    {com_info.comment}
                                                  </div>
                                                </div>
                                              </li>
                                            );
                                          }
                                        )
                                      : <div></div>}
                                  </div>{' '}
                                </div>
                                <div className="comm_boxi">
                                  <input
                                    key={index}
                                    className="commentInputBox"
                                    name="comment"
                                    type="text"
                                    placeholder="Add Comment"
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                  />
                                  <div className="save_cmt">
                                    <i
                                      className="fa-solid fa-arrow-right"
                                      onClick={() =>
                                        AddComment(
                                          ele.postID,
                                          index,
                                          ele.comments !== undefined
                                            ? ele.comments.commentBLOCK
                                            : []
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
                })}
              </div>
            </div>

            <div id="Followers_div" className="sector_3">
              <div>Followers</div>
              <div className="friends_block">
                {UserArray.map((ele, index) => {
                  if (
                    ele['username'] !== username &&
                    followers.find((item) => item === ele['uniqueID']) !==
                      undefined
                  ) {
                    return (
                      <li className="frnd_121" key={index}>
                        <div
                          className="frnd_121"
                          onClick={() => {
                            seeUser(ele['uniqueID']);
                          }}
                        >
                          <div className="frd_prf">
                            <img
                              src={`${hostname}/images/${ele['profile']}`}
                              alt=""
                            />
                          </div>
                          <div className="frd_inffo_1">
                            <div className="uzrnem_23_1">
                              {`${ele['firstname']} ${ele['lastname']}`}
                            </div>
                            <div className="_ful_nam_1">{`${ele['username']}`}</div>
                          </div>
                        </div>
                        <div
                          className="follow_icn"
                          onClick={() => {
                            seeUser(ele['uniqueID']);
                          }}
                        >
                          view
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <div id="Following_div" className="sector_3">
              <div>Following</div>
              <div className="friends_block">
                {UserArray.map((ele, index) => {
                  if (
                    ele['username'] !== username &&
                    following.find((item) => item === ele['uniqueID']) !==
                      undefined
                  ) {
                    return (
                      <li className="frnd_121" key={index}>
                        <div
                          className="frnd_121"
                          onClick={() => {
                            seeUser(ele['uniqueID']);
                          }}
                        >
                          <div className="frd_prf">
                            <img
                              src={`${hostname}/images/${ele['profile']}`}
                              alt=""
                            />
                          </div>
                          <div className="frd_inffo_1">
                            <div className="uzrnem_23_1">
                              {`${ele['firstname']} ${ele['lastname']}`}
                            </div>
                            <div className="_ful_nam_1">{`${ele['username']}`}</div>
                          </div>
                        </div>
                        <div
                          className="follow_icn"
                          onClick={() => {
                            UnfollowSomeOne(ele['uniqueID']);
                          }}
                        >
                          unfollow
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <EditInfo />
    </div>
  );
}
