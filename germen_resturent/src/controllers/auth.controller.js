import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
    try {
        const existingUser = await User.find({ email: req.body.email });

        if (!existingUser) {

            const saltRound = 10;
            const newUser = req.body;
            bcrypt.genSalt(saltRound, (err, salt) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: "An error occurred while generating the salt.",
                    });
                }

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "An error occurred while hashing the password.",
                        });
                    }

                    newUser.password = hash;
                });
             
            });
            const user = new User(newUser);
            const userCreated = await user.save()
            
        }
    } catch (err) {
        console.log(err);
    }
};


export { getUsers };
