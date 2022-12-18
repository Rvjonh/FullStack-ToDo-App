import axios from 'axios';

class TodoDataService{

    constructor (){
        this.api = process.env.REACT_APP_TO_DO_API;
    }

    getAll(token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        return axios.get(this.api+'/todos/');
    }

    createTodo(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.post(this.api+`/todos/`, data);
    }

    updateTodo(id, data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(this.api+`/todos/${id}`, data);
    }
    
    deleteTodo(id, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.delete(this.api+`/todos/${id}`);
    }
    
    completeTodo(id, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(this.api+`/todos/${id}/complete`);
    }


    login(data){
        return axios.post(this.api+"/login/", data);
    }

    loginEmail(email=null){
        if(!email) new Error("Required Email to send login code.");
        return axios.get(this.api+`/login-email/${email}`);
    }

    loginWithCode(email=null, code=null){
        if(email===null || code===null){
            Error("Required 'Email' and 'Code' to login ...")
        }

        const data = {
            "email":email,
            "code": code
        }

        return axios({
            url:`${this.api}/login-code/`,
            method: "POST",
            data: JSON.stringify(data)
        });
    }

    signup(data){
        return axios.post(this.api+`/signup/`, data);
    }

    deleteUser(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios({
            url: `${this.api}/user/`,
            method: "DELETE",
            data: JSON.stringify(data),
        });
    }

    updateUser(data, token){
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.patch(this.api+"/user/", data)
    }
}

export default new TodoDataService();