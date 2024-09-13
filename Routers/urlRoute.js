import express from "express"
import authMiddleware from "../Middleware/authMiddleware.js";
import { createShortUrl, getAllUrls, getUrlStats, redirectToOriginalUrl } from "../Controllers/urlController.js";

const router = express.Router();

router.post('/shorten',authMiddleware,createShortUrl);
router.get('/shortUrl/:shortUrl',redirectToOriginalUrl);
router.get('/stats',authMiddleware,getUrlStats);
router.get('/all',authMiddleware,getAllUrls);

export default router;