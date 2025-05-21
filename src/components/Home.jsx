import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const games = [
  {
    title: "XO Game",
    image: "https://i.pinimg.com/736x/b7/db/8c/b7db8c06b599a1386c5a82b2d03be4fc.jpg",
    path: "/xo",
  },
  {
    title: "Safrgt",
    image: "https://i.pinimg.com/736x/69/70/6f/69706f010436b43119db06d8f9b15d9d.jpg",
    path: "/safrgt",
  },
  
    {
    title: "Rock Paper Scissors",
    image: "https://i.pinimg.com/736x/ed/d4/35/edd4354ca9af697d8d1bd976b388ece2.jpg",  
    path: "/RPS",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Choose a Game to Play 🎮
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.title}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 6,
                background: "linear-gradient(135deg, #f3e5f5, #ede7f6)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={game.image}
                alt={game.title}
                sx={{ objectFit: "contain"   }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {game.title}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => navigate(game.path)}
                >
                  Play Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
