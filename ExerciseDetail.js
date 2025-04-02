import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  // Function to log the workout
  const handleLogWorkout = () => {
    const workout = {
      id: exerciseDetail.id,
      name: exerciseDetail.name,
      date: new Date().toISOString().split("T")[0], // Stores only YYYY-MM-DD
      rounds: 1, // Default to 1 round
    };

    // Get existing workouts or create a new array
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

    // Add the new workout to the array
    storedWorkouts.push(workout);

    // Save updated workouts back to localStorage
    localStorage.setItem("workouts", JSON.stringify(storedWorkouts));

    alert("Workout logged successfully! ✅");
  };

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      
      {/* "Do" Button with Tracking */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ fontSize: "18px", padding: "12px 24px", borderRadius: "8px" }}
          onClick={handleLogWorkout} // Track workout on click
        >
          Do
        </Button>
      </Box>

      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
