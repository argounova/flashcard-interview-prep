import GeospatialDataOverview from "@/components/GeospatialData";
import DataMigrationComponent from "../components/DataMigration";
import Flashcard from "../components/Flashcards"
import SQLLearningComponent from "../components/SQLLearning"
import SoftSkillsInterviewComponent from "../components/SoftSkills";
import JobDescriptionHighlights from "@/components/JobDescription";
import CivicPlusOverview from "@/components/CivicPlusInfo";
import InterviewBehavioralFAQ from "../components/InterviewBehavioralFAQ";

export default function Home() {
  return (
    <>
      <CivicPlusOverview />
      <InterviewBehavioralFAQ />
      <JobDescriptionHighlights />
      <SQLLearningComponent />
      <DataMigrationComponent />
      <GeospatialDataOverview />
      <Flashcard />
      <SoftSkillsInterviewComponent />
    </>
  );
}
