import { useContext, useState } from 'react'
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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchText, setSearch] = useState("");
    const isMenuOpen = Boolean(anchorEl);
    let text = "";

    const {tab, homeCallback, groupsCallback, userCallback, communityCallback} = props;

    const location = useLocation();
    if (store.currentList) {
        text = store.currentList.name;
    }
    
    let component = "";
    let firstColor = "grey";
    let secondColor = "grey";
    let thirdColor = "grey";
    let fourthColor = "grey";
    let statusBarDisabled = false;

    const handleKeyPress = (event) => {
        if(event.code === "Enter") {
            store.searchLists(searchText);
        }
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleProfileMenuOpen = (event) => {
        if(!statusBarDisabled) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCreateNewList = () => {
        store.createNewList();
    }

    const handleHome = (event) => {
        homeCallback();
        //handleMenuClose();
        store.loadUserIdNamePairs(auth.user.email);
    }

    const handleGroups = () => {
        groupsCallback();
        //handleMenuClose();
        store.loadAllPublishedLists();
    }

    function handlePerson() {
        //handleMenuClose();
        userCallback();
    }

    function handleCommunity() {
        //console.log("COMMUNITY");
        communityCallback();
    }

    function sortList(type) {
        handleMenuClose();
        store.sortLists(type);
    }

    const sortAscDate = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.sortLists("ascDate");
    }
    const sortDescDate = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.sortLists("descDate");
    }
    const sortViews = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.sortLists("views");
    }
    const sortLikes = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.sortLists("likes");
    }
    const sortDislikes = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.sortLists("dislikes");
    }
    let statusBarContents = 
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled = {statusBarDisabled}
            >
                <AddIcon />
            </Fab> 

    if(store.currentList !== null){
        statusBarDisabled = true;
    }
    if(tab === "HOME" && store.currentList === null) {
        firstColor = "blue";
    }
    else if(tab === "ALL" && store.currentList === null) {
        secondColor = "blue";
        statusBarContents = <div> All Lists</div>
    }
    else if(tab === "USER" && store.currentList === null) {
        thirdColor = "blue";
        statusBarContents = <div> User Lists </div>
    }
    else if(tab === "COMMUNITY" && store.currentList === null) {
        fourthColor = "blue";
        statusBarContents = <div> Community Lists </div>
    }
    if(location.pathname === "/lists/") {
        component = <div id="top5-list-interface">
                        <Grid container spacing = {2} >
                            <Grid item xs = {4} >
                                <IconButton onClick = {(event) => {handleHome(event)}} disabled = {statusBarDisabled}>
                                    <HomeIcon style = {{fontSize:'30pt', position: 'absolute', left: '2%', color: firstColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handleGroups} disabled = {statusBarDisabled}>
                                    <GroupsIcon style = {{fontSize:'30pt', position: 'absolute', left: '22%', color: secondColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handlePerson} disabled = {statusBarDisabled}>
                                    <PersonIcon style = {{fontSize:'30pt', position: 'absolute', left: '42%', color: thirdColor}}/>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton onClick = {handleCommunity} disabled = {statusBarDisabled}>
                                    <FunctionsIcon style = {{fontSize:'30pt', position: 'absolute', left: '62%', color: fourthColor}}/>
                                </IconButton>
                            </Grid>
                            <Grid item xs = {4} >
                                <TextField placeholder = "Search" size="small" sx = {{width: "100%"}} disabled = {statusBarDisabled}
                                    onChange = {handleChange} onKeyPress = {handleKeyPress}/>
                            </Grid>
                            <Grid item xs = {4} >
                                <Typography style = {{
                                    position: "absolute",
                                    left: "85%",
                                    fontSize: "20pt"
                                }}> Sort By <SortIcon fontSize = "Small" onClick = {handleProfileMenuOpen}/> </Typography>
                            </Grid>
                        </Grid>
                        <Container sx = {{mx: 'auto', position: 'absolute', top: '90%', height: '10%'}}>
                            {statusBarContents}
                        </Container>

                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={sortAscDate}>Publish Date (Newest)</MenuItem>
                            <MenuItem onClick={sortDescDate}>Publish Date (Oldest)</MenuItem>
                            <MenuItem onClick={sortViews}>Views</MenuItem>
                            <MenuItem onClick={sortLikes}>Likes</MenuItem>
                            <MenuItem onClick={sortDislikes}>Dislikes</MenuItem>
                        </Menu>
                    </div>
    }
    
    return (
        component
    );
}

export default Statusbar;