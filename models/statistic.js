const mongoose = require("mongoose")

const Statistic = mongoose.model('Statistic', {
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    xAxis: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    yAxis: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    data: [],
})

module.exports = { Statistic }