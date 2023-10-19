const express = require('express')
const router = express.Router()
const {
  getBookings,
  bookSlot,
  cancelBooking,
 
} = require('../controllers/bookingController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getBookings).post(protect, bookSlot)
router.route('/:id').delete(protect, cancelBooking)

module.exports = router
