import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { articlePostTime } from "../../Components/Utilities/UtilitiesFunctions"
import './Category.scss'


export const Category = () => {

    const {category} = useParams() 

    console.log(category)

    const [results, setResults] = useState([])
    const [articlesToShow, setArticlesToShow] = useState(5);
    const articlesIncrement = 5;


    const searchApiCall = async () => {

        try {

            if(category === 'ghana') return
            
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${category.toLocaleLowerCase()}&apiKey=91c897b5e5534d609204e6fd90fd0b25`)

            setResults(response.data.articles)
            
        } catch (error) {
            console.log(error)
        }

    }

    const getLocalNews = async () => {
        try {

            if (!category === 'ghana') {
                return
            } else {
                const response = await axios.get('https://content.guardianapis.com/search?q=ghana&api-key=2257749e-0fbd-42dc-8063-f500316ffa36')
                setResults(response.data.articles)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        searchApiCall()
        getLocalNews()
    }, [category])

    // handle load more function
    const handleLoadMore = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + articlesIncrement)
    }

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
                {results.length > 0 && <h1>{setCategoryName(category)} News</h1>}

                { results.length > 0 ? results.slice(0, articlesToShow).map((result, index) => {
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
                } ) : <div className="no-results"><h1>No results found</h1></div> }

                {results.length > 0 && <div className="load-more-btn">
                    <button onClick={handleLoadMore}
                    >Load more</button>
                </div>}

            </div>
        </div>
    )
}