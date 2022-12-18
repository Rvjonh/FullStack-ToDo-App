import { useEffect } from 'react'

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Badge from 'react-bootstrap/Badge';

import './style/buttonFilterTodo.scss';

export default function FilterTodosPanel({ filter, setFilter, items , setItems, itemsCopy, setItemsCopy}){


    useEffect(()=>{
        if (filter===1){
            setItemsCopy(items);
        }else if(filter === 2){
            setItemsCopy(getMissingElements());
        }else if(filter === 3){
            setItemsCopy(getCompletedElements());
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items])

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

    const handleSetAll=()=>{
        setFilter(1);
        setItemsCopy(items);
    }

    const handleSetMissingTodos = ()=>{
        setFilter(2);
        setItemsCopy(getMissingElements());
    }
    
    const handleSetCompletedTodos =()=>{
        setFilter(3);
        setItemsCopy(getCompletedElements());
    }


    return(
        <ToggleButtonGroup className="d-flex container" type="radio" name="options" defaultValue={filter}>
            <ToggleButton onClick={handleSetAll} style={{flex:"1"}} className='filter-button-responsive' variant="primary" id="tbg-radio-1" value={1}>
                <span>ALL </span>
                <Badge bg="light" text="dark">{getAllElements().length}</Badge>
                <span className="visually-hidden">all todos items</span>
            </ToggleButton>
            <ToggleButton onClick={handleSetMissingTodos} style={{flex:"1"}} className='filter-button-responsive' variant="secondary" id="tbg-radio-2" value={2}>
                <span>Missing </span>
                <Badge bg="light" text="dark">{getMissingElements().length}</Badge>
                <span className="visually-hidden">all todos items</span>
            </ToggleButton>
        
            <ToggleButton onClick={handleSetCompletedTodos} style={{flex:"1"}} className='filter-button-responsive' variant="success" id="tbg-radio-3" value={3}>
                <span>Completed </span>
                <Badge bg="light" text="dark">{getCompletedElements().length}</Badge>
                <span className="visually-hidden">all todos items</span>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}