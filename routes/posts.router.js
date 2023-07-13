const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

const createNewPost = async (req, res) => {
  /** (구현) **/
  try {
    const { title, content } = req.body;

    if (!Object.keys(req.body)) {
      return res.status(404).json({ errorMessage: "데이터 형식 에러" });
    }

    const post = await Posts.create({
      title,
      content,
    });

    data = {
      id: post.id,
      title: post.title,
      content: post.content,
    };

    return res.status(201).json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message });
  }
};

const getAllPosts = async (req, res) => {
  /** (구현) **/
  try {
    const posts = await Posts.findAll({
      attributes: ["id", "title", "content"],
    });

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message });
  }
};

const updatePost = async (req, res) => {
  /** (구현) **/
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const existPost = await Posts.findOne({ where: { id: postId } });
    if (!existPost) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    const post = await Posts.update(
      { title, content },
      { where: { id: postId } }
    );

    const data = await Posts.findOne({ where: { id: postId } });
    result = {
      id: data.id,
      title: data.title,
      content: data.content,
    };
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message });
  }
};

const deletePostById = async (req, res) => {
  /** (구현) **/
  try {
    const { postId } = req.params;

    const existPost = await Posts.findOne({ where: { id: postId } });
    if (!existPost) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    const post = await Posts.destroy({ where: { id: postId } });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message });
  }
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);

module.exports = router;
