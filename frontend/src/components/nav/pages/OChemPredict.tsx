import { Col, Container, Row, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import parse from "html-react-parser";
import "../../../index.css";

export default function OChemPredict(props) {
  const [value, setValue] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderMolecule = useCallback(() => {
    if (!window.RDKit) {
      console.error("RDKit is not loaded");
      return;
    }

    try {
      const mol = window.RDKit.get_mol(value);
      if (!mol) {
        setErrorMessage("Invalid molecule(s)");
        setSvg("");
        console.error("No molecule is found");
        return;
      }

      const svgOutput = mol.get_svg();
      setErrorMessage("");
      setSvg(svgOutput);
    } catch (error) {
      console.error("Invalid SMILES input:", error);
      setSvg("");
    }
  }, [value]);

  useEffect(() => {
    renderMolecule();
  }, [renderMolecule]);

  return (
    <div className="center" style={{ textAlign: "center" }}>
      <h1>Predict Products based on Reactants</h1>
      <br />
      <Container fluid={true}>
        <Row>
          <Col xs={12}>
            <p>
              Insert your reactants in{" "}
              <a href="https://en.wikipedia.org/wiki/Simplified_Molecular_Input_Line_Entry_System">
                SMILES
              </a>{" "}
              format, ie: BrBr.c1ccc2cc3ccccc3cc2c1
            </p>
            <p>
              There must be at least <strong>two</strong> reactants (separated
              by periods).
            </p>
            <h5>Type reactants here:</h5>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  value={value}
                  onChange={handleChange}
                  placeholder="Enter reactants here"
                />
                <br></br>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
              <h5 style={{ marginTop: "1rem" }}>Entered text: {value}</h5>
              {errorMessage ? (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {errorMessage}
                </p>
              ) : (
                <div id="output">{parse(svg)}</div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
