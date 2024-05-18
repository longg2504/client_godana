import React from "react";
import HeaderPost from "./HeaderPost";
import PostList from "./PostList";
import { PostProvider } from "../../../context/PostContext";

export default function PostBody() {
  return (
    <PostProvider>
      <HeaderPost />
      <PostList />
    </PostProvider>
  );
}
