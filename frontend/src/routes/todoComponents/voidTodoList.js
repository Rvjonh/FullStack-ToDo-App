import Container from 'react-bootstrap/Container';

export default function VoidList(){
    return(
        <Container className='d-flex justify-content-center align-items-center' style={{flex:"1"}}>
            <h2 className='pt-5'>There are no Todos yet</h2>
        </Container>
    )
}