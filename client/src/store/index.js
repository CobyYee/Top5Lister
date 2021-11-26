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
    LOAD_LISTS_ARRAY: "LOAD_LISTS_ARRAY"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        lists: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null
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
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: store.lists
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
                    lists: store.lists
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
                    lists: store.lists
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
                    lists: store.lists
                });
            }
            // GET ALL THE LISTS
            case GlobalStoreActionType.LOAD_LISTS_ARRAY: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    lists: payload
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
                    lists: store.lists
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
                    lists: store.lists
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
                    lists: store.lists
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
                    lists: store.lists
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

    store.setListPublished = async function (){
        try {
            let response = await api.getTop5ListById(store.currentList._id);
            if(response.data.success) {
                let top5List = response.data.top5List;
                top5List.datePublished = Date.now();
                
                async function updateList(top5List){  
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if(response.data.success) {
                        store.currentList.datePublished = top5List.datePublished;
                    }
                }
                updateList(top5List);
            }
        } catch (err) {
            console.log(err);
        }
    }

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

    store.postComment = async function (list, comment) {
        try {
            let response = await api.getTop5ListById(list._id);
            if(response.data.success) {
                let top5List = response.data.top5List;
                let poster = auth.user.email;
                top5List.comments.unshift({poster, comment});

                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                }
                updateList(top5List);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            datePublished: null,
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: []
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
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
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

    store.sortLists = function (sortType) {
        if(sortType === "descDate") {
            console.log("Sort by descending date");
        }
        else if(sortType === "ascDate") {
            console.log("Sory by ascending date");
        }
        else if(sortType === "views") {
            console.log("Sory by views");
            /*
            store.lists.sort(function(a, b){
                return a.views - b.views;
            })
            */
        }
        else if(sortType === "likes") {
            console.log("Sort by likes");
            /*
            store.lists.sort(function(a, b) {
                return a.likes - b.likes;
            })
            */
        }
        else if(sortType === "dislikes") {
            console.log("Sort by dislikes");
            /*
            store.lists.sort(function(a, b) {
                return a.dislikes - b.dislikes;
            })
            */
        }
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