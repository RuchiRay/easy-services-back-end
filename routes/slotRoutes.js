const express = require('express')
const router = express.Router()
const {
  getSlots,
  updateSlots,
  setSlots,
  setAllSlots
} = require('../controllers/slotController')

// const { protect } = require('../middleware/authMiddleware')

// router.route('/').get( getSlots).post(protect, bookSlot)
// router.route('/:id').delete(protect, cancelBooking)
router.route('/').get(getSlots).post(setAllSlots)
router.route('/:id').put(updateSlots)

module.exports = router
