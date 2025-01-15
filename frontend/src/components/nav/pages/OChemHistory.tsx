import { Col, Container, Row } from "react-bootstrap";

export default function OChemHistory(props) {
  return (
    <div>
      <h1>Reaction History</h1>
      <br />
      <Container fluid={true}>
        <Row>
          <Col xs={12} lg={4} xl={6}>
            <p>
              Interested in adopting a cat?{" "}
              <a
                target="_blank"
                href="https://www.madisoncatproject.org/browse-indoor"
              >
                See them here!
              </a>
            </p>
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
