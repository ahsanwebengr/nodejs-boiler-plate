const getUser = async (req, res) => {
    res.send({
        username: 'johndoe',
        fullName: 'John Doe'
    });
};

export { getUser };