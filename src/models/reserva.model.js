const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservaSchema = new mongoose.Schema({
    clientName: String,
    date: String,
    hour: String,
    table: String,
    status: String,
    notes: String,
    reservedBy: String,
})

const ReservaModel = mongoose.model('reservas', ReservaSchema )

module.exports = ReservaModel