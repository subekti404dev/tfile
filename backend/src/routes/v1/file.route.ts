import express, { Request, Response } from "express";
import multer from "multer";
import { uploadImage } from "../../services/telegram.service";
import axios from "axios";
import { base64encode, base64decode } from "nodejs-base64";

import * as mime from "mime-types";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const baseUrl = req.protocol + "://" + req.hostname;
      if (!req.file) throw Error("file is required!");
      const imgBuffer = req.file.buffer;
      const ext = mime.extension(req.file.mimetype);
      let filename = Math.floor(Date.now() / 1000).toString();
      if (ext !== "bin") {
        filename += `.${ext}`;
      }
      const url = await uploadImage(imgBuffer, filename);

      res.json({
        success: true,
        url: encUrl(url, baseUrl, filename),
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

router.get("/d/:filepath/:filename", async (req: Request, res: Response) => {
  try {
    const filepath = req.params.filepath;
    const url = decUrl(filepath);
    const response = await axios.get(url, {
      responseType: "stream",
    });

    res.setHeader(
      "content-disposition",
      response.headers["content-disposition"]
    );
    res.setHeader("Content-type", response.headers["content-type"]);

    response.data.pipe(res);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const encUrl = (url: string, baseUrl: string, filename: string) => {
  const filePath = base64encode(
    url.replace("https://api.telegram.org/file/", "")
  );
  return baseUrl + "/v1/file/d/" + filePath + "/" + filename;
};

const decUrl = (filepath: string) => {
  const filePath = base64decode(filepath);
  return "https://api.telegram.org/file/" + filePath;
};

export default router;
