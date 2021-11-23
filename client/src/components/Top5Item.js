import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from "@mui/system";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState("");

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length);
            store.updateItem(id, event.target.value);
            toggleEdit();
        }
    }

    function handleClick(event) {
        if(event.detail === 2) {
            handleToggleEdit(event);
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;

    let itemClass = "top5-item";

    let component = 
        <Box sx={{ flexGrow: 1 , fontSize: "40pt"}} onClick = {handleClick} id = "list-item">{props.text}</Box>
    if(editActive) {
        component = 
        <TextField
            required
            fullWidth
            id={'item-' + (index)}
            name="name"
            className='top5-item'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
            inputProps={{style: {fontSize: "24pt", color: "black", background: "#DEF581", height: "22px", left: "2%"}}}
            style = {{
                height: "60px",
                color: "yellow",
                width: "113.7%"
            }}
            autoFocus
        />
    }
    return (component);
}

export default Top5Item;