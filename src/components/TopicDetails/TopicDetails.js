import React, { useContext, useEffect, useState } from "react";
import { topicContext } from "../../contexts/TopicContext";
import "./TopicDetails.css";

const TopicDetails = (props) => {
    const { getTopicDetails, topicDetails, saveTopic } = useContext(topicContext);
    const [editStatus, setEditStatus] = useState(false); //Редактирование
    const [editedTopic, setEditedTopic] = useState({});


    const handleValue = (e) => {
        let newTopic = {
            ...editedTopic,
            [e.target.name]: e.target.value
        }
        setEditedTopic(newTopic)
    }


    const handleSave = () => {

        saveTopic(props.match.params.id, editedTopic)
        setEditStatus(false)
    }

    useEffect(() => {
        getTopicDetails(props.match.params.id);
    }, []);

    return (
        <div>
            {topicDetails ? (
                <div>
                    <div className="wraper">
                        <div className="main-left">
                            <div className="main-box">
                                {editStatus ? ( // редактирование
                                    <div className="edit-textareas">
                                        <textarea name='title' onChange={handleValue}>
                                            {topicDetails.title}
                                        </textarea>
                                        <textarea name='description' onChange={handleValue} className="box-desc">
                                            {topicDetails.description}
                                        </textarea>
                                        <textarea name='img' onChange={handleValue}
                                            className="img"
                                            src={topicDetails.img}
                                        />
                                        <textarea name='subTitle' onChange={handleValue}>
                                            {topicDetails.subTitle}
                                        </textarea>
                                        <textarea name='secondDescription' onChange={handleValue} className="box-desc">
                                            {topicDetails.secondDescription}
                                        </textarea>
                                        <textarea name='secondImg' onChange={handleValue}
                                            className="img"
                                            src={topicDetails.secondImg}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <h1>{topicDetails.title}</h1>
                                        <p className="box-desc">
                                            {topicDetails.description}
                                        </p>
                                        <img
                                            className="img"
                                            src={topicDetails.img}
                                        />
                                        <h2>{topicDetails.subTitle}</h2>
                                        <p className="box-desc">
                                            {topicDetails.secondDescription}
                                        </p>
                                        <img
                                            className="img"
                                            src={topicDetails.secondImg}
                                        />
                                    </>
                                )}
                                <div className="details_btns">
                                    {editStatus ? (
                                        <button
                                            onClick={handleSave}
                                        >
                                            <img src="https://www.freeiconspng.com/uploads/edit-icon-orange-pencil-0.png" alt='btn-icon' />
                                            Сохранить
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditStatus(true)}
                                        >
                                            <img src="https://www.freeiconspng.com/uploads/edit-icon-orange-pencil-0.png" alt='btn-icon' />
                                            Редактировать
                                        </button>
                                    )}
                                    <button>
                                        <img src="https://www.shareicon.net/data/512x512/2015/06/23/58789_add_512x512.png" />
                                        Добавить документацию
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                "Details"
            )}
        </div>
    );
};

export default TopicDetails;