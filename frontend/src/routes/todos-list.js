import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import LoadingCards from './../extraComponents/loadingCard';
import NoLogged from "./../extraComponents/noLoggedMessage";
import AcceptModal,{ ConfirmNotification } from './../extraComponents/acceptedModal';

import VoidList from './todoComponents/voidTodoList';
import PanelControls from './todoComponents/panelControls';


import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import moment from 'moment';

import { useAppState } from "../App";

import TodoDataService from './../services/todo';
import { useUserLogged } from "./../hooks/useUserLogged";

export default function TodoList(){
    const isUsedLogged = useUserLogged();

    const { token, deleteTodo, updateCompleteTodo }= useAppState()

    const [items, setItems] = useState([])
    const [itemsCopy, setItemsCopy] = useState([])
    const [pendding, setPendding] = useState(true);
    const [notification, setNotification] = useState(false);

    useEffect(()=>{
        if(isUsedLogged){
            retriveTodos(token);
        }
    },[isUsedLogged, token])

    const retriveTodos = (token)=>{
        TodoDataService.getAll(token).then((res)=>{
            setItems(res.data);
            setItemsCopy(res.data);
            setPendding(false);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleDeleteItem = (id)=>{
        deleteTodo(id);
        setItems(items.filter((item, i)=>{
            return item.id !== id
        }))
        setItemsCopy(items.filter((item, i)=>{
            return item.id !== id
        }))
        setNotification(true);
    }

    const handleSetCompletedItem = (id)=>{
        updateCompleteTodo(id);
        setItems(items.map((item)=>{
            if(item.id === id){
                return {...item, completed:!item.completed}
            }
            return item;
        }))
    }

    if (!isUsedLogged){
        return(
            <NoLogged />
        )
    }

    if (pendding){
        return(
            <LoadingCards />
        )
    }
    
    return(
        <Container className="d-flex flex-column" style={{flex:"1"}}>
            
            <PanelControls items={items} setItems={setItems} itemsCopy={itemsCopy} setItemsCopy={setItemsCopy}/>

            {itemsCopy.length ?
                <TodoItemsList items={itemsCopy} 
                    handleDeleteItem={handleDeleteItem}
                    handleSetCompletedItem={handleSetCompletedItem}
                />
            :
                <VoidList />
            }

            <ConfirmNotification show={notification} setShow={setNotification}/>

        </Container>
    )
}

function TodoItemsList({items, handleDeleteItem=f=>f, handleSetCompletedItem=f=>f}){
    return(
        <Container style={{maxWidth:"600px", flex:"1"}}>
            {
            items.map((item, index)=>{
                return(
                    <Card key={item.id+"-"+index} className='mb-3'>
                        <Card.Body>
                            <div>
                                <Card.Header as="h5" className="d-flex justify-content-between">
                                    <Card.Title>{item.title}</Card.Title>
                                    {item.completed ? 
                                        (<button className="btn btn-success" style={{backgroundColor:"rgb(22,198,12)"}} onClick={()=>handleSetCompletedItem(item.id)}>
                                            &#9989;
                                        </button>)
                                        :
                                        (<button className="btn btn-light border" onClick={()=>handleSetCompletedItem(item.id)}>
                                            &#10004;
                                        </button>)
                                    }
                                </Card.Header>
                                <Card.Text><b>Memo: </b>{item.memo}</Card.Text>
                                <Card.Text>
                                    <b>Date: </b>
                                    {moment(item.created).format("Do MMMM YYYY")}
                                </Card.Text>
                            </div>
                            {item.completed ?
                            (   
                                <OverlayTrigger placement="top" overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            Locked due to <strong>completion</strong>
                                        </Tooltip>
                                    }>
                                    <Button variant="info" className="me-2" >
                                        Edit
                                    </Button>
                                </OverlayTrigger>
                            ):(
                                <Link to={`/todos/${item.id}`} state={{currentItem:item}}>
                                    <Button variant="info" className="me-2">
                                        Edit
                                    </Button>
                                </Link>
                            )}

                            <AcceptModal handleAccepted={()=>handleDeleteItem(item.id)}/>

                        </Card.Body>
                    </Card>
                )
            })
            }
        </Container>
    )
}