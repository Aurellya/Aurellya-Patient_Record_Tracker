const router = require("express").Router();
let Record = require("../models/record.model");

router.route("/").get((req, res) => {
  Record.find()
    .then((records) => res.json(records))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const patientName = req.body.patientName;
  const description = req.body.description;
  const age = Number(req.body.age);
  const date = Date.parse(req.body.date);

  const newRecord = new Record({
    patientName,
    description,
    age,
    date,
  });

  newRecord
    .save()
    .then(() => res.json("Record added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Record.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then((record) => res.json(record))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Record.findById(req.params.id)
    .then((record) => {
      record.patientName = req.body.patientName;
      record.description = req.body.description;
      record.age = Number(req.body.age);
      record.date = Date.parse(req.body.date);

      record
        .save()
        .then(() => res.json("Record udpated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
