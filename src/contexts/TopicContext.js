import React, { useReducer } from "react";
import axios from "axios";

export const topicContext = React.createContext();

const INIT_STATE = {
    topicsData: [],
    topicDetails: null,
    searchData: []
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_TOPICS":
            return {...state, topicsData: action.payload };
        case "GET_TOPICS_DETAILS" :
            return {...state, topicDetails: action.payload}
        case "SEARCH" :
            return {...state, searchData: action.payload}
        default:
            return state;
    }
};

const TopicContextProvider = ({ children }) => {
    function postNewTopic(topic) {
        axios.post("http://localhost:8000/topics", topic);
    }

    async function getTopics() {
        let { data } = await axios.get("http://localhost:8000/topics");
        dispatch({
            type: "GET_TOPICS",
            payload: data,
        });
    }

    async function getTopicDetails(id) {
        let { data } = await axios.get(`http://localhost:8000/topics/${id}`)
        dispatch({
            type:"GET_TOPICS_DETAILS",
            payload: data
        })
    }


    async function saveTopic(id, newTopic){
        await axios.patch(`http://localhost:8000/topics/${id}`, newTopic)
        getTopicDetails(id)
    }

    async function search(value){
       let {data} =  await axios.get(`http://localhost:8000/topics?q=${value}`)
       dispatch({
           type: "SEARCH",
           payload: data
       })
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    return (
        <topicContext.Provider
            value={{
                topicsData: state.topicsData,
                topicDetails: state.topicDetails,
                searchData: state.searchData,
                postNewTopic,
                getTopics,
                getTopicDetails,
                saveTopic,
                search
            }}
        >
            {children}
        </topicContext.Provider>
    );
};
export default TopicContextProvider;
