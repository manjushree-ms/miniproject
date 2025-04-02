import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "../components/Footer";

const Tracking = () => {
  const [dailyProgress, setDailyProgress] = useState({});
  const [monthlyProgress, setMonthlyProgress] = useState({});
  const [exerciseNames, setExerciseNames] = useState({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedDailyProgress = JSON.parse(localStorage.getItem("dailyProgress")) || {};
    const storedMonthlyProgress = JSON.parse(localStorage.getItem("monthlyProgress")) || {};
    const storedExerciseNames = JSON.parse(localStorage.getItem("exerciseNames")) || {};

    setDailyProgress(storedDailyProgress);
    setMonthlyProgress(storedMonthlyProgress);
    setExerciseNames(storedExerciseNames);
    calculateStreak(storedMonthlyProgress);
  }, []);

  // Calculate streak system
  const calculateStreak = (progress) => {
    let currentStreak = 0;
    let date = new Date();
    
    while (progress[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]) {
      currentStreak++;
      date.setDate(date.getDate() - 1);
    }
    setStreak(currentStreak);
  };

  // Generate calendar grid for workouts
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Generate weekly progress data for bar chart
  const weeklyData = Array.from({ length: 4 }, (_, i) => ({
    week: `Week ${i + 1}`,
    workouts: Object.entries(monthlyProgress)
      .filter(([date]) => Math.ceil(parseInt(date.split("-")[2]) / 7) === i + 1)
      .reduce((sum, [, exercises]) => sum + Object.values(exercises).reduce((a, b) => a + b, 0), 0),
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" mb={2} textAlign="center" fontWeight="bold">
          Workout Tracking
        </Typography>

        {/* Today's Workouts */}
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h5" mb={1} fontWeight="bold">Today's Workouts</Typography>
          {Object.keys(dailyProgress).length > 0 ? (
            Object.entries(dailyProgress).map(([exerciseId, count]) => (
              <Typography key={exerciseId} sx={{ ml: 2 }}>
                ✅ {exerciseNames[exerciseId] || `Exercise ID: ${exerciseId}`} - Done {count} times
              </Typography>
            ))
          ) : (
            <Typography>No workouts tracked today.</Typography>
          )}
        </Paper>

        {/* Streak Display */}
        <Paper elevation={3} sx={{ p: 2, mb: 4, textAlign: "center", backgroundColor: streak > 0 ? "#76c7c0" : "#f0f0f0" }}>
          <Typography variant="h5" fontWeight="bold">Current Streak: {streak} days 🔥</Typography>
        </Paper>

        {/* Calendar-like Workout Tracker */}
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h5" mb={1} fontWeight="bold">Monthly Workout Calendar</Typography>
          <Grid container spacing={1}>
            {calendarDays.map((day) => {
              const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
              const isWorkoutDay = !!monthlyProgress[dateKey];
              return (
                <Grid key={day} item xs={1.5} sx={{
                  textAlign: "center",
                  p: 1,
                  border: "1px solid #ccc",
                  bgcolor: isWorkoutDay ? "#76c7c0" : "#f0f0f0",
                  fontWeight: isWorkoutDay ? "bold" : "normal",
                  color: isWorkoutDay ? "white" : "black",
                }}>
                  {day}
                </Grid>
              );
            })}
          </Grid>
        </Paper>

        {/* Bar Chart for Weekly Progress */}
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h5" mb={1} fontWeight="bold">Weekly Workout Progress</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="workouts" fill="#76c7c0" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Tracking;
