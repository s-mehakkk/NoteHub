const jswt = require('jsonwebtoken');
const secretKey = 'mommyneedshersugar';

// middleware can modify the req body, here we get auth token from the request header (passed from thunder client), verrify it using the secret, and we get the data json 
// const data = {
//     user: {
//         id: user.id
//     }
// };

// then the req body is modified and user json is added to it
const fetchUser = (req, res, next) => {
    try {
        const authToken = req.header('authToken');
        if (!authToken) {
            res.status(404).send("Pls provide valid authorisation token");
        }
        const data = jswt.verify(authToken, secretKey); //verify returns decoded stuff if secret-key verifies
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Pls provide valid authorisation token");
    }
}

module.exports = fetchUser;