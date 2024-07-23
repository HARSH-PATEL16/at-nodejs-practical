const { UserTokenAssociation, UserAssociation } = require('../Database/Models/association.model');
const user = require('../Database/Models/user.model');
const userToken = require('../Database/Models/user_token.model');
const { MESSAGES, STATUS } = require('../status_messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class userController {

    // Signup
    async signUp(req, res) {
        try {
            let bodyData = req?.body;
            let checkEmail = await user.findOne({
                where: {
                    email: bodyData?.email
                }
            });

            if (checkEmail) {
                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.EMAIL });
                return;
            }

            let checkUsername = await user.findOne({
                where: {
                    username: bodyData?.username
                }
            });

            if (checkUsername) {
                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.USERNAME });
                return;
            }

            if (bodyData?.password !== bodyData?.confirm_password) {
                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.NOT_SAME });
                return;
            }

            bodyData.password = await bcrypt.hash(bodyData?.password, 10);

            let userData = await user.create(bodyData);
            res.status(200).send({ message: MESSAGES.USER.SIGN_UP, data: userData });
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

            let checkUser = await user.findOne({
                where: {
                    email: bodyData?.email
                }
            });

            if (!checkUser) {
                res.status(403).send({ message: MESSAGES.USER.NOT_REGISTERED });
                return;
            }
            
            let checkPassword = await bcrypt.compare(bodyData?.password, checkUser?.password);
            
            if (!checkPassword) {
                res.status(403).send({ message: MESSAGES.VALIDATION_MESSAGES.INCORRECT });
                return;
            }
            
            if (checkUser?.is_active === STATUS.INACTIVE) {
                res.status(403).send({ message: MESSAGES.USER.INACTIVE });
                return;
            }

            if (checkUser?.is_delete === STATUS.DELETED) {
                res.status(403).send({ message: MESSAGES.USER.DELETED });
                return;
            }

            let token = jwt.sign({ email: bodyData?.email }, process.env.SECRET_KEY);

            await userToken.create({ user_id: checkUser?.id, access_token: token });

            checkUser.dataValues.token = token;

            res.status(200).send({ message: MESSAGES.USER.SIGN_IN, data: checkUser });
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

            let userDetails = await UserTokenAssociation.findOne({
                where: {
                    access_token: authToken
                },
                include: {
                    model: UserAssociation,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                }
            });

            res.status(200).send(userDetails)
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

            let getUserId = await userToken.findOne({
                where: {
                    access_token: authToken
                }
            });

            let checkPassword = await user.findOne({
                where: {
                    id: getUserId.user_id
                }
            })

            let matchPassword = await bcrypt.compare(bodyData?.current_password, checkPassword?.password);
            if (!matchPassword) {
                res.status(422).send({ message: MESSAGES.PASSWORD.CURRENT_INCORRECT });
                return;
            }

            if (bodyData.new_password !== bodyData.confirm_password) {
                res.status(422).send({ message: MESSAGES.PASSWORD.NOT_SAME })
                return;
            }

            let hashPassword = await bcrypt.hash(bodyData?.new_password, 10)

            await user.update({ password: hashPassword }, {
                where: {
                    id: getUserId?.user_id
                }
            });

            res.status(200).send({ message: MESSAGES.PASSWORD.CHANGED })
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Sign out
    async signOut(req, res) {
        let token = req?.headers?.authorization

        await userToken.destroy({
            where: {
                access_token: token
            }
        });

        res.status(200).send({ message: MESSAGES.USER.SIGN_OUT })
    }
}

module.exports = userController;