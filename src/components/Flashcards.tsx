'use client'

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Chip,
  Grid,
  Container,
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Alert,
} from '@mui/material';
import {
  MenuBook as BookIcon,
  Code as CodeIcon,
  CheckCircle,
  Cancel,
  RotateLeft,
  Lightbulb,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Type definitions
interface Flashcard {
  id: number;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  question: string;
  answer: string;
  explanation: string;
}

type DifficultyLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

interface SQLFlashcardGridProps {
  className?: string;
}

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CodeBlock = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#4ade80',
  padding: theme.spacing(2),
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  maxHeight: '200px',
  overflow: 'auto',
  whiteSpace: 'pre',
  borderRadius: theme.shape.borderRadius,
}));

const ProgressCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

const SQLFlashcardGrid: React.FC<SQLFlashcardGridProps> = ({ className }) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [strugglingCards, setStrugglingCards] = useState<Set<number>>(new Set());

  const flashcards: Flashcard[] = [
    {
      id: 1,
      difficulty: "Basic",
      question: "You need to see the structure of a 'permits' table before migration. Write a query to show all column names and their data types.",
      answer: "SELECT \n    COLUMN_NAME,\n    DATA_TYPE,\n    IS_NULLABLE\nFROM INFORMATION_SCHEMA.COLUMNS\nWHERE TABLE_NAME = 'permits'\nORDER BY ORDINAL_POSITION;",
      explanation: "Understanding table structure is essential before any data migration. This query helps identify column names, data types, and nullable constraints to plan the migration process effectively."
    },
    {
      id: 2,
      difficulty: "Basic",
      question: "During data validation, count how many business licenses have NULL values in the 'expiration_date' column.",
      answer: "SELECT COUNT(*) as null_expiration_count\nFROM business_licenses\nWHERE expiration_date IS NULL;",
      explanation: "Identifying NULL values helps assess data quality before migration. This information is crucial for determining if default values need to be applied or if additional data cleanup is required."
    },
    {
      id: 3,
      difficulty: "Intermediate",
      question: "Find all properties where the owner appears in both the 'property_owners' and 'business_owners' tables. Show the owner name and count of properties and businesses they own.",
      answer: "SELECT \n    po.owner_name,\n    COUNT(DISTINCT po.property_id) as property_count,\n    COUNT(DISTINCT bo.business_id) as business_count\nFROM property_owners po\nINNER JOIN business_owners bo \n    ON UPPER(TRIM(po.owner_name)) = UPPER(TRIM(bo.owner_name))\nGROUP BY po.owner_name\nORDER BY property_count DESC, business_count DESC;",
      explanation: "Cross-table analysis helps identify relationships between different city systems. This type of query is useful for creating unified profiles and ensuring data consistency during migration."
    },
    {
      id: 4,
      difficulty: "Intermediate",
      question: "Create a summary report showing permit counts by type and year, but only for permit types that had more than 10 permits issued in any single year.",
      answer: "SELECT \n    permit_type,\n    YEAR(issue_date) as permit_year,\n    COUNT(*) as permit_count\nFROM permits\nWHERE issue_date IS NOT NULL\nGROUP BY permit_type, YEAR(issue_date)\nHAVING COUNT(*) > 10\nORDER BY permit_type, permit_year DESC;",
      explanation: "Aggregate queries with HAVING clauses help identify significant data patterns and validate business rules. This analysis helps ensure data quality and supports reporting requirements in the new system."
    },
    {
      id: 5,
      difficulty: "Basic",
      question: "Create a staging table for citizen data that includes fields to track the migration process and any errors encountered.",
      answer: "CREATE TABLE staging_citizens (\n    staging_id INT IDENTITY(1,1) PRIMARY KEY,\n    source_citizen_id NVARCHAR(50),\n    first_name NVARCHAR(100),\n    last_name NVARCHAR(100),\n    date_of_birth DATE,\n    address NVARCHAR(200),\n    phone NVARCHAR(20),\n    email NVARCHAR(100),\n    -- Migration tracking fields\n    loaded_date DATETIME DEFAULT GETDATE(),\n    migration_status NVARCHAR(50) DEFAULT 'PENDING',\n    error_message NVARCHAR(500),\n    processed_date DATETIME\n);",
      explanation: "Staging tables provide a safe area to load and validate data before moving it to production. Including migration tracking fields helps monitor progress and troubleshoot any issues that arise during the process."
    },
    {
      id: 6,
      difficulty: "Basic",
      question: "After loading data into a staging table, write a query to identify records with missing required fields (first_name, last_name, or date_of_birth).",
      answer: "SELECT \n    staging_id,\n    source_citizen_id,\n    first_name,\n    last_name,\n    date_of_birth,\n    CASE \n        WHEN first_name IS NULL OR TRIM(first_name) = '' THEN 'Missing first name; '\n        ELSE ''\n    END +\n    CASE \n        WHEN last_name IS NULL OR TRIM(last_name) = '' THEN 'Missing last name; '\n        ELSE ''\n    END +\n    CASE \n        WHEN date_of_birth IS NULL THEN 'Missing date of birth; '\n        ELSE ''\n    END as validation_errors\nFROM staging_citizens\nWHERE first_name IS NULL OR TRIM(first_name) = ''\n   OR last_name IS NULL OR TRIM(last_name) = ''\n   OR date_of_birth IS NULL;",
      explanation: "Data validation is critical before migration to ensure data quality. This query identifies incomplete records and provides specific error messages to help with data cleanup efforts."
    },
    {
      id: 7,
      difficulty: "Intermediate",
      question: "Write a query to safely convert string dates in 'MM/DD/YYYY' format to proper DATE format, handling any conversion errors.",
      answer: "UPDATE staging_permits\nSET \n    issue_date = CASE \n        WHEN permit_date_string LIKE '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]'\n             AND ISDATE(permit_date_string) = 1\n        THEN CONVERT(DATE, permit_date_string, 101)\n        ELSE NULL\n    END,\n    migration_status = CASE\n        WHEN permit_date_string LIKE '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]'\n             AND ISDATE(permit_date_string) = 1\n        THEN 'DATE_CONVERTED'\n        ELSE 'DATE_ERROR'\n    END,\n    error_message = CASE\n        WHEN NOT (permit_date_string LIKE '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]'\n                  AND ISDATE(permit_date_string) = 1)\n        THEN 'Invalid date format: ' + ISNULL(permit_date_string, 'NULL')\n        ELSE NULL\n    END\nWHERE permit_date_string IS NOT NULL;\n\n-- Check conversion results\nSELECT \n    migration_status,\n    COUNT(*) as record_count\nFROM staging_permits\nGROUP BY migration_status;",
      explanation: "Date conversion is a common migration challenge. This approach safely converts dates while tracking success and failure rates, allowing you to address problematic data before completing the migration."
    },
    {
      id: 8,
      difficulty: "Intermediate",
      question: "Create a query to compare record counts between source and target tables after migration, identifying any discrepancies.",
      answer: "WITH migration_comparison AS (\n    SELECT \n        'citizens' as table_name,\n        (SELECT COUNT(*) FROM source_citizens) as source_count,\n        (SELECT COUNT(*) FROM target_citizens) as target_count\n    UNION ALL\n    SELECT \n        'permits',\n        (SELECT COUNT(*) FROM source_permits),\n        (SELECT COUNT(*) FROM target_permits)\n    UNION ALL\n    SELECT \n        'properties',\n        (SELECT COUNT(*) FROM source_properties),\n        (SELECT COUNT(*) FROM target_properties)\n)\nSELECT \n    table_name,\n    source_count,\n    target_count,\n    target_count - source_count as difference,\n    CASE \n        WHEN source_count = target_count THEN 'MATCH'\n        WHEN target_count < source_count THEN 'MISSING RECORDS'\n        ELSE 'EXTRA RECORDS'\n    END as status,\n    ROUND(\n        CASE WHEN source_count > 0 \n             THEN target_count * 100.0 / source_count \n             ELSE 0 END, 2\n    ) as completion_percentage\nFROM migration_comparison\nORDER BY table_name;",
      explanation: "Record count validation is essential to verify migration completeness. This query provides a clear comparison between source and target systems, helping identify any data loss or unexpected duplicates during the migration process."
    },
    {
      id: 9,
      difficulty: "Basic",
      question: "During migration, you encounter an error: 'String or binary data would be truncated.' Describe the steps to identify which column is causing the issue.",
      answer: "-- Step 1: Check target table column lengths\nSELECT \n    COLUMN_NAME,\n    DATA_TYPE,\n    CHARACTER_MAXIMUM_LENGTH\nFROM INFORMATION_SCHEMA.COLUMNS\nWHERE TABLE_NAME = 'target_table_name'\n  AND DATA_TYPE IN ('varchar', 'char', 'nvarchar', 'nchar')\nORDER BY CHARACTER_MAXIMUM_LENGTH;\n\n-- Step 2: Check source data lengths\nSELECT \n    MAX(LEN(first_name)) as max_first_name_length,\n    MAX(LEN(last_name)) as max_last_name_length,\n    MAX(LEN(address)) as max_address_length\nFROM staging_citizens;\n\n-- Step 3: Find records that exceed target limits\nSELECT \n    citizen_id,\n    first_name,\n    LEN(first_name) as first_name_length\nFROM staging_citizens\nWHERE LEN(first_name) > 50;  -- Replace 50 with actual target column length",
      explanation: "Systematic troubleshooting prevents data loss. First identify column constraints in the target table, then find the maximum lengths in source data, and finally locate specific records that exceed the limits. This approach helps you decide whether to expand column sizes or truncate data safely."
    },
    {
      id: 10,
      difficulty: "Basic",
      question: "You notice that phone numbers in the source data have different formats. Write a query to identify all the different patterns and their frequency.",
      answer: "SELECT \n    CASE \n        WHEN phone LIKE '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' THEN 'XXX-XXX-XXXX'\n        WHEN phone LIKE '([0-9][0-9][0-9]) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' THEN '(XXX) XXX-XXXX'\n        WHEN phone LIKE '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9][0-9]' THEN 'XXX.XXX.XXXX'\n        WHEN phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' THEN 'XXXXXXXXXX'\n        WHEN phone LIKE '+1[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' THEN '+1XXXXXXXXXX'\n        ELSE 'OTHER/INVALID'\n    END as phone_pattern,\n    COUNT(*) as frequency,\n    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage,\n    MIN(phone) as example\nFROM contacts\nWHERE phone IS NOT NULL AND TRIM(phone) <> ''\nGROUP BY \n    CASE \n        WHEN phone LIKE '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' THEN 'XXX-XXX-XXXX'\n        WHEN phone LIKE '([0-9][0-9][0-9]) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' THEN '(XXX) XXX-XXXX'\n        WHEN phone LIKE '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9][0-9]' THEN 'XXX.XXX.XXXX'\n        WHEN phone LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' THEN 'XXXXXXXXXX'\n        WHEN phone LIKE '+1[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' THEN '+1XXXXXXXXXX'\n        ELSE 'OTHER/INVALID'\n    END\nORDER BY frequency DESC;",
      explanation: "Pattern analysis helps understand data inconsistencies before creating standardization rules. This query categorizes phone formats and shows their distribution, providing the information needed to design appropriate data transformation logic."
    },
    {
      id: 11,
      difficulty: "Intermediate",
      question: "During migration, you discover that addresses are entered inconsistently (e.g., 'Street' vs 'St', 'Avenue' vs 'Ave'). Create a standardization approach to clean this data.",
      answer: "-- Create standardization function\nCREATE FUNCTION StandardizeAddress(@address NVARCHAR(200))\nRETURNS NVARCHAR(200)\nAS\nBEGIN\n    DECLARE @cleaned NVARCHAR(200) = UPPER(TRIM(@address));\n    \n    -- Standardize street types\n    SET @cleaned = REPLACE(@cleaned, ' STREET', ' ST');\n    SET @cleaned = REPLACE(@cleaned, ' AVENUE', ' AVE');\n    SET @cleaned = REPLACE(@cleaned, ' BOULEVARD', ' BLVD');\n    SET @cleaned = REPLACE(@cleaned, ' DRIVE', ' DR');\n    SET @cleaned = REPLACE(@cleaned, ' ROAD', ' RD');\n    SET @cleaned = REPLACE(@cleaned, ' LANE', ' LN');\n    SET @cleaned = REPLACE(@cleaned, ' COURT', ' CT');\n    \n    -- Standardize directions\n    SET @cleaned = REPLACE(@cleaned, ' NORTH ', ' N ');\n    SET @cleaned = REPLACE(@cleaned, ' SOUTH ', ' S ');\n    SET @cleaned = REPLACE(@cleaned, ' EAST ', ' E ');\n    SET @cleaned = REPLACE(@cleaned, ' WEST ', ' W ');\n    \n    -- Clean up extra spaces\n    WHILE CHARINDEX('  ', @cleaned) > 0\n        SET @cleaned = REPLACE(@cleaned, '  ', ' ');\n    \n    RETURN LTRIM(RTRIM(@cleaned));\nEND;\n\n-- Apply standardization and track changes\nUPDATE staging_properties\nSET \n    address_standardized = dbo.StandardizeAddress(address),\n    address_changed = CASE \n        WHEN dbo.StandardizeAddress(address) <> UPPER(TRIM(address)) THEN 'YES'\n        ELSE 'NO'\n    END;\n\n-- Review standardization results\nSELECT \n    address_changed,\n    COUNT(*) as record_count,\n    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage\nFROM staging_properties\nGROUP BY address_changed;",
      explanation: "Address standardization improves data quality and enables better matching. This approach creates reusable transformation logic, applies it systematically, and tracks which records were modified for audit purposes."
    },
    {
      id: 12,
      difficulty: "Intermediate",
      question: "You need to research how to handle duplicate citizen records where the same person might be entered with slight name variations. Design a detection strategy.",
      answer: "-- Step 1: Create a function to clean names for comparison\nCREATE FUNCTION CleanNameForMatching(@name NVARCHAR(100))\nRETURNS NVARCHAR(100)\nAS\nBEGIN\n    DECLARE @cleaned NVARCHAR(100) = UPPER(TRIM(@name));\n    \n    -- Remove common prefixes/suffixes\n    SET @cleaned = REPLACE(@cleaned, ' JR', '');\n    SET @cleaned = REPLACE(@cleaned, ' SR', '');\n    SET @cleaned = REPLACE(@cleaned, ' III', '');\n    SET @cleaned = REPLACE(@cleaned, ' II', '');\n    \n    -- Remove punctuation\n    SET @cleaned = REPLACE(@cleaned, '.', '');\n    SET @cleaned = REPLACE(@cleaned, ',', '');\n    SET @cleaned = REPLACE(@cleaned, '-', '');\n    \n    RETURN LTRIM(RTRIM(@cleaned));\nEND;\n\n-- Step 2: Find potential duplicates\nWITH cleaned_citizens AS (\n    SELECT \n        citizen_id,\n        first_name,\n        last_name,\n        date_of_birth,\n        dbo.CleanNameForMatching(first_name) as clean_first_name,\n        dbo.CleanNameForMatching(last_name) as clean_last_name\n    FROM staging_citizens\n    WHERE first_name IS NOT NULL AND last_name IS NOT NULL\n),\npotential_duplicates AS (\n    SELECT \n        clean_first_name,\n        clean_last_name,\n        date_of_birth,\n        COUNT(*) as duplicate_count,\n        STRING_AGG(CAST(citizen_id AS VARCHAR), ', ') as citizen_ids,\n        STRING_AGG(first_name + ' ' + last_name, ' | ') as name_variations\n    FROM cleaned_citizens\n    GROUP BY clean_first_name, clean_last_name, date_of_birth\n    HAVING COUNT(*) > 1\n)\nSELECT \n    clean_first_name + ' ' + clean_last_name as standardized_name,\n    date_of_birth,\n    duplicate_count,\n    citizen_ids,\n    name_variations\nFROM potential_duplicates\nORDER BY duplicate_count DESC, clean_last_name;\n\n-- Step 3: Review and flag duplicates\nUPDATE staging_citizens\nSET migration_status = 'POTENTIAL_DUPLICATE'\nWHERE citizen_id IN (\n    SELECT c.citizen_id\n    FROM cleaned_citizens c\n    INNER JOIN potential_duplicates pd \n        ON c.clean_first_name = pd.clean_first_name\n        AND c.clean_last_name = pd.clean_last_name\n        AND c.date_of_birth = pd.date_of_birth\n);",
      explanation: "Duplicate detection requires fuzzy matching techniques to handle name variations. This approach standardizes names by removing common suffixes and punctuation, then groups by cleaned names and birth dates to identify likely duplicates for manual review."
    },
    {
      id: 13,
      difficulty: "Basic",
      question: "Write a validation query to ensure all required fields are populated before migrating citizen records to the target system.",
      answer: "SELECT \n    'Missing first_name' as validation_error,\n    COUNT(*) as error_count\nFROM staging_citizens\nWHERE first_name IS NULL OR TRIM(first_name) = ''\n\nUNION ALL\n\nSELECT \n    'Missing last_name',\n    COUNT(*)\nFROM staging_citizens\nWHERE last_name IS NULL OR TRIM(last_name) = ''\n\nUNION ALL\n\nSELECT \n    'Missing date_of_birth',\n    COUNT(*)\nFROM staging_citizens\nWHERE date_of_birth IS NULL\n\nUNION ALL\n\nSELECT \n    'Invalid email format',\n    COUNT(*)\nFROM staging_citizens\nWHERE email IS NOT NULL \n  AND email NOT LIKE '%@%.%'\n  AND TRIM(email) <> ''\n\nORDER BY error_count DESC;",
      explanation: "Data validation prevents poor quality data from entering the production system. This query checks multiple validation rules and provides a summary of issues that need to be addressed before migration can proceed."
    },
    {
      id: 14,
      difficulty: "Basic",
      question: "Create a quality control check to verify that all migrated permit records have valid relationships to existing properties.",
      answer: "-- Check for permits without valid property references\nSELECT \n    p.permit_id,\n    p.permit_number,\n    p.property_id,\n    'Missing property reference' as issue\nFROM permits p\nLEFT JOIN properties pr ON p.property_id = pr.property_id\nWHERE pr.property_id IS NULL\n  AND p.property_id IS NOT NULL\n\nUNION ALL\n\n-- Check for permits with NULL property_id where it should be required\nSELECT \n    permit_id,\n    permit_number,\n    property_id,\n    'Property ID is NULL'\nFROM permits\nWHERE property_id IS NULL\n  AND permit_type IN ('Building', 'Renovation', 'Demolition')  -- Types that require property\n\nORDER BY permit_id;",
      explanation: "Referential integrity checks ensure data relationships are maintained during migration. This validation identifies orphaned records and missing required references that could cause problems in the target system."
    },
    {
      id: 15,
      difficulty: "Intermediate",
      question: "Design a comprehensive data quality report that shows completion rates, data consistency, and potential issues across all migrated tables.",
      answer: "-- Comprehensive data quality assessment\nWITH table_completeness AS (\n    SELECT \n        'Citizens' as table_name,\n        COUNT(*) as total_records,\n        SUM(CASE WHEN first_name IS NOT NULL AND TRIM(first_name) <> '' THEN 1 ELSE 0 END) as complete_first_name,\n        SUM(CASE WHEN last_name IS NOT NULL AND TRIM(last_name) <> '' THEN 1 ELSE 0 END) as complete_last_name,\n        SUM(CASE WHEN date_of_birth IS NOT NULL THEN 1 ELSE 0 END) as complete_dob,\n        SUM(CASE WHEN phone IS NOT NULL AND TRIM(phone) <> '' THEN 1 ELSE 0 END) as complete_phone\n    FROM citizens\n    \n    UNION ALL\n    \n    SELECT \n        'Properties',\n        COUNT(*),\n        SUM(CASE WHEN address IS NOT NULL AND TRIM(address) <> '' THEN 1 ELSE 0 END),\n        SUM(CASE WHEN owner_name IS NOT NULL AND TRIM(owner_name) <> '' THEN 1 ELSE 0 END),\n        SUM(CASE WHEN assessed_value IS NOT NULL AND assessed_value > 0 THEN 1 ELSE 0 END),\n        SUM(CASE WHEN property_type IS NOT NULL AND TRIM(property_type) <> '' THEN 1 ELSE 0 END)\n    FROM properties\n    \n    UNION ALL\n    \n    SELECT \n        'Permits',\n        COUNT(*),\n        SUM(CASE WHEN permit_number IS NOT NULL AND TRIM(permit_number) <> '' THEN 1 ELSE 0 END),\n        SUM(CASE WHEN permit_type IS NOT NULL AND TRIM(permit_type) <> '' THEN 1 ELSE 0 END),\n        SUM(CASE WHEN issue_date IS NOT NULL THEN 1 ELSE 0 END),\n        SUM(CASE WHEN property_id IS NOT NULL THEN 1 ELSE 0 END)\n    FROM permits\n)\nSELECT \n    table_name,\n    total_records,\n    ROUND(complete_first_name * 100.0 / total_records, 2) as field1_completion_pct,\n    ROUND(complete_last_name * 100.0 / total_records, 2) as field2_completion_pct,\n    ROUND(complete_dob * 100.0 / total_records, 2) as field3_completion_pct,\n    ROUND(complete_phone * 100.0 / total_records, 2) as field4_completion_pct,\n    CASE \n        WHEN (complete_first_name + complete_last_name + complete_dob + complete_phone) * 100.0 / (total_records * 4) >= 95 THEN 'EXCELLENT'\n        WHEN (complete_first_name + complete_last_name + complete_dob + complete_phone) * 100.0 / (total_records * 4) >= 85 THEN 'GOOD'\n        WHEN (complete_first_name + complete_last_name + complete_dob + complete_phone) * 100.0 / (total_records * 4) >= 70 THEN 'FAIR'\n        ELSE 'POOR'\n    END as overall_quality_rating\nFROM table_completeness\nORDER BY table_name;\n\n-- Additional consistency checks\nSELECT \n    'Data Consistency Issues' as check_type,\n    COUNT(*) as issue_count\nFROM (\n    SELECT 'Duplicate permit numbers' as issue FROM permits GROUP BY permit_number HAVING COUNT(*) > 1\n    UNION ALL\n    SELECT 'Future dates' FROM permits WHERE issue_date > GETDATE()\n    UNION ALL\n    SELECT 'Invalid phone formats' FROM citizens WHERE phone NOT LIKE '([0-9][0-9][0-9]) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' AND phone IS NOT NULL\n) issues;",
      explanation: "Comprehensive quality reporting provides stakeholders with confidence in the migrated data. This report measures completeness rates, identifies consistency issues, and provides an overall quality rating for each table to guide any necessary cleanup efforts."
    },
    {
      id: 16,
      difficulty: "Intermediate",
      question: "Create a before-and-after comparison process to verify that data transformations during migration preserved the essential information correctly.",
      answer: "-- Create comparison framework\nWITH source_summary AS (\n    SELECT \n        'Citizens' as table_name,\n        COUNT(*) as record_count,\n        COUNT(DISTINCT first_name + last_name + CAST(date_of_birth AS VARCHAR)) as unique_people,\n        AVG(LEN(ISNULL(first_name, '') + ISNULL(last_name, ''))) as avg_name_length,\n        SUM(CASE WHEN phone IS NOT NULL THEN 1 ELSE 0 END) as records_with_phone\n    FROM source_citizens\n    \n    UNION ALL\n    \n    SELECT \n        'Properties',\n        COUNT(*),\n        COUNT(DISTINCT address),\n        AVG(LEN(ISNULL(address, ''))),\n        SUM(CASE WHEN assessed_value > 0 THEN 1 ELSE 0 END)\n    FROM source_properties\n),\ntarget_summary AS (\n    SELECT \n        'Citizens' as table_name,\n        COUNT(*) as record_count,\n        COUNT(DISTINCT first_name + last_name + CAST(date_of_birth AS VARCHAR)) as unique_people,\n        AVG(LEN(ISNULL(first_name, '') + ISNULL(last_name, ''))) as avg_name_length,\n        SUM(CASE WHEN phone IS NOT NULL THEN 1 ELSE 0 END) as records_with_phone\n    FROM citizens\n    \n    UNION ALL\n    \n    SELECT \n        'Properties',\n        COUNT(*),\n        COUNT(DISTINCT address),\n        AVG(LEN(ISNULL(address, ''))),\n        SUM(CASE WHEN assessed_value > 0 THEN 1 ELSE 0 END)\n    FROM properties\n)\nSELECT \n    s.table_name,\n    s.record_count as source_records,\n    t.record_count as target_records,\n    t.record_count - s.record_count as record_difference,\n    s.unique_people as source_unique,\n    t.unique_people as target_unique,\n    ROUND(s.avg_name_length, 2) as source_avg_length,\n    ROUND(t.avg_name_length, 2) as target_avg_length,\n    s.records_with_phone as source_with_phone,\n    t.records_with_phone as target_with_phone,\n    CASE \n        WHEN s.record_count = t.record_count AND s.unique_people = t.unique_people THEN 'PASS'\n        WHEN ABS(s.record_count - t.record_count) <= s.record_count * 0.01 THEN 'ACCEPTABLE'\n        ELSE 'REVIEW REQUIRED'\n    END as validation_status\nFROM source_summary s\nINNER JOIN target_summary t ON s.table_name = t.table_name\nORDER BY s.table_name;\n\n-- Sample data verification\nSELECT \n    'Sample Data Verification' as check_type,\n    source_citizen_id,\n    source_first_name,\n    target_first_name,\n    source_last_name,\n    target_last_name,\n    CASE \n        WHEN source_first_name = target_first_name AND source_last_name = target_last_name THEN 'MATCH'\n        ELSE 'MISMATCH'\n    END as data_integrity\nFROM (\n    SELECT TOP 10\n        sc.citizen_id as source_citizen_id,\n        sc.first_name as source_first_name,\n        sc.last_name as source_last_name,\n        tc.first_name as target_first_name,\n        tc.last_name as target_last_name\n    FROM source_citizens sc\n    INNER JOIN citizens tc ON sc.citizen_id = tc.source_citizen_id\n    ORDER BY sc.citizen_id\n) sample_comparison;",
      explanation: "Before-and-after comparisons ensure migration accuracy by validating that essential data characteristics are preserved. This process checks record counts, uniqueness, data patterns, and samples actual content to verify transformation logic worked correctly."
    },
    {
      id: 17,
      difficulty: "Basic",
      question: "You need to validate that all property records have valid latitude and longitude coordinates. Write a query to identify records with missing or invalid coordinates.",
      answer: "SELECT \n    property_id,\n    address,\n    latitude,\n    longitude,\n    CASE \n        WHEN latitude IS NULL THEN 'Missing latitude'\n        WHEN longitude IS NULL THEN 'Missing longitude'\n        WHEN latitude < -90 OR latitude > 90 THEN 'Invalid latitude range'\n        WHEN longitude < -180 OR longitude > 180 THEN 'Invalid longitude range'\n        WHEN latitude = 0 AND longitude = 0 THEN 'Default coordinates (0,0)'\n        ELSE 'Valid coordinates'\n    END as coordinate_status\nFROM properties\nWHERE latitude IS NULL \n   OR longitude IS NULL\n   OR latitude < -90 OR latitude > 90\n   OR longitude < -180 OR longitude > 180\n   OR (latitude = 0 AND longitude = 0)\nORDER BY property_id;",
      explanation: "Coordinate validation ensures location data quality before migration. This query identifies common geospatial data issues like missing values, out-of-range coordinates, and default (0,0) coordinates that need to be corrected."
    },
    {
      id: 18,
      difficulty: "Basic",
      question: "During migration, you need to convert address strings to coordinates using a geocoding service. Write a query to identify which properties need geocoding.",
      answer: "SELECT \n    property_id,\n    address,\n    city,\n    state,\n    zip_code,\n    latitude,\n    longitude,\n    CASE \n        WHEN address IS NULL OR TRIM(address) = '' THEN 'Missing address - cannot geocode'\n        WHEN latitude IS NULL OR longitude IS NULL THEN 'Needs geocoding'\n        WHEN latitude = 0 AND longitude = 0 THEN 'Needs re-geocoding (default coordinates)'\n        ELSE 'Has coordinates'\n    END as geocoding_status,\n    -- Create full address for geocoding service\n    CASE \n        WHEN address IS NOT NULL AND TRIM(address) <> '' THEN\n            TRIM(address) + ', ' + \n            ISNULL(city, '') + ', ' + \n            ISNULL(state, '') + ' ' + \n            ISNULL(zip_code, '')\n        ELSE NULL\n    END as full_address_for_geocoding\nFROM properties\nWHERE (latitude IS NULL OR longitude IS NULL OR (latitude = 0 AND longitude = 0))\n  AND address IS NOT NULL AND TRIM(address) <> ''\nORDER BY property_id;",
      explanation: "Geocoding preparation identifies properties that need coordinate assignment and formats addresses for external geocoding services. This helps plan the geocoding process and ensures complete location data in the target system."
    },
    {
      id: 19,
      difficulty: "Intermediate",
      question: "You need to validate that migrated property coordinates fall within the correct city boundaries. Write a query to check if coordinates are within a reasonable geographic area for your city.",
      answer: "-- Define city boundary box (example coordinates for a typical city)\nDECLARE @CityMinLat DECIMAL(10,7) = 39.0000;  -- Replace with actual city bounds\nDECLARE @CityMaxLat DECIMAL(10,7) = 39.5000;\nDECLARE @CityMinLon DECIMAL(10,7) = -84.8000;\nDECLARE @CityMaxLon DECIMAL(10,7) = -84.2000;\n\nSELECT \n    property_id,\n    address,\n    latitude,\n    longitude,\n    CASE \n        WHEN latitude < @CityMinLat OR latitude > @CityMaxLat THEN 'Outside city latitude range'\n        WHEN longitude < @CityMinLon OR longitude > @CityMaxLon THEN 'Outside city longitude range'\n        WHEN latitude BETWEEN @CityMinLat AND @CityMaxLat \n             AND longitude BETWEEN @CityMinLon AND @CityMaxLon THEN 'Within city bounds'\n        ELSE 'Unknown issue'\n    END as boundary_check,\n    -- Calculate approximate distance from city center for reference\n    CASE \n        WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN\n            SQRT(\n                POWER((latitude - (@CityMinLat + @CityMaxLat) / 2) * 69, 2) +  -- 69 miles per degree lat\n                POWER((longitude - (@CityMinLon + @CityMaxLon) / 2) * 54.6, 2)   -- ~54.6 miles per degree lon at this latitude\n            )\n        ELSE NULL\n    END as approx_miles_from_center\nFROM properties\nWHERE latitude IS NOT NULL AND longitude IS NOT NULL\n  AND (latitude < @CityMinLat OR latitude > @CityMaxLat \n       OR longitude < @CityMinLon OR longitude > @CityMaxLon)\nORDER BY boundary_check, approx_miles_from_center DESC;\n\n-- Summary of boundary validation results\nSELECT \n    CASE \n        WHEN latitude < @CityMinLat OR latitude > @CityMaxLat THEN 'Outside latitude range'\n        WHEN longitude < @CityMinLon OR longitude > @CityMaxLon THEN 'Outside longitude range'\n        ELSE 'Within bounds'\n    END as validation_result,\n    COUNT(*) as property_count,\n    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage\nFROM properties\nWHERE latitude IS NOT NULL AND longitude IS NOT NULL\nGROUP BY \n    CASE \n        WHEN latitude < @CityMinLat OR latitude > @CityMaxLat THEN 'Outside latitude range'\n        WHEN longitude < @CityMinLon OR longitude > @CityMaxLon THEN 'Outside longitude range'\n        ELSE 'Within bounds'\n    END\nORDER BY property_count DESC;",
      explanation: "Geographic boundary validation ensures coordinates make sense for your city's location. This query uses a bounding box approach to identify properties with coordinates outside the expected area, which likely indicates geocoding errors that need correction."
    },
    {
      id: 20,
      difficulty: "Intermediate",
      question: "Create a spatial data quality report that analyzes the distribution of geocoded properties across different neighborhoods or districts in your city.",
      answer: "-- Spatial distribution analysis by district/neighborhood\nWITH coordinate_analysis AS (\n    SELECT \n        p.property_id,\n        p.address,\n        p.latitude,\n        p.longitude,\n        p.neighborhood,\n        p.district,\n        -- Group coordinates into geographic clusters for analysis\n        CASE \n            WHEN latitude IS NULL OR longitude IS NULL THEN 'No Coordinates'\n            WHEN latitude = 0 AND longitude = 0 THEN 'Default Coordinates'\n            ELSE 'Has Valid Coordinates'\n        END as coordinate_status,\n        -- Create rough geographic quadrants for distribution analysis\n        CASE \n            WHEN latitude IS NOT NULL AND longitude IS NOT NULL \n                 AND latitude <> 0 AND longitude <> 0 THEN\n                CASE \n                    WHEN latitude >= 39.25 AND longitude >= -84.5 THEN 'Northeast'\n                    WHEN latitude >= 39.25 AND longitude < -84.5 THEN 'Northwest'\n                    WHEN latitude < 39.25 AND longitude >= -84.5 THEN 'Southeast'\n                    WHEN latitude < 39.25 AND longitude < -84.5 THEN 'Southwest'\n                    ELSE 'Outside City'\n                END\n            ELSE 'Unknown Location'\n        END as geographic_quadrant\n    FROM properties p\n),\ndistrict_summary AS (\n    SELECT \n        ISNULL(district, 'Unknown District') as district,\n        COUNT(*) as total_properties,\n        SUM(CASE WHEN coordinate_status = 'Has Valid Coordinates' THEN 1 ELSE 0 END) as geocoded_properties,\n        SUM(CASE WHEN coordinate_status = 'No Coordinates' THEN 1 ELSE 0 END) as missing_coordinates,\n        SUM(CASE WHEN coordinate_status = 'Default Coordinates' THEN 1 ELSE 0 END) as default_coordinates,\n        COUNT(DISTINCT geographic_quadrant) as quadrants_covered\n    FROM coordinate_analysis\n    GROUP BY district\n),\nquadrant_distribution AS (\n    SELECT \n        geographic_quadrant,\n        COUNT(*) as property_count,\n        COUNT(DISTINCT district) as districts_in_quadrant,\n        ROUND(AVG(latitude), 4) as avg_latitude,\n        ROUND(AVG(longitude), 4) as avg_longitude\n    FROM coordinate_analysis\n    WHERE coordinate_status = 'Has Valid Coordinates'\n    GROUP BY geographic_quadrant\n)\n-- District-level geocoding completeness report\nSELECT \n    'District Analysis' as report_section,\n    district,\n    total_properties,\n    geocoded_properties,\n    missing_coordinates,\n    default_coordinates,\n    ROUND(geocoded_properties * 100.0 / total_properties, 2) as geocoding_completion_pct,\n    quadrants_covered,\n    CASE \n        WHEN geocoded_properties * 100.0 / total_properties >= 95 THEN 'Excellent'\n        WHEN geocoded_properties * 100.0 / total_properties >= 85 THEN 'Good'\n        WHEN geocoded_properties * 100.0 / total_properties >= 70 THEN 'Fair'\n        ELSE 'Needs Improvement'\n    END as geocoding_quality_rating\nFROM district_summary\nWHERE total_properties > 0\n\nUNION ALL\n\n-- Geographic distribution summary\nSELECT \n    'Geographic Distribution',\n    geographic_quadrant,\n    property_count,\n    districts_in_quadrant,\n    NULL,  -- missing_coordinates not applicable\n    NULL,  -- default_coordinates not applicable\n    ROUND(property_count * 100.0 / SUM(property_count) OVER(), 2),\n    NULL,  -- quadrants_covered not applicable\n    CAST(avg_latitude AS VARCHAR(20)) + ', ' + CAST(avg_longitude AS VARCHAR(20))\nFROM quadrant_distribution\n\nORDER BY report_section, \n         CASE WHEN report_section = 'District Analysis' THEN geocoding_completion_pct ELSE property_count END DESC;\n\n-- Data quality alerts\nSELECT \n    'ALERT: ' + \n    CASE \n        WHEN geocoding_completion_pct < 80 THEN 'Low geocoding rate in ' + district\n        WHEN missing_coordinates > 50 THEN 'High number of missing coordinates in ' + district\n        WHEN default_coordinates > 10 THEN 'Multiple default coordinates in ' + district\n        ELSE 'Quality check passed for ' + district\n    END as quality_alert,\n    geocoding_completion_pct,\n    missing_coordinates,\n    default_coordinates\nFROM district_summary\nWHERE geocoding_completion_pct < 80 \n   OR missing_coordinates > 50 \n   OR default_coordinates > 10\nORDER BY geocoding_completion_pct ASC;",
      explanation: "Spatial data quality reporting helps identify geographic patterns and coverage gaps in geocoded data. This analysis shows completion rates by district, geographic distribution, and flags areas needing attention, ensuring comprehensive spatial data coverage across the city."
    }

];

  const getDifficultyColor = (difficulty: DifficultyLevel): 'success' | 'warning' | 'error' | 'info' => {
    switch (difficulty) {
      case 'Basic': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      case 'Expert': return 'info';
      default: return 'info';
    }
  };

  const flipCard = (cardIndex: number): void => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  const markAsKnown = (cardIndex: number): void => {
    setKnownCards(prev => new Set([...prev, cardIndex]));
    setStrugglingCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardIndex);
      return newSet;
    });
  };

  const markAsStruggling = (cardIndex: number): void => {
    setStrugglingCards(prev => new Set([...prev, cardIndex]));
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardIndex);
      return newSet;
    });
  };

  const resetProgress = (): void => {
    setKnownCards(new Set());
    setStrugglingCards(new Set());
    setFlippedCards(new Set());
  };

  return (
    <Container maxWidth="xl" className={className} sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
          CivicPlus SQL Flashcards
        </Typography>
        <Typography variant="h6" color="white" mb={3}>
          Practice SQL questions for Data Specialist interview preparation
        </Typography>
        <Box mt={4} mb={4}>
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Click on cards to flip between questions and answers. Track your progress with the knowledge buttons.
          </Alert>
        </Box>
        
        {/* Progress Stats */}
        <Grid container spacing={2} justifyContent="center" mb={3}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <ProgressCard elevation={3}>
              <Typography variant="h4" fontWeight="bold">
                {flashcards.length}
              </Typography>
              <Typography variant="body2">Total Cards</Typography>
            </ProgressCard>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }} elevation={3}>
              <Typography variant="h4" fontWeight="bold">
                {knownCards.size}
              </Typography>
              <Typography variant="body2">Known</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'error.light', color: 'error.contrastText' }} elevation={3}>
              <Typography variant="h4" fontWeight="bold">
                {strugglingCards.size}
              </Typography>
              <Typography variant="body2">Need Review</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }} elevation={3}>
              <Tooltip title="Reset all progress">
                <IconButton onClick={resetProgress} color="primary" size="large">
                  <RotateLeft />
                </IconButton>
              </Tooltip>
              <Typography variant="body2">Reset</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Flashcards Grid */}
      <Grid container spacing={3}>
        {flashcards.map((card: Flashcard, index: number) => {
          const isFlipped: boolean = flippedCards.has(index);
          const isKnown: boolean = knownCards.has(index);
          const isStruggling: boolean = strugglingCards.has(index);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.id}>
              <StyledCard elevation={4}>
                {/* Card Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Chip 
                      label={card.difficulty} 
                      color={getDifficultyColor(card.difficulty)}
                      size="small"
                      variant="filled"
                    />
                    <Stack direction="row" spacing={0.5}>
                      {isKnown && (
                        <Tooltip title="Known">
                          <CheckCircle color="success" fontSize="small" />
                        </Tooltip>
                      )}
                      {isStruggling && (
                        <Tooltip title="Needs Review">
                          <Cancel color="error" fontSize="small" />
                        </Tooltip>
                      )}
                    </Stack>
                  </Stack>
                  <Typography variant="subtitle2" color="text.secondary">
                    Question {card.id}
                  </Typography>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  {!isFlipped ? (
                    // Question Side
                    <Box height="100%">
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <BookIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle2" fontWeight="medium">
                          Question
                        </Typography>
                      </Stack>
                      <Typography 
                        variant="body2" 
                        color="text.primary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {card.question}
                      </Typography>
                    </Box>
                  ) : (
                    // Answer Side
                    <Stack spacing={2} height="100%">
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                          <CodeIcon color="success" fontSize="small" />
                          <Typography variant="subtitle2" fontWeight="medium">
                            SQL Solution
                          </Typography>
                        </Stack>
                        <CodeBlock elevation={1}>
                          {card.answer}
                        </CodeBlock>
                      </Box>
                      <Box flexGrow={1}>
                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                          <Lightbulb color="warning" fontSize="small" />
                          <Typography variant="subtitle2" fontWeight="medium">
                            Explanation
                          </Typography>
                        </Stack>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {card.explanation}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </CardContent>

                {/* Card Actions */}
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Stack spacing={1} width="100%">
                    <Button
                      onClick={() => flipCard(index)}
                      variant="contained"
                      fullWidth
                      size="small"
                    >
                      {isFlipped ? 'Show Question' : 'Show Answer'}
                    </Button>
                    <Stack direction="row" spacing={1}>
                      <Button
                        onClick={() => markAsStruggling(index)}
                        variant={isStruggling ? "contained" : "outlined"}
                        color="error"
                        size="small"
                        fullWidth
                        startIcon={<Cancel />}
                      >
                        Review
                      </Button>
                      <Button
                        onClick={() => markAsKnown(index)}
                        variant={isKnown ? "contained" : "outlined"}
                        color="success"
                        size="small"
                        fullWidth
                        startIcon={<CheckCircle />}
                      >
                        Know
                      </Button>
                    </Stack>
                  </Stack>
                </CardActions>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default SQLFlashcardGrid;