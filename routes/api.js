const router = require("express").Router();
const db = require("../models");

// GET WORKOUTS
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workoutDB) => {
      res.json(workoutDB);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// UPDATE WORKOUT
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { 
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body } 
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE NEW WORKOUT
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// GET RANGE - GRAPH
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).sort({_id: -1}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
