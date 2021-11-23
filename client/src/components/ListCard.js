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

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isExpanded, setExpanded] = useState(false);
    const { idNamePair } = props;

    console.log(idNamePair);

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleExpand(event, id) {
        setExpanded(!isExpanded);
    }

    function handleLikeList(event, id) {

    }

    function handleDislikeList(event, id) {

    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let expandIcon = <ExpandMoreIcon sx = {{fontSize: "18pt"}}/>
    let cardHeight = "80pt";
    let listContainer = "";
    let buttonHeight = "50px";
    if(isExpanded) {
        expandIcon = <ExpandLessIcon sx = {{fontSize: "18pt"}}/>
        cardHeight = "300pt";
        buttonHeight = "350px";
        listContainer = 
            <Container id = "list-container">
                <Grid container spacing={1} border = "1px" rowSpacing = {2} sx = {{top: '4%', position: 'absolute'}}>
                    <Grid container item spacing={2} sx = {{border: '1px'}}>
                        <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                            <div> 1. </div>
                        </Grid>
                        <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                            left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                            <div> { idNamePair.items[0] }</div>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                            <div> 2. </div>
                        </Grid>
                        <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                            left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                            <div> {idNamePair.items[1] } </div>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2} >
                        <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                            <div> 3. </div>
                        </Grid>
                        <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                            left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                            <div> {idNamePair.items[2] } </div>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2} >
                        <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                            <div> 4. </div>
                        </Grid>
                        <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                            left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                            <div> {idNamePair.items[3] } </div>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item xs = {0.75} sx = {{fontSize: "24pt", color: 'yellow'}}> 
                            <div> 5. </div>
                        </Grid>
                        <Grid item xs = {10} sx = {{fontSize: "24pt", width: '84%', position: 'absolute',
                            left: '10%', borderRadius: '10pt', color: 'yellow'}}> 
                            <div> {idNamePair.items[4] } </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
    }

    let cardElement =
        <ListItem sx = {{height: cardHeight}}>
            <div>
                <Box sx={{fontSize: "18pt", left: '10px', top: '10px', position: 'absolute'}}>{idNamePair.name}</Box>
                <Box sx={{fontSize: "12pt", left: '10px', top: '30px', position: 'absolute'}}>By: {idNamePair.ownerEmail}</Box>
                {listContainer}
                <Button sx={{fontSize: "8pt", left: '10px', top: buttonHeight, position: 'absolute'}} variant = "outlined" 
                    onClick = {(event) => {handleLoadList(event, idNamePair._id)}}> Edit </Button>
                <Box sx={{ p: 1 }} id = "list-buttons">
                    <IconButton onClick={(event) => {
                        handleLikeList(event, idNamePair._id)
                    }}>
                        <LikeIcon style={{fontSize:'18pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {
                        handleDislikeList(event, idNamePair._id)
                    }}>
                        <DislikeIcon style={{fontSize:'18pt'}}/>
                    </IconButton>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'18pt'}} />
                    </IconButton>
                </Box>
                <Box id = "expand-icon">
                    <IconButton onClick = {(event) => {
                        handleToggleExpand(event, idNamePair._id)
                    }}>
                        {expandIcon}
                    </IconButton>
                </Box>
            </div>
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;