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
  Button,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Psychology as PsychologyIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  School as SchoolIcon,
  VerifiedUser as VerifiedUserIcon,
  People as PeopleIcon,
  Star as StarIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  Quiz as QuizIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface STARExample {
  question: string;
  category: 'sql' | 'migration' | 'learning' | 'qa' | 'collaboration';
  difficulty: 'common' | 'technical' | 'behavioral';
  situation: string;
  task: string;
  action: string;
  result: string;
  keyPoints: string[];
  followUpQuestions: string[];
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
      id={`interview-tabpanel-${index}`}
      aria-labelledby={`interview-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const InterviewPrepComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
  const [expandedSTAR, setExpandedSTAR] = useState<{ [key: string]: boolean }>({});

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const toggleSTARSection = (questionId: string, section: string) => {
    const key = `${questionId}-${section}`;
    setExpandedSTAR(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const starExamples: STARExample[] = [
    {
      question: "Tell me about a time when you had to write a complex SQL query to solve a business problem.",
      category: 'sql',
      difficulty: 'technical',
      situation: "At my previous role, our sales team needed to identify customers who hadn't made purchases in the last 6 months but had high lifetime value, to target them for a re-engagement campaign. The existing reporting tools couldn't handle this complex query across multiple tables.",
      task: "I needed to write a SQL query that would join customer data, order history, and calculate lifetime value while filtering for specific date ranges and purchase patterns. The query had to be efficient enough to run on our production database without impacting performance.",
      action: "I wrote a complex SQL query using CTEs (Common Table Expressions) to break down the problem: First CTE calculated lifetime value by customer, second CTE identified last purchase dates, and the main query joined these with customer demographics. I used window functions to rank customers by value and added proper indexing suggestions. I tested the query on a staging environment first, then optimized it by adding appropriate WHERE clauses to limit the dataset.",
      result: "The query successfully identified 1,247 high-value inactive customers, leading to a targeted email campaign that achieved a 23% reactivation rate and generated $47,000 in revenue. The sales team now uses this query monthly, and I documented it as a reusable template for similar analyses.",
      keyPoints: [
        "Used CTEs and window functions for complex data analysis",
        "Tested on staging before production deployment",
        "Created reusable, documented solution",
        "Generated measurable business impact"
      ],
      followUpQuestions: [
        "What specific SQL functions did you use?",
        "How did you optimize the query performance?",
        "What would you do differently next time?"
      ]
    },
    {
      question: "Describe a situation where you had to troubleshoot a SQL performance issue.",
      category: 'sql',
      difficulty: 'technical',
      situation: "During a monthly reporting cycle, our main dashboard query that usually took 2-3 minutes suddenly started timing out after 15 minutes. This was causing delays in executive reporting and frustrating our business users who needed the data for board meetings.",
      task: "I needed to identify why the query performance had degraded so dramatically and restore normal performance levels within 24 hours to meet the reporting deadline. The query involved joins across 5 large tables with date ranges and aggregations.",
      action: "I used EXPLAIN ANALYZE to examine the execution plan and discovered that recent data growth had made our existing indexes ineffective. I identified that the query was doing full table scans instead of using indexes. I analyzed the data distribution and created composite indexes on the key columns used in WHERE and JOIN clauses. I also rewrote parts of the query to use EXISTS instead of IN clauses and added query hints to guide the optimizer.",
      result: "Query performance improved from 15+ minutes to 45 seconds - even faster than the original 2-3 minutes. I documented the optimization process and created monitoring alerts to catch similar performance degradation early. The executive team received their reports on time, and I established a quarterly index review process.",
      keyPoints: [
        "Used EXPLAIN ANALYZE for systematic troubleshooting",
        "Created composite indexes based on query patterns",
        "Implemented monitoring to prevent future issues",
        "Delivered under tight deadline pressure"
      ],
      followUpQuestions: [
        "What tools do you use for SQL performance monitoring?",
        "How do you decide which indexes to create?",
        "What's your process for query optimization?"
      ]
    },
    {
      question: "Tell me about a time when you had to migrate data from one system to another.",
      category: 'migration',
      difficulty: 'technical',
      situation: "Our company was transitioning from a legacy inventory management system to a new ERP platform. I was responsible for migrating 10 years of historical data including product catalogs, supplier information, and transaction records. The legacy system exported data in multiple CSV files with inconsistent formats and data quality issues.",
      task: "I needed to extract, clean, validate, and import approximately 500,000 records across 12 different CSV files into the new PostgreSQL database. The data had to maintain referential integrity, and the migration needed to be completed over a weekend to minimize business disruption.",
      action: "I used DBeaver to analyze the CSV structures and identify data quality issues. I created a staging database to import all CSV files first, then developed SQL scripts to clean and validate the data. I wrote transformation scripts to standardize formats (dates, phone numbers, addresses) and resolve referential integrity issues. I created detailed mapping documentation and implemented validation checks to ensure data accuracy. I performed a test migration with a subset of data first, then executed the full migration in batches during the planned downtime.",
      result: "Successfully migrated 98.7% of the records with only minor data quality issues that were easily resolved. The new system went live on schedule Monday morning with full historical data available. I documented the entire process and created reusable scripts that were later used for ongoing data synchronization. The business team was able to access 10 years of historical reports immediately.",
      keyPoints: [
        "Used DBeaver for data analysis and validation",
        "Implemented staging approach for data quality control",
        "Created comprehensive documentation and reusable processes",
        "Achieved 98.7% success rate with complex legacy data"
      ],
      followUpQuestions: [
        "What were the biggest challenges with the CSV data?",
        "How did you handle data validation and quality issues?",
        "What tools would you use differently next time?"
      ]
    },
    {
      question: "Describe a time when you had to learn a new technology or skill quickly to complete a project.",
      category: 'learning',
      difficulty: 'behavioral',
      situation: "Our team was tasked with implementing a real-time data synchronization feature between our main application and a third-party API that used GraphQL. I had experience with REST APIs but had never worked with GraphQL before, and the project deadline was only 3 weeks away.",
      task: "I needed to learn GraphQL fundamentals, understand the third-party API documentation, and implement a robust synchronization system that could handle real-time updates without affecting system performance. This included error handling, retry logic, and data transformation.",
      action: "I dedicated 2 hours each morning to learning GraphQL through online tutorials and documentation. I set up a local test environment to experiment with GraphQL queries and mutations. I joined GraphQL community forums and reached out to developers who had similar integration experience. I created small proof-of-concept implementations to test different approaches. I documented my learning process and shared findings with my team through daily standups. I also identified areas where I could leverage my existing REST API knowledge to accelerate the learning curve.",
      result: "I became proficient in GraphQL within one week and successfully delivered the integration project 2 days ahead of schedule. The synchronization system handled 10,000+ daily transactions with 99.9% reliability. My documentation became a reference for other team members, and I was asked to lead GraphQL training sessions for the broader development team. The client was impressed with the robust error handling and performance optimization.",
      keyPoints: [
        "Structured learning approach with daily dedicated time",
        "Leveraged community resources and existing knowledge",
        "Created documentation to share knowledge with team",
        "Delivered ahead of schedule despite learning curve"
      ],
      followUpQuestions: [
        "How do you stay current with new technologies?",
        "What's your approach to learning complex technical concepts?",
        "How do you balance learning time with project deadlines?"
      ]
    },
    {
      question: "Tell me about your process for ensuring data quality and accuracy in your work.",
      category: 'qa',
      difficulty: 'technical',
      situation: "During a critical data migration project for a financial services client, I was responsible for ensuring 100% data accuracy when moving sensitive customer account information. Any errors could result in compliance violations and customer service issues. The dataset included 250,000 customer records with complex account hierarchies.",
      task: "I needed to implement a comprehensive QA/QC process that would catch data inconsistencies, validate business rules, and ensure referential integrity across multiple related tables. The process had to be both thorough and efficient to meet project timelines.",
      action: "I developed a multi-layered QA approach: 1) Used GitHub Copilot to help write comprehensive data validation SQL scripts that checked for nulls, duplicates, and constraint violations. 2) Implemented automated testing using Python scripts that compared row counts, checksums, and key metrics between source and destination. 3) Created data profiling reports to identify outliers and anomalies. 4) Used ChatGPT to help design edge case scenarios for testing. 5) Established a peer review process where another team member validated my transformation logic. 6) Created automated reconciliation reports that business users could review. 7) Implemented sampling techniques to manually verify random subsets of migrated data.",
      result: "Achieved 99.97% data accuracy with only 8 records requiring manual correction out of 250,000. The automated QA process reduced validation time from 3 days to 6 hours while improving accuracy. The client commended our thorough approach, and the QA framework I developed became the standard for all future migration projects. Zero compliance issues were reported post-migration.",
      keyPoints: [
        "Used AI tools (Copilot, ChatGPT) to enhance QA processes",
        "Implemented automated validation with multiple verification layers",
        "Created reusable QA framework for future projects",
        "Achieved near-perfect accuracy with large dataset"
      ],
      followUpQuestions: [
        "What specific AI tools do you use for QA?",
        "How do you balance automation with manual validation?",
        "What's your approach to handling data quality issues?"
      ]
    },
    {
      question: "Describe a time when you had to work closely with stakeholders to understand their requirements and align your technical work with their expectations.",
      category: 'collaboration',
      difficulty: 'behavioral',
      situation: "I was assigned to support an implementation consultant who was working with a municipal client to migrate their property tax system. The client had specific requirements about data formatting and reporting that weren't clearly documented in the initial project scope. There were also concerns about data privacy and audit trails that became apparent during our first stakeholder meeting.",
      task: "I needed to work with the implementation consultant to understand the client's specific needs, translate business requirements into technical specifications, and ensure our data migration approach would meet their operational and compliance requirements. The project timeline was tight, and any misalignment could cause significant delays.",
      action: "I scheduled weekly check-ins with the implementation consultant and joined their client calls to understand requirements firsthand. I created visual data flow diagrams to help non-technical stakeholders understand our migration approach. I developed a requirements traceability matrix to ensure we addressed every client concern. When the client expressed concerns about data validation, I created sample reports showing before/after data comparisons. I proactively identified potential issues and presented solutions with clear business impact explanations. I also created a communication plan that included regular progress updates in business-friendly language rather than technical jargon.",
      result: "The project was completed 3 days ahead of schedule with zero rework required. The client specifically praised our collaborative approach and clear communication during the project retrospective. The implementation consultant reported that our alignment reduced their project management overhead by 40% compared to similar projects. The migration framework we developed together was adopted as a template for future municipal clients, resulting in a 25% improvement in project delivery times.",
      keyPoints: [
        "Joined client calls to understand requirements directly",
        "Created visual communication tools for non-technical stakeholders",
        "Proactively identified and addressed potential issues",
        "Delivered ahead of schedule with zero rework"
      ],
      followUpQuestions: [
        "How do you handle conflicting requirements from different stakeholders?",
        "What's your approach to technical communication with non-technical teams?",
        "How do you manage scope changes during a project?"
      ]
    }
  ];

  const interviewTips = [
    {
      category: "STAR Method",
      tips: [
        "Be specific with numbers and metrics when possible",
        "Focus on your individual contributions, not just team achievements",
        "Keep each component (S-T-A-R) roughly equal in length",
        "Practice timing - aim for 2-3 minutes per STAR response"
      ]
    },
    {
      category: "Technical Questions",
      tips: [
        "Explain your thought process, not just the solution",
        "Mention specific tools and technologies you used",
        "Discuss how you validated your approach",
        "Include lessons learned or what you'd do differently"
      ]
    },
    {
      category: "CivicPlus Specific",
      tips: [
        "Emphasize data accuracy and quality (municipal data is critical)",
        "Mention experience with compliance and audit requirements",
        "Highlight collaborative skills with consultants and clients",
        "Show understanding of public sector data sensitivity"
      ]
    }
  ];

  const categoryIcons = {
    sql: <CodeIcon />,
    migration: <StorageIcon />,
    learning: <SchoolIcon />,
    qa: <VerifiedUserIcon />,
    collaboration: <PeopleIcon />
  };

  const categoryColors: { [key: string]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } = {
    sql: 'primary',
    migration: 'secondary',
    learning: 'success',
    qa: 'warning',
    collaboration: 'info'
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        CivicPlus Data Specialist Interview Prep
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>STAR Method:</strong> Situation (context), Task (what you needed to do), 
          Action (what you did), Result (outcome/impact). Each answer should be 2-3 minutes and include specific examples.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Tips & Guidelines */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <LightbulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Interview Tips
              </Typography>
              
              {interviewTips.map((tipCategory, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordion === `tip-${index}`}
                  onChange={handleAccordionChange(`tip-${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>{tipCategory.category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {tipCategory.tips.map((tip, tipIndex) => (
                        <ListItem key={tipIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={tip}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <QuizIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Question Categories
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CodeIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="SQL Technical Skills"
                    secondary="Complex queries, performance optimization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><StorageIcon color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="Data Migration"
                    secondary="CSV imports, data validation, DBeaver experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SchoolIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Learning & Development"
                    secondary="Self-directed learning, problem solving"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VerifiedUserIcon color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary="Quality Assurance"
                    secondary="QA/QC processes, AI tools, validation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PeopleIcon color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="Collaboration"
                    secondary="Working with consultants, stakeholder alignment"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - STAR Examples */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="Interview examples tabs">
                <Tab 
                  label="SQL Questions" 
                  icon={<CodeIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Migration & QA" 
                  icon={<StorageIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label="Soft Skills" 
                  icon={<PeopleIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h5" gutterBottom>SQL Technical Questions</Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Demonstrate your SQL expertise with specific examples of complex queries and problem-solving.
              </Typography>
              
              {starExamples
                .filter(example => example.category === 'sql')
                .map((example, index) => (
                  <Card key={index} sx={{ mb: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {categoryIcons[example.category]}
                        <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>
                          Behavioral Question
                        </Typography>
                        <Chip 
                          label={example.difficulty} 
                          size="small"
                          color={categoryColors[example.category]}
                        />
                      </Box>
                      
                      <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
                        <Typography variant="body1" fontWeight="bold">
                          "{example.question}"
                        </Typography>
                      </Paper>

                      {/* STAR Components */}
                      {[
                        { key: 'situation', label: 'Situation', content: example.situation, icon: '📍' },
                        { key: 'task', label: 'Task', content: example.task, icon: '🎯' },
                        { key: 'action', label: 'Action', content: example.action, icon: '⚡' },
                        { key: 'result', label: 'Result', content: example.result, icon: '🏆' }
                      ].map((star) => (
                        <Box key={star.key} sx={{ mb: 1 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => toggleSTARSection(index.toString(), star.key)}
                            sx={{ justifyContent: 'space-between', textAlign: 'left', mb: 1 }}
                            endIcon={expandedSTAR[`${index}-${star.key}`] ? <ExpandLess /> : <ExpandMore />}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ mr: 1 }}>{star.icon}</Typography>
                              <Typography variant="h6">{star.label}</Typography>
                            </Box>
                          </Button>
                          <Collapse in={expandedSTAR[`tab2-${index}-${star.key}`]}>
                            <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
                              <Typography variant="body2">{star.content}</Typography>
                            </Paper>
                          </Collapse>
                        </Box>
                      ))}

                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>Key Points to Emphasize:</Typography>
                      <List dense>
                        {example.keyPoints.map((point, pointIndex) => (
                          <ListItem key={pointIndex}>
                            <ListItemIcon>
                              <StarIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={point}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Potential Follow-up Questions:
                      </Typography>
                      <List dense>
                        {example.followUpQuestions.map((question, qIndex) => (
                          <ListItem key={qIndex}>
                            <ListItemIcon>
                              <QuizIcon color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={question}
                              primaryTypographyProps={{ variant: 'body2', fontStyle: 'italic' }}
                            />
                          </ListItem>
                        ))}
                      </List>
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
                <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Interview Strategy
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Practice Out Loud"
                    secondary="Rehearse your STAR answers verbally, not just mentally"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Prepare 2-3 Examples Per Category"
                    secondary="Have backup stories ready in case they ask for additional examples"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Quantify Your Impact"
                    secondary="Use specific numbers, percentages, and timeframes when possible"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Connect to CivicPlus Needs"
                    secondary="Relate your experiences to municipal data and government sector challenges"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Prepare Questions for Them"
                    secondary="Show interest in their data challenges, team structure, and growth opportunities"
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
                <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Quick Reference Checklist
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="CSV Migration with DBeaver"
                    secondary="Your strongest talking point - data cleaning, validation, error handling"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="SQL Problem Solving"
                    secondary="Complex queries, performance optimization, troubleshooting"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Self-Learning Examples"
                    secondary="GraphQL story shows structured approach to learning new technologies"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="QA/QC with AI Tools"
                    secondary="GitHub Copilot, ChatGPT for validation scripts and edge case testing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Stakeholder Collaboration"
                    secondary="Municipal client example shows understanding of public sector needs"
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
            <LightbulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Final Interview Tips for CivicPlus Data Specialist Role
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                🎯 Key Messages to Convey
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Data Quality Focus"
                    secondary="Municipal data requires 100% accuracy - emphasize your QA processes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Process Improvement Mindset"
                    secondary="Show how you create reusable solutions and documentation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Timeline Management"
                    secondary="Mention the 80% project timeline expectation from the job description"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom color="secondary.main">
                🔧 Technical Depth to Show
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="CSV Expertise"
                    secondary="Your strongest area - data validation, encoding issues, transformation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="SQL Proficiency"
                    secondary="Complex queries, performance tuning, PostgreSQL features"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Tools Knowledge"
                    secondary="DBeaver, staging tables, AI-assisted validation"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom color="success.main">
                🤝 Soft Skills to Highlight
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Self-Directed Learning"
                    secondary="Show how you stay current and solve new challenges"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Communication"
                    secondary="Translate technical concepts for non-technical stakeholders"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Collaboration"
                    secondary="Work effectively with implementation consultants and clients"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'primary.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              💡 Remember for Your Interview
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Your CSV migration experience is your strongest asset.</strong> Lead with this in relevant questions 
              and tie it back to the municipal data challenges CivicPlus faces. Emphasize your systematic approach 
              to data quality, your ability to work independently while collaborating with stakeholders, and your 
              commitment to meeting project timelines.
            </Typography>
            <Typography variant="body2">
              <strong>Show enthusiasm for the role:</strong> Express genuine interest in supporting local government 
              technology initiatives and helping municipalities serve their citizens better through reliable data systems.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InterviewPrepComponent;