const getUser = async (req, res) => {
    res.send({
        username: 'ahsanwebengr',
        fullName: 'Muhammad Ahsan'
    });
};

export { getUser };