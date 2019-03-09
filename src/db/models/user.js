import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
