import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const UserPosts = () => {
  const location = useLocation();
  const userId = location.state.id;

  const [post, setPost] = useState([]);
  const [counter, setCounter] = useState(5);

  const getPost = async () => {
    const postFetch = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const ans = await postFetch.json();
    setPost(ans);
  };

  const getComment = async (postId) => {
    let checkPost = post.find((p) => postId === p.id && "show" in p);
   
    if (checkPost) {
      checkPost.show = !checkPost.show;
      setPost(post.map((obj) => (obj.id === postId ? checkPost : obj)));
    } else {
      const postFetch = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const ans = await postFetch.json();

      const commentFetch = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comment = await commentFetch.json();

      const postWithComment = ans.find((p) => postId === p.id);
      postWithComment.comments = comment;
      postWithComment.show = true;

      const cPostArr = [postWithComment];

      setPost(post.map((obj) => cPostArr.find((c) => c.id === obj.id) || obj));
    }
  };

  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       setCounter(counter + 5);
    }
};

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Link to="/users" className="underline-none all-center">
        <Button variant="contained" style={{margin: "20px"}}>Go Back<ArrowBackIcon></ArrowBackIcon></Button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 0", padding: 20, justifyContent: "space-between" }}>
        {post
          .filter((post) => post.userId === userId)
          .slice(0, counter)
          .map((current) => (
            <Card sx={{ minWidth: 275, maxWidth: 300 }} key={current.id}>
              <CardContent style={{minHeight: "240px"}}>
                <Typography variant="h5" component="div">
                  {current.title}
                </Typography>
                <Typography variant="body2">{current.body}</Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={() => {
                    getComment(current.id);
                  }}
                >
                  Check Comments 
                </Button>
              </CardActions>
              {current?.show === true ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    padding: 20,
                  }}
                >
                  {current.comments.map((current) => (
                    <div className="" key={current.id}>
                      <Typography variant="h6" sx={{ mb: 1.5 }}>
                        {current.email}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>{current.body}</Typography>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Card>
          ))}
      </div>

      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 20 }}
        onClick={() => {
          setCounter(counter + 5);
        }}
      >
        Load more...
      </Button>
    </>
  );
};

export default UserPosts;