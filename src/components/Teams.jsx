import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material'

export default function Teams() {
  const [visitorTeams, setVisitorTeams] = useState([])
  const [homeTeams, setHomeTeams] = useState([])

  const [visitorInput, setVisitorInput] = useState('')
  const [homeInput, setHomeInput] = useState('')

  const addVisitorTeam = () => {
    if (visitorInput.trim() !== '') {
      setVisitorTeams([...visitorTeams, visitorInput.trim()])
      setVisitorInput('')
    }
  }

  const addHomeTeam = () => {
    if (homeInput.trim() !== '') {
      setHomeTeams([...homeTeams, homeInput.trim()])
      setHomeInput('')
    }
  }

  const clearTeams = () => {
    setVisitorTeams([])
    setHomeTeams([])
  }

  const handleVisitorKeyDown = (e) => {
    if (e.key === 'Enter') addVisitorTeam()
  }

  const handleHomeKeyDown = (e) => {
    if (e.key === 'Enter') addHomeTeam()
  }

  const maxRows = Math.max(visitorTeams.length, homeTeams.length)

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="teams table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Visitors</TableCell>
              <TableCell align="center">Home</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(maxRows)].map((_, i) => (
              <TableRow key={i}>
                <TableCell align="center">{visitorTeams[i] || ''}</TableCell>
                <TableCell align="center">{homeTeams[i] || ''}</TableCell>
              </TableRow>
            ))}

            {/* Input row */}
            <TableRow>
              <TableCell align="center">
                <TextField
                  label="Add Visitor"
                  variant="outlined"
                  size="small"
                  value={visitorInput}
                  onChange={(e) => setVisitorInput(e.target.value)}
                  onKeyDown={handleVisitorKeyDown}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addVisitorTeam}
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Add
                </Button>
              </TableCell>

              <TableCell align="center">
                <TextField
                  label="Add Home"
                  variant="outlined"
                  size="small"
                  value={homeInput}
                  onChange={(e) => setHomeInput(e.target.value)}
                  onKeyDown={handleHomeKeyDown}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addHomeTeam}
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Clear Button */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={clearTeams}
        >
          Clear Teams
        </Button>
      </Box>
    </Box>
  )
}
