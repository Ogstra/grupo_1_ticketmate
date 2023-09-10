module.exports = function userAuth(req, res, next) {
    const username = req.username;
    const password = req.password;
    const rememberMe = req.body['mant-ses-ini']; // 'on'/undefined
    const auth = req.body;


    console.log(rememberMe);

    if (auth) {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}