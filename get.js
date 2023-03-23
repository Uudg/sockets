const Message = require('./messages');
const mongoose = require('mongoose');


const getAll = async () => {
    const data = await Message.find({});
    return data;
}

module.exports = getAll;