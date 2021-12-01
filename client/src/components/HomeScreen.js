import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Modal from './Modal';
import Statusbar from './Statusbar';
import { WorkspaceScreen } from '.';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let initialState = "";
    if(auth.user === null) {
        initialState = "ALL";
    }
    else {
        initialState = "HOME"
    }

    const [listTab, setListTab] = useState(initialState);

    const homeCallback = () => {
        setListTab("HOME");
    }
    const groupsCallback = () => {
        setListTab("ALL");
    }
    const userCallback = (username) => {
        setListTab("USER");
    }
    const communityCallback = () => {
        setListTab("COMMUNITY");
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '96%', left: '2%', bgcolor: 'transparent'}}>
            {
                store.shownLists.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        tab = {listTab}
                        userCallback = {userCallback}
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