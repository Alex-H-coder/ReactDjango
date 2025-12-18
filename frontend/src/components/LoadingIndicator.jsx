//This indicator will show a spinning loader when data is being fetched or processed.
import '../styles/LoadingIndicator.css';

const LoadingIndicator =()=> {
    return <div className= "loading-container">
        <div className="loader"></div>
    </div>
}
export default LoadingIndicator;