'use client'

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
  Tab,
  Tabs,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CloudUpload as CloudUploadIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  DataObject as DataObjectIcon,
  Transform as TransformIcon,
  Storage as StorageIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Api as ApiIcon,
  Map as MapIcon,
} from '@mui/icons-material';

interface MigrationExample {
  title: string;
  description: string;
  code: string;
  category: 'csv' | 'database' | 'api' | 'geospatial';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`migration-tabpanel-${index}`}
      aria-labelledby={`migration-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const DataMigrationComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const migrationExamples: MigrationExample[] = [
    {
      title: "Basic CSV Import",
      description: "Import CSV data into PostgreSQL with proper data type handling",
      code: `-- Create target table with appropriate data types
CREATE TABLE customer_data (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    registration_date DATE,
    is_active BOOLEAN DEFAULT true,
    customer_since TIMESTAMP,
    annual_revenue DECIMAL(10,2)
);

-- Import CSV using COPY command
COPY customer_data (first_name, last_name, email, phone, registration_date, annual_revenue)
FROM '/path/to/customers.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',', NULL '');

-- Verify import and check data quality
SELECT 
    COUNT(*) as total_records,
    COUNT(DISTINCT email) as unique_emails,
    COUNT(*) - COUNT(email) as missing_emails,
    MIN(registration_date) as earliest_date,
    MAX(registration_date) as latest_date
FROM customer_data;`,
      category: 'csv',
      difficulty: 'beginner'
    },
    {
      title: "CSV Data Validation & Cleaning",
      description: "Handle data quality issues during CSV migration",
      code: `-- Create staging table for raw CSV data
CREATE TABLE customer_staging (
    raw_id TEXT,
    raw_first_name TEXT,
    raw_last_name TEXT,
    raw_email TEXT,
    raw_phone TEXT,
    raw_date TEXT,
    raw_revenue TEXT
);

-- Import all data as text first
COPY customer_staging FROM '/path/to/customers.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Clean and validate data during insert
INSERT INTO customer_data (first_name, last_name, email, phone, registration_date, annual_revenue)
SELECT 
    TRIM(INITCAP(raw_first_name)) as first_name,
    TRIM(INITCAP(raw_last_name)) as last_name,
    LOWER(TRIM(raw_email)) as email,
    REGEXP_REPLACE(raw_phone, '[^0-9]', '', 'g') as phone,
    CASE 
        WHEN raw_date ~ '^\\d{4}-\\d{2}-\\d{2}$' THEN raw_date::DATE
        WHEN raw_date ~ '^\\d{2}/\\d{2}/\\d{4}$' THEN TO_DATE(raw_date, 'MM/DD/YYYY')
        ELSE NULL 
    END as registration_date,
    CASE 
        WHEN raw_revenue ~ '^\\$?[0-9,]+\\.?[0-9]*$' 
        THEN REPLACE(REPLACE(raw_revenue, '$', ''), ',', '')::DECIMAL(10,2)
        ELSE NULL 
    END as annual_revenue
FROM customer_staging
WHERE raw_email IS NOT NULL 
  AND raw_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';

-- Generate data quality report
SELECT 
    'Total raw records' as metric, COUNT(*)::TEXT as value FROM customer_staging
UNION ALL
SELECT 'Successfully migrated', COUNT(*)::TEXT FROM customer_data
UNION ALL
SELECT 'Invalid emails', COUNT(*)::TEXT 
FROM customer_staging 
WHERE raw_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
UNION ALL
SELECT 'Invalid dates', COUNT(*)::TEXT 
FROM customer_staging 
WHERE raw_date IS NOT NULL AND raw_date !~ '^\\d{4}-\\d{2}-\\d{2}$|^\\d{2}/\\d{2}/\\d{4}$';`,
      category: 'csv',
      difficulty: 'intermediate'
    },
    {
      title: "Complex CSV with Relationships",
      description: "Handle CSV files with foreign key relationships and lookups",
      code: `-- Import orders CSV with customer references
CREATE TABLE orders_staging (
    order_id TEXT,
    customer_email TEXT,
    product_sku TEXT,
    quantity TEXT,
    order_date TEXT,
    order_total TEXT
);

COPY orders_staging FROM '/path/to/orders.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Create final orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customer_data(id),
    product_sku VARCHAR(50),
    quantity INTEGER,
    order_date DATE,
    order_total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert with customer lookup and data validation
INSERT INTO orders (customer_id, product_sku, quantity, order_date, order_total)
SELECT 
    c.id as customer_id,
    UPPER(TRIM(os.product_sku)) as product_sku,
    os.quantity::INTEGER,
    TO_DATE(os.order_date, 'YYYY-MM-DD'),
    REPLACE(os.order_total, '$', '')::DECIMAL(10,2)
FROM orders_staging os
JOIN customer_data c ON c.email = LOWER(TRIM(os.customer_email))
WHERE os.quantity ~ '^[0-9]+$'
  AND os.order_total ~ '^\\$?[0-9]+\\.?[0-9]*$'
  AND os.order_date ~ '^\\d{4}-\\d{2}-\\d{2}$';

-- Report on orphaned records
SELECT 
    COUNT(*) as orphaned_orders,
    STRING_AGG(DISTINCT customer_email, ', ') as missing_customers
FROM orders_staging os
LEFT JOIN customer_data c ON c.email = LOWER(TRIM(os.customer_email))
WHERE c.id IS NULL;`,
      category: 'csv',
      difficulty: 'advanced'
    },
    {
      title: "Database-to-Database Migration",
      description: "Migrate data between different database systems",
      code: `-- Create foreign data wrapper for source database
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- Create server connection
CREATE SERVER legacy_db
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host 'legacy-server.com', port '5432', dbname 'old_system');

-- Create user mapping
CREATE USER MAPPING FOR current_user
SERVER legacy_db
OPTIONS (user 'migration_user', password 'secure_password');

-- Create foreign table
CREATE FOREIGN TABLE legacy_customers (
    customer_id INTEGER,
    full_name VARCHAR(100),
    email_address VARCHAR(100),
    created_date TIMESTAMP,
    status_code INTEGER
) SERVER legacy_db
OPTIONS (schema_name 'public', table_name 'customers');

-- Migrate with transformation
INSERT INTO customer_data (first_name, last_name, email, registration_date, is_active)
SELECT 
    SPLIT_PART(full_name, ' ', 1) as first_name,
    CASE 
        WHEN ARRAY_LENGTH(STRING_TO_ARRAY(full_name, ' '), 1) > 1 
        THEN ARRAY_TO_STRING(STRING_TO_ARRAY(full_name, ' ')[2:], ' ')
        ELSE ''
    END as last_name,
    LOWER(email_address) as email,
    created_date::DATE as registration_date,
    CASE WHEN status_code = 1 THEN true ELSE false END as is_active
FROM legacy_customers
WHERE email_address IS NOT NULL
  AND email_address ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';

-- Migration verification
SELECT 
    'Legacy system count' as source, COUNT(*)::TEXT as count 
FROM legacy_customers
UNION ALL
SELECT 'Migrated count', COUNT(*)::TEXT 
FROM customer_data 
WHERE registration_date >= (SELECT MIN(created_date::DATE) FROM legacy_customers);`,
      category: 'database',
      difficulty: 'intermediate'
    },
    {
      title: "API Data Integration",
      description: "Extract and migrate data from REST APIs",
      code: `-- Create table for API data
CREATE TABLE api_locations (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    address JSONB,
    coordinates POINT,
    metadata JSONB,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to process API response (would be called from application code)
CREATE OR REPLACE FUNCTION process_api_location(api_data JSONB)
RETURNS INTEGER AS $$
DECLARE
    location_id INTEGER;
BEGIN
    INSERT INTO api_locations (
        external_id, 
        name, 
        address, 
        coordinates, 
        metadata
    )
    VALUES (
        api_data->>'id',
        api_data->>'name',
        api_data->'address',
        POINT(
            (api_data->'coordinates'->>'longitude')::FLOAT,
            (api_data->'coordinates'->>'latitude')::FLOAT
        ),
        api_data - 'id' - 'name' - 'address' - 'coordinates'
    )
    ON CONFLICT (external_id) 
    DO UPDATE SET
        name = EXCLUDED.name,
        address = EXCLUDED.address,
        coordinates = EXCLUDED.coordinates,
        metadata = EXCLUDED.metadata,
        last_updated = CURRENT_TIMESTAMP
    RETURNING id INTO location_id;
    
    RETURN location_id;
END;
$$ LANGUAGE plpgsql;

-- Batch processing with error handling
CREATE TABLE api_sync_log (
    id SERIAL PRIMARY KEY,
    batch_id VARCHAR(50),
    external_id VARCHAR(50),
    status VARCHAR(20),
    error_message TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example batch sync operation
DO $$
DECLARE
    batch_uuid VARCHAR(50) := 'batch_' || EXTRACT(EPOCH FROM NOW());
    api_record RECORD;
    processed_count INTEGER := 0;
    error_count INTEGER := 0;
BEGIN
    -- Process each API record (this would typically be done in application code)
    FOR api_record IN 
        SELECT * FROM api_temp_staging -- Assume API data is staged here
    LOOP
        BEGIN
            PERFORM process_api_location(api_record.json_data);
            
            INSERT INTO api_sync_log (batch_id, external_id, status)
            VALUES (batch_uuid, api_record.json_data->>'id', 'SUCCESS');
            
            processed_count := processed_count + 1;
        EXCEPTION WHEN OTHERS THEN
            INSERT INTO api_sync_log (batch_id, external_id, status, error_message)
            VALUES (batch_uuid, api_record.json_data->>'id', 'ERROR', SQLERRM);
            
            error_count := error_count + 1;
        END;
    END LOOP;
    
    RAISE NOTICE 'Batch % completed: % processed, % errors', 
                 batch_uuid, processed_count, error_count;
END $$;`,
      category: 'api',
      difficulty: 'advanced'
    },
    {
      title: "Geospatial Data Migration",
      description: "Import and process geospatial data with PostGIS",
      code: `-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create table for geospatial data
CREATE TABLE property_parcels (
    id SERIAL PRIMARY KEY,
    parcel_id VARCHAR(50) UNIQUE,
    owner_name VARCHAR(100),
    property_address VARCHAR(200),
    geometry GEOMETRY(MULTIPOLYGON, 4326),
    area_sqft DECIMAL(12,2),
    assessed_value DECIMAL(12,2),
    zoning_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create spatial index
CREATE INDEX idx_property_parcels_geom ON property_parcels USING GIST (geometry);

-- Import from Shapefile (using shp2pgsql command-line tool)
-- shp2pgsql -I -s 4326 parcels.shp property_parcels_staging | psql -d database_name

-- Clean and validate spatial data
INSERT INTO property_parcels (
    parcel_id, 
    owner_name, 
    property_address, 
    geometry, 
    area_sqft, 
    assessed_value, 
    zoning_code
)
SELECT 
    TRIM(parcel_id),
    TRIM(owner_name),
    TRIM(property_address),
    ST_MakeValid(geom) as geometry,  -- Fix invalid geometries
    ST_Area(ST_Transform(geom, 3857)) * 10.764 as area_sqft,  -- Convert to sq ft
    assessed_val::DECIMAL(12,2),
    UPPER(TRIM(zoning))
FROM property_parcels_staging
WHERE ST_IsValid(geom)  -- Only include valid geometries
  AND parcel_id IS NOT NULL;

-- Spatial queries for validation
SELECT 
    COUNT(*) as total_parcels,
    COUNT(CASE WHEN ST_IsValid(geometry) THEN 1 END) as valid_geometries,
    AVG(area_sqft) as avg_area_sqft,
    ST_Extent(geometry) as bounding_box
FROM property_parcels;

-- Find overlapping parcels (quality check)
SELECT p1.parcel_id, p2.parcel_id, ST_Area(ST_Intersection(p1.geometry, p2.geometry)) as overlap_area
FROM property_parcels p1
JOIN property_parcels p2 ON p1.id < p2.id
WHERE ST_Overlaps(p1.geometry, p2.geometry)
  AND ST_Area(ST_Intersection(p1.geometry, p2.geometry)) > 100; -- More than 100 sq ft overlap

-- Convert coordinates between different spatial reference systems
UPDATE property_parcels 
SET geometry = ST_Transform(geometry, 3857)  -- Convert to Web Mercator
WHERE ST_SRID(geometry) = 4326;`,
      category: 'geospatial',
      difficulty: 'advanced'
    }
  ];

  const migrationConcepts = [
    {
      title: "Data Migration Process",
      content: "A systematic approach involving assessment, planning, extraction, transformation, loading (ETL), and validation. Each phase requires careful attention to data quality, performance, and error handling."
    },
    {
      title: "CSV Migration Best Practices",
      content: "Always use staging tables, validate data types, handle encoding issues, implement data cleaning rules, and maintain detailed logs of the migration process for audit trails."
    },
    {
      title: "Data Quality Assurance",
      content: "Implement validation rules, constraint checking, duplicate detection, and referential integrity checks. Always perform before/after comparisons and maintain rollback procedures."
    },
    {
      title: "Performance Optimization",
      content: "Use bulk loading methods, disable triggers during migration, create indexes after loading, and implement batch processing for large datasets to manage memory and transaction logs."
    },
    {
      title: "Error Handling & Recovery",
      content: "Log all errors with context, implement retry mechanisms for transient failures, maintain data lineage, and always have rollback procedures ready."
    }
  ];

  const csvChallenges = [
    { challenge: "Encoding Issues", solution: "Use UTF-8, detect BOM, handle special characters" },
    { challenge: "Data Type Mismatches", solution: "Stage as text first, validate and convert" },
    { challenge: "Missing Values", solution: "Define NULL handling strategy, use defaults" },
    { challenge: "Duplicate Records", solution: "Implement deduplication logic, use UPSERT" },
    { challenge: "Large File Sizes", solution: "Stream processing, batch imports, partitioning" },
    { challenge: "Inconsistent Formats", solution: "Data normalization, regex patterns, lookup tables" },
  ];

  const dataSourceTypes = [
    { type: "CSV Files", complexity: "Low", tools: "COPY, Python pandas", challenges: "Encoding, delimiters, data types" },
    { type: "Excel Files", complexity: "Medium", tools: "Python openpyxl, ETL tools", challenges: "Multiple sheets, formulas, formatting" },
    { type: "JSON APIs", complexity: "Medium", tools: "REST clients, jsonb functions", challenges: "Rate limits, nested data, authentication" },
    { type: "Legacy Databases", complexity: "High", tools: "Foreign Data Wrappers, ETL", challenges: "Schema differences, data types, performance" },
    { type: "Spatial Files", complexity: "High", tools: "PostGIS, GDAL, shp2pgsql", challenges: "Coordinate systems, topology, large geometries" },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Data Migration Specialist Guide
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Comprehensive guide for migrating data from various sources (CSV, databases, APIs, spatial files) 
          into PostgreSQL with focus on data quality, validation, and process optimization.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Concepts & Overview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <CloudUploadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Migration Fundamentals
              </Typography>
              
              {migrationConcepts.map((concept, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `concept-${index}`}
                  onChange={handleAccordionChange(`concept-${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>{concept.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{concept.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                CSV Migration Challenges
              </Typography>
              {csvChallenges.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="error.main">
                    {item.challenge}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.solution}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Data Source Complexity
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Complexity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataSourceTypes.map((source, index) => (
                      <TableRow key={index}>
                        <TableCell>{source.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={source.complexity} 
                            size="small"
                            color={
                              source.complexity === 'Low' ? 'success' :
                              source.complexity === 'Medium' ? 'warning' : 'error'
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Examples */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="Migration examples tabs">
                <Tab 
                  label="CSV Migration" 
                  icon={<DataObjectIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Database Migration" 
                  icon={<StorageIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="API Integration" 
                  icon={<ApiIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Geospatial Data" 
                  icon={<MapIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h5" gutterBottom>CSV File Migration</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Master CSV imports with proper validation, data cleaning, and error handling techniques.
              </Typography>
              {migrationExamples
                .filter(example => example.category === 'csv')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DataObjectIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip 
                          label={example.difficulty} 
                          size="small" 
                          sx={{ ml: 'auto' }}
                          color={
                            example.difficulty === 'beginner' ? 'success' :
                            example.difficulty === 'intermediate' ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2" component={ 'p' }>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: 400
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Typography variant="h5" gutterBottom>Database-to-Database Migration</Typography>
              <Typography variant="body2" component={ 'p' } color="text.secondary">
                Migrate data between different database systems with transformation and validation.
              </Typography>
              {migrationExamples
                .filter(example => example.category === 'database')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <StorageIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip 
                          label={example.difficulty} 
                          size="small" 
                          sx={{ ml: 'auto' }}
                          color={
                            example.difficulty === 'beginner' ? 'success' :
                            example.difficulty === 'intermediate' ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: 400
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Typography variant="h5" gutterBottom>API Data Integration</Typography>
              <Typography variant="body2" component={ 'p' } color="text.secondary">
                Extract, process, and migrate data from REST APIs with proper error handling and batch processing.
              </Typography>
              {migrationExamples
                .filter(example => example.category === 'api')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ApiIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip 
                          label={example.difficulty} 
                          size="small" 
                          sx={{ ml: 'auto' }}
                          color={
                            example.difficulty === 'beginner' ? 'success' :
                            example.difficulty === 'intermediate' ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: 400
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Typography variant="h5" gutterBottom>Geospatial Data Migration</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Import and process geospatial data using PostGIS for map configuration and spatial analysis.
              </Typography>
              {migrationExamples
                .filter(example => example.category === 'geospatial')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MapIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip 
                          label={example.difficulty} 
                          size="small" 
                          sx={{ ml: 'auto' }}
                          color={
                            example.difficulty === 'beginner' ? 'success' :
                            example.difficulty === 'intermediate' ? 'warning' : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: 400
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Migration Performance Tips
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Use COPY instead of INSERT for large datasets"
                    secondary="COPY can be 10-100x faster than individual INSERT statements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Disable triggers and constraints during migration"
                    secondary="Re-enable after data loading to improve performance"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Create indexes after loading data"
                    secondary="Building indexes on empty tables is much faster"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Use staging tables for complex transformations"
                    secondary="Separate extraction from transformation for better error handling"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Implement batch processing for large datasets"
                    secondary="Process data in chunks to manage memory and transaction size"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Data Quality & Validation
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Always validate data before final insert"
                    secondary="Use staging tables to catch and fix data quality issues"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Implement comprehensive logging"
                    secondary="Track successful imports, errors, and data transformations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Perform row count reconciliation"
                    secondary="Compare source vs destination record counts"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Test with sample data first"
                    secondary="Validate your migration process on a subset before full migration"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Maintain rollback procedures"
                    secondary="Always have a plan to revert changes if issues arise"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            <TransformIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            CivicPlus Data Migration Context
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>Common Migration Scenarios</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Municipal Database Migrations"
                    secondary="Migrating citizen data, permits, licenses from legacy systems"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><MapIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="GIS Data Integration"
                    secondary="Property parcels, zoning maps, infrastructure data with PostGIS"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ApiIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Third-Party System Integration"
                    secondary="Connecting with state databases, utility companies, external APIs"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><DataObjectIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Document and Form Data"
                    secondary="PDF forms, scanned documents, citizen submissions"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>Key Success Metrics</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="80% Timeline Adherence"
                    secondary="Meet project timeline expectations as specified in job description"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Data Integrity Validation"
                    secondary="Ensure 100% data accuracy through comprehensive QA/QC processes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Process Documentation"
                    secondary="Create reusable migration templates and procedures"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Stakeholder Communication"
                    secondary="Regular progress reporting to Implementation Managers"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'primary.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              💡 Interview Talking Points for CSV Experience
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Emphasize your CSV expertise:</strong> "I have extensive experience working with CSV files, 
              including handling encoding issues, data validation, and implementing robust error handling. 
              I'm comfortable with both simple imports and complex scenarios involving data transformation, 
              relationship mapping, and quality assurance."
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Technical depth:</strong> "I understand the importance of staging tables for data validation, 
              using COPY commands for performance, and implementing comprehensive logging for audit trails. 
              I've worked with various CSV challenges like inconsistent delimiters, mixed data types, and large file processing."
            </Typography>
            <Typography variant="body2">
              <strong>Process improvement mindset:</strong> "I always look for ways to automate and optimize the migration process, 
              whether it's creating reusable validation functions, implementing batch processing for large datasets, 
              or developing tools to streamline future migrations."
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataMigrationComponent;