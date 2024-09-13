import URL from "../Models/urlSchema.js";
import generateRandomString from "../helper.js";

// Create a new shortend URL
export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        //Check if the original URL is provided
        if (!originalUrl) {
            return res.status(400).json({ message: "Original URL are required!" })
        }
        //Check if the URL already Exists for the user
        const existsUrl = await URL.findOne({ originalUrl: originalUrl, owner: req.user._id });
        if (existsUrl) {
            return res.status(400).json({ message: "The URL already exists for the user!", existsUrl: existsUrl.shortURL })
        }

        const shortUrl = generateRandomString(6) //Generate a 6- character short URL

        const url = new URL({ originalUrl: originalUrl, shortUrl: shortUrl, owner: req.user.id })
        await url.save();

        res.status(200).json({ message: "Short URL created successfully", result: url })
    } catch (error) {
        res.status(500).json({ message: "Error creating shortend URL ", error: error.message })
    }
}

// Redirect to the original URL
export const redirectToOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        //Check if the original URL is provided
        if (!shortUrl) {
            return res.status(404).json({ message: "Get URL Failed" })
        }

        console.log(`Searching for shortUrl: ${shortUrl}`);

        const url = await URL.findOne({ shortUrl });
        console.log("url : ",url)
        if (!url) {
            return res.status(404).json({ message: "URL not found" })
        }

        //increment click count
        await URL.updateOne({ shortUrl: shortUrl }, { $inc: { clicks: 1 } })

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ message: "Error redirect to original URL ", error: error.message })
    }
}

// Get URL statistics for the dashboard
export const getUrlStats = async (req, res) => {
    try {
        // Aggregate URLs created per day
        const dailyStats = await URL.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            {
                $project: {
                    _id: 0,
                    date: "$_id", // Rename _id to date
                    count: 1
                }
            }
        ]);

        // Aggregate URLs created per month
        const monthlyStats = await URL.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            {
                $project: {
                    _id: 0,
                    date: "$_id", // Rename _id to date
                    count: 1
                }
            }
        ]);

        // Get total URL count
        const totalCount = await URL.countDocuments();

        if (!dailyStats || !monthlyStats) {
            return res.status(404).json({ message: "No URL statistics available!" });
        }

        res.status(200).json({ message: "URL statistics fetched successfully", dailyStats, monthlyStats, totalCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching URL statistics', error: error.message });
    }
};

// Get all URLs for the dashboard
export const getAllUrls = async (req, res) => {
    try {
        const urls = await URL.find();
        res.status(200).json({ message: "URL getting successfully", result: urls })
    } catch (error) {
        res.status(500).json({ message: "Error fetching URLs", error });
    }
}