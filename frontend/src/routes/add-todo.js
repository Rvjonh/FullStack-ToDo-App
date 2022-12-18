import { useState, useRef } from "react"
import { useLocation, useNavigate } from 'react-router-dom';

import ToTodosPanel from './todoComponents/toTodosPanel';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useAppState } from "../App";

import TodoDataService from './../services/todo';
import Container from "react-bootstrap/esm/Container";
import { useUserLogged } from "./../hooks/useUserLogged";

export default function AddTodo(){
    const isUserLogged = useUserLogged(null, "/login");

    const location = useLocation();
    const navigator = useNavigate();

    const { token } = useAppState();

    let editing = false;
    let initialTodoTitle = "";
    let initialTodoMemo = "";

    if(location.state && location.state.currentItem){
        editing = true;
        initialTodoTitle = location.state.currentItem.title;
        initialTodoMemo = location.state.currentItem.memo;
    }

    const [title, setTitle] = useState(initialTodoTitle);
    const [memo, setMemo] = useState(initialTodoMemo);
    const memoRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [errorSub, setErrorSub] = useState(false);


    const onChangeTitle = (e)=>{
        setTitle(e.target.value)
    }

    const onChangeMemo = (e)=>{
        setMemo(e.target.value)
    }

    const saveTodo = ()=>{
        if(!isThereTitle()){
            return;
        }
        let data = {
            title : title,
            memo : memo,
            completed : false
        }
        if(editing){
            TodoDataService.updateTodo(location.state.currentItem.id, data, token).then(res=>{
                setSubmitted(true);
            }).catch(err=>{
                console.log(err)
                setErrorSub({msg:'Error trying to edit item'});
            })
        }else{
            TodoDataService.createTodo(data, token).then((res)=>{
                setSubmitted(true);
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    const isThereTitle = ()=>{
        return title.length > 0;
    }

    const handleNextInput = (e, reference)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            reference.current.focus();
        }
    }

    const handleCancelTodo = ()=>{
        navigator('/todos')
    }

    if(!isUserLogged){
        return <></>;
    }

    return(
    <main className="container d-flex flex-column align-items-center justify-content-center ">
        {submitted ?
            (
                <ToTodosPanel />
            )
            :
            (
                <Form className="w-100 mt-5" style={{maxWidth:"600px"}} onSubmit={(e)=>e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label><h4>{editing ? "Edit" : "Create"} To-do</h4></Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            required
                            placeholder="e.g. buy gift tomorrow"
                            value={title}
                            onChange={onChangeTitle}
                            onKeyDown={(e)=>handleNextInput(e, memoRef)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={memo}
                            onChange={onChangeMemo}
                            ref={memoRef}
                        />
                    </Form.Group>

                    <Container className="d-flex justify-content-between">
                        <Button variant="primary" onClick={saveTodo}>
                            {editing ? "Edit" : "Add"} To-do
                        </Button>

                        <Button variant="danger" onClick={handleCancelTodo}>
                            Cancel {editing ? "Edit" : "Add"}
                        </Button>
                    </Container>
                </Form>
            )
        }
        {errorSub.msg && 
            <p className="w-100 text-center fs-4 text-danger border">
                &#128528; There was an error &#128064;
                {errorSub.msg}
            </p>
        }
    </main>
    )
}