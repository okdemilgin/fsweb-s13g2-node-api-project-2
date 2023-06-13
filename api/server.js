// server için gerekli olanları burada ayarlayın
const express = require("express");
const server = express();

// posts router'ını buraya require edin ve bağlayın
const postsRouter = require ("./posts/posts-router");

server.use(express.json());

server.get("/", (req, res) => {
    res.send("ILGIN");
  });

server.use("/api/posts", postsRouter);


module.exports = server;