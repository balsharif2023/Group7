"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material/";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";

import Logout from "@mui/icons-material/Logout";

import "./styles.css";

export default function Banner() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("ID");
    window.location.href = "/";
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    window.location.href = "/user-profile";
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ backgroundColor: "rgb(0, 183, 255)", color: "white" }}>
      <Box>
        <Stack
          sx={{ paddingRight: "1rem", paddingTop: "1rem" }}
          spacing={{ xs: 1 }}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          useFlexGap
        >
          <Avatar
            onClick={handleClick}
            size="large"
            sx={{ ml: 2, color: "black", bgcolor: "white" }}
          >
            <PersonIcon />
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
      <Box p="1rem">
        <Stack
          direction="column"
          flexWrap="wrap"
          justifyContent="flex-end"
          sx={{ height: "10rem" }}
        >
          {/* <Typography variant="h1">StudySmartAI</Typography> */}
          <Link href="/documents">
            <Typography variant="h1" style={{ color: "white" }}>
              StudySmart<span style={{ color: "black" }}>AI</span>
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
