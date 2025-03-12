import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    EmployeeId: {
      type: String,
      required: true,
      unique: true, 
    },
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], 
    },
    PhoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,15}$/, "Invalid phone number"], 
    },
    Role: {
      type: String,
      required: true,
      trim: true,
    },
    Department: {
      type: String,
      required: true,
      trim: true,
    },
    DateOfJoining: {
      type: Date,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
      min: 0, 
    },
    EmploymentStatus: {
      type: String,
      required: true,
      enum: ["Active", "On Leave", "Terminated"], 
    },
    Address: {
      type: String,
      trim: true,
    },
    EmergencyContact: {
      type: String,
      trim: true,
    },
    Notes: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
