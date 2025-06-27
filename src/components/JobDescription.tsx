import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  Storage as StorageIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const JobDescriptionHighlights: React.FC = () => {
  const companyHighlights = [
    "Strive to bring company vision to life through innovation and collaboration",
    "Supported by approachable leadership and transparent communication",
    "Empowered to make an impact on local government and residents they serve",
    "Grow your career alongside great people where authenticity is welcome",
    "Successes are celebrated and potential is nurtured"
  ];

  const coreResponsibilities = [
    "Migrating, configuring and maintaining customer data",
    "Supporting the Implementation process",
    "Managing specific customer requests",
    "Updating data timely and accurately with minimal errors",
    "Continual overall process improvement and development of training",
    "Efficiently managing large volume of incoming information",
    "Delivering high quality results while undertaking multiple responsibilities"
  ];

  const technicalRequirements = [
    "Intermediate knowledge and understanding of SQL",
    "Familiarity with Geospatial data and map configuration", 
    "Familiarity with Data Migration processes from various sources",
    "Experience with databases, CSV's, Spatial Files, API's"
  ];

  const softSkillRequirements = [
    "Problem solver that thrives on challenges without predetermined solutions",
    "Ability to take initiative to learn and develop skillset",
    "Comfortable with performing self QA/QC to ensure high quality work",
    "Ability to identify and build tools and processes for efficiency",
    "Work with implementation consultants to align data migration efforts"
  ];

  const keyMetrics = [
    "Process requests within established time frame based on request type",
    "Ensure project progress meets original timeline expectations at least 80% of the time",
    "Develop or coordinate development of tools to enhance migration process",
    "Active and consistent reporting of progress to Implementation Manager",
    "High-level understanding of how CivicPlus products work together"
  ];

  const benefits = [
    "Salary Range: $47,400 - $65,400 annually",
    "Comprehensive health insurance",
    "Dental insurance", 
    "Vision insurance",
    "Flexible Time Off",
    "401(k) plan",
    "And more benefits"
  ];

  const careerOpportunities = [
    "Great entry-level position for project management interest",
    "Excellent pathway for technical consulting",
    "Opportunity for training and development",
    "Team-driven environment with collaborative team",
    "Commitment to providing equal employment opportunities"
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Data Specialist Role at CivicPlus
      </Typography>
      
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Key Highlights & Responsibilities
      </Typography>

      <Grid container spacing={3}>
        {/* Company Culture */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  About CivicPlus
                </Typography>
              </Box>
              <List dense>
                {companyHighlights.map((highlight, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={highlight}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Core Responsibilities */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Core Responsibilities
                </Typography>
              </Box>
              <List dense>
                {coreResponsibilities.map((responsibility, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={responsibility}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Technical Requirements */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Technical Skills
                </Typography>
              </Box>
              <List dense>
                {technicalRequirements.map((requirement, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <StorageIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={requirement}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Soft Skills */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Soft Skills & Mindset
                </Typography>
              </Box>
              <List dense>
                {softSkillRequirements.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={skill}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Key Performance Expectations
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {keyMetrics.map((metric, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Paper sx={{ p: 2, backgroundColor: 'warning.50' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircleIcon color="warning" fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                        <Typography variant="body2">{metric}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Compensation & Benefits */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Compensation & Benefits
                </Typography>
              </Box>
              <List dense>
                {benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        fontWeight: index === 0 ? 'bold' : 'normal'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Career Growth */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Career Opportunities
                </Typography>
              </Box>
              <List dense>
                {careerOpportunities.map((opportunity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={opportunity}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Key Highlights Summary */}
      <Card sx={{ backgroundColor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom color="primary.main">
            💡 Role Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="80% Timeline Success" color="warning" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Meet project timeline expectations at least 80% of the time
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Entry-Level Growth" color="success" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Great stepping stone to project management and technical consulting
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Collaborative Environment" color="info" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Work closely with implementation consultants and clients
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDescriptionHighlights;