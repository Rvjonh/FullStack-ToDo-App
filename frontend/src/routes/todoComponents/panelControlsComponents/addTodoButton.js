import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function AddTodoButton(){
    return(
        <Link to="/todos/add-todo" >
            <Button className='m-3 px-4 py-2'>
                Add Todo
            </Button>
        </Link>
    )
}