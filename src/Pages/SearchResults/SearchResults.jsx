import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { articlePostTime } from "../../Components/Utilities/UtilitiesFunctions"
import './SearchResults.scss'


export const SearchResults = () => {

    const {searchTerm} = useParams() 

    const [searchResults, setSearchResults] = useState([])
    const [articlesToShow, setArticlesToShow] = useState(5);
    const articlesIncrement = 5;


    const searchApiCall = async () => {

        try {
            
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm.toLocaleLowerCase()}&apiKey=91c897b5e5534d609204e6fd90fd0b25`)

            setSearchResults(response.data.articles)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        searchApiCall()
    }, [searchTerm])

    // handle load more function
    const handleLoadMore = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + articlesIncrement)
    }
    

    return (
        <div className="search">
            <div className="search-container">
                {searchResults.length > 0 && <h1>Your search results for '{searchTerm}'</h1>}

                { searchResults.length > 0 ? searchResults.slice(0, articlesToShow).map((results, index) => {
                    return (
                        <div className="news" key={index}>
                            <div className="news-description">
                                <p className="news-source">{results.source.name}</p>
                                <a href={results.url} target='_blank' className="news-headline">{results.title}</a>
                                <p className="news-post-time">{articlePostTime(results.publishedAt)}</p>
                            </div>
                            <div 
                                className="news-image"
                                style={ searchResults.length > 0 ? { backgroundImage:  `url(${results.urlToImage})` } : ''}
                            ></div>
                        </div>
                    )
                } ) : <div className="no-results"><h1>No results found</h1></div> }

                {searchResults.length > 0 && <div className="load-more-btn">
                    <button onClick={handleLoadMore}
                    >Load more</button>
                </div>}

                {/* <div className="news">
                    <div className="news-description">
                        <p className="news-source">GhanaWeb</p>
                        <a href='' className="news-headline">Beige Bank Case: it's correct, accused never received any funds in person or stole funds belongings to Beige Bank Capital</a>
                        <p className="news-post-time">4 hours ago</p>
                    </div>
                    <div className="news-image"></div>
                </div> */}
            </div>
        </div>
    )
}