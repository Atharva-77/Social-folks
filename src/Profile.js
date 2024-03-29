import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import "./Profile.css";

import { userAction_details } from "./Reducers/actions/userActions";

import Post4 from "./Post4";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { storage } from "./firebaseFolder/index2.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LINKURL } from "./Reducers/constants/userConstants";

function Profile() {
  const { id } = useParams();
  // console.log("/ID",id,id==typeof(undefined));

  const [profileData, setprofileData] = useState("");
  const [postTabclicked, setpostTabclicked] = useState(1);
  const [replyTabclicked, setreplyTabclicked] = useState(0);
  const [data, setdata] = useState("");
  const [likesdata, setlikesdata] = useState("");

  const [editDescription, seteditDescription] = useState("");

  const [editCnt, setEditCnt] = useState(0);
  const [editPicCnt, setEditPicCnt] = useState(0);

  const [fileDetails, setfileDetails] = useState("");
  const [fileDetails_Cover, setfileDetails_Cover] = useState("");
  var fileTypes = [".jpg", ".png", ".jpeg"];
  const [url, setUrl] = useState("");
  const [coverUrl, setcoverUrl] = useState("");

  const [plsLoginMessg, setplsLoginMessg] = useState(false);

  const dispatch = useDispatch();
  const userLoginData = useSelector((state) => state.userLoginKey);

  const { loading, userInfo, error } = userLoginData;

  var Totalpost = 0;
  var TotalRepliespost = 0;
  // const [email, setemail] = useState('hi@1');
  // const [password, setpassword] = useState('q1');

  // setemail(userInfo.email);
  // setpassword(userInfo.password);

  // console.log("PROFILE USE-SELECTOR",userInfo,userInfo.username);
  // console.log("ID-FOLLOW",id,userInfo.username);
  // console.log("PROFILE Data ",profileData,profileData=="No Such User",Object.keys(profileData).length,"Userinfo",Object.keys(userInfo).length);

  useEffect(() => {
    if (id == typeof undefined) {
      console.log("ID Undefined");
      setprofileData("NO SUCH USER");
    } else {
      console.log("YES/NOT LOGGED IN");

      const userData = {
        username: id,
      };

      axios.post(`${LINKURL}/profile/${id}`, userData).then((res) => {
        console.log("Profile RES.DATA ", res.data);
        setprofileData(res.data);
      });

      axios.get(`${LINKURL}/post/postedBy/${id}`).then((res) => {
        // console.log("Posts all  RES.DATA ",(res.data));
        // setprofileData(res.data);
        setdata(res.data);
      });

      axios.get(`${LINKURL}/post/postedBy/likes/${id}`).then((res) => {
        // console.log("Likes  RES.DATA ",(res.data));
        // setprofileData(res.data);
        setlikesdata(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id != typeof undefined) {
      console.log("22ID ");
      // console.log("FILESSCVALL " ,fileDetails, fileDetails_Cover)
      // setfileDetails
      // setfileDetails_Cover

      // if(fileDetails!='' && url!='')
      // console.log("FILED1 ",url);

      // if(fileDetails_Cover!='' && coverUrl!='')
      //     console.log("FILED2 ", coverUrl);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const userData = {
        username: id,
        profilePicUrl: url,
        coverPicUrl: coverUrl,
      };

      //     axios.put(`${LINKURL}/profile/imgUrls/${id}`, userData,config)
      //         .then(res => {
      //             console.log("Profile RES.DATA ", (res.data));
      //             // setprofileData(res.data);

      //         })

      if (fileDetails != "" && fileDetails_Cover != "") {
        if (url != "" && coverUrl != "") {
          console.log("BOTH URLS", url, "\n\n", coverUrl);

          axios
            .put(`${LINKURL}/profile/imgUrls/${id}`, userData, config)
            .then((res) => {
              console.log("Profile RES.DATA ", res.data);
              setprofileData(res.data);
            });

          setfileDetails("");
          setfileDetails_Cover("");
          setUrl("");
          setcoverUrl("");

          // dispatch(userAction_details(userInfo.email,userInfo.password));
        }
      } else if (fileDetails != "") {
        if (url != "") {
          console.log("ELSE If - BOTH URLS", url);
          userData.coverPicUrl = undefined;

          axios
            .put(`${LINKURL}/profile/imgUrls/${id}`, userData, config)
            .then((res) => {
              console.log("Profile RES.DATA ", res.data);
              setprofileData(res.data);
            });
          setfileDetails("");
          setfileDetails_Cover("");
          setUrl("");
          setcoverUrl("");

          // dispatch(userAction_details(userInfo.email,userInfo.password));
        }
      } else if (fileDetails_Cover != "") {
        if (coverUrl != "") {
          console.log("3.Else if-BOTH CURLS", coverUrl);
          userData.profilePicUrl = undefined;

          axios
            .put(`${LINKURL}/profile/imgUrls/${id}`, userData, config)
            .then((res) => {
              console.log("Profile RES.DATA ", res.data);
              setprofileData(res.data);
            });
          setfileDetails("");
          setfileDetails_Cover("");
          setUrl("");
          setcoverUrl("");

          // dispatch(userAction_details(userInfo.email,userInfo.password));
        }
      }
    }
    // else
    // {
    //     console.log("YES/NOT LOGGED IN");
    //     const config =
    //     {
    //         headers:
    //         {
    //             'Content-Type': "application/json",
    //             Authorization: `Bearer ${userInfo.token}`
    //         }
    //     }

    //     const userData =
    //     {
    //         "username": id,
    //         "coverPicUrl": url,
    //         "profilePicUrl": coverUrl
    //     }

    //     axios.put(`${LINKURL}/profile/imgUrls/${id}`, userData,config)
    //         .then(res => {
    //             console.log("Profile RES.DATA ", (res.data));
    //             // setprofileData(res.data);

    //         })

    //     // axios.post(`${LINKURL}/profile/${id}`, userData)
    //     //     .then(res => {
    //     //         console.log("Profile RES.DATA ", (res.data));
    //     //         setprofileData(res.data);

    //     //     })

    // }
  }, [url, coverUrl]);

  const postsTab_clicked_func = () => {
    console.log("Posts tab clicked", data);
    setdata(1);
    setpostTabclicked(1);
    setreplyTabclicked(0);

    //To update data
    const userData = {
      username: id,
    };

    axios.get(`${LINKURL}/post/postedBy/${id}`).then((res) => {
      console.log("1.1.Posts all  RES.DATA ", res.data);
      // setprofileData(res.data);
      setdata(res.data);
    });

    axios.get(`${LINKURL}/post/postedBy/likes/${id}`).then((res) => {
      console.log("Likes  RES.DATA ", res.data);
      // setprofileData(res.data);
      setlikesdata(res.data);
    });
  };

  const replyTab_clicked_func = () => {
    console.log("Replies tab clicked", data);
    setdata(1);
    setpostTabclicked(0);
    setreplyTabclicked(1);

    //To update data
    const userData = {
      username: id,
    };
    axios.get(`${LINKURL}/post/postedBy/${id}`).then((res) => {
      console.log("ReplyPosts all  RES.DATA ", res.data);
      // setprofileData(res.data);
      setdata(res.data);
    });

    axios.get(`${LINKURL}/post/postedBy/likes/${id}`).then((res) => {
      console.log("Likes  RES.DATA ", res.data);
      // setprofileData(res.data);
      setlikesdata(res.data);
    });
  };

  const likeTab_clicked_func = () => {
    console.log("Like tab clicked");
    setpostTabclicked(0);
    setreplyTabclicked(0);

    axios.get(`${LINKURL}/post/postedBy/likes/${id}`).then((res) => {
      console.log("Likes  RES.DATA ", res.data);
      // setprofileData(res.data);
      setlikesdata(res.data);
    });

    const userData = {
      username: id,
    };

    axios.get(`${LINKURL}/post/postedBy/${id}`).then((res) => {
      console.log("ReplyPosts all  RES.DATA ", res.data);
      // setprofileData(res.data);
      setdata(res.data);
    });
  };

  const follow_following_func = () => {
    console.log(
      "Follwo Id of user is",
      profileData._id,
      profileData.followers.includes(userInfo.id)
    );
    if (userInfo.id == undefined) {
      setplsLoginMessg(true);
    } else {
      const postData = {
        userFollowId: profileData._id,
      };

      axios
        .put(`${LINKURL}/profile/followRoute/${userInfo.username}`, postData)
        .then((res) => {
          // dispatch(userAction_details(userInfo.email,'q1'));

          console.log("Follow data all  RES.DATA ", res.data);
          // setprofileData(res.data);
          setprofileData(res.data);
        });
      setplsLoginMessg(false);
    }
  };

  // const following_func=()=>
  // {
  //     console.log("Following Id of user is",id);
  // }

  {
    var result = Object.keys(data).map((key) => [data[key]]);
    // console.log("RESULTss",result,typeof(result));
  }
  {
    var likesresult = Object.keys(likesdata).map((key) => [likesdata[key]]);
    // console.log("LikeRESULTss",likesresult,typeof(likesresult),"\nDATA",likesdata);
  }

  //---------------EDIT-------------------------------------------------
  // --------------------------------------------------------------------
  const edit_clicked = () => {
    console.log("ediit");
    if (editCnt == 0) setEditCnt(1);
    else setEditCnt(0);
  };

  const saveDescription_submit_clicked = () => {
    console.log("Description ", editDescription, id);
    if (editCnt == 1) setEditCnt(0);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const postData = {
      username: userInfo.username,
      description: editDescription,
    };

    axios
      .post(
        `${LINKURL}/profile/editUserDescp/${userInfo.username}`,
        postData,
        config
      )
      .then((res) => {
        // dispatch(userAction_details(userInfo.email,'q1'));

        console.log("DESC data all  RES.DATA ", res.data);
        // setprofileData(res.data);
        setprofileData(res.data);
      });
    // else
    //     setEditCnt(0);
  };

  // --------------------------------------------------------------------

  // -------------------   PIC EDIT  -------------------------------------------

  const editPic_clicked = () => {
    console.log("ediit");
    if (editPicCnt == 0) setEditPicCnt(1);
    else setEditPicCnt(0);
  };
  const editPic_close_clicked = () => {
    console.log("Closed");
    setEditPicCnt(0);

    setfileDetails("");
    setfileDetails_Cover("");
  };

  // -------FILE UPLOADS--------------
  const uploadFileHandler = (e) => {
    console.log("315", e.target.files[0]);
    setfileDetails(e.target.files[0]);
  };
  const uploadFileHandler_Cover = (e) => {
    console.log("319", e.target.files[0]);
    setfileDetails_Cover(e.target.files[0]);
  };

  // {
  //     console.log("url is", url, "\n\nCOVER", coverUrl);
  //         // console.log("\n\nCOVER",coverUrl);
  // }

  const processFileName = (fileName) => {
    // console.log("FILEDETAILS:-",fileDetails,"\n\nCOVER",fileDetails_Cover,"\nFILENAME",fileName);
    var img_extension = fileName.type.split("/")[1];

    var current_date = new Date();
    let final_date = "";
    final_date = current_date.toString().substring(0, 24);
    final_date = final_date.replace(":", "-");
    final_date = final_date.replace(":", "-");

    console.log("FIANL DATE IS", final_date, img_extension);

    var imgName = final_date + "-" + userInfo.username + "." + img_extension;

    console.log("342", imgName);

    return imgName;
  };

  const saveFileHandler = () => {
    // console.log(fileDetails);

    const file = fileDetails;

    const profilePic_File = fileDetails;
    const coverFile = fileDetails_Cover;

    if (profilePic_File != "") {
      console.log("360 IN PROFILE", profilePic_File);
      const imgName = processFileName(profilePic_File);
      console.log("353", imgName);

      //----- 1st Part of upload-------
      // const uploadTask = storage.ref(`images/${imgName}`).put(file);

      // uploadTask.on(
      //   "state_changed",
      //   snapshot => { },
      //   error => {
      //     console.log(error);
      //   },
      //   () => {
      //     storage
      //       .ref("images")
      //       .child(imgName)
      //       .getDownloadURL()
      //       .then(url => {
      //         setUrl(url);
      //       });
      //   }
      // )
      //---1st part end------

      //----2nd Part--------
      const imageRef = ref(storage, `profilePics/${imgName}`);
      uploadBytes(imageRef, profilePic_File).then((res) => {
        console.log("Res", res.ref);
        getDownloadURL(res.ref).then((url) => setUrl(url));
      });
      //---2nd part end------

      setEditPicCnt(0);
      // setfileDetails('');
      // setfileDetails_Cover('')
    }

    if (coverFile != "") {
      console.log("404 COVER", coverFile);
      const imgName = processFileName(coverFile);
      console.log("398", imgName);

      const imageRef = ref(storage, `coverPics/${imgName}`);
      uploadBytes(imageRef, coverFile).then((res) => {
        console.log("Res", res.ref);
        getDownloadURL(res.ref).then((url) => setcoverUrl(url));
      });

      setEditPicCnt(0);
      // setfileDetails('');
      // setfileDetails_Cover('')

      // setUrl('');
      // setcoverUrl('')
    }
    // console.log("424 END");
  };

  // ------end file upload------------
  return (
    <div className="Profile_top">
      {/* Profile pg */}
      {
        !loading && Object.keys(profileData).length > 0 ? (
          <div>
            {profileData != "NO SUCH USER" ? (
              <div className="1Profile_Homepage_top">
                <div className="Profile_Div_Title_Name">
                  <h2 className="Profile_title_h2">
                    Name:-
                    <span className="Profile_Title_Name">
                      {profileData.Name}
                    </span>
                  </h2>
                </div>

                <div className="Profile_Div_CoverPic">
                  {profileData.coverPicUrl != undefined ? (
                    <img
                      className="Profile_Div_Cp"
                      src={`${profileData.coverPicUrl}`}
                    />
                  ) : (
                    <img className="Profile_Div_Cp" />
                  )}

                  <div className="Profile_avatar_header">
                    <Avatar
                      className="Profile_avatar"
                      style={{ textDecoration: "none", backgroundColor: "red" }}
                      src={`${profileData.profilePicUrl}`}
                    />

                    {/*-------------------------------------------------------------------------  */}
                    {/* EDIT PIC MODAL  */}
                    {
                      Object.keys(userInfo) != 0 && id == userInfo.username ? (
                        <div>
                          <button
                            className="Profile_EditPic_button"
                            onClick={() => editPic_clicked()}
                          >
                            Edit Picture
                          </button>

                          {editPicCnt == 1 ? (
                            <div id="myModal" className="modal3">
                              <div className="Profile_EditPic_modal-content">
                                <div className="Profile_EditPic_reply-closeArrowBtn">
                                  <div className="modal-reply-heading">
                                    Edit Picture
                                  </div>
                                  <button
                                    className="closeArrowBtn"
                                    onClick={() => editPic_close_clicked()}
                                  >
                                    X
                                  </button>
                                </div>

                                <div className="modal-closeArrow-textarea">
                                  <div className="1modal-uploadPic-div">
                                    <div className="modal-uploadPic-div">
                                      <label
                                        for="file-upload1"
                                        class="custom-file-upload"
                                      >
                                        <span className="span-img">
                                          {fileDetails == "" ? (
                                            <>Upload Profile Image</>
                                          ) : (
                                            <>Uploaded</>
                                          )}
                                        </span>
                                      </label>

                                      <input
                                        id="file-upload1"
                                        type="file"
                                        accept={fileTypes}
                                        onChange={(e) => uploadFileHandler(e)}
                                      />
                                    </div>

                                    {/* ------------------------------------------------------------------------------------------ */}

                                    <div className="modal-uploadPic-div">
                                      <label
                                        for="file-upload2"
                                        class="custom-file-upload"
                                      >
                                        <span className="span-img">
                                          {fileDetails_Cover == "" ? (
                                            <>Upload Cover Image</>
                                          ) : (
                                            <>Uploaded</>
                                          )}
                                        </span>
                                      </label>

                                      <input
                                        id="file-upload2"
                                        type="file"
                                        accept={fileTypes}
                                        onChange={(e) =>
                                          uploadFileHandler_Cover(e)
                                        }
                                      />
                                    </div>
                                  </div>
                                  {/* 1modal-uploadPic-div */}
                                </div>
                                {/*Modal Cross-Arw-txt-area */}

                                <div className="Profile_EditPic_modal_Btns">
                                  {fileDetails != "" ||
                                  fileDetails_Cover != "" ? (
                                    <button
                                      id="postBtn"
                                      className="Profile_EditPic_modal_Post_reply"
                                      onClick={() => saveFileHandler()}
                                    >
                                      Save Pictures
                                    </button>
                                  ) : (
                                    <button
                                      id="postBtn"
                                      className="Profile_EditPic_modal_Post_reply_disable"
                                    >
                                      Save Pictures
                                    </button>
                                  )}

                                  <button
                                    id="closeBtn"
                                    className="Profile_EditPic_modal_Close_reply"
                                    onClick={() => editPic_close_clicked()}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : //  Modal Div end
                          null}
                          {/* editPicCnt == 1  END */}
                        </div>
                      ) : null //  Else part
                    }

                    {/*--------------------------  END MODAL -------------------------------------------  */}

                    {/* <div className='Profile_follow_div'> */}

                    {
                      Object.keys(userInfo) == 0 ? (
                        <>
                          <button
                            className="Profile_follow_button"
                            onClick={() => follow_following_func()}
                          >
                            Follow
                          </button>

                          {plsLoginMessg && (
                            <h3 className="Post_Please_Login_Message_Div">
                              <Link
                                to="/login"
                                style={{
                                  textDecoration: "underline",
                                  color: "red",
                                }}
                              >
                                <span lassName="Post_Please_Login_Message">
                                  Please login
                                </span>
                              </Link>
                            </h3>
                          )}
                        </>
                      ) : (
                        <>
                          {id !== userInfo.username ? (
                            <>
                              {profileData.followers.includes(userInfo.id) ? (
                                <button
                                  className="Profile_following_button"
                                  onClick={() => follow_following_func()}
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  className="Profile_follow_button"
                                  onClick={() => follow_following_func()}
                                >
                                  Follow
                                </button>
                              )}
                            </>
                          ) : null}
                        </>
                      )
                      // null
                    }

                    {/* <button className='Profile_follow_button' onClick={()=>follow_following_func()}>Follow</button>
                                                        <button className='Profile_following_button' onClick={()=>follow_following_func()}>Following</button> */}
                    {/* </div> */}
                  </div>
                  {/* Profile_avatar_header END DIV */}

                  <div className="Profile_displayName">{profileData.Name}</div>
                  <div className="Profile_username">
                    @{profileData.username}
                  </div>

                  <div className="Profile_description">
                    <div className="Profile_description_text_editBtn">
                      <span className="Profile_descriptionText">
                        Description:-
                      </span>
                      &nbsp;
                      {profileData.description != undefined &&
                      profileData.description.length > 0 ? (
                        <span className="Profile_description_UsersText">
                          {profileData.description}
                        </span>
                      ) : (
                        <>None</>
                      )}
                      {userInfo.username != undefined &&
                      id == userInfo.username ? (
                        <button
                          onClick={() => edit_clicked()}
                          className="Profile_EditIcon_button"
                        >
                          <EditIcon
                            fontSize="small"
                            className={"Profile_EditIcon"}
                          />
                        </button>
                      ) : null}
                    </div>

                    <div>
                      {editCnt == 1 ? (
                        <div className="Profile_description_input_div">
                          <div>
                            <textarea
                              className="Profile_description_input"
                              placeholder="Write a Description?"
                              value={editDescription}
                              name="YO"
                              onChange={(e) =>
                                seteditDescription(e.target.value)
                              }
                              type="text"
                            />
                          </div>

                          <button
                            className="Profile_Post_reply"
                            onClick={() => saveDescription_submit_clicked()}
                          >
                            Save Description
                          </button>
                          {/* <button id="postBtn" className='Profile_EditPic_modal_Post_reply' >Post</button> */}

                          {/* <button id="postBtn" className='Profile_EditPic_modal_Post_reply' onClick={() => reply_submit_clicked()}>Post</button> */}

                          {/* <textarea className="Tweetbox_input" placeholder="Write a Post?" type="text" value={content} name="YO" onChange={(e) => setcontent(e.target.value)} onKeyDown={handleKeyDown} />  */}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {/* Profile_description DIV END */}

                  {/*Count of Followers & their display  */}
                  <div className="Profile_followers_following">
                    <Link
                      to={{ pathname: `/follow/${id}`, query: 1 }}
                      style={{ textDecoration: "none", color: "#374151" }}
                      hi={1}
                    >
                      <span className="Profile_follow">
                        {" "}
                        {Object.keys(profileData.followers).length}{" "}
                      </span>
                      <span className="Profile_follow_text"> Followers </span>{" "}
                      &nbsp; &nbsp;
                    </Link>

                    <Link
                      to={{ pathname: `/follow/${id}`, query: 0 }}
                      style={{ textDecoration: "none", color: "#374151" }}
                    >
                      <span className="Profile_follow">
                        {" "}
                        {Object.keys(profileData.following).length || 0}{" "}
                      </span>
                      <span className="Profile_follow_text"> Following </span>
                    </Link>
                  </div>

                  <div className="Profile_post_reply_tab">
                    {postTabclicked == 1 ? (
                      <>
                        <div
                          className="Profile_tab_underline"
                          onClick={() => postsTab_clicked_func()}
                        >
                          {" "}
                          Posts{" "}
                        </div>
                        <div
                          className="Profile_tab"
                          onClick={() => replyTab_clicked_func()}
                        >
                          {" "}
                          Replies{" "}
                        </div>
                        <div
                          className="Profile_tab"
                          onClick={() => likeTab_clicked_func()}
                        >
                          {" "}
                          Likes{" "}
                        </div>
                      </>
                    ) : (
                      <>
                        {replyTabclicked == 1 ? (
                          <>
                            <div
                              className="Profile_tab"
                              onClick={() => postsTab_clicked_func()}
                            >
                              {" "}
                              Posts{" "}
                            </div>
                            <div
                              className="Profile_tab_underline"
                              onClick={() => replyTab_clicked_func()}
                            >
                              {" "}
                              Replies{" "}
                            </div>
                            <div
                              className="Profile_tab"
                              onClick={() => likeTab_clicked_func()}
                            >
                              {" "}
                              Likes{" "}
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="Profile_tab"
                              onClick={() => postsTab_clicked_func()}
                            >
                              {" "}
                              Posts{" "}
                            </div>
                            <div
                              className="Profile_tab"
                              onClick={() => replyTab_clicked_func()}
                            >
                              {" "}
                              Replies{" "}
                            </div>
                            <div
                              className="Profile_tab_underline"
                              onClick={() => likeTab_clicked_func()}
                            >
                              {" "}
                              Likes{" "}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {Object.keys(data).length > 0 ||
                  (Object.keys(likesdata).length > 0 && editPicCnt == 0) ? (
                    <>
                      {/* If post part clicked */}
                      {
                        Object.keys(data).length > 0 && postTabclicked == 1 ? (
                          result.map((i) => {
                            // console.log(i[0].likes,i[0].content );

                            return typeof i[0].replyDataId == "undefined" ? (
                              <Post4
                                key={i[0]._id}
                                id={i[0]._id}
                                Icon={Avatar}
                                displayName={i[0].postedBy.Name}
                                username={i[0].postedBy.username}
                                originalData={i[0].originalPostedBy} //ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                profilePicUrl={i[0].postedBy.profilePicUrl}
                                postText={i[0].content}
                                createdAt={i[0].createdAt}
                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                verified="True"
                                likeslength={i[0].likes.length}
                                likesData={i[0].likes}
                                retweetUserList={i[0].retweetUserList}
                                retweetData={i[0].retweetDataId}
                                replyDataId={i[0].replyDataId}
                                totalReplies={i[0].totalReplies}
                                who={1}
                              />
                            ) : (
                              // null
                              <>
                                {console.log((Totalpost += 1))}
                                {/* <div className='Profile_NoTweets'>1.No Posts {Totalpost} {Object.keys(data).length}</div> */}
                              </>
                            );
                          })
                        ) : (
                          <>
                            {/* If replies part clicked */}
                            {Object.keys(data).length > 0 &&
                            replyTabclicked == 1 ? (
                              result.map((i) => {
                                // console.log("LIKES ARRAY B4 PASSED",i[0].likes);

                                return typeof i[0].replyDataId !=
                                  "undefined" ? (
                                  <Post4
                                    key={i[0]._id}
                                    id={i[0]._id}
                                    Icon={Avatar}
                                    displayName={i[0].postedBy.Name}
                                    username={i[0].postedBy.username}
                                    originalData={i[0].originalPostedBy} //ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                    profilePicUrl={i[0].postedBy.profilePicUrl}
                                    postText={i[0].content}
                                    createdAt={i[0].createdAt}
                                    // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                    verified="True"
                                    likeslength={i[0].likes.length}
                                    likesData={i[0].likes}
                                    retweetUserList={i[0].retweetUserList}
                                    retweetData={i[0].retweetDataId}
                                    replyDataId={i[0].replyDataId}
                                    totalReplies={i[0].totalReplies}
                                    who={2}
                                  />
                                ) : (
                                  // null
                                  <>
                                    {console.log((TotalRepliespost += 1))}
                                    {/* {console.log("2.2 No resul",result)} */}
                                    {/* <div className='Profile_NoTweets'>2.22No Posts</div> */}
                                  </>
                                );
                              })
                            ) : (
                              // else like is clicked
                              <>
                                {postTabclicked != 1 &&
                                replyTabclicked != 1 &&
                                Object.keys(likesdata).length > 0 ? (
                                  likesresult.map((i) => {
                                    // console.log("LIKES 336");

                                    return (
                                      <Post4
                                        key={i[0]._id}
                                        id={i[0]._id}
                                        Icon={Avatar}
                                        displayName={i[0].postedBy.Name}
                                        username={i[0].postedBy.username}
                                        originalData={i[0].originalPostedBy} //ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....
                                        profilePicUrl={
                                          i[0].postedBy.profilePicUrl
                                        }
                                        postText={i[0].content}
                                        createdAt={i[0].createdAt}
                                        // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                        verified="True"
                                        likeslength={i[0].likes.length}
                                        likesData={i[0].likes}
                                        retweetUserList={i[0].retweetUserList}
                                        retweetData={i[0].retweetDataId}
                                        replyDataId={i[0].replyDataId}
                                        totalReplies={i[0].totalReplies}
                                        who={3}
                                      />
                                    );
                                  })
                                ) : (
                                  <>
                                    {/*When it enters PostTab, daat is set to 1. At that time loading is required untilldata gets updated by axios.Else:- If no posts have been tweeted, then 'No Posts' is shown..  */}
                                    {data == 1 ? (
                                      // As far as i saw, this loading is never used because it never enters this part as Object.keys(data) is zero when data is 1.
                                      <div className="Profile_NoTweets">
                                        Loading
                                      </div>
                                    ) : (
                                      <div className="Profile_NoTweets">
                                        No Likes
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) /* ⬆️ Reply tab closing bracket */
                      }
                    </> /* ⬆️ Post tab closing bracket */
                  ) : (
                    /* ⬆️ If No Post && Likes data . i.e. data==0*/
                    <>
                      {
                        //Data becomes momnetarily 1, at that time loading is shown. But if we get data as [] i.e. no data then "No Post" is printed.
                        Object.keys(data).length == 0 &&
                        (postTabclicked == 1 || replyTabclicked == 1) &&
                        data != 1 ? (
                          <div className="Profile_NoTweets">No Posts</div>
                        ) : (
                          <>
                            {data == 1 ? (
                              //Momentarily this loading is shown... data is 1. Then gets updated by axios.Otherwise the same UI is rendered and then no changes if like button is clicked.
                              <div className="Profile_NoTweets">Loading</div>
                            ) : (
                              <div className="Profile_NoTweets">No Likes</div>
                            )}
                          </>
                        )
                      }
                    </>
                  )}
                  {Object.keys(data).length > 0 &&
                  Totalpost == Object.keys(data).length ? (
                    <div className="Profile_NoTweets">No Posts</div>
                  ) : (
                    <>
                      {Object.keys(data).length > 0 &&
                      TotalRepliespost == Object.keys(data).length ? (
                        <div className="Profile_NoTweets">No Replies</div>
                      ) : null}
                    </>
                  )}

                  {/* result.map(i=>{
                                                    console.log(replyTabclicked);
                                                
                                                     return typeof(i[0].replyDataId)!='undefined'?
                                                    
                                            
                                                        <Post4 
                                                                key={i[0]._id}
                                                                id={i[0]._id}
                                                                Icon={Avatar}  
                                                                displayName={i[0].postedBy.Name}
                                                                username={i[0].postedBy.username}

                                                                originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....

                                                                postText={i[0].content}
                                                                createdAt={i[0].createdAt}
                                                                // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                                verified="True"

                                                                likeslength={i[0].likes.length}
                                                                likesData={i[0].likes}
                                                                retweetUserList={i[0].retweetUserList}
                                                                retweetData={i[0].retweetDataId}
                                                                replyDataId={i[0].replyDataId}
                                                            />
                                                    :
                                                       null

                                                }) */}

                  {/* {
                                                result.map(i=>{
                                                    console.log(typeof(i[0].replyDataId)=='undefined',i[0].content);
                                                return typeof(i[0].replyDataId)=='undefined'?
                                                      
                                                // return 
                                                <Post4 
                                                        key={i[0]._id}
                                                        id={i[0]._id}
                                                        Icon={Avatar}  
                                                        displayName={i[0].postedBy.Name}
                                                        username={i[0].postedBy.username}

                                                        originalData={i[0].originalPostedBy}//ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....

                                                        postText={i[0].content}
                                                        createdAt={i[0].createdAt}
                                                        // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                        verified="True"

                                                        likeslength={i[0].likes.length}
                                                        likesData={i[0].likes}
                                                        retweetUserList={i[0].retweetUserList}
                                                        retweetData={i[0].retweetDataId}
                                                        replyDataId={i[0].replyDataId}
                                                    />
                                                    :
                                                    null
                                                    //  <Post4 
                                                    //     key={i[0]._id}
                                                    //     id={i[0]._id}
                                                    //     Icon={Avatar}  
                                                    //     displayName={i[0].postedBy.Name}
                                                    //     username={i[0].postedBy.username}

                                                    //     originalData={i[0].originalPostedBy} //ONLY THIS PART IS DIFFERENT....DURING RETWEET, DISPLAYNAME CHANGED....

                                                    //     postText={i[0].content}
                                                    //     createdAt={i[0].createdAt}
                                                    //     // imageUrl="https://media.giphy.com/media/SWoRKslHVtqEasqYCJ/giphy.gif"
                                                    //     verified="True"

                                                    //     likeslength={i[0].likes.length}
                                                    //     likesData={i[0].likes}
                                                    //     retweetUserList={i[0].retweetUserList}
                                                    //     retweetData={i[0].retweetDataId}
                                                    //     replyDataId={i[0].replyDataId}
                                                    ///>
                                               
                                                })
                                              } */}
                </div>
                {/* COVER PIC DIV END */}

                {/* <div>YOO</div> */}
              </div>
            ) : (
              //1.Profile pic end
              <div className="Profile_Homepage_top">
                <h2>No Such User</h2>
              </div>
            )}
          </div>
        ) : null
        // NO !loading && Object.keys(profileData).length>0
        // <h2>No username</h2>
      }

      {/* <div className='1Profile_Homepage_top'>
                        <h2>Username {profileData.email}</h2>
                            
                            <div className='Profile_Div_CoverPic'>
                                Cover Pic
                                <div>
                                    <Avatar style={{ textDecoration: 'none',backgroundColor:'red'}}/>
                                </div>
                            </div>

                    </div> */}
    </div>
  );
}

export default Profile;
