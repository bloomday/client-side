import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Box,
  Tab,
  Tabs,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
} from '@mui/material';
import { Edit, Event, PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data - replace with API call
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://source.unsplash.com/random/150x150/?portrait',
  bio: 'Event enthusiast and organizer with a passion for creating memorable experiences.',
  location: 'New York, NY',
  phone: '+1 (555) 123-4567',
};

const mockUserEvents = [
  {
    id: 1,
    title: 'Summer Beach Party',
    date: '2024-07-20',
    image: 'https://source.unsplash.com/random/400x200/?beach-party',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Tech Meetup',
    date: '2024-06-15',
    image: 'https://source.unsplash.com/random/400x200/?technology',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Art Exhibition',
    date: '2024-05-10',
    image: 'https://source.unsplash.com/random/400x200/?art',
    status: 'past',
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    setIsEditing(false);
  };

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={userData.avatar}
                sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }}
              />
              <Button
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: -8,
                  minWidth: 'auto',
                  p: '8px',
                  borderRadius: '50%',
                }}
              >
                <input type="file" hidden accept="image/*" />
                <PhotoCamera />
              </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
              {userData.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {userData.location}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {userData.bio}
            </Typography>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Profile Details" />
              <Tab label="My Events" />
            </Tabs>

            {/* Profile Details Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleEditSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                      <Button
                        startIcon={<Edit />}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={userData.name}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={userData.email}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={userData.phone}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={userData.location}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={4}
                      value={userData.bio}
                      disabled={!isEditing}
                    />
                  </Grid>
                  {isEditing && (
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </TabPanel>

            {/* My Events Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {mockUserEvents.map((event) => (
                  <Grid item xs={12} sm={6} key={event.id}>
                    <Card>
                      <CardActionArea onClick={() => handleEventClick(event.id)}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={event.image}
                          alt={event.title}
                        />
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography gutterBottom variant="h6" component="div">
                              {event.title}
                            </Typography>
                            <Chip
                              label={event.status}
                              color={event.status === 'upcoming' ? 'primary' : 'default'}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.date).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 