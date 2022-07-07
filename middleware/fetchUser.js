const jswt = require('jsonwebtoken');
const secretKey = 'mommyneedshersugar';

const fetchUser = (req, res, next) => {
    try {
        const authToken = req.header('authToken');
        if (!authToken) {
            res.status(401).send("Pls provide valid authorisation token");
        }
        const data = jswt.verify(authToken, secretKey); //verify returns decoded stuff if secret-key verifies
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Pls provide valid authorisation token");
    }
}

module.exports = fetchUser;