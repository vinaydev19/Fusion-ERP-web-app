import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: String,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    DateOfJoining: {
      type: Date,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
    EmploymentStatus: {
      type: String, // Active, On Leave, Terminated
      required: true,
    },
    Address: {
      type: String,
    },
    EmergencyContact: {
      type: String,
    },
    Notes: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
