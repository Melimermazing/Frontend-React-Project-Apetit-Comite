import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HeaderLogo from "../../assets/HEADER_LOGO.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { getProfile } from "../../Services/userServices";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const adminPages = [
    {
      title: "ADD NEW RECIPE",
      fun: async () => {
        navigate("/home/recipes/admin");
      },
    },
  ];

  const pages = [
    {
      title: "HOME",
      fun: () => {
        navigate("/home");
      },
    },
    {
      title: "ALL RECIPES",
      fun: () => {
        navigate("/home/recipes");
      },
    },
    {
      title: "MEAL PLANNER",
      fun: () => {
        navigate("/home/menuplanner");
      },
    },
    {
      title: "BY DIET",
      fun: () => {
        navigate("/home/search");
      },
    },
  ];

  const settings = [
    {
      title: "PROFILE",
      fun: () => {
        navigate("/home/me");
      },
    },
    {
      title: "LOGOUT",
      fun: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  useEffect(() => {
    const myUser = async () => {
      const result = await getProfile();
      setUser(result);
    };

    myUser();
  }, []);

  return (
    <AppBar position="static" sx={{ background: "#FDDA04", color: "black" }}>
      <Container maxWidth="x2">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem key={idx} onClick={page.fun}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              {user?.role === "admin" &&
                adminPages.map((page, idx) => (
                  <MenuItem key={idx} onClick={page.fun}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <div className="iconContainer">
            <img className="icon" src={HeaderLogo} />
          </div>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Button
                key={idx}
                onClick={page.fun}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.title}
              </Button>
            ))}

            {user?.role === "admin" &&
              adminPages.map((page, idx) => (
                <Button
                  key={idx}
                  onClick={page.fun}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.title}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={setting.fun}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
