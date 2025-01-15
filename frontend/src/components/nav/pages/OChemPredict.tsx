import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";

export default function OChemPredict(props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <div>
      <h1>Predict Products based on Reactants</h1>
      <br />
      <Container fluid={true}>
        <Row>
          <Col xs={12} lg={4} xl={6}>
            <p>
              Insert your reactants in SMILES Format, ie:
              BrBr.c1ccc2cc3ccccc3cc2c1
            </p>
            <p>
              There must be at least <strong>two</strong> reactants (separated
              by periods).
            </p>
            <h3>Type reactants here:</h3>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  placeholder="Enter reactants here"
                />
                <p>Entered text: {value}</p>
                <button type="submit"></button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
