import mongoose from "mongoose";

const infoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
  },
});

const Info = mongoose.model("Info", infoSchema);

export default Info;
