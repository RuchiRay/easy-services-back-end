const asyncHandler = require('express-async-handler')

const Slot = require('../models/slotModel')

// @desc    Get slots
// @route   GET /api/slots
// @access  Private
const getSlots = asyncHandler(async (req, res) => {
  const slots = await Slot.find()
  console.log(slots);
  res.status(200).json(slots)
})

const setSlots = asyncHandler(async (req, res) => {
  const slotData = req.body;

  if (Array.isArray(slotData)) {
    // If an array of slots is provided, insert them all
    const insertedSlots = await Slot.insertMany(slotData);
    res.status(201).json(insertedSlots);
  }
  else if (!req.body.date || !req.body.free) {
    res.status(400)
    throw new Error('Please add a date and free field')
  }
  else {
    const slot = await Slot.create({
      date: req.body.date,
      free: req.body.free,
    })
    console.log('this executed');
    res.status(200).json(slot)

  }
})
const setAllSlots = asyncHandler(async (req, res) => {
  const slotData = req.body;
  await Slot.deleteMany({});
  const insertedSlots = await Slot.insertMany(slotData);
  res.status(201).json(insertedSlots);
})



// @desc    Update slots
// @route   PUT /api/slots/:id
// @access  Private
const updateSlots = asyncHandler(async (req, res) => {
  const slotData = await Slot.findById(req.params.id)


  if (!slotData) {
    return res.status(404).json({ message: 'Slot not found' });
  }

  if (slotData.free > 0) {
    // If there are available slots, decrement the count
    slotData.free--;

    // Save the updated slot
    const updatedSlot = await slotData.save();

    res.status(200).json(updatedSlot);
  } else {
    res.status(400).json({ message: 'No available slots left for this date' });
  }



  // const updatedDlot = await Slot.findOneAndUpdate(req.params.date, req.body, {
  //   new: true,
  // })

  res.status(200).json(slotDay)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private


module.exports = {
  getSlots, updateSlots, setSlots, setAllSlots
}
