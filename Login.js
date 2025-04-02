import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const dummyUser = { name: "John Doe", email };
    localStorage.setItem("user", JSON.stringify(dummyUser));

    navigate("/tracking");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card
        sx={{
          maxWidth: 600,  // Increased Width
          width: "90%",   // Makes it responsive
          padding: 6,
          boxShadow: 7,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h3" fontWeight="bold" mb={3} color="#FF5722">
            Welcome Back!
          </Typography>
          <Typography variant="h6" color="textSecondary" mb={4}>
            Login to continue tracking your progress.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              sx={{ input: { padding: "16px", fontSize: "18px" } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              sx={{ input: { padding: "16px", fontSize: "18px" } }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: "#FF5722",
                padding: "14px",
                fontSize: "18px",
                borderRadius: "10px",
              }}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography variant="h6" mt={3}>
            Don't have an account? <a href="/signup" style={{ color: "#FF5722", fontWeight: "bold" }}>Sign Up</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
