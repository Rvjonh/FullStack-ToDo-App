import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

import './homeStyle/homeStyle.scss';

import Logo from './home-assets/logo-todo-app.png';
import imgHome1 from './home-assets/monitoring-1.png';
import imgHome2 from './home-assets/monitoring-2.png';
import imgHome3 from './home-assets/monitoring-3.png';

import { useAppState } from "./../App";

export default function Home(){
    const { user } = useAppState();

    return(
        <main className="container d-flex flex-column justify-content-start align-items-center container-image-home" style={{flex:"1"}}>

            {user && <h2 className="text-left my-3">What's up?, {user}</h2>}

            <h3 className="my-3">Welcome to 'Todo' app</h3>

            <Figure className="mt-5 d-flex flex-column justify-content-start align-items-center">
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={Logo}
                />
                
                <Figure.Caption className='text-center fs-5'>
                    Work with 'To Do' to reach the goals you have to conquer.
                </Figure.Caption>
            </Figure>

            <Link to="/login" className="mt-5">
                <Button>
                    { user ?
                        <span>Keep moving on</span>
                        :
                        <span>Let's get started</span>
                    }
                </Button>
            </Link>

            <div className='w-100 container-images'>
                <Figure className="d-flex flex-column justify-content-start align-items-center">
                    <Figure.Image
                        className='image-home-1'
                        width={171}
                        height={180}
                        alt="171x180"
                        src={imgHome1}
                    />
                </Figure>

                <Figure className="d-flex flex-column justify-content-start align-items-center">
                    <Figure.Image
                        className='image-home-2'
                        width={171}
                        height={180}
                        alt="171x180"
                        src={imgHome2}
                    />
                </Figure>

                <Figure className="d-flex flex-column justify-content-start align-items-center">
                    <Figure.Image
                        className='image-home-3'
                        width={171}
                        height={180}
                        alt="171x180"
                        src={imgHome3}
                    />
                </Figure>
            </div>

        </main>
    )
}

