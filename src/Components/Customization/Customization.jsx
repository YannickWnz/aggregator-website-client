import { useEffect } from 'react'
import { useState } from 'react'
import './Customization.scss'


export const Customization = ({setCustomization, customization, onTopicsChange}) => {

    const [selected, setSelected] = useState()
    const [topicSelected, setTopicSelected] = useState([])

    const handleTopicSelect = (topic) => {

        if(topicSelected.includes(topic)) {

            setTopicSelected(prevTopicSelected => prevTopicSelected.filter(selectedTopic => selectedTopic !== topic) )

        } else {
            setTopicSelected(prev => [...prev, topic])
        }

    }

    function getUserTopics() {
        const storedSelectedTopics = JSON.parse(localStorage.getItem('selectedTopics'));
        if (storedSelectedTopics) {
            setTopicSelected(storedSelectedTopics);
            console.log(topicSelected)
        }
    }

    useEffect(() => {
        getUserTopics()
    }, [])

    return (
        <div className={` ${customization ? 'custom' : 'hide-popup'}`}>
            <div className="custom-setting-wrapper">
                <h1>Customize your topics</h1>
                <p>Choose and manage up to 10 topics for your homepage</p>
                <div className="topics-container">
                    <div className="topics-list">
                        <p>Topics to choose from</p>
                        <div className="list">
                            <button onClick={() => {handleTopicSelect('business')}} >Business</button>
                            <button onClick={() => {handleTopicSelect('science')}} >Science</button>
                            <button onClick={() => {handleTopicSelect('technology')}} >Technology</button>
                            <button onClick={() => {handleTopicSelect('health')}} >Health</button>
                            <button onClick={() => {handleTopicSelect('entertainment')}} >Entertainment</button>
                            <button onClick={() => {handleTopicSelect('sports')}} >Sports</button>
                        </div>
                    </div>
                    <div className="topics-selected">
                        <p>Topics selected</p>
                        <ul>
                            {topicSelected.map((topic, index) => (
                                <li key={index}>{topic}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="cancel-save-btn">
                    <button onClick={() => setCustomization(false)} >Cancel</button>
                    <button
                        onClick={() => {
                            localStorage.setItem('selectedTopics', JSON.stringify(topicSelected))
                            onTopicsChange(topicSelected); // Call the callback function to update topics
                            setCustomization(false)
                        }}
                    >Save and close</button>
                </div>
            </div>
        </div>
    )
}