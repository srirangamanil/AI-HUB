import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import PromptApp from "./components/PromptApp";
import AdminPage from "./components/AdminPage";

const App = () => {
  const [aiModels, setAiModels] = useState([
    { name: "PerplexityAI", url: "https://www.perplexity.ai/search?q=" },
    { name: "Phind", url: "https://www.phind.com/search?q=" },
  ]);

  return (
    <Router>
      <Container className="mt-3">
        <Link to="/">
          <Button variant="primary" className="m-2">Home</Button>
        </Link>
        <Link to="/admin" target="_blank">
          <Button variant="secondary" className="m-2">Manage AI Models</Button>
        </Link>
      </Container>

      <Routes>
        <Route path="/" element={<PromptApp aiModels={aiModels} />} />
        <Route path="/admin" element={<AdminPage aiModels={aiModels} setAiModels={setAiModels} />} />
      </Routes>
    </Router>
  );
};

export default App;
