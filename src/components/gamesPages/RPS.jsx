import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Paper,
  Stack,
  ButtonBase,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const choices = [
  { label: 'حجر', icon: '✊' },
  { label: 'ورقة', icon: '🤚' },
  { label: 'مقص', icon: '✌️' },
];

const getResult = (player, computer) => {
  if (player === computer) return 'تعادل';
  if (
    (player === 'حجر' && computer === 'مقص') ||
    (player === 'ورقة' && computer === 'حجر') ||
    (player === 'مقص' && computer === 'ورقة')
  )
    return 'فزت';
  return 'خسرت';
};

const RPS = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * 3)].label;
    const outcome = getResult(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(outcome);

    if (outcome === 'فزت') setScore(score + 1);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'sky.50' }}>
      
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          backdropFilter: 'blur(10px)',
          color: 'black',
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            حجر - ورقة - مقص 🎮
          </Typography>
        </Toolbar>
      </AppBar>

    
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="primary" gutterBottom>
              اختر حركتك:
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mb: 3 }}
              flexWrap="wrap"
            >
              {choices.map(({ label, icon }) => (
                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} key={label}>
                  <ButtonBase
                    onClick={() => handleChoice(label)}
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      bgcolor: '#0288d1',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: 4,
                      transition: '0.3s',
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>{icon}</span>
                
                  </ButtonBase>
                </motion.div>
              ))}
            </Stack>

            <AnimatePresence>
              {result && (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography variant="body1" gutterBottom>
                    اختيارك: <strong>{playerChoice}</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    اختيار الكمبيوتر: <strong>{computerChoice}</strong>
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        result === 'فزت'
                          ? 'green'
                          : result === 'خسرت'
                          ? 'red'
                          : 'orange',
                      fontWeight: 'bold',
                      my: 2,
                    }}
                  >
                    {result}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    النقاط: {score}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RPS;
