import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';
import Button from '@mui/material/Button';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [isExpanded, setExpanded] = useState(false);
    const { key, idNamePair } = props;
    const [ comment, setComment ] = useState("");

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            store.postComment(idNamePair, comment);
        }
    }

    function handleToggleExpand(event, id) {
        if(store.currentTab !== "HOME" && !isExpanded) {
            console.log(store.currentTab);
            store.incrementViews(idNamePair);
        }
        setExpanded(!isExpanded);
    }

    function handleLikeList() {
        store.likeList(idNamePair);
    }

    function handleDislikeList() {
        store.dislikeList(idNamePair);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let comments = "";
    if(isExpanded) {
        comments = idNamePair.comments.map((pair) => (
            <div id = "comment">
                HI
            </div>
        ));
    }

    let trashIcon = "";
    if(auth.user.email === idNamePair.ownerEmail) {
        trashIcon =
            <IconButton onClick={(event) => {
                handleDeleteList(event, idNamePair._id)}} aria-label='delete'>
                <DeleteIcon style={{fontSize:'18pt'}} />
            </IconButton>
    }

    let likeColor = "grey";
    let dislikeColor = "grey";
    if(store.isListLiked(idNamePair)) {
        likeColor = "blue";
    }
    if(store.isListDisliked(idNamePair)) {
        dislikeColor = "blue";
    }

    let publishView = "";
    let viewHeight = '53%';

    let dateObj = "";
    if(idNamePair.datePublished !== null) {
        let dateMS = Date.parse(idNamePair.datePublished);
        dateObj = new Date(dateMS);
    }

    if(isExpanded) {
        viewHeight = '94%';
    }

    let editButton = 
        <Button sx={{fontSize: "8pt", left: '10px', top: '50px', position: 'absolute'}} variant = "outlined" 
            onClick = {(event) => {handleLoadList(event, idNamePair._id)}}> 
            Edit 
        </Button>
    if(idNamePair.datePublished) {
        editButton = 
            <Box sx = {{fontSize: '12pt', position: 'absolute', left: '1%', top: viewHeight}}>
                Published: {(dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear()}
            </Box>
    }

    let expandIcon = <ExpandMoreIcon sx = {{fontSize: "18pt"}}/>
    let cardHeight = "80pt";
    let listContainer = "";
    if(isExpanded) {
        expandIcon = <ExpandLessIcon sx = {{fontSize: "18pt"}}/>
        cardHeight = "300pt";
        listContainer = 
            <Container id = "list-card">
                <Container id = "list-container">
                    <Grid container spacing={1} border = "1px" rowSpacing = {2} sx = {{top: '4%', position: 'absolute', width: '50%'}}>
                        <Grid container item spacing={2} sx = {{border: '1px'}}>
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 1. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div>  { idNamePair.items[0] } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 2. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { idNamePair.items[1] } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} >
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 3. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { idNamePair.items[2] } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} >
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 4. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { idNamePair.items[3] } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 5. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { idNamePair.items[4] } </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

                <Container id = "comment-section">
                    <TextField placeholder = "Add a comment" 
                        sx = {{left: '1%', position: 'absolute', top: '79%', width: '96%', color: 'white'}}
                        onChange = {handleCommentChange} onKeyPress = {handleKeyPress}
                    />
                    <div id = "comment-list">
                        {comments}
                    </div>
                </Container>
            </Container>
    }

    let cardElement =
        <ListItem sx = {{height: cardHeight, bgColor: "#1B95DB"}}>
            <div>
                <Box sx={{fontSize: "18pt", left: '10px', top: '10px', position: 'absolute'}}>{idNamePair.name}</Box>
                <Box sx={{fontSize: "12pt", left: '10px', top: '30px', position: 'absolute'}}>By: {idNamePair.ownerEmail}</Box>
                {listContainer}
                {editButton}
                <Box sx={{ p: 1 }} id = "list-buttons">
                    <IconButton onClick={(event) => {
                        handleLikeList()
                    }}>
                        <LikeIcon style={{fontSize:'18pt', color: likeColor}} />
                    </IconButton>
                    <span> {idNamePair.likes} </span>
                    <IconButton onClick={(event) => {
                        handleDislikeList()
                    }}>
                        <DislikeIcon style={{fontSize:'18pt', color: dislikeColor}}/>
                    </IconButton>
                    <span> {idNamePair.dislikes} </span>
                    {trashIcon}
                </Box>
                <Box id = "expand-icon">
                    <IconButton onClick = {(event) => {
                        handleToggleExpand(event, idNamePair._id)
                    }}>
                        {expandIcon}
                    </IconButton>
                </Box>
                <Box sx = {{fontSize: '12pt', position: 'absolute', left: '86%', top: viewHeight}}>
                    Views: {idNamePair.views}
                </Box>
                {publishView}
            </div>
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;