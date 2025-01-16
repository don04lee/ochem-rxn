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
            <h3>From the Madison Cat Project...</h3>
            <p>
              "Madison Cat Project saves cats through partnerships with other
              shelters and our community. Whether it’s partnering with area
              shelters to bring in cats who need another chance or supporting
              farmers and other folks who need help managing their outdoor cat
              colonies by offering affordable spay/neuter surgeries and rehoming
              options, we help hundreds of cats (and people) each year!"
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
