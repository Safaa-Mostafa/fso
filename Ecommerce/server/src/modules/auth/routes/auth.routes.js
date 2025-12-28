import express from "express";
import { validateBody } from "../../../middleware/validate.js";

import authenticate from "../../../middleware/auth.js";
import { login, refresh, register } from "../contollers/auth.controller.js";
import { registerSchema } from "../dtos/RegisterUserRequestDto.js";
import { LoginUserDTO } from "../dtos/loginRequestDto.js";
import { RefreshTokenDTO } from "../dtos/RefreshTokenRequestDto.js";

const router = express.Router();

router.post("/register",validateBody(registerSchema) ,register);
router.post("/login",validateBody(LoginUserDTO) ,login);
router.post("/refresh-token",validateBody(RefreshTokenDTO) ,refresh);

router.get("/profile", authenticate, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
