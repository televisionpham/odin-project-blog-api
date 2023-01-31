import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostComments } from "../../api/post";
import { Navbar } from "../../components";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const ls = localStorage.getItem("user");
  const user = ls ? JSON.parse(ls) : null;

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      const resPost = await getPost(id, user.token);
      if (resPost.status === 200) {
        setPost(resPost.data);
        const resComments = await getPostComments(id, user.token);
        if (resComments.status === 200) {
          setComments(resComments.data);
        }
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
      <Navbar />
      {post && post.published ? (
        <Box>
          <Heading size="md">{post.title}</Heading>
          <Text fontSize="sm" color="grey">
            Created by {post.user.firstname} {post.user.lastname}:{" "}
            {post.created}
          </Text>
          <Text fontSize="sm" color="grey">
            Updated: {post.updated}
          </Text>
          <Text>{post.content}</Text>
          <Heading size="sm" mt="1rem">
            Comments:
          </Heading>
          {comments.map((comment) => (
            <Box key={comment._id} margin="1rem 0">
              <Card>
                <CardBody>
                  <Text>{comment.content}</Text>
                  <Text color="grey">
                    by {comment.user.firstname} {comment.user.lastname}{" "}
                    {comment.created}
                  </Text>
                </CardBody>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        "Not found"
      )}
    </>
  );
};

export default Post;
