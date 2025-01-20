import { Col, Container, Row, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "../../../index.css";

export default function OChemPredict(props) {
  const [reactants, setReactants] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReactants(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMessage === "") {
      console.log(reactants);
      // try {
      //   const response = await axios.post(
      //     "http://3.149.254.222:8000/predict",
      //     { reactants: reactants },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   setPrediction(response.data);
      //   console.log(response);
      // } catch (err) {
      //   setErrorMessage("An error occurred while predicting the product.");
      //   console.error(err);
      // }
    }
  };

  const renderMolecule = useCallback(() => {
    if (!window.RDKit) {
      console.error("RDKit is not loaded");
      return;
    }

    try {
      const mol = window.RDKit.get_mol(reactants);
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
  }, [reactants]);

  useEffect(() => {
    renderMolecule();
  }, [renderMolecule]);

  // useEffect(() => {
  //   try {
  //     const mol = window.RDKit.get_mol(p);
  //     if (!mol) {
  //       return;
  //     }

  //     const svgOutput = mol.get_svg();
  //     setErrorMessage("");
  //     setSvg(svgOutput);
  //   } catch (error) {
  //     console.error("Invalid SMILES input:", error);
  //     setSvg("");
  //   }
  // }, [prediction]);

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
                  value={reactants}
                  onChange={handleChange}
                  placeholder="Enter reactants here"
                />
                <br></br>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
              <h5 style={{ marginTop: "1rem" }}>Entered text: {reactants}</h5>
              {errorMessage ? (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {errorMessage}
                </p>
              ) : (
                <div id="output">{parse(svg)}</div>
              )}
              {prediction && (
                <div>
                  <h2>Prediction Result</h2>
                  <pre>{JSON.stringify(prediction, null, 2)}</pre>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
