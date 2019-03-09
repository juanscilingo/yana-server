import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    color: String,
    icon: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Notebook = mongoose.model("Notebook", notebookSchema);

export default Notebook;
