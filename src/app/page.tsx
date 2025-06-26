import DataMigrationComponent from "../components/DataMigration";
import Flashcard from "../components/Flashcards"
import SQLLearningComponent from "../components/SQLLearning"

export default function Home() {
  return (
    <>
      <SQLLearningComponent />
      <DataMigrationComponent />
      <Flashcard />
    </>
  );
}
