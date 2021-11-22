import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Loader from './Loader';

function Giphy() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading]=useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchdata = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                 const results = await  axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "sBNpOkCrSuC4fiMMI5Jqy5pdWJcFGdk3"
                }
            })
            console.log(results)
            setData(results.data.data)
            } catch (err) {
                setIsError(true);
                setTimeout(()=> setIsError(false), 4000)
            }
            setIsLoading(false);
            }
         
        fetchdata();
    }, [])
    
    const renderGifs = () => {
        if (isLoading) {
           return <Loader/>
       }
       return data.map(ele => {
           return (
               <div key={ele.id} className="gif">
                   <img src={ele.images.fixed_height.url} alt="" />
               </div>
            )
        })
    }

    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger alert-dismissible fade slow"
                    role="alert"
                >
                    Unable to get Gifs,Please try again in a few minutes
                </div>
            )
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const onsubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);
        try {
         const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "sBNpOkCrSuC4fiMMI5Jqy5pdWJcFGdk3",
                q: search
            }
        })
        setData(results.data.data);
        } catch {
            setIsError(true);
                setTimeout(()=> setIsError(false), 4000)
        }
        
        setIsLoading(false)
    }
    return (
        <div className="m-2">
              {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input type="text"
                   // className="form-control m-2"
                   className="input_field"
                    placeholder="search"
                    onChange={handleChange}
                    value={search}
                />
                <button type="Submit"
                 className="btn btn-primary mx-2"
                onClick={onsubmit}
                >Go</button>
      </form>

            <div className="container gifs">{renderGifs() }</div>
         
        </div>
      )
}

export default Giphy

