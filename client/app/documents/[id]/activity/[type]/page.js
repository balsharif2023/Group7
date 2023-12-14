"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  CircularProgress,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Banner from "../../../../components/Banner/Banner";
import styles from "./style.css";

const ActivityCardContent = styled(CardContent)(`
&:last-child {
  padding-bottom: 16px
}
`);

export default function Questions({ params }) {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [selectAnswers, setSelectAnswers] = useState([]);

  // To do: Get generated questions from ChatGPT
  useEffect(() => {
    // fetch("/data/questions-mc.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setQuestions(data.questions);
    //     const answersData = data.questions.map((question) => {
    //       return question.options[0];
    //     });
    //     const questionsData = data.questions.map((question) => {
    //       return {
    //         question: question.question,
    //         options: question.options,
    //         answer: "",
    //         submittedAnswer: "",
    //       };
    //     });
    //     setFormData(questionsData);
    //     setSelectAnswers(answersData);
    //   });

    fetch("/data/activityTypes.json")
      .then((response) => response.json())
      .then(
        (data) => {
          const result = data.activityTypes.find(
            (activityType) => activityType.route === params.type
          );

          if (result) {
            setCurrentType(result.name);
          } else {
            setCurrentType("Undefined");
          }
        }
        //  setActivityTypes(data.activityTypes)
      );

    fetch(`/api/documents/${params.id}/activity/${params.type}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        console.log(data.questions);
        const answersData = data.questions.map((question) => {
          return question.correctAnswer;
        });
        const questionsData = data.questions.map((question) => {
          return {
            question: question.question,
            options: question.options || ["None"],
            correctAnswer: question.correctAnswer,
            submittedAnswer: "",
          };
        });
        setFormData(questionsData);
        setSelectAnswers(answersData);
      });
  }, []);

  const handleOptionChange = (event, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].submittedAnswer = event.target.value;
    setFormData(updatedFormData);
  };

  const handleTextFieldChange = (event, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].submittedAnswer = event.target.value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitted:", formData);

    const scoreData = formData.filter(
      (question) => question.submittedAnswer === question.correctAnswer
    );

    console.log(scoreData);
    console.log(scoreData.length);

    const requestData = {
      formData: formData,
      score: scoreData.length,
    };

    const response = await fetch(
      `/api/documents/${params.id}/activity/${params.type}/results`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    ).catch((error) => {
      console.log("Error:", error);
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      // setResultsData(data.message);
      // localStorage.setItem("RESULTS", JSON.stringify(data));
      window.location.href = `/documents/${params.id}/activity/${params.type}/results/${data.submission_id}`;
    }
  };

  console.log(formData);

  return (
    <div>
      <Head>
        <title>Questions</title>
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
              {currentType} Activity
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        {questions.length <= 0 && (
          <Stack
            mt={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Stack>
        )}
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: "2rem", width: "100%" }}
        >
          {/* <div className="loader"></div> */}
          <form
            style={params.type !== "flash-cards" ? { width: "80%" } : {}}
            onSubmit={handleSubmit}
          >
            <FormControl sx={{ width: "100%" }}>
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
                <>
                  {questions.map((question, index) => (
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        marginBottom: "2rem",
                        border: "1px solid rgb(0, 183, 255)",
                      }}
                    >
                      <ActivityCardContent>
                        <Box>
                          <FormLabel>
                            <Typography variant="h5">
                              Question {index + 1}: {question.question}
                            </Typography>
                          </FormLabel>
                        </Box>
                        {(params.type === "multiple-choice" ||
                          params.type === "true-false") && (
                          <RadioGroup
                            name={`question${index}`}
                            onChange={(event) =>
                              handleOptionChange(event, index)
                            }
                          >
                            <Stack
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}
                              mt={2}
                            >
                              {question.options.map((option, index) => (
                                <Card
                                  key={`answer${index}`}
                                  variant="outlined"
                                  sx={{ width: "100%" }}
                                >
                                  <ActivityCardContent>
                                    <FormControlLabel
                                      value={option}
                                      control={<Radio />}
                                      label={option}
                                    />
                                  </ActivityCardContent>
                                </Card>
                              ))}
                            </Stack>
                          </RadioGroup>
                        )}
                        {(params.type === "fill-in-the-blank" ||
                          params.type === "short-answer") && (
                          <Box mt={2}>
                            <TextField
                              onChange={(event) =>
                                handleTextFieldChange(event, index)
                              }
                            />
                          </Box>
                        )}
                        {params.type === "essay" && (
                          <Box mt={2}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              onChange={(event) =>
                                handleTextFieldChange(event, index)
                              }
                            />
                          </Box>
                        )}
                        {params.type === "matching" && (
                          <Box mt={2}>
                            <TextField
                              sx={{ width: "200px" }}
                              select
                              defaultValue=""
                              onChange={(event) =>
                                handleTextFieldChange(event, index)
                              }
                            >
                              {selectAnswers.map((answer, index) => (
                                <MenuItem key={`answer${index}`} value={answer}>
                                  {answer}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        )}
                      </ActivityCardContent>
                    </Card>
                  ))}
                </>
              )}

              <Box sx={{ textAlign: "center" }} mb={2}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </div>
  );
}
