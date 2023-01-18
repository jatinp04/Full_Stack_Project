import Container from "react-bootstrap/Container";
import './note.css'


export default function Note(props) {
  return (
    <Container className="note">
      <h3> {props.title}</h3>
      <p>{props.description}</p>
    </Container>
  );
}
