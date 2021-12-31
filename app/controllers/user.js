const { userDataMapper } = require('../dataMappers');

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const userController = {

    getAllUsers: async (_, response, next) => {
        try {
            const data = await userDataMapper.findAll();

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };

    },


    getParentById: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.id);

            // get all of one parent's children - thanks to a sql view, we get infos about the parent and infos about their children
            const data = await userDataMapper.findChildrenByParent(parentId);

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    
    checkLogin: async (request, response) => {
        try {
            // get the email from the request.body
            const email = request.body.email;

            // get the password from the request.body
            const password = request.body.password;

            // using emailValidator to check if the email is a valid one
            if (!emailValidator.validate(request.body.email)) {
                return response.status(400).json({ error: "Cet email n'est pas valide." });
            };

            // find the user by their email
            const user = await userDataMapper.findOne(email);

            // in case the user is null, we send an error
            if (user === null) {
                response.status(400).json({ error: "Email ou mot de passe incorrect" });
                return;
            };

            // check if password is valid thanks to bcrypt's compare function
            const pwResult = bcrypt.compareSync(password, user.password);

            // if the password comparison is correct, we move on to the next step
            if (pwResult) {

                // if there is a user, we move on to the next step; if not, we send an error
                if (user) {

                    // we create a jsonwebtoken in order to send information to the client
                    const jwtContent = { userId: user.id, roleId: user.role_id, firstName: user.first_name, lastName: user.last_name };

                    // we pick the algorithm and the duration
                    const jwtOptions = {
                        algorithm: 'HS256',
                        expiresIn: '3h'
                    };

                    // we send a token with the information that the client needs
                    response.status(200).json({
                        logged: true,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        roleId: user.role_id,
                        token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
                    });
                } else {
                    response.status(401).json(`401 unauthorized`);
                };

            } else {
                // if the bcrypt password comparison is incorrect, we send an error message
                response.status(401).json({ error: "Mot de passe incorrect" });
            };
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    
    logout: (request, response) => {
        request.session.destroy();
        response.redirect('/');
    },


    updatePassword: async (request, response) => {
        try {
            // find user id from url
            const userId = Number(request.params.id);

            // in case the user id isn't a number, we return next()
            if (isNaN(userId)) {
                return next();
            };

            // get the old password from the request.body
            const oldPassword = request.body.oldPassword;

            // get the user from their id
            const user = await userDataMapper.findById(userId);

            // compare old password (entered by the user) and the password in the database
            const compareHash = bcrypt.compareSync(oldPassword, user.password);

            // if the two passwords match, we move on to the next step
            if (compareHash) {

                // we get the new password from what the user enters in the request.body
                const newPassword = request.body.password;

                const errors = [];

                // if the old password and the new password match, we send an error
                if (oldPassword === newPassword) {
                    errors.push("Le nouveau mot de passe doit être différent de l'ancien.");
                };

                // checking string length
                if (newPassword.length === 0) {
                    errors.push("Le mot de passe est obligatoire");
                };

                if (errors.length > 0) {
                    // if there is at least one error, we want it to show up in the json response
                    response.json({ error: errors });
                    return;
                };

                // hash the password with bcrypt
                const hash = bcrypt.hashSync(newPassword, 10);

                // save the data into the database
                const user = await userDataMapper.updatePassword(hash, userId);

                // connect the user (save into a session)
                request.session.user = user;

                response.status(200).json("Mot de passe bien modifié");

            } else {
                response.status(401).json("L'ancien mot de passe est invalide. Veuillez réessayer.");
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    updateUser: async (request, response, next) => {
        try {
            // get the user id from url
            const userId = Number(request.params.id);

            // in case the user id isn't a number, we return next()
            if (isNaN(userId)) {
                return next();
            };

            // find user by their id
            const user = await userDataMapper.findById(userId);

            // if there is no user, we return next()
            if (!user) {
                return next();
            };

            // create new data with request.body
            const newData = request.body;

            // modify child thanks to new data and user id
            const updatedUser = await userDataMapper.updateUser({ ...newData }, userId);

            // save the newly updated user in a session
            request.session.user = updatedUser;

            // if all goes well, we respond with the modified user
            response.status(200).json({ updatedUser });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    
};

module.exports = userController;