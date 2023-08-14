import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { articlePostTime } from "../../Components/Utilities/UtilitiesFunctions"
import './Category.scss'


export const Category = () => {

    // Extract the 'category' parameter from the URL
    const navigate = useNavigate()
    const {category} = useParams() 

    // State variables
    const [results, setResults] = useState([])
    const [localNewsResults, setLocalNewsResults] = useState([])
    const [articlesToShow, setArticlesToShow] = useState(5);
    const articlesIncrement = 5;

    // Function to fetch search results from the NewsAPI
    const searchApiCall = async () => {
        try {
            if(category !== 'ghana') {
                // const response = await axios.get(`https://newsapi.org/v2/everything?q=${category.toLocaleLowerCase()}&apiKey=91c897b5e5534d609204e6fd90fd0b25`)
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${category.toLocaleLowerCase()}&apiKey=9060ec5bd2414ffa81465607bc541985`)
                setResults(response.data.articles)
                // checkResults()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Function to fetch local news using The Guardian API
    const getLocalNews = async () => {
        try {
            if(category === 'ghana') {
                const response = await axios.get('https://content.guardianapis.com/search?q=ghana&api-key=2257749e-0fbd-42dc-8063-f500316ffa36')
                setLocalNewsResults(response.data.response.results)
                // checkResults()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function checkResults() {
        if(localNewsResults.length > 0 && category !== 'ghana') {
            setLocalNewsResults([])
            navigate(`/category/${category}`)
        }
    }

    // Effect to run the API calls based on the 'category' parameter
    useEffect(() => {
        searchApiCall()
        getLocalNews()
        checkResults()
    }, [category])

    // handle load more function
    const handleLoadMore = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + articlesIncrement)
    }

    // Function to generate the category name with proper capitalization
    function setCategoryName(category) {
        if(category === 'general') {
            return 'World'
        } else {
            return category.charAt(0).toUpperCase() + category.slice(1);
        }
    }
    

    return (
        <div className="search">
            <div className="search-container">
                {/* Display category name if there are search results */}
                {results.length > 0 && <h1>{setCategoryName(category)} News</h1>}

                {localNewsResults.length > 0 && localNewsResults.map((result, index) => {
                    return (
                        <div className="news" key={index}>
                            <div className="news-description">
                                <p className="news-source">{result.pillarName}</p>
                                <a href={result.webUrl} target='_blank' className="news-headline">{result.webTitle}</a>
                                <p className="news-post-time">{articlePostTime(result.webPublicationDate)}</p>
                            </div>
                        </div>
                    )
                }) }

                {/* Display search results */}
                {results.length > 0 && results.slice(0, articlesToShow).map((result, index) => {
                    return (
                        <div className="news" key={index}>
                            <div className="news-description">
                                <p className="news-source">{result.source.name}</p>
                                <a href={result.url} target='_blank' className="news-headline">{result.title}</a>
                                <p className="news-post-time">{articlePostTime(result.publishedAt)}</p>
                            </div>
                            <div 
                                className="news-image"
                                style={ results.length > 0 ? { backgroundImage:  `url(${result.urlToImage})` } : ''}
                            ></div>
                        </div>
                    )
                } )}

                {/* show no results message if no data was returned from api  */}
                {localNewsResults.length === 0 && results.length === 0 && <div className="no-results"><h1>No results found</h1></div>}

                {results.length > 0 && <div className="load-more-btn">
                    <button onClick={handleLoadMore}
                    >Load more</button>
                </div>}

            </div>
        </div>
    )
}