import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import FunctionsIcon from '@mui/icons-material/Functions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import SortIcon from '@mui/icons-material/Sort'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    const location = useLocation();
    if (store.currentList) {
        text = store.currentList.name;
    }
    
    function handleCreateNewList() {
        store.createNewList();
    }

    let statusBarContents = <Fab 
                                color="primary" 
                                aria-label="add"
                                id="add-list-button"
                                onClick={handleCreateNewList}
                            >
                                <AddIcon />
                            </Fab>
    let component = "";
    if(location.pathname === "/lists/") {
        component = <div id="top5-list-interface">
                        <Grid container spacing = {2} >
                            <Grid item xs = {4} >
                                <HomeIcon fontSize = "Large"/>
                                &nbsp;&nbsp;
                                <GroupsIcon fontSize = "Large"/>
                                &nbsp;&nbsp;
                                <PersonIcon fontSize = "Large"/>
                                &nbsp;&nbsp;
                                <FunctionsIcon fontSize = "Large"/>
                            </Grid>
                            <Grid item xs = {4} >
                                <TextField placeholder = "Search" size="small" sx = {{width: "100%"}}/>
                            </Grid>
                            <Grid item xs = {4} >
                                <Typography style = {{
                                    position: "absolute",
                                    left: "85%",
                                    fontSize: "20pt"
                                }}> Sort By <SortIcon fontSize = "Small"/> </Typography>
                            </Grid>
                        </Grid>
                        <div id="statusbar">
                            {statusBarContents}
                            Your Lists
                        </div>
                    </div>
    }
    
    return (
        component
    );
}

export default Statusbar;