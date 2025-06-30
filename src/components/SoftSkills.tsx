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
  Favorite as FavoriteIcon,
  EmojiPeople as EmojiPeopleIcon,
  BusinessCenter as BusinessCenterIcon,
  Psychology as PsychologyIcon,
  Groups as GroupsIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface SoftSkillQuestion {
  id: string;
  question: string;
  category: 'motivation' | 'teamwork' | 'growth' | 'communication' | 'company';
  keyPoints: string[];
  sampleAnswer: string;
  whyItMatters: string;
  civicPlusConnection: string;
}

const SoftSkillsInterviewComponent: React.FC = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
  const [expandedAnswers, setExpandedAnswers] = useState<{ [key: string]: boolean }>({});

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const toggleAnswer = (questionId: string) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const softSkillQuestions: SoftSkillQuestion[] = [
    {
      id: 'why-civicplus',
      question: "Why do you want to work for CivicPlus?",
      category: 'company',
      keyPoints: [
        "Show you've researched the company and understand their mission",
        "Connect your values to their vision of serving local government",
        "Mention specific aspects of their culture or approach that appeal to you",
        "Demonstrate genuine interest in the public sector technology space"
      ],
      sampleAnswer: "I'm drawn to CivicPlus because of your mission to empower local governments and learning institutions to better serve their communities. I've worked with data migration some and spent a lot of time understanding how different tables relate to one another in a database. Having seen how reliable systems impact operations, I'm excited about the opportunity to contribute to technology that directly helps citizens access services and information. I appreciate that CivicPlus values 'authenticity and transparent communication' - these align with my own approach to work. The fact that you're focused on local government is particularly meaningful to me because these are the services that touch people's daily lives most directly. I'm also excited about the collaborative culture you describe and the opportunity to grow alongside great people while making a real impact.",
      whyItMatters: "Shows you understand the company's mission and have genuine motivation beyond just getting a job.",
      civicPlusConnection: "References their specific mission, values, and focus on local government impact."
    },
    {
      id: 'team-collaboration',
      question: "How do you prefer to work in a team environment?",
      category: 'teamwork',
      keyPoints: [
        "Emphasize collaboration and communication",
        "Show you can work independently but value team input",
        "Mention how you share knowledge and help others",
        "Reference the job description's emphasis on working with implementation consultants"
      ],
      sampleAnswer: "I thrive in collaborative environments where team members can leverage each other's strengths. I prefer to start projects with clear communication about goals and expectations, then maintain regular check-ins to ensure alignment. I'm comfortable working independently on technical tasks like data migrations, but I always make sure to document my process and share findings with the team. I particularly enjoy mentoring others and being mentored - for example, when I learned React initially, I created kanban boards that helped other team members. I believe the best teams are those where everyone feels comfortable asking questions and sharing ideas. Given that this role involves working closely with implementation consultants, I'm excited about the opportunity to be the technical bridge between data challenges and client needs.",
      whyItMatters: "The role requires collaboration with consultants and clients, so they need to know you can work well with others.",
      civicPlusConnection: "Directly addresses working with implementation consultants mentioned in the job description."
    },
    {
      id: 'handling-pressure',
      question: "How do you handle working under pressure or tight deadlines?",
      category: 'communication',
      keyPoints: [
        "Reference the 80% timeline expectation from the job description",
        "Show you can prioritize and stay organized",
        "Demonstrate clear communication during stressful situations",
        "Give specific examples of successful deadline management"
      ],
      sampleAnswer: "I handle pressure well by staying organized and maintaining clear communication with stakeholders. When facing tight deadlines, I break projects into smaller, manageable tasks and prioritize based on impact and dependencies. I'm very conscious of the 80% timeline expectation mentioned in the job description - I believe this is achievable through proper planning and proactive communication. For example, during a recent data migration project, when we discovered data quality issues that could have delayed the timeline, I immediately communicated the situation to stakeholders with specific options and time impacts. I worked extra hours to create automated validation scripts that actually brought us back on schedule. I find that transparency about challenges, combined with solution-oriented thinking, helps teams navigate pressure successfully while maintaining quality standards.",
      whyItMatters: "Data migrations often have strict deadlines and the job specifically mentions 80% timeline adherence.",
      civicPlusConnection: "Directly references the 80% project timeline expectation from the job description."
    },
    {
      id: 'learning-growth',
      question: "Where do you see yourself in 2-3 years, and how does this role fit into your career goals?",
      category: 'growth',
      keyPoints: [
        "Show ambition but focus on growing within data/technical roles",
        "Mention interest in project management or technical consulting (job description hints)",
        "Demonstrate you see this as a stepping stone, not just a job",
        "Connect to CivicPlus's growth opportunities and mentorship culture"
      ],
      sampleAnswer: "In 2-3 years, I see myself having grown into a senior data specialist role with expanded responsibilities in project management and technical consulting. The job description mentions this is a great entry-level position for someone interested in project management and technical consulting, which aligns perfectly with my career aspirations. I'd love to become someone who can lead complex data migration projects from start to finish, managing both the technical execution and stakeholder relationships. I'm particularly interested in developing expertise in geospatial data and GIS systems, which would be valuable for municipal clients. At CivicPlus, I see the opportunity to grow alongside great people in an environment that values authenticity and nurtures potential. I'd hope to eventually mentor new team members and contribute to process improvements that help the company serve local governments even more effectively.",
      whyItMatters: "Shows you're thinking long-term and see growth potential within the company.",
      civicPlusConnection: "References the job description's mention of project management/consulting growth path and company values."
    },
    {
      id: 'motivation-passion',
      question: "What motivates you most about working with data and technology?",
      category: 'motivation',
      keyPoints: [
        "Connect data work to real-world impact",
        "Show genuine interest in problem-solving and continuous improvement",
        "Mention the satisfaction of turning messy data into valuable insights",
        "Reference how data enables better decision-making for organizations"
      ],
      sampleAnswer: "What really drives me is the transformation aspect of data work - taking messy, inconsistent information and turning it into something clean, reliable, and valuable. There's a puzzle-solving element that I find intellectually satisfying, but more importantly, I'm motivated by the real-world impact. When I successfully migrate data from a legacy system, I know that means employees can access the information they need to serve customers better, or in CivicPlus's case, that citizens can access government services more efficiently. I'm particularly excited about working with municipal data because these systems directly impact people's daily lives - property records, permits, public services. The continuous learning aspect also motivates me - every data migration project teaches me something new about different systems, data structures, or business processes. I love that this field requires both technical precision and creative problem-solving when dealing with unexpected data quality issues.",
      whyItMatters: "Shows genuine passion for the work beyond just technical skills.",
      civicPlusConnection: "Connects data work to citizen services and municipal impact, which is CivicPlus's core mission."
    }
  ];

  const categoryIcons = {
    motivation: <FavoriteIcon />,
    teamwork: <GroupsIcon />,
    growth: <BusinessCenterIcon />,
    communication: <EmojiPeopleIcon />,
    company: <PsychologyIcon />
  };

  const categoryColors: { [key: string]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } = {
    motivation: 'error',
    teamwork: 'info',
    growth: 'success',
    communication: 'warning',
    company: 'primary'
  };

  const interviewTips = [
    {
      category: "Preparation Tips",
      tips: [
        "Research CivicPlus's recent news, clients, and company culture",
        "Review the job description and connect your answers to specific requirements",
        "Prepare 2-3 specific examples that demonstrate each soft skill",
        "Practice your answers out loud to ensure natural delivery"
      ]
    },
    {
      category: "Answer Structure",
      tips: [
        "Keep answers concise but substantive (1-2 minutes max)",
        "Use specific examples whenever possible",
        "Show self-awareness and ability to learn from experiences",
        "Always tie your answer back to how it benefits the team/company"
      ]
    },
    {
      category: "CivicPlus Focus",
      tips: [
        "Emphasize your interest in serving local government and citizens",
        "Show understanding of the public sector's unique challenges",
        "Demonstrate alignment with their values of authenticity and collaboration",
        "Express genuine enthusiasm for their mission and growth opportunities"
      ]
    }
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        CivicPlus Soft Skills Interview Prep
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          These questions focus on cultural fit, motivation, and soft skills. Show genuine interest in CivicPlus's 
          mission and demonstrate how your values align with serving local government and citizens.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Left Column - Tips */}
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
                <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Key Points to Remember
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Show Genuine Interest"
                    secondary="Research CivicPlus and express authentic enthusiasm for their mission"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Connect to Local Government"
                    secondary="Demonstrate understanding of public sector challenges and impact"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Reference Job Description"
                    secondary="Tie answers back to specific requirements and growth opportunities mentioned"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Be Authentic"
                    secondary="CivicPlus values authenticity - be yourself while staying professional"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Ask Good Questions"
                    secondary="Prepare thoughtful questions about culture, growth, and challenges"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Questions */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" gutterBottom>
            Common Soft Skills Questions
          </Typography>
          <Typography variant="body2" paragraph color="text.secondary">
            Practice these questions to demonstrate your cultural fit and genuine interest in CivicPlus's mission.
          </Typography>

          {softSkillQuestions.map((question) => (
            <Card key={question.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {categoryIcons[question.category]}
                  <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>
                    {question.category.charAt(0).toUpperCase() + question.category.slice(1)} Question
                  </Typography>
                  <Chip 
                    label={question.category} 
                    size="small"
                    color={categoryColors[question.category]}
                  />
                </Box>
                
                <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="body1" fontWeight="bold">
                    "{question.question}"
                  </Typography>
                </Paper>

                <Typography variant="subtitle2" gutterBottom>Key Points to Cover:</Typography>
                <List dense sx={{ mb: 2 }}>
                  {question.keyPoints.map((point, index) => (
                    <ListItem key={index}>
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

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => toggleAnswer(question.id)}
                  sx={{ justifyContent: 'space-between', textAlign: 'left', mb: 2 }}
                  endIcon={expandedAnswers[question.id] ? <ExpandLess /> : <ExpandMore />}
                >
                  <Typography variant="h6">Sample Answer</Typography>
                </Button>

                <Collapse in={expandedAnswers[question.id]}>
                  <Paper sx={{ p: 2, backgroundColor: 'background.default', mb: 2 }}>
                    <Typography variant="body2" paragraph>
                      {question.sampleAnswer}
                    </Typography>
                  </Paper>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom color="success.main">
                      Why This Matters:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {question.whyItMatters}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary.main">
                      CivicPlus Connection:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {question.civicPlusConnection}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 4 }} />

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom color="primary.main">
                Questions You Should Ask Them
              </Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Asking thoughtful questions shows genuine interest and helps you evaluate if it's the right fit.
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>About the Role:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="What does a typical day look like for a Data Specialist?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="What are the biggest data challenges CivicPlus clients face?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="How does this role collaborate with implementation consultants?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>About Growth & Culture:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="What growth opportunities exist for someone in this role?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="How does CivicPlus support continuous learning and development?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="What do you enjoy most about working at CivicPlus?"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SoftSkillsInterviewComponent;