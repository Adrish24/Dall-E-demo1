import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDIANRY_CLOUD_NAME,
  api_key: process.env.CLOUDIANRY_API_KEY,
  api_secret: process.env.CLOUDIANRY_API_SECRET,
});

// GET ALL POST
router.route("/").get(async (req, res) => {
    try {
        const posts = await post.find({});

        res.status(200).json({sucess: true, data: posts})
    } catch (error) {
        res.status(500).json({sucess: false, message:error})
    }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await post.create({
      name: name,
      prompt: prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ sucess: true, data: newPost });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error });
  }
});

export default router;
