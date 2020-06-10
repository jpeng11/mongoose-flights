const Flight = require("../models/flight");

module.exports = {
  index: getAllFlights,
  create: createNewFlight,
  new: newFlight,
  showDetail,
  addDestination,
};

function newFlight(req, res) {
  res.render("flights/new");
}

function createNewFlight(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.render("flights/new");
    console.log(flight);
    res.redirect("/");
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
    res.render("flights/show", { flight: flight });
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
