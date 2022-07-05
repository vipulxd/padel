const app = require('express')
const verifyAdminToken = require("../middleware/adminAuthenticator");
const router = app.Router()


/**
 * user's based api request handler
 */
router.route('/testlocationforroute')
    .get(verifyAdminToken,(req,res)=>{
        res.send("ok")
    })




module.exports = router;