"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner/Banner";
import { PropTypes } from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Documents() {
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - submissions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // fetch("/data/documents.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDocuments(data.documents);
    //   });
    fetch("/api/user-profile")
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        const submissionsData = data.submissions.map((submission, index) => {
          return {
            submissionId: submission[0],
            documentId: submission[1],
            title: submission[2],
            subtitle: submission[3],
            questionType: submission[4],
          };
        });
        setSubmissions(submissionsData);
        setUser(data.user);
      });
  }, []);

  console.log("submissions:", submissions);

  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <Banner />
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
              User Profile
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box width="60%">
            <Box sx={{ margin: "2rem", width: "100%" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Email Address
              </Typography>
              <Divider />
              <Typography mt={1} variant="subtitle1">
                {user}
              </Typography>
            </Box>
            <Box sx={{ margin: "2rem", width: "100%" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Submissions
              </Typography>
              <Divider />
              <Box sx={{ margin: "1rem" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Submission ID</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Subtitle</TableCell>
                        <TableCell align="center">Question Type</TableCell>
                        <TableCell align="center">Link</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? submissions.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : submissions
                      ).map((row) => (
                        <TableRow key={row.submissionId}>
                          <TableCell
                            style={{ width: 160 }}
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.submissionId}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.title}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.subtitle}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.questionType}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Button
                              type="submit"
                              variant="contained"
                              href={`/documents/${row.documentId}/activity/${row.questionType}/results/${row.submissionId}`}
                            >
                              Open
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={5}
                          count={submissions.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
