import React, { useState, useEffect } from "react";
import {
    Dialog,
    Box,
    IconButton,
    Button,
    TextField,
    MenuItem,
    Collapse,
    Paper,
} from "@mui/material";
import Title from "../components/Title";

interface AddNoteModalProps {
    open: boolean;
    onClose: () => void;
}

interface SymptomRow {
    symptoms: string;
    severity: string;
    started: string;
    details: string;
}

const severityOptions = ["Mild", "Medium", "Severe"];
const startedOptions = ["Today", "Yesterday", "Last Week"];

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onClose }) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(true);
    const [severityOpen, setSeverityOpen] = useState(false);
    const [startedOpen, setStartedOpen] = useState(false);
    const [rows, setRows] = useState<SymptomRow[]>([
        { symptoms: "", severity: "", started: "", details: "" },
    ]);

    const handleDeleteRow = (index: number) => {
        setRows(rows.filter((_, i) => i !== index));
    };


    const handleChange = (index: number, field: keyof SymptomRow, value: string) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { symptoms: "", severity: "", started: "", details: "" }]);
    };

    const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#6B7280",
  },
};

const iconBtnGray = {
  width: 36,
  height: 36,
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
};

const iconBtnBlue = {
  width: 36,
  height: 36,
  borderRadius: "8px",
  border: "1px solid #93C5FD",
  backgroundColor: "#EFF6FF",
};



    if (!open) return null;

    return (
        <Dialog
            open={open} onClose={onClose} maxWidth={false}
            slotProps={{ paper: {
                sx: {
                    backgroundColor: "#fff", borderRadius: "12px", width: "90vw", maxWidth: "1440px", maxHeight: "90vh", display: "flex", flexDirection: "column",
                    padding: "8px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",},
                },
            }} >
            <Box
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: "24px", paddingY: "16px", marginBottom: "16px", }}>
                <Title text="Add Note" />
                <IconButton onClick={onClose} sx={{ width: 32, height: 32 }} >
                    <img src="/images/x-01.svg" alt="close" style={{ width: 20, height: 20 }} />
                </IconButton>
            </Box>
            <Box sx={{ flex: 1, overflowY: "auto", paddingX: "24px", paddingY: "16px", }}>
                <Paper sx={{ p: 2, borderRadius: "12px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", curcor: "pointer", }} onClick={() => setIsCollapseOpen(!isCollapseOpen)}>
                        <Box sx={{ fontWeight: 600 }}>EnterSymptoms</Box>
                        <Box sx={{ transition: "transform 0.3s ease", transform: isCollapseOpen ? "rotate(180deg)" : "rotate(0deg)", display: "flex", alignItems: "center", }}>
                            <img src="/images/fi_chevron-down.svg" alt="toggle" style={{ width: 20, height: 20 }} />
                        </Box>
                    </Box>
                    <Collapse in={isCollapseOpen}>
                        {rows.map((row, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", gap:"12px", mt: 2, p:"12px", borderRadius: "12px", border: "1px solid #E5E7EB",backgroundColor:"#FFFFFF", }}>
                               <TextField label="Symptoms*" placeholder="Select" value={row.symptoms} onChange={(e) => handleChange(index, "symptoms", e.target.value)} fullWidth sx={inputStyle} />
                                <TextField select label="Severity*" value={row.severity} onChange={(e) => handleChange(index, "severity", e.target.value)} fullWidth sx={inputStyle}
                                    slotProps={{ select: {
                                        open: severityOpen, onOpen: () => setSeverityOpen(true), onClose: () => setSeverityOpen(false),
                                        IconComponent: () => (
                                            <Box sx={{ mr: 1, transition: "transform 0.3s ease", transform: severityOpen ? "rotate(180deg)" : "rotate(0deg)", display: "flex", alignItems: "center", }}>
                                                <img src="/images/fi_chevron-down.svg" alt="severity" style={{ width: 18, height: 18 }} />
                                            </Box>
                                        ),},
                                    }}>
                                    {severityOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField select label="Started*" value={row.started} onChange={(e) => handleChange(index, "started", e.target.value)} fullWidth sx={inputStyle}
                                    slotProps={{ select: {
                                        open: startedOpen, onOpen: () => setStartedOpen(true), onClose: () => setStartedOpen(false),
                                        IconComponent: () => (
                                            <Box sx={{ mr: 1, transition: "transform 0.3s ease", transform: startedOpen ? "rotate(180deg)" : "rotate(0deg)", display: "flex", alignItems: "center", }} >
                                                <img src="/images/fi_chevron-down.svg" alt="started" style={{ width: 18, height: 18 }} />
                                            </Box>
                                        ),},
                                    }}>
                                    {startedOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField label="Associated symptoms or details" placeholder="Enter details" value={row.details} onChange={(e) => handleChange(index, "details", e.target.value)} fullWidth sx={inputStyle}/>
                                <IconButton onClick={() => handleDeleteRow(index)} sx={{ border: "1px solid #D1D5DB", borderRadius: "8px", }}>
                                    <img src="/images/u_trash.svg" alt="close" style={{ width: 20, height: 20 }} />
                                </IconButton>
                            </Box>
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <IconButton onClick={handleAddRow} sx={{ border: "1px solid #CBD5E1", borderRadius: "8px", backdropFilter: "blur(4px)", }} >
                                <img src="/images/u_plus(1).svg" alt="close" style={{ width: 20, height: 20 }} />
                            </IconButton>
                        </Box>
                    </Collapse>
                </Paper>

                <Box sx={{ height: "1200px" }} />
            </Box>

            <Box
                sx={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px", }}>
                <Button variant="outlined" onClick={onClose}
                    sx={{
                        paddingX: "16px", paddingY: "8px", borderRadius: "8px", border: "1px solid #D1D5DB", color: "#374151", backgroundColor: "#FFFFFF",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#F9FAFB", borderColor: "#D1D5DB", },
                    }} >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        paddingX: "16px", paddingY: "8px", borderRadius: "8px", backgroundColor: "#2563EB", textTransform: "none",
                        "&:hover": { backgroundColor: "#1D4ED8", },
                    }}  >
                    Save
                </Button>
            </Box>
        </Dialog>
    );
};

export default AddNoteModal;
