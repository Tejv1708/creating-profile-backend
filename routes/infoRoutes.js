import express from "express";
import Info from "../model/infoSchema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.phonenumber ||
      !req.body.email ||
      !req.body.hobbies
    ) {
      return res.status(400).send({
        message:
          "Send all required fields : name , phoneNumber , email , hobbies",
      });
    }
    const newProfile = {
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      hobbies: req.body.hobbies,
    };
    const profile = await Info.create(newProfile);
    return res.status(201).send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const profile = await Info.find({});
    return res.status(200).json({
      data: profile,
      count: profile.length,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const profile = await Info.findById(id);
    console.log(profile);
    return res.status(200).json({
      data: profile,
      count: profile.length,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phonenumber ||
      !req.body.hobbies
    ) {
      return res.status(400).send({
        message:
          "Send all the required fields : name , email , phonenumber , hobbies",
      });
    }
    const { id } = req.params;
    const profile = await Info.findByIdAndUpdate(id, req.body);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).send({ message: "Profile updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Info.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: "Profile  not found",
      });
    }
    return res.status(204).send({
      message: `Your Profile is successfully deleted with id : ${id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
