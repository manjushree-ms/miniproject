import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      px="40px"
      py="10px"
      bgcolor="#fbf6f6"
      width="100%"
    >
      {/* Logo */}
      <Link to="/" style={{ marginRight: "20px" }}>
        <img src={Logo} alt="logo" style={{ width: "48px", height: "48px" }} />
      </Link>

      {/* Navigation Links */}
      <Stack direction="row" gap="40px" fontSize="20px" alignItems="center" flexGrow={1}>
        <Link to="/" style={{ textDecoration: "none", color: "#3A1212", borderBottom: "3px solid #FF2625" }}>
          Home
        </Link>
        <a href="#exercises" style={{ textDecoration: "none", color: "#3A1212" }}>
          Exercises
        </a>

        {/* Show 'Tracking' Page Only When Logged In */}
        {user && (
          <Link to="/tracking" style={{ textDecoration: "none", color: "#3A1212" }}>
            Tracking
          </Link>
        )}

        {/* User Auth Buttons */}
        <Stack direction="row" gap="20px" alignItems="center">
          {user ? (
            <>
              
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFCC99",
                    color: "#3A1212",
                    textTransform: "none",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#FFB366" },
                  }}
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9966",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#FF704D" },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
