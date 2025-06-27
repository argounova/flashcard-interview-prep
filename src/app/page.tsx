import DataMigrationComponent from "../components/DataMigration";
import Flashcard from "../components/Flashcards"
import SQLLearningComponent from "../components/SQLLearning"
import SoftSkillsInterviewComponent from "../components/SoftSkills";
import JobDescriptionHighlights from "@/components/JobDescription";

export default function Home() {
  return (
    <>
      <SQLLearningComponent />
      <DataMigrationComponent />
      <Flashcard />
      <JobDescriptionHighlights />
      <SoftSkillsInterviewComponent />
    </>
  );
}
