import React, { useState } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";

const AdminPage = ({ aiModels, setAiModels }) => {
  const [newModel, setNewModel] = useState({ name: "", url: "" });

  // Add AI Model
  const addModel = () => {
    if (!newModel.name || !newModel.url) {
      alert("Please enter both Name and URL!");
      return;
    }
    setAiModels([...aiModels, newModel]);
    setNewModel({ name: "", url: "" });
  };

  // Delete AI Model
  const removeModel = (name) => {
    setAiModels(aiModels.filter((model) => model.name !== name));
  };

  return (
    <Container>
      <h2>Manage AI Models</h2>

      {/* Form to Add AI Model */}
      <Form className="mb-3">
        <Form.Group>
          <Form.Label>AI Model Name:</Form.Label>
          <Form.Control
            type="text"
            value={newModel.name}
            onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>AI Model URL:</Form.Label>
          <Form.Control
            type="text"
            value={newModel.url}
            onChange={(e) => setNewModel({ ...newModel, url: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" onClick={addModel} className="mt-2">
          Add AI Model
        </Button>
      </Form>

      {/* List of AI Models */}
      <ListGroup>
        {aiModels.map((model) => (
          <ListGroup.Item key={model.name}>
            {model.name} - {model.url}
            <Button
              variant="danger"
              size="sm"
              className="float-end"
              onClick={() => removeModel(model.name)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminPage;
