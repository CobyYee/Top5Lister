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

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    let text = "";

    const {tab, homeCallback, groupsCallback, userCallback, communityCallback} = props;

    const location = useLocation();
    if (store.currentList) {
        text = store.currentList.name;
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCreateNewList = () => {
        store.createNewList();
    }

    const handleHome = (event) => {
        homeCallback();
        handleMenuClose();
        store.loadUserIdNamePairs(auth.user.email);
    }

    const handleGroups = () => {
        groupsCallback();
        handleMenuClose();
        store.loadAllPublishedLists();
    }

    function handlePerson() {
        handleMenuClose();
        userCallback();
    }

    function handleCommunity() {
        console.log("COMMUNITY");
        communityCallback();
    }

    function sort(type) {
        handleMenuClose();
        store.sortLists(type);
    }

    let menu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={'primary-search-account-menu'}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={store.sortLists("ascDate")}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={store.sortLists("descDate")}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={store.sortLists("views")}>Views</MenuItem>
            <MenuItem onClick={store.sortLists("likes")}>Likes</MenuItem>
            <MenuItem onClick={store.sortLists("dislikes")}>Dislikes</MenuItem>
        </Menu>

    let statusBarContents = 
            <Fab 
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
        statusBarContents = <div> All Lists</div>
    }
    else if(tab === "USER") {
        thirdColor = "blue";
        statusBarContents = <div> User Lists </div>
    }
    else if(tab === "COMMUNITY") {
        fourthColor = "blue";
        statusBarContents = <div> Community Lists </div>
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
                                }}> Sort By <SortIcon fontSize = "Small" onClick = {handleProfileMenuOpen}/> </Typography>
                            </Grid>
                        </Grid>
                        <Container sx = {{mx: 'auto', position: 'absolute', top: '90%', height: '10%'}}>
                            {statusBarContents}
                        </Container>
                        {menu}
                    </div>
    }
    
    return (
        component
    );
}

export default Statusbar;