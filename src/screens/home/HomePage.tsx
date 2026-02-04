import { Box, Paper, Stack, Typography } from '@mui/material'

export function HomePage() {
  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Home
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            This is your authenticated home page. You can add more pages to the
            main content area later and plug them into the router.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  )
}

