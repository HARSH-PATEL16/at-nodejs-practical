const { MESSAGES, STATUS } = require('../status_messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const con = require('../Database/db_connection');

class userController {

    // Signup
    async signUp(req, res) {
        try {
            let bodyData = req?.body;

            let checkEmailQry = `select * from users where email = '${bodyData?.email}'`
            con.query(checkEmailQry, async (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    if (result?.length > 0) {
                        res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.EMAIL });
                        return;
                    }

                    let checkUsernameQry = `select * from users where username = '${bodyData?.username}'`
                    con.query(checkUsernameQry, async (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            if (result?.length > 0) {
                                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.USERNAME });
                                return;
                            }

                            if (bodyData?.password !== bodyData?.confirm_password) {
                                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.NOT_SAME });
                                return;
                            }

                            bodyData.password = await bcrypt.hash(bodyData?.password, 10);

                            let registrationDataQry = `INSERT INTO users (first_name, last_name, username, email, password) VALUES ('${bodyData?.first_name}', '${bodyData?.last_name}', '${bodyData?.username}', '${bodyData?.email}', '${bodyData?.password}')`
                            con.query(registrationDataQry, (error, result) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    res.status(200).send({ message: MESSAGES.USER.SIGN_UP, data: result });
                                }
                            })
                        }
                    });
                }
            })
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Sign in
    async signIn(req, res) {
        try {
            let bodyData = req?.body;

            let checkEmailQry = `select * from users where email = '${bodyData?.email}'`
            con.query(checkEmailQry, async (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    if (result?.length === 0) {
                        res.status(403).send({ message: MESSAGES.USER.NOT_REGISTERED });
                        return;
                    }

                    let checkPassword = await bcrypt.compare(bodyData?.password, result[0]?.password);

                    if (!checkPassword) {
                        res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.INCORRECT });
                        return;
                    }

                    if (result[0]?.is_active === STATUS.INACTIVE) {
                        res.status(403).send({ message: MESSAGES.USER.INACTIVE });
                        return;
                    }

                    if (result[0]?.is_delete === STATUS.DELETED) {
                        res.status(403).send({ message: MESSAGES.USER.DELETED });
                        return;
                    }

                    let token = jwt.sign({ email: bodyData?.email }, process.env.SECRET_KEY);
                    
                    let tokenQry = `INSERT INTO user_tokens (user_id, access_token) VALUES ('${result[0]?.id}', '${token}')`
                    con.query(tokenQry, (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.status(200).send({ message: MESSAGES.USER.SIGN_IN, token: token });
                        }
                    })
                }
            })
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Get user details
    async getUserDetails(req, res) {
        try {
            let authToken = req?.headers?.authorization;

            let getUserDataQry = `SELECT users.first_name, users.last_name, users.username, users.email FROM user_tokens AS user_tokens JOIN users AS users ON
            user_tokens.user_id = users.id WHERE user_tokens.access_token = '${authToken}'`
            con.query(getUserDataQry, (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    res.status(200).send(result)
                }
            })

        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Change password
    async changePassword(req, res) {
        try {
            let authToken = req?.headers?.authorization;
            let bodyData = req?.body;

            let getUserDataQry = `SELECT users.id, users.password FROM user_tokens AS user_tokens JOIN users AS users ON
            user_tokens.user_id = users.id WHERE user_tokens.access_token = '${authToken}'`
            con.query(getUserDataQry, async (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    let matchPassword = await bcrypt.compare(bodyData?.current_password, result[0]?.password);
                    if (!matchPassword) {
                        res.status(422).send({ message: MESSAGES.PASSWORD.CURRENT_INCORRECT });
                        return;
                    }

                    if (bodyData?.new_password !== bodyData?.confirm_password) {
                        res.status(422).send({ message: MESSAGES.PASSWORD.NOT_SAME })
                        return;
                    }

                    let hashPassword = await bcrypt.hash(bodyData?.new_password, 10)

                    let updatePassQry = `UPDATE users SET password = '${hashPassword}' WHERE id = '${result[0]?.id}'`
                    con.query(updatePassQry, (error, result) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.status(200).send({ message: MESSAGES.PASSWORD.CHANGED })
                        }
                    })
                }
            })
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Sign out
    async signOut(req, res) {
        let authToken = req?.headers?.authorization

        let deleteQry = `delete from user_tokens where access_token = '${authToken}'`
        con.query(deleteQry, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200).send({ message: MESSAGES.USER.SIGN_OUT })
            }
        })
    }
}

module.exports = userController;