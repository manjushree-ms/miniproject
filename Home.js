import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box>
      <HeroBanner />
      {user && (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mt: 3,
            color: "#3A1212",
          }}
        >
          Welcome, {user.name}! 💪
        </Typography>
      )}
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Home;
