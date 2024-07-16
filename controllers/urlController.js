const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        if (!originalUrl) {
            return res.status(400).json({ msg: 'Original URL is required' });
        }

        const shortUrl = shortid.generate();
        const newUrl = new Url({
            originalUrl,
            shortUrl,
            clicks: 0,
            createdAt: new Date()
        });

        await newUrl.save();

        res.status(201).json(newUrl);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUrls = async (req, res) => {
    try {
        const urls = await Url.find({ user: req.user.id });
        res.json(urls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
