import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Modal,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState("");

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleModalOpen = (page) => setModalOpen(page);
  const handleModalClose = () => setModalOpen("");

    const navigate = useNavigate();

  const siteURL = "https://gamezone.example.com";

  return (
    <>
   
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #4a148c, #880e4f)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <Toolbar>
     
          <GamepadIcon sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontFamily: "monospace" }}>
            GameZone
          </Typography>
 
   
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            <Tooltip title="Back to Home page"> 
<Button
                color="inherit"
               
              onClick={() => navigate("/")}
              >
                Home
              </Button>
              </Tooltip>
            <Tooltip title="About this site">
              <Button
                color="inherit"
                startIcon={<InfoIcon />}
                onClick={() => handleModalOpen("About")}
              >
                
              </Button>
            </Tooltip>
            <Tooltip title="Share with friends">
              <Button
                color="inherit"
                startIcon={<ShareIcon />}
                onClick={() => handleModalOpen("Share")}
              >
               
              </Button>
            </Tooltip>
          </Box>
 
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

    
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["About", "Share"].map((text) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  handleModalOpen(text);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
 
      <Modal open={!!modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            width: { xs: "90%", sm: "60%", md: "40%" },
          }}
        >
          <Typography variant="h5" gutterBottom>
            {modalOpen}
          </Typography>

          {modalOpen === "About" && (
            <Typography>
              Welcome to <strong>GameZone</strong> 
            </Typography>
          )}

          {modalOpen === "Share" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>Share this site with your friends:</Typography>
              <Typography
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: "8px",
                  borderRadius: 1,
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                }}
              >
                {siteURL}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(siteURL);
                  alert("Link copied to clipboard!");
                }}
              >
                Copy Link
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
