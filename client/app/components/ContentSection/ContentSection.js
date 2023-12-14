import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import userData from "../../data/userData.json";

export default function ContentSection({ currentCategory }) {
  const [category, setCategory] = useState("");
  const activities = [
    "Q&A Questions",
    "True/False Questions",
    "Multiple-Choice Questions",
    "Flash Cards",
  ];
  console.log(userData.documents[0].activities);

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
          {currentCategory == "Documents" && (
            <Typography sx={{ fontWeight: "bold" }} variant="h2">
              Documents
            </Typography>
          )}

          {currentCategory == "Activities" && (
            <Typography sx={{ fontWeight: "bold" }} variant="h2">
              Activities
            </Typography>
          )}

          {currentCategory == "Documents" && (
            <Box>
              <IconButton>
                <AddCircleOutlineIcon sx={{ fontSize: "4rem" }} />
              </IconButton>
            </Box>
          )}
        </Stack>
        <Typography variant="h5">Deep Learning</Typography>
      </Box>
      <Divider sx={{ marginTop: "1rem" }} />
      <Box sx={{ margin: "2rem" }}>
        {currentCategory == "Documents" && (
          <List>
            {userData.documents.map((document, index) => (
              <ListItem key={index}>
                <Card variant="outlined" sx={{ width: "100%" }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h4">
                          {document.documentTitle}
                        </Typography>
                        <Typography variant="h6">
                          {document.documentSubtitle}
                        </Typography>
                      </Box>
                      {currentCategory == "Documents" && (
                        <Box>
                          <IconButton href="/activities" size="large">
                            <MenuIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        )}

        {currentCategory == "Activities" && (
          <List>
            {activities.map((activity, index) => (
              <ListItem key={index}>
                <Card variant="outlined" sx={{ width: "100%" }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h4">{activity}</Typography>
                      </Box>
                      <Box>
                        <IconButton href="/questions" size="large">
                          <PlayCircleOutlinedIcon sx={{ fontSize: "3rem" }} />
                        </IconButton>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        )}

        {currentCategory == "Documents" && (
          <Box sx={{ textAlign: "center" }}>
            <IconButton>
              <AddCircleOutlineIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
