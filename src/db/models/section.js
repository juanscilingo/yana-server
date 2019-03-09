import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    color: String,
    icon: String,
    notebook: {
      type: mongoose.Types.ObjectId,
      ref: "Notebook"
    }
  },
  {
    timestamps: true
  }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section;
