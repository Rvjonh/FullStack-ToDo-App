import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchTodoPanel({ filter, items, setItemsCopy }){
    const [title, setTitle] = useState("");

    const handleSearchTitle = (e)=>{
        let til = e.target.value;
        setTitle(til);

        filterData(til);
    }

    const filterData = (til=title)=>{
        if (filter===1){
            setItemsCopy(getAllElements().filter((item)=>{
                return isStringInsideString(item.title, til);
            }));
        }else if(filter === 2){
            setItemsCopy(getMissingElements().filter((item)=>{
                return isStringInsideString(item.title, til);
            }));
        }else if(filter === 3){
            setItemsCopy(getCompletedElements().filter((item)=>{
                return isStringInsideString(item.title, til)
            }));
        }
    }

    const isStringInsideString=(str1, str2)=>{
        return  str1.toLocaleLowerCase().includes(str2.toLocaleLowerCase());
    }

    const getAllElements=()=>{
        return items;
    }

    const getMissingElements=()=>{
        return items.filter((item)=>{
            return item.completed === false;
        })
    }

    const getCompletedElements=()=>{
        return items.filter((item)=>{
            return item.completed === true;
        })
    }

    let colorBorder = "rgb(39, 121, 255)"
    return(
        <Form className='d-flex w-100' style={{border:`0.2em solid ${colorBorder}`, borderRadius:"0.5em", backgroundColor:colorBorder}}>
            <Form.Group className="d-flex w-100" controlId="formBasicEmail">
                <Form.Label className="m-0">
                    <span className="fs-4 badge" style={{backgroundColor:colorBorder}}>Title: </span>
                </Form.Label>
                <Form.Control className="w-100" onChange={handleSearchTitle} value={title} type="text" placeholder="Enter title" />
                <Button>
                    &#128269;
                </Button>
            </Form.Group>
        </Form>
    )
}