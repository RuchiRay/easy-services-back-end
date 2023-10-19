const asyncHandler = require('express-async-handler')

const Booking = require('../models/bookingModel')
const User = require('../models/userModel')

// @desc    Get Bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })

  res.status(200).json(bookings)
})

// @desc   book a slot
// @route   POST /api/bookSlot
// @access  Private
const bookSlot = asyncHandler(async (req, res) => {
  if (!req.body.brand||!req.body.model||!req.body.shift||!req.body.time||!req.body.services) {
    res.status(400)
    throw new Error('Please add a necessary fields')
  }

  const booking = await Booking.create({
    brand: req.body.brand,
    model: req.body.model,
    shift: req.body.shift,
    date:req.body.date,
    time: req.body.time,
    services: req.body.services,
    user: req.user.id,
  })

  res.status(200).json(booking)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
// const updateGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the goal user
//   if (goal.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedGoal)
// })

// @desc    cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
 
  const booking = await Booking.findById(req.params.id)
  if (!booking) {
    res.status(400)
    throw new Error('booking not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the booking user
  if (booking.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await booking.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getBookings,
  bookSlot,
  cancelBooking,
  
}
