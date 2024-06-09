import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CSVUploader from "./pages/CSVUploader.jsx";
import Index from "./pages/Index.jsx";
import ConfettiPage from "./pages/ConfettiPage.jsx";
import KanbanBoard from "./pages/KanbanBoard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/confetti" element={<ConfettiPage />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/csv-uploader" element={<CSVUploader />} />
      </Routes>
    </Router>
  );
}

export default App;
