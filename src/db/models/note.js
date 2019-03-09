import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    color: String,
    icon: String,
    body: String,
    section: {
      type: mongoose.Types.ObjectId,
      ref: "Section"
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
