import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { articlePostTime } from "../../Components/Utilities/UtilitiesFunctions"
import './SearchResults.scss'


export const SearchResults = () => {

    // Get the search term from the URL parameter
    const {searchTerm} = useParams() 

    // State to hold search results and number of articles to show
    const [searchResults, setSearchResults] = useState([])
    const [articlesToShow, setArticlesToShow] = useState(5);
    const articlesIncrement = 5;


    // fetch all articles related to category or search term
    const searchApiCall = async () => {

        try {
            
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm.toLocaleLowerCase()}&apiKey=${process.env.REACT_APP_NEWS_API}`)

            // Update the state with fetched search results
            setSearchResults(response.data.articles)
            
        } catch (error) {
            console.log(error)
        }

    }

    // Effect to call searchApiCall when the search term changes
    useEffect(() => {
        searchApiCall()
    }, [searchTerm])

    // function handling load more function
    const handleLoadMore = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + articlesIncrement)
    }
    

    return (
        <div className="search">
            <div className="search-container">
                {searchResults.length > 0 && <h1>Your search results for '{searchTerm}'</h1>}

                {/* Map through search results to display articles */}
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

                {/* Display "Load more" button if there are results */}
                {searchResults.length > 0 && <div className="load-more-btn">
                    <button onClick={handleLoadMore}
                    >Load more</button>
                </div>}

                
            </div>
        </div>
    )
}