const cors = ((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fluxloop.vercel.app'); // Allow your frontend domain
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (e.g., cookies)

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Respond with 200 OK
    }

    next();
});

module.exports = cors