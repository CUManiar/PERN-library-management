const handleRegister = (db, bcrypt) => (req, res) => {
    const crypticPassword = bcrypt.hashSync(req.body.password, 1);
    db.transaction(trx => {
        trx
            .insert({
                email: req.body.email,
                hash: crypticPassword
            })
            .into("login")
            .returning("email")
            .then(loginEmail => {
                return trx("users")
                    .returning("*")
                    .insert({
                        email: loginEmail[0],
                        username: req.body.username
                    })
                    .then(user => {
                        return res.json({
                            status: 200,
                            message: 'Registration success!',
                            data: user[0]
                        });
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch(err => res.status(400).json({
        status: 400,
        message: "Unable to register!"
    }));
};

const handleSignIn = (db, bcrypt) => (req, res) => {
    db.select("email", "hash")
        .from("login")
        .where("email", "=", req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db
                    .select("*")
                    .from("users")
                    .where("email", "=", req.body.email)
                    .then(user => {
                        res.json({
                            status: 200,
                            data: user[0],
                            message: 'Login Success!'
                        });
                    })
                    .catch(err => res.status(400).json({
                        status: 400,
                        message: "Unable to get user!"
                    }));
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Wrong credentials"
                });
            }
        })
        .catch(err => res.status(400).json({
            status: 400,
            message: "Wrong credentials"
        }));
}

module.exports = {
    handleRegister,
    handleSignIn
};