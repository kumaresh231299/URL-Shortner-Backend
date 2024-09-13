import express from "express";
import { activateAccount, forgotPassword, login, register, resetPassword } from "../Controllers/authController.js";

const router = express.Router();

router.post('/register',register);
router.get('/activate/:token',activateAccount);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:id/:token',resetPassword);

export default router;