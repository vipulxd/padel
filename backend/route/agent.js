const app = require('express')
const router = app.Router();
const pool = require('../config/database')
const uuid = require('uuid')
const verifyAgentToken = require("../middleware/agentAuthenticator");

router.route('/location/:agent_id')
    /**
     * GET LOCATIONS OF AN AGENT
     */
    .get(async (req, res) => {
        try {
            const agent_id = req.params.agent_id;
            pool.query('SELECT * from padel_location WHERE agent_id=$1', [agent_id]).then(val =>
                res.status(200).send(val.rows)
            )

        } catch (e) {
            res.status(500).send(`Cannot resolve request ${e.message} `)
        }
    })
    /**
     * SAVE LOCATION OF A AGENT
     */
    .post(async (req, res) => {
        try {
            const agent_id = req.params.agent_id;
            const location_ID = uuid.v4();
            const {acc, lat, lng, createdAt} = req.body;
            pool.query('INSERT INTO padel_location(accuracy,latitude,longitude,createdAt,agent_ID, location_ID) VALUES ($1,$2,$3,$4,$5) RETURNING *', [
                acc, lat, lng, createdAt, agent_id,location_ID
            ]).then(
                res.status(200).send("SAVED")
            )
        } catch (e) {
            res.status(500).send(`Cannot resolve request ${e.message}`)
        }
    })
router.route('/test')
    .get(verifyAgentToken,(req,res)=>{
        res.send("ok")
    })
module.exports = router;
