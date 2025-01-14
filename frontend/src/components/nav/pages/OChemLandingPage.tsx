import { Col, Container, Row } from "react-bootstrap";

export default function OChemLanding(props) {
  return (
    <div>
      <h1>Organic Chemistry Reaction Predictor!</h1>
      <br />
      <Container fluid={true}>
        <Row>
          <Col xs={12} lg={4} xl={6}>
            <p>
              Organic Chemistry Reaction Predictor is a website that uses the{" "}
              <a href="https://rxn.app.accelerate.science/rxn">
                IBM RXN for Chemistry
              </a>{" "}
              to predict organic chemistry reactions.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
