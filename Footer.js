import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#fbf6f6">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', color: '#3A1212', fontSize: { lg: '32px', xs: '24px' } }}
      >
        FlexCoach
      </Typography>
    </Stack>
    <Typography 
      variant="h5" 
      sx={{ fontSize: { lg: '28px', xs: '20px' } }} 
      mt="41px" 
      textAlign="center" 
      pb="40px"
    >
      Push harder than yesterday if you want a different tomorrow
    </Typography>
  </Box>
);

export default Footer;
