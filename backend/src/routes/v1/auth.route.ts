import express, { Request, Response } from "express";
import { generateJwt } from "../../utils/jwt.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
import md5 from "md5";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    validateRequiredFields({ email, password });

    if (process.env.HASH_PASS !== md5(password))
      throw Error("Invalid Email or Password");

    res.json({
      success: true,
      token: generateJwt({ name: "admin" }),
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
