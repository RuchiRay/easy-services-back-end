const mongoose = require('mongoose')

const slotSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
     
    },
    free: {
      type: String,
      required:true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Slot', slotSchema)
