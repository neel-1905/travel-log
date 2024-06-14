import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    coverPhoto: { type: String, required: false },
    tripPhotos: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

const TripModel = mongoose.model("Trips", tripSchema);

export default TripModel;
