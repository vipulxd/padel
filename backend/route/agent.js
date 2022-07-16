const app = require('express')
const router = app.Router();
const pool = require('../config/database')
const uuid = require('uuid')
const verifyAgentToken = require("../middleware/agentAuthenticator");
const verifyAdminToken = require("../middleware/adminAuthenticator");
const {ValidateEmail} = require("../utils/helperFunctions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * LOCATION ROUTES FOR AGENT
 */
router.route('/location')
    /**
     * GET LOCATIONS OF AN AGENT
     */
    .get(verifyAgentToken,async (req, res) => {
        try {
            const agent_id = req.user.user_id;
            pool.query('SELECT * from location WHERE agent_id=$1', [agent_id]).then(val =>
                res.status(200).send(val.rows)
            )

        } catch (e) {
            res.status(500).send(`Cannot resolve request ${e.message} `)
        }
    })
    /**
     * SAVE LOCATION OF AN AGENT
     */
    .post(verifyAgentToken, async (req, res) => {
        try {
            const agent_id = req.user.user_id;
            const location_ID = uuid.v4();
            let {acc, lat, lng, createdAt} = req.body;
            createdAt =  new Date(createdAt).toISOString();
            pool.query('INSERT INTO location(accuracy,latitude,longitude,createdat,agent_id, location_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [
                acc, lat, lng, createdAt, agent_id, location_ID
            ]).then(
                res.sendStatus(200)
            )
        } catch (e) {
            res.sendStatus(500)
        }
    })


/**
 * ACCOUNT ROUTES
 * @type {Router}
 */
router.route('/register')
    .post(verifyAdminToken, async (req, res) => {
        try {
            const agent_id = uuid.v4();
            const {username, password, uname} = req.body;
            const isValidEmail = ValidateEmail(username);
            if (!isValidEmail) {
                return res.status(301).send({message: "Please provide a correct email address"})
            }
            const admin_id = req.user.user_id;
            const date = Date.now()
            const data = await pool.query('SELECT * FROM agent WHERE username=$1', [username])
            if (data.rows.length != 0) {
                return res.status(301).send({message: `Agent with an email ${username} already exists`})
            } else {
                pool.query('INSERT INTO agent(agent_id,username,password,name,admin_id,createdat) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [
                    agent_id, username, password, uname, admin_id, date
                ]).then(response => {
                    return res.status(200).send(response.rows)
                }).catch(err => {
                    console.log(err)
                })
            }
        } catch (e) {
            res.status(400).send({message: "Request cannot be fulfilled"})
        }
    })

/**
 * LOGIN FOR AGENT
 */
router.route('/login')
    .post(async (req, res) => {
        try {
            const {username, password} = req.body;
            if (!(username && password)) {
                return res.status(300).send({message: "Please enter the required fields"})
            }
            pool.query('SELECT * from agent WHERE username=$1', [username])
                .then((response) => {
                        if (response.rows.length > 0 && bcrypt.compare(password, response.rows[0].password)) {
                            const token = jwt.sign(
                                {
                                    user_id: response.rows[0].agent_id,
                                    username: response.rows[0].username,
                                    role: response.rows[0].role
                                },
                                process.env.TOKEN_KEY,
                                {
                                    expiresIn: "2h",
                                }
                            );
                            if (token) {
                                response.rows[0].token = token;
                            }
                            let data = response.rows[0]
                            res.status(200).send(data)
                        } else {
                            res.status(300).send({message: "No such user found"})
                        }

                    }, (err) => {
                        res.status(500).send({message: err.message})
                    }
                )
        } catch (e) {
            res.status(300).send({message: e.message})
        }
    })

/**
 * GET AGENT FOR AN ADMIN
 * @type {Router}
 */
router.route('/account/agents')
    .get(verifyAdminToken, async (req, res) => {
        try {
            const admin_id = req.user.user_id;
            pool.query('SELECT * FROM agent WHERE admin_id=$1', [admin_id])
                .then(response => {
                    res.status(200).send(response.rows)
                })
        } catch (err) {
            res.status(400).send({message: err.message})
        }
    })
module.exports = router;
