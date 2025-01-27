const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Invalid username or password' })
    const duplicate = usersDB.users.find(person => person.user === user);
    if (duplicate) return res.sendStratus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const NewUser = { "user": user, "password": hashedPwd }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created` })
    }
}

module.exports = { handleNewUser };

