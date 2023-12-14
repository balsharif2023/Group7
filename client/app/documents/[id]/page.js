"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Banner from "../../components/Banner/Banner";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

const ActivityCardContent = styled(CardContent)(`
&:last-child {
  padding-bottom: 16px
}
`);

export default function Activities({ params }) {
  const [activityTypes, setActivityTypes] = useState([]);
  console.log(params);

  useEffect(() => {
    fetch("/data/activityTypes.json")
      .then((response) => response.json())
      .then((data) => setActivityTypes(data.activityTypes));
  }, []);

  return (
    <div>
      <Head>
        <title>Activities</title>
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
              Activities
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        {/* <Card
          sx={{
            width: 220,
            height: 220,
            border: "3px solid rgb(0, 183, 255)",
            textAlign: "center",
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography sx={{ fontFamily: "monospace" }} variant="h5">
              Multiple Choice
            </Typography>
          </CardContent>
          <Box>
            <CardMedia
              sx={{
                height: 110,
                // width: 140,
                margin: "0 16px 0 16px ",
              }}
              image="/images/multiple-choice.png"
              title="multiple-choice"
            />
          </Box>
        </Card> */}

        <Box sx={{ margin: "2rem" }}>
          <List>
            {activityTypes.map((activityType, index) => (
              <ListItem
                key={index}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Card
                  variant="outlined"
                  sx={{ width: "45%", border: "3px solid rgb(0, 183, 255)" }}
                >
                  <ActivityCardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={3}
                      >
                        <Image
                          src={activityType.imageUrl}
                          alt={activityType.name}
                          height={60}
                          width={60}
                        />
                        <Typography sx={{ fontSize: "24px" }}>
                          {activityType.name}
                        </Typography>
                      </Stack>
                      <Box>
                        <IconButton
                          href={`/documents/${params.id}/activity/${activityType.route}`}
                          size="large"
                        >
                          <PlayCircleOutlinedIcon sx={{ fontSize: "3rem" }} />
                        </IconButton>
                      </Box>
                    </Stack>
                  </ActivityCardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}
