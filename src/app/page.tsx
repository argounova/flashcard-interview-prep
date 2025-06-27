import DataMigrationComponent from "../components/DataMigration";
import Flashcard from "../components/Flashcards"
import SQLLearningComponent from "../components/SQLLearning"
import InterviewPrepComponent from "../components/STARQuestions";

export default function Home() {
  return (
    <>
      <SQLLearningComponent />
      <DataMigrationComponent />
      <Flashcard />
      <InterviewPrepComponent />
    </>
  );
}
