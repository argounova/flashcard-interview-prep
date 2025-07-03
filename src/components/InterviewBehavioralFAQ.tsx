import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const behavioralQuestions = [
  "Tell me about a time when you had to quickly learn a new skill to complete a project.",
  "Tell me about a time when you resolved a conflict within your team.",
  "Tell me about a time when you made a mistake at work and how you handled it.",
  "Tell me about a time when you went above and beyond your job responsibilities.",
  "Tell me about a time when you had to adapt to a significant change at work.",
  "Tell me about a time when you had to meet a tight deadline.",
  "Tell me about a time when you received constructive criticism and how you responded.",
  "Tell me about a time when you had to persuade others to see things your way.",
  "Tell me about a time when you managed multiple priorities successfully.",
  "Tell me about a time when you helped a colleague or team member succeed."
];

const InterviewBehavioralFAQ: React.FC = () => (
  <Box sx={{ maxWidth: 700, margin: '0 auto', my: 4 }}>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom color="primary.main" align="center">
          Frequently Asked Behavioral Interview Questions
        </Typography>
        <List>
          {behavioralQuestions.map((question, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <LightbulbIcon color="info" />
              </ListItemIcon>
              <ListItemText primary={question} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default InterviewBehavioralFAQ; 