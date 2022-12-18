import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default function ButtonProcess({message="button", flag=false, refe=null, ...props}){
    return(
        <Button ref={refe} {...props}>
            <span>{message} </span>
            {flag && (
                <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </Button>
    )
}