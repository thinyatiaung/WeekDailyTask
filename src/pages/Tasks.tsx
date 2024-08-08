import React, { useState } from "react";
import { Button } from "reactstrap";
import * as XLSX from "xlsx";
import { Row, Col } from "react-bootstrap";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tableData } from "../data/commom"; // Adjust the import path as needed
import { generateRandomId } from "@utils/common"; // Adjust the import path as needed

// CustomDatePicker component integrated with Material UI's TextField
const CustomDatePicker: React.FC<{
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  label: string;
}> = ({ selectedDate, onDateChange, label }) => (
  <DatePicker
    selected={selectedDate}
    onChange={onDateChange}
    dateFormat="yyyy-MM-dd"
    customInput={
      <TextField
        label={label}
        variant="outlined"
        placeholder="Date"
        fullWidth
        // InputLabelProps={{ shrink: true }}
        margin="normal"
        sx={{
          "&.MuiFormControl-root":{
            margin: '0px !important'
          },
          "& .MuiInputBase-root": {
            height: "40px",
          },
          "& .MuiFormLabel-root": {
            top: "-4px",
            fontSize: "14px",
          },
        }}
      />
    }
  />
);

const Tasks: React.FC = () => {
  const [staffId, setStaffId] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Flattened data is initially derived from tableData
  const [flattenedData, setFlattenedData] = useState<any[]>(
    tableData.flatMap((item) =>
      item.tasks.map((task) => ({
        id: generateRandomId(item.id),
        staffId: item.staffId,
        name: item.name,
        date: item.date,
        taskNumber: task.taskNumber,
        fromTime: task.fromTime,
        toTime: task.toTime,
        task: task.task,
        subTask: task.subTask,
        status: task.status,
        project: task.project,
        remark: task.remark,
        pm: task.pm,
        ba: task.ba,
        businessFunction: task.businessFunction,
        kpiCategory: task.kpiCategory,
      }))
    )
  );

  const handleStaffIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaffId(e.target.value);
  };

  const handleSearch = () => {
    const filtered = flattenedData.filter((item) => {
      const matchStaffId = staffId ? item.staffId.includes(staffId) : true;
      const matchDate = date
        ? new Date(item.date).toDateString() === date.toDateString()
        : true;
      return matchStaffId && matchDate;
    });

    setFilteredData(filtered);
  };

  const handleExport = () => {
    const dataToExport = filteredData.length ? filteredData : flattenedData;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    XLSX.writeFile(workbook, "tasks.xlsx");
  };

  const handleEdit = (id: string) => {
    console.log("Edit row with id:", id);
    // Implement edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete row with id:", id);
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedData = flattenedData.filter((item) => item.id !== id);
      setFilteredData(updatedData);
      setFlattenedData(updatedData); // Ensure flattenedData is updated
    }
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{
          display: 'flex',
          gap: '5px',
          height: '100%',
          alignItems: 'center'
        }}>
          <Button color="primary" onClick={() => handleEdit(params.row.id)}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            color="danger"
            onClick={() => handleDelete(params.row.id)}
          >
            <i className="bi bi-trash3"></i>
          </Button>
        </Box>
      ),
    },
    { field: "staffId", headerName: "Staff ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "taskNumber", headerName: "Task Number", width: 100 },
    { field: "fromTime", headerName: "From Time", width: 100 },
    { field: "toTime", headerName: "To Time", width: 100 },
    { field: "task", headerName: "Task", width: 100 },
    { field: "subTask", headerName: "Sub Task", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "project", headerName: "Project", width: 100 },
    { field: "remark", headerName: "Remark", width: 200 },
    { field: "pm", headerName: "PM", width: 100 },
    { field: "ba", headerName: "BA", width: 100 },
    { field: "businessFunction", headerName: "Business Function", width: 150 },
    { field: "kpiCategory", headerName: "KPI Category", width: 100 },
  ];

  return (
    <>
      <h3>Daily Tasks</h3>
      <br/>
      <Box component="form" noValidate autoComplete="off" margin={'15px 0'} >
        <Row className="align-items-end g-3">
          <Col md="auto">
            <TextField
              label="Staff ID"
              variant="outlined"
              fullWidth
              value={staffId}
              sx={{
                "&.MuiFormControl-root":{
                  margin: '0px !important'
                },
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiFormLabel-root": {
                  top: "-4px",
                  fontSize: "14px",
                },
              }}
              onChange={handleStaffIdChange}
              margin="normal"
            />
          </Col>
          <Col md="auto">
            <CustomDatePicker
              selectedDate={date}
              onDateChange={setDate}
              label="Date"
            />
          </Col>
          <Col md="auto">
            <Button color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md="auto">
            <Button color="success" onClick={handleExport}>
              Export
            </Button>
          </Col>
        </Row>
      </Box>

      <div style={{ height: "max-content", width: "100%" }}>
        <DataGrid
          rows={filteredData.length ? filteredData : flattenedData}
          columns={columns}
          sx={{
            "& .MuiDataGrid-virtualScrollerContent": {
              background: "aliceblue !important",
            },
            "& .MuiDataGrid-columnHeaders div": {
              background: "#70aaff",
            },
          }}
          //pageSize={10}
          // disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default Tasks;
