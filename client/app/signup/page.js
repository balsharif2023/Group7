"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material/";
import styles from "./styles.css";

export default function Home() {
  const [form, setForm] = useState({
    createUsername: "",
    createEmail: "",
    createPassword: "",
  });
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("ID");

    if (userId) {
      window.location.href = "/documents";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      console.log("Error:", error);
    });

    if (response.ok) {
      const data = await response.json();
      setLoginStatus(data.Status);

      if (data.Status === "Logged In") {
        localStorage.setItem("ID", JSON.stringify(data.ID));
        window.location.href = "/documents";
      }
    } else {
      setLoginStatus("Login Failed");
    }
  };

  return (
    <Box>
      <Head>
        <title>StudySmartAI</title>
      </Head>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box mt={5}>
          <Typography
            className="name"
            variant="h2"
            component="span"
            color="white"
          >
            StudySmart
          </Typography>
          <Typography className="name" variant="h2" component="span">
            AI
          </Typography>
        </Box>
      </Stack>

      <Stack
        mt={5}
        direction="row"
        justifyContent="center"
        alignContent="center"
      >
        <Box textAlign="center">
          <Paper
            className="paper"
            elevation={3}
            sx={{ backgroundColor: "white", padding: "20px", width: "400px" }}
          >
            <Typography variant="h5">Create Account</Typography>

            <form onSubmit={handleSubmit}>
              <Typography mt={2}>Username: </Typography>
              <TextField
                fullWidth
                size="small"
                name="createUsername"
                onChange={handleChange}
              />
              <Typography mt={2}>Email: </Typography>
              <TextField
                fullWidth
                size="small"
                name="createEmail"
                onChange={handleChange}
              />
              <Typography mt={2}>Password: </Typography>
              <TextField
                fullWidth
                size="small"
                type="password"
                name="createPassword"
                onChange={handleChange}
              />
              <Box mt={2}>
                <Button variant="contained" type="submit">
                  Sign Up
                </Button>
              </Box>
            </form>
            <Typography mt={2}>
              Already have an account? <Link href="/">Log In!</Link>
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
