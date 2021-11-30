import { Global } from '@emotion/react';
import { listSubheaderClasses, stepperClasses } from '@mui/material';
import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    LOAD_LISTS_ARRAY: "LOAD_LISTS_ARRAY",
    RELOAD_STATE: "RELOAD_STATE",
    SET_LIST_VIEW: "SET_LIST_VIEW"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        lists: [],
        shownLists: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            // GET ALL THE LISTS
            case GlobalStoreActionType.LOAD_LISTS_ARRAY: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: payload,
                    shownLists: payload
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                });
            }
            case GlobalStoreActionType.RELOAD_STATE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: 0,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: store.shownLists
                })
            }
            case GlobalStoreActionType.SET_LIST_VIEW: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    lists: store.lists,
                    shownLists: payload
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        try {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                if(auth.user !== null && auth.user.email === top5List.ownerEmail) {
                    top5List.name = newName;
                    async function updateList(top5List) {
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            async function getListPairs(top5List) {
                                response = await api.getTop5ListPairs();
                                if (response.data.success) {
                                    let pairsArray = response.data.idNamePairs;
                                    storeReducer({
                                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                        payload: {
                                            idNamePairs: pairsArray,
                                            top5List: top5List
                                        }
                                    });
                                }
                            }
                            getListPairs(top5List);
                        }
                    }
                    updateList(top5List);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    // PUBLISHES A LIST
    store.setListPublished = async function (name) {
        try {
            store.currentList.name = name;
            let response = await api.updateTop5ListById(store.currentList._id, store.currentList);
            response = await api.getTop5ListById(store.currentList._id);
            if(response.data.success) {
                let top5List = response.data.top5List;
                top5List.datePublished = new Date();
                async function updateList(top5List){  
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if(response.data.success) {
                        store.currentList.datePublished = top5List.datePublished;
                    }
                }
                updateList(top5List);

                let communityList = await store.findCommunityList(top5List.name);
                if(communityList === null) {
                    let newListName = top5List.name;
                    let payload = {
                        name: newListName,
                        items: ["?", "?", "?", "?", "?"],
                        ownerEmail: null,
                        ownerUsername: null,
                        datePublished: top5List.datePublished,
                        views: 0,
                        likes: 0,
                        dislikes: 0,
                        comments: [],
                        emailLikes: [],
                        emailDislikes: [],
                        isCommunityList: true,
                        communityItems: []
                    };
                    response = await api.createTop5List(payload);
                    communityList = response.data.top5List;
                    for(let i = 0; i < 5; i++){
                        communityList.communityItems.push({item: top5List.items[i], points: (5-i)});
                    }
                }
                else {
                    let communityListItems = communityList.communityItems;
                    communityList.datePublished = top5List.datePublished;
                    for(let i = 0; i < 5; i++) {
                        let index = communityListItems.map(function(item) { return item.item; }).indexOf(top5List.items[i]);
                        if(index === -1) {
                            communityListItems.push({item: top5List.items[i], points: (5-i)});
                        }
                        else {
                            communityListItems[index].points += (5-i);
                        }
                    }
                    communityList.communityItems = communityListItems;
                }
                communityList.communityItems.sort(function(a, b) { return b.points - a.points })
                communityList.items[0] = communityList.communityItems[0].item;
                communityList.items[1] = communityList.communityItems[1].item;
                communityList.items[2] = communityList.communityItems[2].item;
                communityList.items[3] = communityList.communityItems[3].item;
                communityList.items[4] = communityList.communityItems[4].item;
                response = await api.updateTop5ListById(communityList._id, communityList);
                store.closeCurrentList();
                await store.loadUserIdNamePairs(auth.user.email);
            }
        } catch (err) {
            console.log(err);
        }
    }

    store.findCommunityList = async function (name) {
        try{
            let response = await api.getTop5ListPairs();
            if(response.data.success) {
                let pairsArray = response.data.idNamePairs;
                for(let i = 0; i < pairsArray.length; i++) {
                    let response2 = await api.getTop5ListById(pairsArray[i]._id);
                    let top5List = response2.data.top5List;
                    if(top5List.isCommunityList && top5List.name.toLowerCase() === name.toLowerCase()) {
                        return top5List;
                    }
                }
                return null;
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    // HANDLES A PERSON EXPANDING A LIST, THUS INCREASING THE NUMBER OF VIEWS
    store.incrementViews = async function (list){
        try {
            let response = await api.getTop5ListById(list._id);
            if(response.data.success) {
                let top5List = response.data.top5List;
                top5List.views = top5List.views+1;
                
                async function updateList(top5List){  
                    response = await api.updateTop5ListById(top5List._id, top5List);
                }
                updateList(top5List);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // HANDLES THE CURRENT USER POSTING A COMMENT ON A LIST
    store.postComment = async function (list, comment) {
        let top5List = list;
        let poster = auth.user.username;
        top5List.comments.unshift({poster, comment});

        let response = await api.updateTop5ListById(top5List._id, top5List);
        if(response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.RELOAD_STATE,
                payload: null
            });
        }
    }

    // HANDLES THE CURRENT USER LIKING A LIST
    store.likeList = async function (list) {
        let top5List = list;
        let userEmail = auth.user.email;
        let index = top5List.emailDislikes.indexOf(userEmail);
        if(index !== -1) {
            top5List.emailDislikes.splice(index, 1);
            top5List.dislikes -= 1;
        }
        index = top5List.emailLikes.indexOf(userEmail);
        if(index === -1) {
            top5List.emailLikes.push(userEmail);
            top5List.likes += 1;
        }
        else {
            top5List.emailLikes.splice(index, 1);
            top5List.likes -= 1;
        }
        let response = await api.updateTop5ListById(top5List._id, top5List);
        if(response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.RELOAD_STATE,
                payload: null
            })
        }
    }

    // CHECKS TO SEE IF THE CURRENT USER HAS LIKED A LIST
    store.isListLiked = function (list) {
        if(auth.user !== null) {
            let userEmail = auth.user.email;
            if(list.emailLikes.indexOf(userEmail) !== -1) {
                return true;
            }
            return false;
        }
        return false;
    }

    // CHECKS TO SEE IF THE CURRENT USER HAS DISLIKED A LIST
    store.isListDisliked = function (list) {
        if(auth.user !== null) {
            let userEmail = auth.user.email;
            if(list.emailDislikes.indexOf(userEmail) !== -1) {
                return true;
            }
            return false;
        }
        return false;
    }

    // HANDLES THE CURRENT USER DISLIKING A LIST
    store.dislikeList = async function (list) {
        let top5List = list;
        let userEmail = auth.user.email;
        let index = top5List.emailLikes.indexOf(userEmail);
        if(index !== -1) {
            top5List.emailLikes.splice(index, 1);
            top5List.likes -= 1;
        }
        index = top5List.emailDislikes.indexOf(userEmail);
        if(index === -1) {
            top5List.emailDislikes.push(userEmail);
            top5List.dislikes += 1;
        }
        else {
            top5List.emailDislikes.splice(index, 1);
            top5List.dislikes -= 1;
        }
        let response = await api.updateTop5ListById(top5List._id, top5List);
        if(response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.RELOAD_STATE,
                payload: null
            });
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: null
        });
    }

    store.saveList = async function (name) {
        store.currentList.name = name;
        let response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if(response.data.success) {
            store.closeCurrentList();
            store.loadUserIdNamePairs(auth.user.email);
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerUsername: auth.user.username,
            datePublished: null,
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            emailLikes: [],
            emailDislikes: [],
            isCommunityList: false,
            communityItems: []
        };
        try {
            const response = await api.createTop5List(payload);
            if (response.data.success) {
                let newList = response.data.top5List;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                });
            }
            else {
                console.log("API FAILED TO CREATE A NEW LIST");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // TAKES IN AN ARRAY OF LISTS AND RETURNS THE ONES THAT WERE PUBLISHED BY THE SPECIFIED USER
    store.filterPairs = async function(arr, ownerEmail) {
        let arr2 = [];
        for(let i = 0; i < arr.length; i++) {
            const response = await api.getTop5ListById(arr[i]._id);
            if(response.data.top5List.ownerEmail === ownerEmail) {
                arr2.unshift(response.data.top5List);
            }
        }
        return arr2;
    }

    //  LOAD ALL LISTS THAT BELONG TO A SINGLE USER, BOTH PUBLISHED AND NOT PUBLISHED
    store.loadUserIdNamePairs = async function(ownerEmail) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            pairsArray = await store.filterPairs(pairsArray, ownerEmail);
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
            
            store.updateListsState(pairsArray);
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.filterPublishedUserPairs = async function(arr, ownerEmail) {
        let arr2 = [];
        for(let i = 0; i < arr.length; i++) {
            const response = await api.getTop5ListById(arr[i]._id);
            if(response.data.top5List.ownerEmail === ownerEmail && response.data.top5List.datePublished !== null) {
                arr2.unshift(response.data.top5List);
            }
        }
        return arr2;
    }

    store.loadPublishedUserIdNamePairs = async function (ownerEmail) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            pairsArray = await store.filterPublishedUserPairs(pairsArray, ownerEmail);
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
            
            store.updateListsState(pairsArray);
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // LOAD ALL THE LISTS THAT ARE PUBLISHED, BELONGING TO ANY USER
    store.loadAllPublishedLists = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            let filteredArray = [];
            for(let i = 0; i < pairsArray.length; i++) {
                let response2 = await api.getTop5ListById(pairsArray[i]._id);
                if(response2.data.top5List.datePublished !== null) {
                    filteredArray.unshift(response2.data.top5List);
                }
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: filteredArray
            });
            store.updateListsState(filteredArray);
            //console.log(store.shownLists);
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.loadCommunityLists = async function () {
        let response = await api.getTop5ListPairs();
        if(response.data.success) {
            let pairsArray = response.data.idNamePairs;
            let filteredArray = [];
            for(let i = 0; i < pairsArray.length; i++) {
                let response2 = await api.getTop5ListById(pairsArray[i]._id);
                if(response2.data.top5List.isCommunityList){
                    filteredArray.push(response2.data.top5List);
                }
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: filteredArray
            })
            for(let i = 0; i < filteredArray.length; i++) {
                console.log(filteredArray[i]);
            }
            store.updateListsState(filteredArray);
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
            
            store.updateListsState(pairsArray);
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    
    store.updateListsState = async function (array) {
        let lists = [];
        for(let i = 0; i < array.length; i++) {
            let response2 = await api.getTop5ListById(array[i]._id);
            lists.unshift(response2.data.top5List);
        }
        storeReducer({
            type: GlobalStoreActionType.LOAD_LISTS_ARRAY,
            payload: lists
        });
    }

    store.clearShownLists = async function () {
        let lists = [];
        storeReducer({
            type: GlobalStoreActionType.LOAD_LISTS_ARRAY,
            payload: lists
        })
    }

    store.sortLists = function (sortType) {
        console.log(store.lists);
        if(sortType === "descDate") {
            store.lists.sort(function(a, b){
                return Date.parse(a.datePublished) - Date.parse(b.datePublished);
            })
        }
        else if(sortType === "ascDate") {
            store.lists.sort(function(a, b){
                return Date.parse(b.datePublished) - Date.parse(a.datePublished);
            })
        }
        else if(sortType === "views") {
            store.lists.sort(function(a, b){
                return b.views - a.views;
            })
        }
        else if(sortType === "likes") {
            store.lists.sort(function(a, b) {
                return b.likes - a.likes;
            })
        }
        else if(sortType === "dislikes") {
            store.lists.sort(function(a, b) {
                return b.dislikes - a.dislikes;
            })
        }
        let newListOrder = store.lists;
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_VIEW,
            payload: newListOrder
        })

    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    // THIS FUNCTION CHECKS IF THE USER HAS A LIST WITH A SPECIFIED NAME 
    store.isNameAvailable = async function (name) {
        /*
        let result = true;
        try {
            let response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                for(let i = 0; i < pairsArray.length; i++) {
                    let response2 = await api.getTop5ListById(pairsArray[i]._id);
                    if(response2.data.top5List.name === name) {
                        if(response2.data.top5List.ownerEmail === auth.user.email) {
                            if(response2.data.top5List.datePublished !== null) {
                                result = false;
                            }
                        }
                    }
                }
                console.log("returning: " + result);
                return result;
            }
        }
        catch (err) {
            console.log(err);
        }*/
        for (let i = 0; i < store.lists.length; i++) {
            if(store.lists[i].name === name && store.lists[i].datePublished !== null) {
                return false;
            }
        }
        return true;
    }

    // THIS FUNCTION SEARCHES THROUGH LISTS FOR LISTS THAT START WITH THE SPECIFIED STRING
    store.searchLists = async function (str) {
        let arr = [];
        if(str === "") {
            arr = store.lists;
        }
        else {
            for(let i = 0; i < store.lists.length; i++){
                if(store.lists[i].name.startsWith(str)){
                    arr.push(store.lists[i]);
                }
            }
        }
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_VIEW,
            payload: arr
        })
    }

    store.deleteList = async function (listToDelete) {
        if(auth.user !== null && auth.user.email === listToDelete.ownerEmail) {
            let response = await api.deleteTop5ListById(listToDelete._id);
            if (response.data.success) {
                store.loadUserIdNamePairs(auth.user.email);
            }
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        console.log(response.data.top5List);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };