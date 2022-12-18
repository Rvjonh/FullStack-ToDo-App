import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layout/layout';

import Home from './routes/home';
import TodoList from './routes/todos-list';
import AddTodo from './routes/add-todo';
import SignUp from './routes/signup';
import Login from './routes/login';
import LoginEmail from './routes/loginEmail';
import LoginCode from './routes/loginCode';
import User from './routes/user';
import NoPage from './routes/NoPage';

import TodoDataService from './services/todo';

const GlobalState =  createContext();
export const useAppState = () => useContext(GlobalState);


export default function App(){
    
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);
    const [signUpProcess, setSignUpProcess] = useState({type:"wating"});

    const [notification, setNotification] = useState({title:"",text:""});

    async function login(user=null){
        TodoDataService.login(user).then(response =>{
            loadUserData(response.data.token, user.username)
        }).catch(e =>{
            setError(e.toString());
        })
    }

    const loadUserData = (token=null, username=null)=>{
        setToken(token);
        setUser(username);
        localStorage.setItem('token',token);
        localStorage.setItem('user', username);
        setError(null);
    }

    const isUserActive = ()=>{
        return user && token;
    }

    async function logout(){
        setToken(null);
        setUser(null);
        localStorage.setItem("token","");
        localStorage.setItem("user","");
    }

    async function signup(user=null){
        TodoDataService.signup(user).then(r=>{
            setSignUpProcess({type:"success"});
        }).catch(r=>{
            setSignUpProcess({type:"fail"});
        })
    }

    function deleteTodo(id){
        TodoDataService.deleteTodo(id, token).then(res=>{
            //executed correctly
        }).catch(err=>{
            console.log(err)
        })
    }

    function updateCompleteTodo(id){
        TodoDataService.completeTodo(id, token).then(res=>{
            //update complete todo
        }).catch(err=>{
            console.log(err);
        })
    }

    function updateUserData(user=null){
        setUser(user);
        localStorage.setItem('user', user);
    }

    return(
        <GlobalState.Provider value={{user, isUserActive, updateUserData, loadUserData, token, error, login, logout, signup, setError, signUpProcess, setSignUpProcess, deleteTodo, updateCompleteTodo, notification, setNotification}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>} >
                        <Route index element={<Home />} />

                        <Route path="/todos" element={<TodoList />}/>
                        <Route path="/todos/add-todo" element={<AddTodo props/>}/>
                        <Route path="/todos/:id/" element={<AddTodo />}/>

                        {isUserActive() &&
                            <Route path="/user" element={<User />} />
                        }

                        <Route path="/login" element={<Login />} />
                        <Route path="/login-email" element={<LoginEmail />} />
                        <Route path="/:email/:code" element={<LoginCode />} />

                        <Route path="/signup" element={<SignUp />} />

                        <Route path='*' element={<NoPage/>} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalState.Provider>
    )
}
