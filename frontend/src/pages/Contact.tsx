import React, { useState } from 'react';
import {
  Container, Typography, Grid, TextField, Button, Box, Card, CardContent, Avatar, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { Send, Facebook, Twitter, Instagram, Email, LocationOn } from '@mui/icons-material';

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Have any questions, feedback, or want to get in touch? We'd love to hear from you!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card sx={{ p: 4, mt: 4 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    type="submit"
                    sx={{
                      transition: 'background-color 0.3s ease',
                      ':hover': { backgroundColor: '#1769aa' },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Box sx={{ mt: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ m: 'auto', bgcolor: 'primary.main' }}>
                    <Email />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Email Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    mohityadav0330@gmail.com.com
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ m: 'auto', bgcolor: 'primary.main' }}>
                    <LocationOn />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Visit Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mahendergarh,Haryana
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Social Media */}
            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton color="primary" href="https://facebook.com">
                      <Facebook />
                    </IconButton>
                    <IconButton color="primary" href="https://twitter.com">
                      <Twitter />
                    </IconButton>
                    <IconButton color="primary" href="https://instagram.com">
                      <Instagram />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ContactUsPage;