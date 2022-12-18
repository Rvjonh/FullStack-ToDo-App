import { useState } from "react";

import Container from "react-bootstrap/esm/Container"

import AddTodoButton from "./panelControlsComponents/addTodoButton";
import ClearListButton from './panelControlsComponents/clearListButton';
import FilterTodosPanel from './panelControlsComponents/filterTodosPanel';
import SearchTodoPanel from './panelControlsComponents/searchTodoPanel';

export default function PanelControls({items, setItems, itemsCopy, setItemsCopy}){
    
    const [filter, setFilter] = useState(1);

    return(
        <Container>

            <Container className="d-flex justify-content-between">
                <AddTodoButton />
                <ClearListButton items={items} setItems={setItems} setItemsCopy={setItemsCopy} />
            </Container>

            <Container className="d-flex justify-content-center" style={{maxWidth:"600px"}}>
                <FilterTodosPanel filter={filter} setFilter={setFilter} items={items} setItems={setItems} itemsCopy={itemsCopy} setItemsCopy={setItemsCopy}/>
            </Container>

            <Container className="d-flex justify-content-center my-3" style={{maxWidth:"600px"}}>
                <SearchTodoPanel  filter={filter} items={items} itemsCopy={itemsCopy} setItemsCopy={setItemsCopy} />
            </Container>

        </Container>
    )
}