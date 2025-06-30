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
} from '@mui/material';
import {
  Map as MapIcon,
  LocationOn as LocationOnIcon,
  Layers as LayersIcon,
  Storage as StorageIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Traffic as TrafficIcon,
  Park as ParkIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const GeospatialDataOverview: React.FC = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const geospatialBasics = [
    {
      title: "What is Geospatial Data?",
      description: "Data that contains geographic or location information, typically including coordinates (latitude/longitude) that can be mapped and analyzed spatially."
    },
    {
      title: "Common Data Types",
      description: "Points (addresses, facilities), Lines (roads, utilities), Polygons (property boundaries, districts), and Raster data (satellite imagery, elevation maps)."
    },
    {
      title: "Key Technologies",
      description: "GIS (Geographic Information Systems), GPS coordinates, mapping software, spatial databases like PostGIS, and file formats like Shapefiles and KML."
    }
  ];

  const municipalUseCase = [
    {
      icon: <HomeIcon />,
      title: "Property & Parcels",
      description: "Property boundaries, tax assessments, zoning information",
      migrationExample: "Import property parcel data from CAD files or Shapefiles into GIS database"
    },
    {
      icon: <TrafficIcon />,
      title: "Infrastructure",
      description: "Roads, water lines, sewer systems, utility networks",
      migrationExample: "Migrate utility network data from legacy CAD systems to modern GIS platforms"
    },
    {
      icon: <BusinessIcon />,
      title: "Permits & Licensing",
      description: "Building permits, business licenses tied to specific locations",
      migrationExample: "Link permit records to property parcels using address geocoding"
    },
    {
      icon: <ParkIcon />,
      title: "Public Services",
      description: "Parks, emergency services, voting districts, school zones",
      migrationExample: "Update service district boundaries from paper maps to digital polygons"
    }
  ];

  const commonChallenges = [
    "Coordinate system mismatches between different data sources",
    "Data quality issues with incomplete or inaccurate location information", 
    "Large file sizes requiring efficient processing and storage",
    "Converting between different geospatial file formats",
    "Maintaining spatial relationships during data migration",
    "Geocoding addresses to coordinate points"
  ];

  const technicalSkills = [
    {
      category: "File Formats",
      skills: ["Shapefile (.shp)", "KML/KMZ", "GeoJSON", "CSV with coordinates", "CAD files (DWG/DXF)"]
    },
    {
      category: "Database Skills", 
      skills: ["PostGIS (PostgreSQL extension)", "Spatial indexes", "Coordinate reference systems", "Spatial queries", "Geometry vs Geography types"]
    },
    {
      category: "Tools & Software",
      skills: ["QGIS (open source)", "ArcGIS", "PostGIS", "GDAL/OGR", "Online mapping APIs"]
    }
  ];

  const civicPlusRelevance = [
    "Municipal clients often have decades of legacy spatial data in various formats",
    "Property tax systems heavily rely on accurate parcel boundary information",
    "Public service delivery requires location-based data analysis",
    "Citizens expect online maps and location-based services from their government",
    "Data migration projects often involve converting CAD drawings to modern GIS formats",
    "Integration between spatial databases and business applications is crucial"
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Geospatial Data Overview
      </Typography>
      
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 3 }}>
        Understanding Geographic Data for Municipal Systems
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>CivicPlus Context:</strong> The job description mentions "familiarity with Geospatial data and map configuration" 
          because many municipal clients use location-based data for property management, public services, and citizen applications.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Basics */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MapIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Geospatial Fundamentals
                </Typography>
              </Box>
              
              {geospatialBasics.map((basic, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `basic-${index}`}
                  onChange={handleAccordionChange(`basic-${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>{basic.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{basic.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LightbulbIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Common Migration Challenges
                </Typography>
              </Box>
              <List dense>
                {commonChallenges.map((challenge, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={challenge}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Municipal Use Cases */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Municipal Applications
                </Typography>
              </Box>
              
              {municipalUseCase.map((useCase, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {useCase.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {useCase.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    {useCase.description}
                  </Typography>
                  <Typography variant="body2" color="primary.main" fontStyle="italic">
                    <strong>Migration Example:</strong> {useCase.migrationExample}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Technical Skills Section */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Technical Skills & Tools
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {technicalSkills.map((skillCategory, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Typography variant="h6" gutterBottom color="info.main">
                      {skillCategory.category}
                    </Typography>
                    <List dense>
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <ListItem key={skillIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={skill}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* CivicPlus Relevance */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ backgroundColor: 'primary.50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LayersIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3" color="primary.main">
                  Why Geospatial Data Matters for CivicPlus
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                {civicPlusRelevance.map((relevance, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                        <Typography variant="body2">{relevance}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sample SQL Examples */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3">
                  Basic Spatial SQL Examples
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>Finding Properties by Location:</Typography>
                  <Paper sx={{ p: 2, backgroundColor: 'grey.100', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`-- Find all properties within 1000 meters of a point
SELECT property_id, owner_name, address
FROM parcels 
WHERE ST_DWithin(
  geometry, 
  ST_MakePoint(-95.123, 39.456, 4326), 
  1000
);`}
                    </pre>
                  </Paper>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>Calculating Areas:</Typography>
                  <Paper sx={{ p: 2, backgroundColor: 'grey.100', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`-- Calculate property area in square feet
SELECT 
  property_id,
  ST_Area(ST_Transform(geometry, 3857)) * 10.764 as area_sqft
FROM parcels
WHERE zoning = 'Residential';`}
                    </pre>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Key Takeaways */}
      <Card sx={{ mt: 3, backgroundColor: 'success.50' }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom color="success.main">
            💡 Key Takeaways for Interview
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Data Migration Focus" color="success" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Converting legacy spatial data (CAD, Shapefiles) to modern formats
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Municipal Context" color="info" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Property parcels, infrastructure, and public services all use location data
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label="Integration Challenges" color="warning" sx={{ mb: 1 }} />
                <Typography variant="body2">
                  Coordinate systems, file formats, and data quality are common issues
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GeospatialDataOverview;