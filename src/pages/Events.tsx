import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Chip,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Mock data - replace with API call later
const mockEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    description: 'A three-day music festival featuring top artists from around the world.',
    date: '2024-07-15',
    location: 'Central Park, NY',
    image: 'https://source.unsplash.com/random/800x600/?concert',
    category: 'Music',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    description: 'Annual technology conference with industry leaders and innovators.',
    date: '2024-09-20',
    location: 'Convention Center, SF',
    image: 'https://source.unsplash.com/random/800x600/?technology',
    category: 'Conference',
  },
  {
    id: 3,
    title: 'Food & Wine Festival',
    description: 'Celebrate the finest cuisines and wines from around the globe.',
    date: '2024-08-05',
    location: 'Downtown Food District',
    image: 'https://source.unsplash.com/random/800x600/?food-wine',
    category: 'Food',
  },
  {
    id: 4,
    title: 'Wedding Expo',
    description: 'Everything you need to plan your perfect wedding day.',
    date: '2024-06-10',
    location: 'Grand Hotel',
    image: 'https://source.unsplash.com/random/800x600/?wedding',
    category: 'Wedding',
  },
];

const categories = ['All', 'Music', 'Conference', 'Food', 'Wedding', 'Sports', 'Art'];

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Discover Events
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={4}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardActionArea onClick={() => handleEventClick(event.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Chip label={event.category} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {event.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No events found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events; 