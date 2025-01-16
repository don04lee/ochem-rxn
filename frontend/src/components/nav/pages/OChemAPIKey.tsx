import { Container, Row, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../../../index.css";

export default function OChemAPIKey(props) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="center" style={{ textAlign: "center" }}>
      <h1>API Key</h1>
      <br />
      <p>
        If you don't have an API Key, find it from the{" "}
        <a href="https://rxn.app.accelerate.science/rxn/account/keys">
          IBM RXN for Chemistry page
        </a>
        .
      </p>
      <Container fluid={true}>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Enter API Key here"
            />
            <br></br>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
