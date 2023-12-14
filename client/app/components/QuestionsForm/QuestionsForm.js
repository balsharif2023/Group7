import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import userData from "../../data/userData.json";

export default function GeneratedQuestionsForm({ currentCategory }) {
  const [category, setCategory] = useState("");
  console.log(category);

  useEffect(() => {
    setCategory(currentCategory);
  }, [category]);

  return (
    <Box>
      <Box sx={{ marginTop: "3rem", marginLeft: "2rem", marginRight: "2rem" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {currentCategory == "Question and Answer" && (
            <Typography sx={{ fontWeight: "bold" }} variant="h2">
              Q&A Activity
            </Typography>
          )}
        </Stack>
        <Typography variant="h5">Deep Learning</Typography>
      </Box>
      <Divider sx={{ marginTop: "1rem" }} />
      <Box sx={{ margin: "2rem" }}>
        <List>
          {userData.documents[0].activities[0].questions.map(
            (question, index) => (
              <ListItem key={index}>
                <Card variant="outlined" sx={{ width: "100%" }}>
                  <CardContent>
                    <Box>
                      <Typography variant="h5">
                        Question {index + 1}: {question.question}
                      </Typography>
                    </Box>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Answer"
                        variant="outlined"
                        sx={{ mt: "1rem", width: "100%" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
            )
          )}
        </List>

        <Box sx={{ textAlign: "center" }}>
          {/* <IconButton>
          <AddCircleOutlineIcon sx={{ fontSize: "4rem" }} />
        </IconButton> */}
          <Button variant="contained" href="/activities">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
