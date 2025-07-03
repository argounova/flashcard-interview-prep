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
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Storage as StorageIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface SQLExample {
  title: string;
  description: string;
  code: string;
  category: 'basic' | 'intermediate' | 'postgresql';
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
      id={`sql-tabpanel-${index}`}
      aria-labelledby={`sql-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SQLLearningComponent: React.FC = () => {
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

  const sqlExamples: SQLExample[] = [
    {
      title: "Basic SELECT Query",
      description: "Retrieve all records from a table",
      code: `SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, email 
FROM employees;`,
      category: 'basic'
    },
    {
      title: "WHERE Clause",
      description: "Filter records based on conditions",
      code: `SELECT * FROM employees 
WHERE department = 'Engineering' 
  AND salary > 50000;

-- Using LIKE for pattern matching
SELECT * FROM employees 
WHERE first_name LIKE 'John%';`,
      category: 'basic'
    },
    {
      title: "INSERT Statement",
      description: "Add new records to a table",
      code: `INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('John', 'Doe', 'john.doe@company.com', 'Engineering', 75000);

-- Insert multiple records
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES 
  ('Jane', 'Smith', 'jane.smith@company.com', 'Marketing', 65000),
  ('Bob', 'Johnson', 'bob.johnson@company.com', 'Sales', 55000);`,
      category: 'basic'
    },
    {
      title: "UPDATE Statement",
      description: "Modify existing records",
      code: `UPDATE employees 
SET salary = 80000, department = 'Senior Engineering'
WHERE employee_id = 1;

-- Update based on condition
UPDATE employees 
SET salary = salary * 1.1 
WHERE department = 'Engineering' AND hire_date < '2020-01-01';`,
      category: 'basic'
    },
    {
      title: "DELETE Statement",
      description: "Remove records from a table",
      code: `DELETE FROM employees 
WHERE employee_id = 1;

-- Delete with condition
DELETE FROM employees 
WHERE department = 'Temp' AND end_date < CURRENT_DATE;`,
      category: 'basic'
    },
    {
      title: "JOIN Operations",
      description: "Combine data from multiple tables",
      code: `-- Inner Join
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Left Join
SELECT e.first_name, e.last_name, p.project_name
FROM employees e
LEFT JOIN project_assignments pa ON e.employee_id = pa.employee_id
LEFT JOIN projects p ON pa.project_id = p.project_id;`,
      category: 'intermediate'
    },
    {
      title: "GROUP BY and Aggregations",
      description: "Group data and perform calculations",
      code: `SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- Multiple aggregations
SELECT 
  department,
  COUNT(*) as total_employees,
  MIN(salary) as min_salary,
  MAX(salary) as max_salary,
  SUM(salary) as total_payroll
FROM employees
GROUP BY department
ORDER BY total_payroll DESC;`,
      category: 'intermediate'
    },
    {
      title: "Subqueries",
      description: "Nested queries for complex data retrieval",
      code: `-- Find employees with salary above average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Correlated subquery
SELECT e1.first_name, e1.last_name, e1.salary
FROM employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department = e1.department
);`,
      category: 'intermediate'
    },
    {
      title: "PostgreSQL JSON Operations",
      description: "Work with JSON data in PostgreSQL",
      code: `-- Create table with JSON column
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_data JSONB
);

-- Insert JSON data
INSERT INTO user_profiles (user_data)
VALUES ('{"name": "John Doe", "age": 30, "skills": ["SQL", "Python", "React"]}');

-- Query JSON data
SELECT user_data->>'name' as name, 
       user_data->>'age' as age
FROM user_profiles
WHERE user_data->>'age'::int > 25;

-- Query JSON arrays
SELECT *
FROM user_profiles
WHERE user_data->'skills' ? 'SQL';`,
      category: 'postgresql'
    },
    {
      title: "PostgreSQL Array Operations",
      description: "Work with array data types",
      code: `-- Create table with array column
CREATE TABLE tags_table (
  id SERIAL PRIMARY KEY,
  tags TEXT[]
);

-- Insert array data
INSERT INTO tags_table (tags)
VALUES (ARRAY['database', 'sql', 'postgresql']);

-- Query arrays
SELECT * FROM tags_table
WHERE 'sql' = ANY(tags);

-- Array functions
SELECT 
  tags,
  array_length(tags, 1) as tag_count,
  array_to_string(tags, ', ') as tags_string
FROM tags_table;`,
      category: 'postgresql'
    },
    {
      title: "PostgreSQL Window Functions",
      description: "Advanced analytical functions",
      code: `-- Row numbering and ranking
SELECT 
  first_name,
  last_name,
  salary,
  department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
  RANK() OVER (ORDER BY salary DESC) as overall_rank
FROM employees;

-- Running totals and moving averages
SELECT 
  first_name,
  salary,
  SUM(salary) OVER (ORDER BY hire_date) as running_total,
  AVG(salary) OVER (ORDER BY hire_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
FROM employees;`,
      category: 'postgresql'
    },
    {
      title: "PostgreSQL Full-Text Search",
      description: "Advanced text search capabilities",
      code: `-- Create GIN index for full-text search
CREATE INDEX idx_documents_search 
ON documents 
USING GIN (to_tsvector('english', title || ' ' || content));

-- Full-text search query
SELECT title, content,
       ts_rank(to_tsvector('english', title || ' ' || content), 
               plainto_tsquery('english', 'database migration')) as rank
FROM documents
WHERE to_tsvector('english', title || ' ' || content) 
      @@ plainto_tsquery('english', 'database migration')
ORDER BY rank DESC;

-- Highlighting search results
SELECT title,
       ts_headline('english', content, plainto_tsquery('english', 'database migration')) 
       as highlighted_content
FROM documents
WHERE to_tsvector('english', content) @@ plainto_tsquery('english', 'database migration');`,
      category: 'postgresql'
    }
  ];

  const sqlConcepts = [
    {
      title: "What is SQL?",
      content: "SQL (Structured Query Language) is a standardized language for managing and manipulating relational databases. It allows you to create, read, update, and delete data, as well as define database structure and control access to data."
    },
    {
      title: "Key SQL Operations (CRUD)",
      content: "CREATE (INSERT), READ (SELECT), UPDATE, DELETE - these four operations form the foundation of database interactions."
    },
    {
      title: "Primary Key",
      content: "A primary key is a unique, non-null value for each record in a table. Each table can only have one primary key and it may be a single column or combination of columns. Benefits include data integrity by preventing duplicate records, a reliable way to reference specific rows, and they are essential for database relationships. EXAMPLE: A customer table might have a customer_id as a primary key so even if two customers have the same name and address, their customer_id values would be different ensuring each record is unique."
    },
    {
      title: "What is a JOIN?",
      content: "A JOIN is a SQL operation that combines rows from two or more tables based on a related column between them. It allows you to retrieve data that's spread across multiple tables in a single query.  A JOIN does what it says on the package - it joins data from two tables. EXAMPLE: A customer and their addresses are in separate tables to allow for multiple addresses.  A JOIN would be used when querying the data for that customer."
    },
    {
      title: "Types of JOIN",
      content: "INNER JOIN: The intersection of two tables - returns only rows that have matching values in both tables (EXAMPLE: get all orders with customer information). LEFT JOIN: Returns all rows from left table plus matching rows from right table (EXAMPLE: get all customers and their orders - shows customers even if they haven't placed any orders). RIGHT JOIN: Similar to LEFT JOIN, but less common (EXAMPLE: get all products and orders - returns products even if they've never been ordered). FULL OUTER JOIN: returns all rows when there is a match in either table (EXAMPLE: get all customers and all orders, showing unmatched records from both sides)."
    },
    {
      title: "SQL vs. MySQL",
      content: "At a basic level, SQL is the language, it is an abstraction - it is just the syntax of the language with no implementation. MySQL or PostgreSQL are software (relational database management systems RDBMS) that allow you to use a GUI to update schemas, define data types, issue or revoke user permissions, etc. SQL is a coding language used to interact with relational databases, MySQL is software used to implement those relational databases. A good example would be that SQL is like the English language, with rules and syntax, while MySQL is like Microsoft Word - an application that used the English language."
    },
    {
      title: "Database Relationships",
      content: "Tables can be related through foreign keys, enabling complex data relationships like one-to-many, many-to-many, and one-to-one associations."
    },
    {
      title: "PostgreSQL Advantages",
      content: "PostgreSQL is an advanced open-source database that extends SQL with features like JSON support, array data types, full-text search, and powerful indexing capabilities."
    }
  ];

  const postgresqlFeatures = [
    "ACID Compliance",
    "JSON/JSONB Support",
    "Array Data Types",
    "Full-Text Search",
    "Window Functions",
    "Custom Data Types",
    "Extensions (PostGIS, etc.)",
    "Advanced Indexing (GIN, GiST, etc.)"
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        SQL & PostgreSQL Guide
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          This guide covers SQL fundamentals and PostgreSQL-specific features essential for data specialists 
          working with database migrations, geospatial data, and various data sources.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Concepts */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: 'fit-content', mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <StorageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                SQL Fundamentals
              </Typography>
              
              {sqlConcepts.map((concept, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `concept-${index}`}
                  onChange={handleAccordionChange(`concept-${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{concept.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{concept.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                PostgreSQL Features
              </Typography>
              <List dense>
                {postgresqlFeatures.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Examples */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="SQL examples tabs">
                <Tab 
                  label="Basic SQL" 
                  icon={<AddIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Intermediate" 
                  icon={<SearchIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="PostgreSQL" 
                  icon={<SettingsIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h5" gutterBottom>Basic SQL Commands</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Essential SQL operations every data specialist should know.
              </Typography>
              {sqlExamples
                .filter(example => example.category === 'basic')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CodeIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip label="Basic" size="small" sx={{ ml: 'auto' }} />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto'
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Typography variant="h5" gutterBottom>Intermediate SQL</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Advanced SQL techniques for complex data operations and analysis.
              </Typography>
              {sqlExamples
                .filter(example => example.category === 'intermediate')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CodeIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip label="Intermediate" color="primary" size="small" sx={{ ml: 'auto' }} />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto'
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {example.code}
                        </pre>
                      </Paper>
                    </CardContent>
                  </Card>
                ))}
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Typography variant="h5" gutterBottom>PostgreSQL Specific Features</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Leverage PostgreSQL's advanced features for complex data operations.
              </Typography>
              {sqlExamples
                .filter(example => example.category === 'postgresql')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CodeIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">{example.title}</Typography>
                        <Chip label="PostgreSQL" color="secondary" size="small" sx={{ ml: 'auto' }} />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {example.description}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: 'grey.50', 
                          fontFamily: 'monospace',
                          overflow: 'auto'
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
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

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Why PostgreSQL for Data Migration?
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" paragraph>
                PostgreSQL excels in data migration scenarios because of its:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Flexible data types (JSON, arrays, custom types)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Robust import/export capabilities" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Advanced indexing for performance" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Foreign Data Wrappers for external data sources" />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" paragraph>
                Common migration scenarios include:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="CSV to PostgreSQL table imports" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Legacy database migrations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Geospatial data integration with PostGIS" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="API data synchronization" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SQLLearningComponent;