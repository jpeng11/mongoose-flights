const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index: getAllFlights,
  create: createNewFlight,
  new: newFlight,
  showDetail,
  addDestination,
  addTicket,
  deleteTicket,
};

function newFlight(req, res) {
  res.render("flights/new");
}

function createNewFlight(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.render("flights/new");
    console.log(flight);
    res.redirect("flights/index");
  });
}

function getAllFlights(req, res) {
  Flight.find({}, function (err, data) {
    res.render("flights/index", {
      flights: data,
    });
  });
}

function showDetail(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err) return res.redirect("/flights");
    Ticket.find({ flight: flight._id }, function (err, ticket) {
      res.render("flights/show", { flight, ticket });
    });
  });
}

function addDestination(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.destinations.push(req.body);
    flight.save(function (err, flight) {
      res.redirect("/flights/" + req.params.id);
    });
  });
}

function addTicket(req, res) {
  var seat = req.body.seat;
  var price = req.body.price;
  var flight = req.params.id;
  var ticket = new Ticket({ seat, price, flight });
  ticket.save(function (err) {
    if (err) return res.render("flights/new");
    res.redirect("/flights/" + req.params.id);
  });
}
