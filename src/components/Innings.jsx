import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TOTAL_INNINGS = 6;

export default function Innings() {
  const [visitorScores, setVisitorScores] = useState(Array(TOTAL_INNINGS).fill(0));
  const [homeScores, setHomeScores] = useState(Array(TOTAL_INNINGS).fill(0));
  const [visitorOuts, setVisitorOuts] = useState(Array(TOTAL_INNINGS).fill(0));
  const [homeOuts, setHomeOuts] = useState(Array(TOTAL_INNINGS).fill(0));

  const handleScoreChange = (team, inningIndex, delta) => {
    const updateScores = (scores) =>
      scores.map((score, i) => (i === inningIndex ? Math.max(0, score + delta) : score));

    if (team === 'visitor') {
      setVisitorScores(updateScores(visitorScores));
    } else {
      setHomeScores(updateScores(homeScores));
    }
  };

  const toggleOut = (team, inningIndex, outIndex) => {
    const updateOuts = (outs) =>
      outs.map((count, i) => {
        if (i === inningIndex) {
          return count === outIndex + 1 ? outIndex : outIndex + 1;
        }
        return count;
      });

    if (team === 'visitor') {
      setVisitorOuts(updateOuts(visitorOuts));
    } else {
      setHomeOuts(updateOuts(homeOuts));
    }
  };

  const getOutCircles = (count, team, inningIndex) => (
    <Box display="flex" gap={0.5} justifyContent="center">
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          onClick={() => toggleOut(team, inningIndex, i)}
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: i < count ? 'red' : 'transparent',
            border: '1px solid',
            cursor: 'pointer',
          }}
        />
      ))}
    </Box>
  );

  const visitorTotal = visitorScores.reduce((sum, val) => sum + val, 0);
  const homeTotal = homeScores.reduce((sum, val) => sum + val, 0);

  const resetGame = () => {
    setVisitorScores(Array(TOTAL_INNINGS).fill(0));
    setHomeScores(Array(TOTAL_INNINGS).fill(0));
    setVisitorOuts(Array(TOTAL_INNINGS).fill(0));
    setHomeOuts(Array(TOTAL_INNINGS).fill(0));
  };

  return (
    <Box sx={{ maxWidth: 700, margin: 'auto', mt: 4, p: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Inning</TableCell>
              <TableCell align="center">Visitor</TableCell>
              <TableCell align="center">Home</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: TOTAL_INNINGS }, (_, i) => (
              <TableRow key={i}>
                <TableCell align="center">{i + 1}</TableCell>

                {/* Visitor Column */}
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <IconButton size="small" onClick={() => handleScoreChange('visitor', i, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Box minWidth={20} textAlign="center">
                      {visitorScores[i]}
                    </Box>
                    <IconButton size="small" onClick={() => handleScoreChange('visitor', i, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {getOutCircles(visitorOuts[i], 'visitor', i)}
                </TableCell>

                {/* Home Column */}
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <IconButton size="small" onClick={() => handleScoreChange('home', i, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Box minWidth={20} textAlign="center">
                      {homeScores[i]}
                    </Box>
                    <IconButton size="small" onClick={() => handleScoreChange('home', i, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {getOutCircles(homeOuts[i], 'home', i)}
                </TableCell>
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow>
              <TableCell align="center"><strong>Total</strong></TableCell>
              <TableCell align="center"><strong>{visitorTotal}</strong></TableCell>
              <TableCell align="center"><strong>{homeTotal}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reset Button */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="outlined" color="error" onClick={resetGame}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
