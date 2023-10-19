const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    brand: {
      type: String,
      required: [true, 'Please select brand'],
    },
    model: {
      type: String,
      required: [true, 'Please select model'],
    },
    date: {
      type: String,
      required: [true, 'Please select date'],
    },
    shift: {
      type: String,
      required: [true, 'Please select shift'],
    },
    time: {
      type: String,
      required: [true, 'Please select time'],
    },
    services: {
      type: Array,
      required: [true, 'Please select one or more services'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Booking', bookingSchema)
