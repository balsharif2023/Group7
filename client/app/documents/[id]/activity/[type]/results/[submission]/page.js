"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Banner from "../../../../../../components/Banner/Banner";
import styles from "./style.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// const theme = createTheme({
//   palette: {
//     primary: lime,
//     secondary: purple,
//   },
// });

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

export default function Questions({ params }) {
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswers] = useState(0);
  const [formFeedbackData, setFormFeebackData] = useState({
    email: "",
    feedback: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setopenSuccessDialog] = useState(false);

  // To do: Get generated questions from ChatGPT
  useEffect(() => {
    // Test Data
    // fetch("/data/report.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setQuestions(data.questions);
    //   });

    // const storedData = localStorage.getItem("RESULTS");

    // if (storedData) {
    //   try {
    //     const parsedData = JSON.parse(storedData);
    //     setQuestions(parsedData.questions);
    //   } catch (error) {
    //     console.error("Error parsing JSON data:", error);
    //   }
    // }
    fetch(
      `/api/documents/${params.id}/activity/${params.type}/results/${params.submission}`
    )
      .then((response) => response.json())
      .then((data) => {
        const questionsData = Object.values(
          data.reduce(
            (
              acc,
              [
                questionId,
                question,
                submittedAnswer,
                answerId,
                answer,
                isCorrect,
              ]
            ) => {
              acc[questionId] = acc[questionId] || {
                questionId,
                question,
                submittedAnswer,
                options: [],
              };

              acc[questionId].options.push({
                answerId,
                answer,
                isCorrect,
              });

              if (isCorrect) {
                acc[questionId].correctAnswer = answer;
              }
              return acc;
            },
            {}
          )
        );

        console.log(questionsData);
        setQuestions(questionsData);
      });
  }, []);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickOpenSuccessDialog = () => {
    setopenSuccessDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setopenSuccessDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFeebackData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const formDataDocument = new FormData();
    formDataDocument.append("email", formFeedbackData.email);
    formDataDocument.append("feedback", formFeedbackData.feedback);

    const response = await fetch(
      `/api/documents/${params.id}/activity/${params.type}/results/${params.submission}/feedback_report`,
      {
        method: "POST",
        body: formDataDocument,
      }
    ).catch((error) => {
      console.log("Error:", error);
    });

    if (response.ok) {
      console.log("Success");
      setopenSuccessDialog(true);
      setOpenDialog(false);
    }
  };

  console.log("log_questions:", questions);
  console.log("log_feedback:", formFeedbackData);

  return (
    <div>
      <Head>
        <title>Submission Report</title>
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
              Submission Report
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        <Stack
          direction={params.type === "flash-cards" ? "column" : "row"}
          justifyContent="center"
          alignItems={params.type === "flash-cards" ? "center" : {}}
          sx={{ marginTop: "2rem", width: "100%" }}
        >
          {params.type === "flash-cards" ? (
            <>
              {questions.map((question, index) => (
                <Box
                  className="flip-card"
                  key={`fc${index}`}
                  sx={{ marginBottom: "2rem" }}
                >
                  <Box className="flip-card-inner">
                    <Stack
                      className="flip-card-front"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5" p="2rem">
                        {question.question}
                      </Typography>
                    </Stack>
                    <Stack
                      className="flip-card-back"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5" p="2rem">
                        {question.correctAnswer}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <form style={{ width: "80%" }}>
              <FormControl sx={{ width: "100%" }}>
                {questions.map((question, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "2rem" }}
                  >
                    <CardContent>
                      <Box>
                        <FormLabel>
                          <Typography variant="h5">
                            Question {index + 1}: {question.question}
                          </Typography>
                        </FormLabel>
                      </Box>
                      {(params.type === "multiple-choice" ||
                        params.type === "true-false") && (
                        <RadioGroup name={`question${index}`}>
                          <Stack
                            justifyContent="space-between"
                            // alignItems="center"
                            spacing={2}
                            mt={2}
                          >
                            {question.options.map((option, index) => (
                              <Card
                                key={`answer${index}`}
                                variant="outlined"
                                sx={{ width: "100%" }}
                              >
                                <CardContent>
                                  <FormControlLabel
                                    value={option.answer}
                                    control={
                                      <Radio
                                        checked={
                                          option.answer ===
                                          question.submittedAnswer
                                        }
                                      />
                                    }
                                    label={option.answer}
                                    disabled
                                  />
                                </CardContent>
                              </Card>
                            ))}
                          </Stack>
                        </RadioGroup>
                      )}
                      {params.type === "matching" && (
                        <Box mt={2}>
                          <TextField
                            sx={{ width: "200px" }}
                            disabled
                            defaultValue={question.submittedAnswer}
                          />
                        </Box>
                      )}
                      {params.type === "fill-in-the-blank" && (
                        <Box mt={2}>
                          <TextField
                            disabled
                            value={question.submittedAnswer}
                          />
                        </Box>
                      )}
                      <Box mt={2}>
                        <Card variant="outlined" sx={{ width: "100%" }}>
                          <CardContent>
                            {question.submittedAnswer ===
                            question.correctAnswer ? (
                              <Typography sx={{ color: "#2e7d32" }}>
                                CORRECT
                              </Typography>
                            ) : (
                              <Typography sx={{ color: "#d32f2f" }}>
                                INCORRECT
                              </Typography>
                            )}
                            <Typography>
                              Submitted Answer: {question.submittedAnswer}
                            </Typography>
                            <Typography>
                              Correct Answer: {question.correctAnswer}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                <Card variant="outlined" sx={{ marginBottom: "2rem" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ width: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h4" component="body1">
                        Score:{" "}
                        {
                          questions.filter(
                            (q) => q.submittedAnswer === q.correctAnswer
                          ).length
                        }{" "}
                        / {questions.length}
                      </Typography>
                    </CardContent>
                  </Stack>
                </Card>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  mb={2}
                >
                  <Button type="submit" variant="contained" href={"/documents"}>
                    Documents
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    href={`/documents/${params.id}`}
                  >
                    Activities
                  </Button>
                </Stack>
              </FormControl>
            </form>
          )}
          {params.type === "flash-cards" && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mb={2}
            >
              <Button type="submit" variant="contained" href={"/documents"}>
                Documents
              </Button>
              <Button
                type="submit"
                variant="contained"
                href={`/documents/${params.id}`}
              >
                Activities
              </Button>
            </Stack>
          )}
        </Stack>
        <Fab color="primary" sx={fabStyle} onClick={handleClickOpenDialog}>
          <QuestionMarkIcon />
        </Fab>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Feedback Report</DialogTitle>
          <form onSubmit={handleFeedbackSubmit}>
            <DialogContent>
              <DialogContentText>
                We appreciate your engagement with StudySmartAI and value your
                feedback. If you've encountered any issues or have feedback
                regarding the questions and answers provided, we would love to
                hear from you. Please feel free to share any specific examples,
                concerns, or suggestions you may have.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                name="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
              ></TextField>
              <Box mt={2}>
                <TextField
                  id="feedback-text"
                  multiline
                  name="feedback"
                  rows={6}
                  fullWidth
                  onChange={handleChange}
                ></TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
          <DialogTitle>Feedback Report</DialogTitle>
          <DialogContent fullWidth sx={{ textAlign: "center" }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <DialogContentText>
              <Typography variant="h4">Thank You!</Typography>
              <Typography>Your feedback was submitted successfully.</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
