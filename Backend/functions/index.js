const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const router = express.Router();
const serverless = require("serverless-http");
router.get("/", (req, res) => {
  res.send("Working");
});

router.get("/download", async (req, res) => {
  try {
    const url = req.query.url;
    const videoID = await ytdl.getURLVideoID(url);
    const metaInfo = await ytdl.getInfo(url);

    let data = {
      url: `https://www.youtube.com/embed/${videoID}`,
      info: metaInfo.formats,
    };

    return res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.use("/", router);

module.exports.handler = serverless(app);
