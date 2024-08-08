import React, { forwardRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  taskOptions,
  subTaskOptions,
  statusOptions,
  projectOptions,
  businessFunctionOptions,
  kpiCategoryOptions,
} from "../data/commom";
import { Box, Typography } from "@mui/material";

const FormSubmit: React.FC = () => {
  const [formData, setFormData] = useState({
    Staff_id: "",
    Staff_Name: "",
    Date: new Date(),
    Tasks: [
      {
        TaskNumber: "",
        FromTime: new Date(),
        ToTime: new Date(),
        Task: "",
        SubTask: "",
        Status: "",
        Project: "",
        Remark: "",
        PM: "",
        BA: "",
        BusinessFunction: "",
        KpiCategory: "",
      },
    ],
  });

  const [errors, setErrors] = useState({
    Staff_id: "",
    Staff_Name: "",
    Remark: "",
  });
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, Date: date });
  };

  const handleTaskChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newTasks: any = [...formData.Tasks];
    newTasks[index][name] = value;
    setFormData({ ...formData, Tasks: newTasks });
  };

  const handleTaskTimeChange = (index: number, time: any, field: any) => {
    const newTasks: any = [...formData.Tasks];
    newTasks[index][field] = time;
    setFormData({ ...formData, Tasks: newTasks });
  };

  const addTaskField = () => {
    setFormData({
      ...formData,
      Tasks: [
        ...formData.Tasks,
        {
          TaskNumber: "",
          FromTime: new Date(),
          ToTime: new Date(),
          Task: "",
          SubTask: "",
          Status: "",
          Project: "",
          Remark: "",
          PM: "",
          BA: "",
          BusinessFunction: "",
          KpiCategory: "",
        },
      ],
    });
  };

  const handleCancel = (index: number) => {
    const newTasks = formData.Tasks.filter((_, i) => i !== index);
    setFormData({ ...formData, Tasks: newTasks });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3000/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setModalContent("Form submitted successfully!");
      } else {
        setModalContent("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalContent("Error submitting form.");
    }
    setShowModal(true);
  };

  const validate = () => {
    const newErrors = {
      Staff_id: "",
      Staff_Name: "",
      Remark: "",
    };

    // Validate Staff_id
    if (!formData.Staff_id) {
      newErrors.Staff_id = "Staff ID is required";
    } else if (!/^\d+$/.test(formData.Staff_id)) {
      newErrors.Staff_id = "Staff ID must be a number";
    }

    // Validate Staff_Name
    if (!formData.Staff_Name) {
      newErrors.Staff_Name = "Staff Name is required";
    }

    // Validate Remark for all tasks
    if (formData.Tasks.some((task) => !task.Remark)) {
      newErrors.Remark = "Remark is required for all tasks";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  return (
    <div className="card p-4 border rounded Addtask">
      <h1 className="mb-4">Daily Task Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Staff ID */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="Staff_id" className="form-label">
              Staff ID
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="number"
              name="Staff_id"
              value={formData.Staff_id}
              onChange={handleChange}
              id="Staff_id"
              className="form-control"
            />
            {errors.Staff_id && (
              <div className="text-danger">{errors.Staff_id}</div>
            )}
          </div>
        </div>
        {/* Staff Name */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="Staff_Name" className="form-label">
              Staff Name
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="Staff_Name"
              value={formData.Staff_Name}
              onChange={handleChange}
              id="Staff_Name"
              className="form-control"
            />
            {errors.Staff_Name && (
              <div className="text-danger">{errors.Staff_Name}</div>
            )}
          </div>
        </div>
        {/* Date */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="Date" className="form-label">
              Date
            </label>
          </div>
          <div className="col-md-9">
            <div className="input-group">
              <DatePicker
                selected={formData.Date}
                onChange={() => handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
               />
              <span className="input-group-text">
                <i className="bi bi-calendar"></i>
              </span>
            </div>
          </div>
        </div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"16px"} fontWeight={600}>
            Tasks
          </Typography>

          <button
            type="button"
            className="btn btn-primary mb-3 mt-3"
            onClick={addTaskField}
          >
            Add <i className="bi bi-plus-circle-fill"></i>
          </button>
        </Box>

        {/* Dynamic Task Fields */}
        {formData.Tasks.map((task, index) => (
          <div key={index} className="dynamic-field-box">
            {/* Task Number */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`TaskNumber-${index}`} className="form-label">
                  Task Number
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  name="TaskNumber"
                  value={task.TaskNumber}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`TaskNumber-${index}`}
                  className="form-control"
                />
              </div>
            </div>
            {/* From Time */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`FromTime-${index}`} className="form-label">
                  From Time
                </label>
              </div>
              <div className="col-md-9">
                <div className="input-group">
                  <DatePicker
                    selected={task.FromTime}
                    onChange={(time) =>
                      handleTaskTimeChange(index, time, "FromTime")
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <i className="bi bi-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* To Time */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`ToTime-${index}`} className="form-label">
                  To Time
                </label>
              </div>
              <div className="col-md-9">
                <div className="input-group">
                  <DatePicker
                    selected={task.ToTime}
                    onChange={(time) =>
                      handleTaskTimeChange(index, time, "ToTime")
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <i className="bi bi-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* Task */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`Task-${index}`} className="form-label">
                  Task
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="Task"
                  value={task.Task}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`Task-${index}`}
                  className="form-select"
                >
                  <option value="">Select Task</option>
                  {taskOptions.map((taskOption, taskIndex) => (
                    <option key={taskIndex} value={taskOption}>
                      {taskOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Sub Task */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`SubTask-${index}`} className="form-label">
                  Sub Task
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="SubTask"
                  value={task.SubTask}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`SubTask-${index}`}
                  className="form-select"
                >
                  <option value="">Select Sub Task</option>
                  {subTaskOptions.map((subTaskOption, subTaskIndex) => (
                    <option key={subTaskIndex} value={subTaskOption}>
                      {subTaskOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Status */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`Status-${index}`} className="form-label">
                  Status
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="Status"
                  value={task.Status}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`Status-${index}`}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((statusOption, statusIndex) => (
                    <option key={statusIndex} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Project */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`Project-${index}`} className="form-label">
                  Project
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="Project"
                  value={task.Project}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`Project-${index}`}
                  className="form-select"
                >
                  <option value="">Select Project</option>
                  {projectOptions.map((projectOption, projectIndex) => (
                    <option key={projectIndex} value={projectOption}>
                      {projectOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Remark */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`Remark-${index}`} className="form-label">
                  Remark
                </label>
              </div>
              <div className="col-md-9">
                <textarea
                  name="Remark"
                  value={task.Remark}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`Remark-${index}`}
                  className="form-control"
                />
                {errors.Remark && (
                  <div className="text-danger">{errors.Remark}</div>
                )}
              </div>
            </div>
            {/* PM */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`PM-${index}`} className="form-label">
                  PM
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  name="PM"
                  value={task.PM}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`PM-${index}`}
                  className="form-control"
                />
              </div>
            </div>
            {/* BA */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`BA-${index}`} className="form-label">
                  BA
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  name="BA"
                  value={task.BA}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`BA-${index}`}
                  className="form-control"
                />
              </div>
            </div>
            {/* Business Function */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label
                  htmlFor={`BusinessFunction-${index}`}
                  className="form-label"
                >
                  Business Function
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="BusinessFunction"
                  value={task.BusinessFunction}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`BusinessFunction-${index}`}
                  className="form-select"
                >
                  <option value="">Select Business Function</option>
                  {businessFunctionOptions.map(
                    (functionOption, functionIndex) => (
                      <option key={functionIndex} value={functionOption}>
                        {functionOption}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            {/* KPI Category */}
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`KpiCategory-${index}`} className="form-label">
                  KPI Category
                </label>
              </div>
              <div className="col-md-9">
                <select
                  name="KpiCategory"
                  value={task.KpiCategory}
                  onChange={(e) => handleTaskChange(index, e)}
                  id={`KpiCategory-${index}`}
                  className="form-select"
                >
                  <option value="">Select KPI Category</option>
                  {kpiCategoryOptions.map((kpiOption, kpiIndex) => (
                    <option key={kpiIndex} value={kpiOption}>
                      {kpiOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <div></div>

              <button
                type="button"
                className="btn btn-danger mb-3 mt-3"
                onClick={() => handleCancel(index)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </Box>
          </div>
        ))}

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Form Submission</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalContent}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmit;
