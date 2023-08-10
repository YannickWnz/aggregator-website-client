import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import './Home.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { Customization } from '../../Components/Customization/Customization'
import { articlePostTime } from '../../Components/Utilities/UtilitiesFunctions'



export const Home = () => {

    const navigate = useNavigate()



    const [worldNews, setWorldNews] = useState([])
    const [localNews, setLocalNews] = useState([])
    const [customization, setCustomization] = useState(false)

    const [userTopics, setUserTopics] = useState([])

    const [forYouPicks, setForYouPicks] = useState([])

    const [articlesToShow, setArticlesToShow] = useState(9);
    const articlesIncrement = 3

    const handleLoadMore = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + articlesIncrement)
    }


    // function displaying today's date
    const todayDate = () => {
        const today = moment()
        const formattedDate = today.format('dddd, DD MMMM');
        return formattedDate
    }

    function getUserTopics() {
        const storedSelectedTopics = JSON.parse(localStorage.getItem('selectedTopics'));
        if (storedSelectedTopics) {
            setUserTopics(storedSelectedTopics);
            storedSelectedTopics.forEach(topic => {
                // console.log(topic)
            })
        }
    }

    const handleTopicsChange = (newTopics) => {
        setUserTopics(newTopics)
        console.log(newTopics)
    }

    // getting ghana news using THE GUARDIANS APIs
    const localNewsData = async () => {

        try {
            const response = await axios.get('https://content.guardianapis.com/search?q=ghana&api-key=2257749e-0fbd-42dc-8063-f500316ffa36')

            setLocalNews(response.data.response.results)

        } catch (error) {
            console.log(error)
        }

    }
    

    
    function getUserTopicsData() {
        
        userTopics.map( async (topic, index) => {

            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=91c897b5e5534d609204e6fd90fd0b25`)
                
                setForYouPicks(response.data.articles)


            } catch (error) {
                console.log(error)
            }

        })

    }

    useEffect(() => {
        // getUserTopicsData()
    }, [userTopics])


    const api = process.env.REACT_APP_TITLE

    console.log(process.env.NODE_ENV)

    const getWorldNews = async () => {

        try {
            
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${123}`)
            // const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=91c897b5e5534d609204e6fd90fd0b25`)

            setWorldNews(response.data.articles.slice(0, 3))


        } catch (error) {
            console.log(error)
        }
    
    }


    useEffect(() => {
        // getWorldNews()
        // localNewsData()
        // getUserTopics()
    }, [])


    return (
        <div className="home">
            <div className="home-container">
                <Customization 
                    customization={customization} 
                    setCustomization={setCustomization}  
                    onTopicsChange={handleTopicsChange}
                />

                <div className="intro-section">
                    <div className="intro-text">
                        <h1>Your briefing</h1>
                        <p>{todayDate()}</p>
                    </div>
                    <div className="customize">
                        <button onClick={() => {setCustomization(true)}} > <span><i className="fa-solid fa-gear"></i></span>Customize your feed</button>
                    </div>
                </div>

                <div className="feed-section-one">
                    {/* feed one */}
                    <div className="feed-one">
                        <div className="category-name">
                            <Link to='/category/general'>World <span><i className="fa-solid fa-chevron-right"></i></span></Link>
                        </div>

                        {worldNews.length > 0 ? worldNews.map((news, index) => {

                            return (
                                <div className="news" key={index}>
                                    <div className="news-description">
                                        <p className="news-source">{news.source.name}</p>
                                        <a href={news.url} target='_blank' className="news-headline">{news.title}</a>
                                        <p className="news-post-time">{articlePostTime(news.publishedAt)}</p>
                                    </div>
                                    <div 
                                        className="news-image"
                                        style={ worldNews.length > 0 ? { backgroundImage:  `url(${news.urlToImage})` } : ''}
                                    ></div>
                            </div>
                            )
                            
                        } ) : <div className="loader">
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>}

                    </div>

                    {/* feed two */}
                    <div className="feed-two">
                        <div className="category-name">
                            <Link to='/category/ghana'>Local News <span><i className="fa-solid fa-chevron-right"></i></span> </Link>
                        </div>

                        {localNews.length > 0 ? localNews.slice(0, 3).map((news, index) => {

                            return (
                                <div className="news" key={index}>
                                    <div className="news-description">
                                        <p className="news-source">The Guardian</p>
                                        <a href={news.webUrl} target='_blank' className="news-headline">{news.webTitle}</a>
                                        <p className="news-post-time">{articlePostTime(news.webPublicationDate)}</p>
                                    </div>
                                    <div 
                                        className="news-image"
                                    ></div>
                            </div>
                            )
                        } ) : <div className="loader">
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>}

                    </div>
                </div>

                {/* user's picks */}
                <div className="for-you-pick">
                    {forYouPicks.length > 0 && <h1>For you picks</h1>}
                        {!forYouPicks.length > 0 && (
                            <div className="customize empty-picks">
                            <h1 className='empty-picks'>Customize your feed by selecting topics you are interested in</h1>
                                <button onClick={() => {setCustomization(true)}} > <span><i className="fa-solid fa-gear"></i></span>Customize your feed</button>
                            </div>
                        )}
                    <div className="box-info-wrapper">


                        {forYouPicks.length > 0 && forYouPicks.slice(0, articlesToShow).map((pick, index) => {
                            return (
                                <div key={index} className="box-info">
                                    <div className="info-source">
                                        <div className="info-source-name">
                                            <p>{pick.source.name}</p>
                                        </div>
                                    </div>
                                    <div 
                                    style={ forYouPicks.length > 0 ? { backgroundImage:  `url(${pick.urlToImage})` } : ''}
                                    className="info-image"></div>
                                    <p className='post-time'>{articlePostTime(pick.publishedAt)}</p>
                                    <a href={pick.url} target='_blank' className='post-title'>{pick.title}</a>
                                    <p className='editor'>{pick.source.name} - {pick.author}</p>
                                    <p>{pick.description}</p>
                                </div>
                            )
                        })}

                    </div>
                    {forYouPicks.length > 0 && <div className="load-more-btn">
                            <button onClick={handleLoadMore}
                            >Load more</button>
                        </div>}
                </div>

            </div>
        </div>
    )
}