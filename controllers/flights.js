const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    show,
    create,
    new: newFlight,
    index,
    createDestination
}

function createDestination(req, res) {
  Flight.findById(req.params.flightId, function(err, flight) {
   // console.log(flight);
    flight.destinations.push(req.body);
    flight.save(function(err) {
      if (err) return res.redirect(`/flights/${flight._id}`);
      //console.log(flight);
      res.redirect(`/flights/${flight._id}`);
    });
  })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
      res.render('flights/index', { title: 'All Flights', flights });
    });
  }
  

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
      Ticket.find({flight: flight._id}, function(err, tickets) {
        console.log('flight:', flight);
        res.render('flights/show', {
          title: `Flight ${flight.flightNo} Details`,
          flight,
          tickets,
      });
    });
  })
}
function newFlight(req, res) {
    res.render('flights/new', { title: 'Add Flight' });
  }

function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
      if (err) return res.redirect('/flights/new');
      console.log(flight);
      res.redirect(`/flights/${flight._id}`);
    });
  }
  