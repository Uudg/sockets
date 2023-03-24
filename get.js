const Message = require('./messages');
const mongoose = require('mongoose');
const User = require('./users');


const getAll = async () => {
    const data = await Message.find({});
    return data;
}

const getOnlineUsers = async () => {
    const data = await User.find({
        online: true
    });
    return data
}

const setOnline = async (userName, id) => {
    const user = await User.findOneAndUpdate({
        userName
    }, {
        online: true,
        id
    }, {
        new: true
    });
    console.log(user)
    return user
}

module.exports = {
    getAll,
    getOnlineUsers,
    setOnline
};