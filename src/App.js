import GeoJson from './Component/GeoJson';
import './App.css';

function App() {
    return (
        <div className='App'>
            <GeoJson />
            <div>
                화물 이름
                <div id='cargoName'></div>
            </div>
        </div>
    );
}

export default App;
