const getUsers = async (req, res) => {
    res.send({
        name: 'Jonas',
        age: 23,
        isMale: true
    });
};


export { getUsers };
