import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder'

export default function LoadingCard(){
    return(
        <Container>
            <Alert variant="info">
                Loading...
            </Alert>
            <Card className="mb-3">
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="info" xs={2} />
                    <Placeholder.Button variant="danger" xs={2} />
                </Card.Body>
            </Card>
        </Container>
    )
}