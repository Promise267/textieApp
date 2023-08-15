module.exports = {
    get: (req, res) => {
        if (req.user) {
            res.json({ message: `Welcome home, ${req.user.username}!` });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    }
};