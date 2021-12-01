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
import Typography from '@mui/material/Typography'

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
    const { key, idNamePair, tab, userCallback } = props;
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
            setComment("");
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

    const handleOpenLists = (event) => {
        event.stopPropagation();
        userCallback(idNamePair.ownerUsername);
        if(isExpanded) {
            setExpanded(!isExpanded);
        }
        store.loadPublishedUserIdNamePairs(idNamePair.ownerUsername);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let commentDisabled = false;
    let likeDisabled = false;
    if(auth.user === null) {
        commentDisabled = true;
        likeDisabled = true;
    }

    let comments = "";
    if(isExpanded) {
        comments = idNamePair.comments.map((pair) => (
            <div id = "comment">
                <Typography sx = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer', fontSize: '10pt'}} onClick = {handleOpenLists}>
                    {pair.poster}
                </Typography>
                <Typography sx = {{fontSize: '12pt'}}> {pair.comment} </Typography>
            </div>
        ));
    }

    let commentSection = "";
    if(isExpanded && idNamePair.datePublished !== null) {
        commentSection =
            <Container>
                <TextField placeholder = "Add a comment" 
                    sx = {{left: '1%', position: 'absolute', top: '79%', width: '96%', color: 'white'}}
                    onChange = {handleCommentChange} onKeyPress = {handleKeyPress} value = {comment}
                    disabled = {commentDisabled}
                />
                <div id = "comment-list">
                    {comments}
                </div>
            </Container>
    }

    let trashIcon = "";
    if(auth.user !== null && auth.user.email === idNamePair.ownerEmail && tab === "HOME") {
        trashIcon =
            <IconButton sx = {{left: '64%', position: 'absolute'}} onClick={(event) => {
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

    let likeButtons = 
        <span>
            <IconButton onClick={(event) => {handleLikeList()}} disabled = {likeDisabled}>
                <LikeIcon style={{fontSize:'18pt', color: likeColor}} />
            </IconButton>
            <span> {idNamePair.likes} </span>
            <IconButton onClick={(event) => {handleDislikeList()}} disabled = {likeDisabled}>
                <DislikeIcon style={{fontSize:'18pt', color: dislikeColor}}/>
            </IconButton>
            <span> {idNamePair.dislikes} </span>
        </span>
    if(idNamePair.datePublished === null) {
        likeButtons ="";
    }

    let publishView = "";
    let viewHeight = '70%';

    let bgColor = "#FDEFEF"
    let dateObj = "";
    if(idNamePair.datePublished !== null) {
        let dateMS = Date.parse(idNamePair.datePublished);
        dateObj = new Date(dateMS);
        bgColor = "#CBD6FA"
    }

    if(isExpanded) {
        viewHeight = '94%';
    }

    let authorText = 
        <Box>
            <span>
                By: 
            </span>
            <Typography sx = {{textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} display = "inline" onClick = {handleOpenLists}>
                {idNamePair.ownerUsername}
            </Typography>
        </Box>
    
    if(idNamePair.isCommunityList) {
        authorText = "";
    }

    let editButton = 
        <Button sx={{fontSize: "8pt", left: '10px', top: viewHeight, position: 'absolute'}} variant = "text" 
            onClick = {(event) => {handleLoadList(event, idNamePair._id)}}> 
            Edit 
        </Button>
    if(idNamePair.datePublished) {
        let status = "Published: ";
        if(idNamePair.isCommunityList){
            status = "Updated: ";
        }
        editButton = 
            <Box sx = {{fontSize: '12pt', position: 'absolute', left: '1%', top: viewHeight}}>
                {status} {(dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear()}
            </Box>
    }

    let expandIcon = <ExpandMoreIcon sx = {{fontSize: "18pt"}}/>
    let cardHeight = "80pt";
    let listContainer = "";

    let item1 = <div> {idNamePair.items[0]} </div>
    let item2 = <div> {idNamePair.items[1]} </div>
    let item3 = <div> {idNamePair.items[2]} </div>
    let item4 = <div> {idNamePair.items[3]} </div>
    let item5 = <div> {idNamePair.items[4]} </div>
    if(idNamePair.isCommunityList) {
        item1 = <Box> <div id = "community-item"> {idNamePair.communityItems[0].item} </div> 
            <div id = "community-votes"> ({idNamePair.communityItems[0].points} Votes) </div> </Box>
        item2 = <Box> <div id = "community-item"> {idNamePair.communityItems[1].item} </div> 
            <div id = "community-votes"> ({idNamePair.communityItems[1].points} Votes) </div> </Box>
        item3 = <Box> <div id = "community-item"> {idNamePair.communityItems[2].item} </div> 
            <div id = "community-votes"> ({idNamePair.communityItems[2].points} Votes) </div> </Box>
        item4 = <Box> <div id = "community-item"> {idNamePair.communityItems[3].item} </div> 
            <div id = "community-votes"> ({idNamePair.communityItems[3].points} Votes) </div> </Box>
        item5 = <Box> <div id = "community-item" >{idNamePair.communityItems[4].item} </div> 
            <div id = "community-votes"> ({idNamePair.communityItems[4].points} Votes) </div> </Box>
    }

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
                                <div>  { item1 } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 2. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { item2 } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} >
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 3. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { item3 } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} >
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 4. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { item4 } </div>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                                <div> 5. </div>
                            </Grid>
                            <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                                left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                                <div> { item5 } </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

                <Container id = "comment-section">
                    {commentSection}
                </Container>
            </Container>
    }

    let cardElement =
        <ListItem sx = {{height: cardHeight, bgcolor: bgColor, borderRadius: '16px', border: '2px solid', mt: 1}}>
            <div>
                <Box sx={{fontSize: "20pt", left: '10px', top: '10px', position: 'absolute'}}>{idNamePair.name}</Box>
                <Box sx={{fontSize: "12pt", left: '10px', top: '40px', position: 'absolute'}}> {authorText} </Box>
                {listContainer}
                {editButton}
                <Box sx={{ p: 1 }} id = "list-buttons">
                    {likeButtons}
                    {trashIcon}
                </Box>
                <Box id = "expand-icon">
                    <IconButton onClick = {(event) => {
                        handleToggleExpand(event, idNamePair._id)
                    }}>
                        {expandIcon}
                    </IconButton>
                </Box>
                <Box sx = {{fontSize: '12pt', position: 'absolute', left: '88%', top: viewHeight}}>
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