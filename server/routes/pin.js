const router = require("express").Router();
const Pin = require("../models/Pin");
// Create A Pin
router.post("/", async (req, res) => {
  const newPin = new Pin({...req.body,long:req.body.lng});
  console.log(newPin);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Get all Pin
router.get("/", async (req, res) => {
  try {
    const Pins = await Pin.find();
    res.status(200).json(Pins);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
