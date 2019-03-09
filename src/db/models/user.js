import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async email => User.doesntExist({ email }),
        message: "Email has already been taken"
      }
    },
    name: String,
    password: String,
    avatar: String
  },
  {
    timestamps: true
  }
);

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const User = mongoose.model("User", userSchema);

export default User;
