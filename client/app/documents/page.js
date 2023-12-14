"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner/Banner";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadIcon from "@mui/icons-material/Upload";
import GridViewIcon from "@mui/icons-material/GridView";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DocumentCardContent = styled(CardContent)(`
&:last-child {
  padding-bottom: 16px
}
`);

export default function Documents() {
  // Temporary user_id variable until we have login/signup page

  // To do: Get documents from database based on user ID
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    file: null,
  });
  const [fileName, setFileName] = useState("");
  console.log("fileName:", fileName);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataDocument = new FormData();
    formDataDocument.append("title", formData.title);
    formDataDocument.append("subtitle", formData.subtitle);
    formDataDocument.append("file", formData.file);

    const response = await fetch("/api/documents", {
      method: "POST",
      body: formDataDocument,
    }).catch((error) => {
      console.log("Error:", error);
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  useEffect(() => {
    // fetch("/data/documents.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDocuments(data.documents);
    //   });
    fetch("/api/documents")
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
      });
  }, []);

  console.log("documents:", documents);

  return (
    <div>
      <Head>
        <title>Documents</title>
      </Head>
      <Banner />
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Add New Document</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography>Title</Typography>
            <TextField
              size="small"
              name="title"
              fullWidth
              onChange={handleChange}
            />
            <Typography sx={{ mt: 2 }}>Subtitle</Typography>
            <TextField
              size="small"
              name="subtitle"
              fullWidth
              onChange={handleChange}
            />
            <Stack
              sx={{ mt: 2 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {fileName && <Typography>{fileName}</Typography>}
              <Button
                size="small"
                component="label"
                variant="contained"
                startIcon={<UploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Stack>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {formData.title && formData.subtitle && formData.file ? (
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              ) : (
                <Button variant="contained" type="submit" disabled>
                  Submit
                </Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Box>
        <Box
          sx={{ marginTop: "3rem", marginLeft: "2rem", marginRight: "2rem" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h2">
              Documents
            </Typography>
            <Box>
              <IconButton onClick={handleOpen}>
                <AddCircleOutlineIcon sx={{ fontSize: "4rem" }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        <Box sx={{ margin: "2rem" }}>
          <List>
            {documents.map((document, index) => (
              <ListItem key={index}>
                <Card
                  variant="outlined"
                  sx={{ width: "100%", border: "1px solid rgb(0, 183, 255)" }}
                >
                  <DocumentCardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h4">{document[1]}</Typography>
                        <Typography variant="subtitle1">
                          {document[2]}
                        </Typography>
                        {/* Test */}
                        {/* <Typography variant="h4">{document.title}</Typography>
                        <Typography variant="h6">
                          {document.subtitle}
                        </Typography> */}
                      </Box>
                      <Box>
                        <Link href={`/documents/${document[0]}`}>
                          <IconButton size="large">
                            <GridViewIcon fontSize="inherit" />
                          </IconButton>
                        </Link>
                      </Box>
                    </Stack>
                  </DocumentCardContent>
                </Card>
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={handleOpen}>
              <AddCircleOutlineIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
