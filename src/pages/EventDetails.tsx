import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  CalendarMonth,
  LocationOn,
  People,
  AttachMoney,
  Share,
} from '@mui/icons-material';

// Mock data - replace with API call
const mockEvent = {
  id: 1,
  title: 'Summer Music Festival',
  description: 'A three-day music festival featuring top artists from around the world. Join us for an unforgettable experience with live performances, food vendors, and amazing atmosphere.',
  date: '2024-07-15',
  location: 'Central Park, NY',
  image: 'https://source.unsplash.com/random/1200x400/?concert',
  category: 'Music',
  ticketPrice: 150,
  maxAttendees: 1000,
  currentAttendees: 750,
  organizer: 'EventPro Productions',
  schedule: [
    { time: '12:00 PM', activity: 'Gates Open' },
    { time: '1:00 PM', activity: 'Opening Act' },
    { time: '3:00 PM', activity: 'Main Performance' },
    { time: '6:00 PM', activity: 'Headline Show' },
    { time: '10:00 PM', activity: 'Closing Ceremony' },
  ],
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTicketPurchase = () => {
    // TODO: Implement ticket purchase logic
    setShowTicketDialog(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <Box>
      {/* Hero Image */}
      <Box
        sx={{
          height: 400,
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${mockEvent.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Chip label={mockEvent.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h2" component="h1" color="white" gutterBottom>
            {mockEvent.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonth />
              <Typography>
                {new Date(mockEvent.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn />
              <Typography>{mockEvent.location}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Tickets purchased successfully! Check your email for confirmation.
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                About This Event
              </Typography>
              <Typography paragraph>{mockEvent.description}</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Schedule
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockEvent.schedule.map((item) => (
                  <Box
                    key={item.time}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ width: 100 }}>
                      {item.time}
                    </Typography>
                    <Typography>{item.activity}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <People />
                  <Typography>
                    {mockEvent.currentAttendees} / {mockEvent.maxAttendees} attending
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney />
                  <Typography>${mockEvent.ticketPrice} per ticket</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setShowTicketDialog(true)}
                >
                  Get Tickets
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Share />}
                >
                  Share Event
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Organizer
              </Typography>
              <Typography>{mockEvent.organizer}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Ticket Purchase Dialog */}
      <Dialog open={showTicketDialog} onClose={() => setShowTicketDialog(false)}>
        <DialogTitle>Purchase Tickets</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Number of Tickets"
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <Typography sx={{ mt: 2 }}>
              Total: ${(ticketCount * mockEvent.ticketPrice).toFixed(2)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTicketDialog(false)}>Cancel</Button>
          <Button onClick={handleTicketPurchase} variant="contained">
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventDetails; 