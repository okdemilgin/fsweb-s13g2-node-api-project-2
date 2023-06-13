// posts için gerekli routerları buraya yazın
const express = require("express");
const postModel = require("./posts-model");
const router = express.Router();
router.use(express.json());
// get api find
router.get("/", async (req, res) => {
  try {
    let allPosts = await postModel.find();
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({
      message: "Gönderiler alınamadı",
    });
  }
});
//get api findbyid
router.get("/:id", async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});
//get api post
router.post("/", async (req, res) => {
  try {
    let { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Lütfen gönderi için bir title ve contents sağlayın",
      });
    } else {
      let inserted = await postModel.insert({ title, contents });
      let insertedPost = await postModel.findById(inserted.id);
      res.status(201).json(insertedPost);
    }
  } catch (error) {
    res.status(500).json({
      message: "Veritabanına kaydedilirken bir hata oluştu",
    });
  }
});
//put api
router.put("/:id", async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id);
    if (!post) {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    } else {
      let { title, contents } = req.body;
      if (!title || !contents) {
        res
          .status(400)
          .json({ message: "Lütfen gönderi için title ve contents sağlayın" });
      } else {
        await postModel.update(req.params.id, {
          title,
          contents,
        });
        let updatedPost = await postModel.findById(req.params.id);
        res.json(updatedPost);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});
//delete api
router.delete("/:id", async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID li gönderi bulunamadı" });
    } else {
      await postModel.remove(req.params.id);
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});
//get api comments
router.get("/:id/comments", async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Girilen ID'li gönderi bulunamadı" });
    } else {
      let comments = await postModel.findPostComments(req.params.id);
      res.json(comments);
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});
module.exports = router;