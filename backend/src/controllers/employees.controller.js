import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Employee } from "../models/employees.model.js";

const createEmployeeItem = asyncHandler(async (req, res) => {

    const {
        EmployeeId,
        FullName,
        Email,
        PhoneNumber,
        Role,
        Department,
        DateOfJoining,
        Salary,
        EmploymentStatus,
        Address,
        EmergencyContact,
        Notes,
    } = req.body;


    if (
        [
            EmployeeId,
            FullName,
            Email,
            PhoneNumber,
            Role,
            Department,
            DateOfJoining,
            Salary,
            EmploymentStatus,
        ].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All required fields must be filled");
    }



    const employee = await Employee.create({
        EmployeeId,
        FullName,
        Email,
        PhoneNumber,
        Role,
        Department,
        DateOfJoining,
        Salary,
        EmploymentStatus,
        Address,
        EmergencyContact,
        Notes,
        userId: req.user._id,
    });

    if (!employee) {
        throw new ApiError(500, "Something went wrong while creating the employee");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { employee }, "employee add successfully"));
});

const getAllEmployee = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const AllEmployees = await Employee.find({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { AllEmployees }, "fetch all employees successfully")
        );
});

const getOneEmployee = asyncHandler(async (req, res) => {
    const employeeMongodbId = req.params.employeeMongodbId;

    const employee = await Employee.findById(employeeMongodbId);

    if (!employee) {
        throw new ApiError(401, "employee not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { employee }, "fetch one employee successfully"));
});

const deleteEmployee = asyncHandler(async (req, res) => {
    const employeeMongodbId = req.params.employeeMongodbId;

    const employee = await Employee.findByIdAndDelete(employeeMongodbId);

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }


    return res
        .status(200)
        .json(new ApiResponse(200, employee, "fetch one employee successfully"));
});

const updateEmployeeDetails = asyncHandler(async (req, res) => {
    const employeeDocsId = req.params.employeeMongodbId;
    const {
        EmployeeId,
        FullName,
        Email,
        PhoneNumber,
        Role,
        Department,
        DateOfJoining,
        Salary,
        EmploymentStatus,
        Address,
        EmergencyContact,
        Notes,
    } = req.body;

    if (
        [
            EmployeeId,
            FullName,
            Email,
            PhoneNumber,
            Role,
            Department,
            DateOfJoining,
            Salary,
            EmploymentStatus,
        ].every(
            (field) => field === undefined || field === null || field.trim() === ""
        )
    ) {
        throw new ApiError(403, "At least one field is required to update");
    }

    const updateEmployee = await Employee.findByIdAndUpdate(
        employeeDocsId,
        {
            $set: {
                EmployeeId,
                FullName,
                Email,
                PhoneNumber,
                Role,
                Department,
                DateOfJoining,
                Salary,
                EmploymentStatus,
                Address,
                EmergencyContact,
                Notes,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { updateEmployee },
                "employee data are updated successfully"
            )
        );
});

export {
    createEmployeeItem,
    getAllEmployee,
    getOneEmployee,
    deleteEmployee,
    updateEmployeeDetails,
};
