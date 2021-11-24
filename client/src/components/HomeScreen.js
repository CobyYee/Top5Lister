import React, { useContext, useEffect, useState } from 'react'
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
    const [listTab, setListTab] = useState("HOME");

    const homeCallback = () => {
        setListTab("HOME");
    }
    const groupsCallback = () => {
        setListTab("ALL");
    }
    const userCallback = () => {
        setListTab("USER");
    }
    const communityCallback = () => {
        setListTab("COMMUNITY");
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '96%', left: '2%', bgcolor: '#81CAF5', border: '1pt', borderColor: 'black'}}>
            {
                store.lists.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                    />
                ))
            }
            </List>;
    }
    let component = "";
    if(store.currentList !== null) {
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
            <Statusbar
                tab = {listTab}
                homeCallback = {homeCallback}
                groupsCallback = {groupsCallback}
                userCallback = {userCallback}
                communityCallback = {communityCallback}
            />
        </div>)
}

export default HomeScreen;