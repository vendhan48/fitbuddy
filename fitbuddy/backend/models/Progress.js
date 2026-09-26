const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weight: { type: Number, required: true },
  workoutCompleted: { type: Boolean, default: false },
  workoutTitle: { type: String, default: '' },
  chest: { type: Number },
  waist: { type: Number },
  arms: { type: Number },
  notes: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', progressSchema);
