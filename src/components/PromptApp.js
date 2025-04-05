import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const PromptApp = () => {
  const [query, setQuery] = useState(""); // Stores user input
  const [selectedModels, setSelectedModels] = useState(["PerplexityAI", "Phind"]); // Default models

  // AI Model URLs (Text Query Supported)
  const aiModels = {
    PerplexityAI: "https://www.perplexity.ai/search?q=",
    Phind: "https://www.phind.com/search?q=",
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  // Handle AI Model Redirection
  const handleRedirect = () => {
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }
    if (selectedModels.length === 0) {
      alert("Please select at least one AI model!");
      return;
    }

    selectedModels.forEach((model) => {
      let url = aiModels[model];
      if (!url) return; // Skip if model URL is not defined

      // Append query to URL
      url += encodeURIComponent(query);

      // Open AI model in a new tab
      window.open(url, "_blank");
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">AI Hub - Multi AI Prompting</h2>

      {/* Text Input Field */}
      <Form.Group className="mb-3">
        <Form.Label>Enter your prompt:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>

      {/* AI Model Selection */}
      <Row>
        {Object.keys(aiModels).map((model) => (
          <Col key={model} xs={6} md={4} className="mb-2">
            <Form.Check
              type="checkbox"
              label={model}
              checked={selectedModels.includes(model)}
              onChange={() => handleCheckboxChange(model)}
            />
          </Col>
        ))}
      </Row>

      {/* Execute Search Button */}
      <Button variant="primary" className="mt-3" onClick={handleRedirect}>
        Execute Search
      </Button>
    </Container>
  );
};

export default PromptApp;
