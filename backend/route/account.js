const app = require('express')
const router = app.Router()
const uuid = require('uuid')
const pool = require('./../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {ValidateEmail} = require("../utils/helperFunctions");

/**
 * AUTHENTICATION ROUTES
 */

router.route('/register')
    .post(async (req, res) => {
        const {username, password, uname, contact} = req.body;
        const isValidEmail = ValidateEmail(username)
        if (isValidEmail) {
            if (!(username && password && uname && contact)) {
                res.status(301).send({message: "All fields are required"})
            }
            const data = await pool.query('SELECT username FROM admin WHERE username=$1', [username])
            if (data.rows.length >= 1) {
                return res.status(301).send({message: "Account already registered , please login"})
            }
            let encryptedPassword = await bcrypt.hash(password, 10);
            const admin_id = uuid.v1();
            pool.query('INSERT INTO admin(admin_id,username,password,name,contact) VALUES($1,$2,$3,$4,$5) RETURNING *', [
                admin_id, username, encryptedPassword, uname, contact
            ]).then(response => {
                const token = jwt.sign(
                    {
                        user_id: response.rows[0].admin_id,
                        username: response.rows[0].username,
                        role: response.rows[0].role
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                response.rows[0].token = token
                let data = response.rows[0]
                res.status(200).send(data)
            })
        }else {
            res.status(301).send({message:"Please enter a valid email address"})
        }
    }
    )

router.route('/login')
    .post(async (req, res) => {
        try {
            const {username, password} = req.body;
            if (!(username && password)) {
                return res.status(300).send({message: "Please enter the required fields"})
            }
            pool.query('SELECT * from admin WHERE username=$1', [username])
                .then((response) => {
                        if (response.rows.length > 0 && bcrypt.compare(password, response.rows[0].password)) {
                            const token = jwt.sign(
                                {
                                    user_id: response.rows[0].admin_id,
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

module.exports = router;