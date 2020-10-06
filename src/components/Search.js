import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  
  useEffect(() => {
    const search = async () => {
      const URL = 'https://en.wikipedia.org/w/api.php'
      const { data } = await axios.get(URL, {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    }
    // Only runs the "search" function if the value of "term" is not empty. "If" statement is to prevent the "srsearch" params error from API request.  
    if (term && !results.length) {
      search();
    } else {
      const timeoutID = setTimeout(() => {
        if (term) {
          search();
        }
      }, 600);
  
      return () => {
        clearTimeout(timeoutID);
      }
    }
  }, [term, results.length])

  const handleOnChange = (e) => {
    setTerm(e.target.value)
  }

  const listResults = results.map(result => {
    // return (
    //   <div key={result.pageid} className="item">
    //     <div className="right floated content">
    //       <a 
    //         className="ui button" 
    //         href={`https://en.wikipedia.org?curid=${result.pageid}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Go
    //       </a>
    //     </div>
    //     <div className="content">
    //       <div className="header">
    //         {result.title}
    //       </div>
    //       <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
    //     </div>
    //   </div>
    // )
    
    return (
      (term ? 
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a 
            className="ui button" 
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
      : null)
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="ui field">
          <label>Enter Search Term</label>
          <input 
            className="input" 
            type="text"
            placeholder="search"
            value={term}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="ui celled list">
        {listResults}
      </div>
    </div>
  )
}


export default Search