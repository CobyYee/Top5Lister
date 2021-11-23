import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Modal from './Modal';
import Statusbar from './Statusbar';
import { WorkspaceScreen } from '.';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '96%', left: '2%', bgcolor: '#81CAF5'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    let component = "";
    if(store.currentList !== null) {
        console.log("ABC");
        component = <WorkspaceScreen/>
    }
    else {
        component = <div id="list-selector-list">
                        {
                            listCard
                        }
                        <Modal/>
                    </div>
    }
    return (
        <div>
            <div id="top5-list-selector">
                {component}
            </div>
            <Statusbar/>
        </div>)
}

export default HomeScreen;