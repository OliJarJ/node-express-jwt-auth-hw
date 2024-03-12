const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt  //we are grabbing the token - remember cookie was named jwt
    //check json web token exists and is verified
    if(token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth }