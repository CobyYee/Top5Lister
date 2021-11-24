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
import IconButton from '@mui/material/IconButton'
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text = "";

    const {tab, homeCallback, groupsCallback, userCallback, communityCallback} = props;

    const location = useLocation();
    if (store.currentList) {
        text = store.currentList.name;
    }
    
    const handleCreateNewList = () => {
        store.createNewList();
    }

    const handleHome = (event) => {
        console.log("HOME");
        homeCallback();
        store.loadUserIdNamePairs(auth.user.email);
    }

    const handleGroups = () => {
        console.log("GROUPS");
        groupsCallback();
        store.loadAllPublishedLists();
    }

    function handlePerson() {
        console.log("USER");
        userCallback();
    }

    function handleCommunity() {
        console.log("COMMUNITY");
        communityCallback();
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
    let firstColor = "grey";
    let secondColor = "grey";
    let thirdColor = "grey";
    let fourthColor = "grey";
    if(tab === "HOME") {
        firstColor = "blue";
    }
    else if(tab === "ALL") {
        secondColor = "blue";
    }
    else if(tab === "USER") {
        thirdColor = "blue";
    }
    else if(tab === "COMMUNITY") {
        fourthColor = "blue";
    }
    if(location.pathname === "/lists/") {
        component = <div id="top5-list-interface">
                        <Grid container spacing = {2} >
                            <Grid item xs = {4} >
                                <IconButton onClick = {(event) => {handleHome(event)}} >
                                    <HomeIcon style = {{fontSize:'30pt', position: 'absolute', left: '2%', color: firstColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handleGroups}>
                                    <GroupsIcon style = {{fontSize:'30pt', position: 'absolute', left: '22%', color: secondColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handlePerson}>
                                    <PersonIcon style = {{fontSize:'30pt', position: 'absolute', left: '42%', color: thirdColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handleCommunity}>
                                    <FunctionsIcon style = {{fontSize:'30pt', position: 'absolute', left: '62%', color: fourthColor}}/>
                                </IconButton>
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