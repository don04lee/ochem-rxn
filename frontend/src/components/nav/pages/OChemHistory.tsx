import { Col, Container, Row } from "react-bootstrap";
import "../../../index.css";

export default function OChemHistory(props) {
  return (
    <div className="center" style={{ textAlign: "center" }}>
      <h1>Reaction History</h1>
      <br />
      <Container fluid={true}>
        <Row>
          <Col xs={12}>
            <p></p>
            <h3>Placeholder -- take from PostgreSQL</h3>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
