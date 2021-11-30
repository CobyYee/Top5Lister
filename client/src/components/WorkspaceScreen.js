import { useState, useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [ listName, setListName ] = useState(store.currentList.name);

    const handleListKeyPress = function (event) {
        if(listName !== "" && event.code === "Enter") {
            store.changeListName(store.currentList._id, listName);
        }
    }

    function hasRepetitions(arr) {
        for(let i = 0; i < arr.length; i++) {
            for(let j = i + 1; j < arr.length; j++) {
                if(arr[i] === arr[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function saveList() {
        store.saveList(listName);
    }

    function publishList() {
        store.setListPublished(listName);
    }

    function handleUpdate (event) {
        setListName(event.target.value);
    }

    let publishDisabled = false;
    if(listName === "") {
        publishDisabled = true;
    }
    else if(store.currentList.items[0] === "" || store.currentList.items[1] === "" || store.currentList.items[2] === "" || store.currentList.items[3] === "" || store.currentList.items[4] === "") {
        publishDisabled = true;
    }
    else if(hasRepetitions(store.currentList.items)) {
        publishDisabled = true;
    } 
    else if(!store.isNameAvailable(listName)) {
        publishDisabled = true;
    }
    

    return (
        <div id="top5-workspace">
            <TextField defaultValue = {store.currentList.name} id = "list-name" size = "small" sx = {{width: '300px', left: '10px'}}
                onChange = {handleUpdate} onKeyPress = {handleListKeyPress}/>
            <div id="workspace-edit">
                
            <Container id = "item-container">
                <Grid container spacing={1} border = "1px" rowSpacing = {3}>
                    <Grid container item spacing={2} sx = {{border: '1px'}}>
                        <Grid item xs = {0.75}> 
                            <div id = "item-number"> 1 </div>
                        </Grid>
                        <Grid item xs = {10}>
                            <Top5Item
                                text={store.currentList.items[0]}
                                index = {0}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75}> 
                            <div id = "item-number"> 2 </div>
                        </Grid>
                        <Grid item xs = {10}>
                            <Top5Item
                                text={store.currentList.items[1]}
                                index = {1}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75}> 
                            <div id = "item-number"> 3 </div>
                        </Grid>
                        <Grid item xs = {10}> 
                            <Top5Item
                                text={store.currentList.items[2]}
                                index = {2}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75}> 
                            <div id = "item-number"> 4 </div>
                        </Grid>
                        <Grid item xs = {10}>
                            <Top5Item
                                text={store.currentList.items[3]}
                                index = {3}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75}> 
                            <div id = "item-number"> 5 </div>
                        </Grid>
                        <Grid item xs = {10}> 
                            <Top5Item
                                text={store.currentList.items[4]}
                                index = {4}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </div>
            <div id = "workspaceButtons">
                <Button variant = "contained" onClick = {saveList}> Save </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant = "contained" onClick = {publishList} disabled = {publishDisabled}> Publish </Button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;