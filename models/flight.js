const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrival: Date
})

const flightSchema = new Schema({
    destinations: [destinationSchema],
    airline: {
      type: String, 
      enum: ['American', 'Southwest', 'United']
    },
    airport: {
      type: String,
      enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: {
      type: Number,
      min: 10, 
      max: 9999
    }, 
    depart: {
      type: Date,
      default: function() {
          const date = new Date();
          return date.setFullYear(date.getFullYear() + 1);
      }
    }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Flight', flightSchema);