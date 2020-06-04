const Flight = require("../models/flight");

function newFlight(req, res) {
  res.render("flights/new");
}

function createNewFlight(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.render("flights/new");
    console.log(flight);
    res.redirect("/flights/new");
  });
}

function getAllFlights(req, res) {
  Flight.find({}, function (err, data) {
    res.render("flights/index", {
      flights: data,
    });
  });
}

module.exports = {
  index: getAllFlights,
  create: createNewFlight,
  new: newFlight,
};
