'use client'

import React, { useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Group as GroupIcon,
  Public as PublicIcon,
  Phone as PhoneIcon,
  Web as WebIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Star as StarIcon,
  Handshake as HandshakeIcon,
  TrendingUp as TrendingUpIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';

const CivicPlusOverview: React.FC = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const companyMission = {
    vision: "To empower local governments to better serve their communities through innovative technology solutions",
    purpose: "Making local government more accessible, efficient, and responsive to citizen needs",
    impact: "Serving thousands of municipalities across the United States with integrated technology platforms"
  };

  const coreValues = [
    {
      title: "Innovation & Collaboration",
      description: "Bringing company vision to life through teamwork and creative problem-solving"
    },
    {
      title: "Approachable Leadership", 
      description: "Supported by transparent communication and accessible management"
    },
    {
      title: "Authenticity Welcome",
      description: "Environment where genuine personalities and diverse perspectives are valued"
    },
    {
      title: "Success Celebration",
      description: "Recognizing achievements and learning from both wins and challenges"
    },
    {
      title: "Potential Nurturing",
      description: "Commitment to employee growth and professional development"
    }
  ];

  const productSuite = [
    {
      category: "Citizen Engagement",
      icon: <GroupIcon />,
      products: [
        {
          name: "311 CRM",
          description: "Comprehensive citizen request management system for service requests, complaints, and inquiries",
          keyFeatures: ["Multi-channel request intake", "Automated routing and tracking", "Real-time status updates", "Analytics and reporting"]
        },
        {
          name: "Website Solutions",
          description: "Modern, accessible websites designed specifically for local government needs",
          keyFeatures: ["ADA compliant design", "Content management", "Online forms", "Mobile responsive"]
        }
      ]
    },
    {
      category: "Administrative Tools",
      icon: <AssignmentIcon />,
      products: [
        {
          name: "Permitting & Licensing",
          description: "Streamlined permit application, review, and approval processes",
          keyFeatures: ["Online applications", "Workflow automation", "Document management", "Fee collection"]
        },
        {
          name: "Code Enforcement",
          description: "Tools for managing code violations, inspections, and compliance tracking",
          keyFeatures: ["Case management", "Mobile inspections", "Photo documentation", "Violation tracking"]
        }
      ]
    },
    {
      category: "Financial Management",
      icon: <PaymentIcon />,
      products: [
        {
          name: "Online Payments",
          description: "Secure payment processing for taxes, utilities, permits, and fees",
          keyFeatures: ["Multiple payment methods", "PCI compliance", "Automatic receipts", "Payment plans"]
        },
        {
          name: "Utility Billing",
          description: "Comprehensive billing and customer management for municipal utilities",
          keyFeatures: ["Automated billing cycles", "Usage tracking", "Customer portal", "Payment processing"]
        }
      ]
    }
  ];

  const crm311Details = {
    overview: "CivicPlus 311 CRM is a comprehensive citizen relationship management system that helps local governments efficiently handle service requests, complaints, and inquiries from residents.",
    keyCapabilities: [
      "Multi-channel intake (phone, web, mobile app, email, social media)",
      "Automated request routing based on issue type and location",
      "Real-time tracking and status updates for citizens and staff",
      "Integration with existing municipal systems and databases",
      "Comprehensive reporting and analytics for performance metrics",
      "Mobile-friendly interface for field staff and citizens"
    ],
    businessValue: [
      "Improved citizen satisfaction through faster response times",
      "Increased government transparency with real-time status updates", 
      "Better resource allocation through data-driven insights",
      "Reduced administrative overhead with automated workflows",
      "Enhanced accountability with complete audit trails"
    ],
    dataAspects: [
      "Customer/citizen information management",
      "Service request categorization and tracking",
      "Location-based routing and assignment",
      "Historical data for trend analysis",
      "Integration with GIS systems for mapping requests",
      "Performance metrics and KPI dashboards"
    ]
  };

  const clientProfile = [
    "Small to medium-sized municipalities (1,000 - 100,000+ residents)",
    "County governments and regional authorities",
    "Special districts (water, fire, parks, etc.)",
    "Municipal utilities and public service organizations",
    "Government agencies seeking digital transformation",
    "Communities focused on improving citizen engagement"
  ];

  const competitiveAdvantages = [
    "Specialized focus on local government (not generic CRM)",
    "Integrated suite of products that work together seamlessly",
    "Deep understanding of municipal workflows and compliance requirements",
    "Strong emphasis on citizen experience and accessibility",
    "Proven track record with thousands of government clients",
    "Ongoing product development based on real municipal needs"
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        CivicPlus Company Overview
      </Typography>
      
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 3 }}>
        Empowering Local Government Through Technology
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Company Focus:</strong> CivicPlus specializes in providing integrated technology solutions 
          specifically designed for local governments to improve citizen services and operational efficiency.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Mission & Values */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ mb: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Mission & Vision
                </Typography>
              </Box>
              
              <Paper sx={{ p: 2, mb: 2, backgroundColor: 'primary.50' }}>
                <Typography variant="h6" color="primary.main" gutterBottom>Vision</Typography>
                <Typography variant="body2" paragraph>{companyMission.vision}</Typography>
                
                <Typography variant="h6" color="primary.main" gutterBottom>Purpose</Typography>
                <Typography variant="body2" paragraph>{companyMission.purpose}</Typography>
                
                <Typography variant="h6" color="primary.main" gutterBottom>Impact</Typography>
                <Typography variant="body2">{companyMission.impact}</Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ mb: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HandshakeIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Core Values
                </Typography>
              </Box>
              
              {coreValues.map((value, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `value-${index}`}
                  onChange={handleAccordionChange(`value-${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontSize: '0.95rem' }}>{value.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{value.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Product Suite */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Product Suite
                </Typography>
              </Box>
              
              {productSuite.map((category, categoryIndex) => (
                <Box key={categoryIndex} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {category.icon}
                    <Typography variant="h6" sx={{ ml: 1 }} color="info.main">
                      {category.category}
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    {category.products.map((product, productIndex) => (
                      <Grid size={{ xs: 12, md: 6 }} key={productIndex}>
                        <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                          <Typography variant="h6" gutterBottom>{product.name}</Typography>
                          <Typography variant="body2" paragraph>{product.description}</Typography>
                          <Typography variant="subtitle2" gutterBottom>Key Features:</Typography>
                          <List dense>
                            {product.keyFeatures.map((feature, featureIndex) => (
                              <ListItem key={featureIndex}>
                                <ListItemIcon>
                                  <CheckCircleIcon color="info" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={feature}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 311 CRM Deep Dive */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  311 CRM - Citizen Relationship Management
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                {crm311Details.overview}
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="h6" gutterBottom color="success.main">Key Capabilities</Typography>
                  <List dense>
                    {crm311Details.keyCapabilities.map((capability, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={capability}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="h6" gutterBottom color="warning.main">Business Value</Typography>
                  <List dense>
                    {crm311Details.businessValue.map((value, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <TrendingUpIcon color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={value}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="h6" gutterBottom color="info.main">Data Management Aspects</Typography>
                  <List dense>
                    {crm311Details.dataAspects.map((aspect, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <SecurityIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={aspect}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Client Profile */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PublicIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Client Profile
                </Typography>
              </Box>
              <List dense>
                {clientProfile.map((client, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={client}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VerifiedIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Competitive Advantages
                </Typography>
              </Box>
              <List dense>
                {competitiveAdvantages.map((advantage, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={advantage}
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

      {/* Data Specialist Relevance */}
      <Card sx={{ backgroundColor: 'success.50' }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom color="success.main">
            💡 Relevance for Data Specialist Role
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom color="success.main">Data Integration Needs</Typography>
                <Typography variant="body2">
                  Municipal clients often need to migrate data between legacy systems and CivicPlus products. 
                  Understanding the product suite helps in planning effective data migrations.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom color="success.main">311 CRM Data Flows</Typography>
                <Typography variant="body2">
                  The 311 system requires citizen data, service categories, location information, and historical 
                  request data - all areas where a Data Specialist plays a crucial role.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom color="success.main">Mission Alignment</Typography>
                <Typography variant="body2">
                  Your data work directly supports CivicPlus's mission of improving citizen services and 
                  government efficiency through reliable, accurate data systems.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Interview Talking Points */}
      <Card sx={{ mt: 3, backgroundColor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom color="primary.main">
            🎯 Key Interview Talking Points
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Mission Driven" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  "I'm excited about CivicPlus's mission to improve citizen services through technology"
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Product Understanding" color="info" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  "I understand how data migration supports products like the 311 CRM system"
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Values Alignment" color="success" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  "Your values of authenticity and collaboration really resonate with me"
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CivicPlusOverview;