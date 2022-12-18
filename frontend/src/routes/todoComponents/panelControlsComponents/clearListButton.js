import AcceptModal from '../../../extraComponents/acceptedModal';

import { useAppState } from './../../../App';

export default function ClearListButton({items, setItems, setItemsCopy}){
    const { deleteTodo } = useAppState();

    const handleDeleteAllList = ()=>{
        for(let i of items){
            deleteTodo(i.id);
        }
        setItems([])
        setItemsCopy([]);
    }

    return(
        <AcceptModal className="m-3 px-4 py-2"
                     message="Clear List"
                     tittle='Caution, Are you completly sure?'
                     desc="You're going to delete the full list."
                     handleAccepted={handleDeleteAllList}
                     />
    )
}