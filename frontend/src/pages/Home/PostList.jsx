import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../api/post";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const ls = localStorage.getItem("user");
  const user = ls ? JSON.parse(ls) : null;

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      const res = await getAllPosts(user.token);
      if (res.status === 200) {
        setPosts(res.data);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      {posts.map((p) =>
        p.published ? (
          <Card key={p._id} mb="1rem">
            <CardHeader>
              <a href={`/post/${p._id}`}>
                <Heading size="md">{p.title}</Heading>
              </a>
              <Text fontSize="sm" color="grey">
                Created by {p.user.firstname} {p.user.lastname}: {p.created}
              </Text>
              <Text fontSize="sm" color="grey">
                Updated: {p.updated}
              </Text>
            </CardHeader>
            <CardBody>
              <Text noOfLines={3}>{p.content}</Text>
            </CardBody>
          </Card>
        ) : null
      )}
    </>
  );
};

export default PostList;
