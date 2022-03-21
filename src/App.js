import { Route, Link, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import GeoJson from './components/GeoJson';
import GeoJsonCopy from './components/GeoJsonCopy';
import Subscribers from './components/Subscribers';
import OpenlayerPop from './components/OpenlayerPop';

import './App.css';

const App = ({ cargoList }) => {
    return (
        <>
            <div className='App'>
                <Link to='/geojson'>geojson</Link>
                <Link to='/geojsoncopy'>geojsoncopy</Link>
                <Link to='/subscribers'>subscribers</Link>
                <OpenlayerPop />
                <Popup
                    trigger={<button className='button'>Open Modal</button>}
                    modal
                    nested
                >
                    {(close) => (
                        <div
                            className='modal'
                            style={{
                                background: 'white',
                                width: 500,
                                height: 400,
                                padding: 20,
                            }}
                        >
                            <button className='close' onClick={close}>
                                X
                            </button>
                            <div className='header'>Modal Title</div>
                            <div className='content'> {cargoList}</div>
                        </div>
                    )}
                </Popup>
                <Routes>
                    <Route path='/geojson' element={<GeoJson />} />
                    <Route path='/geojsoncopy' element={<GeoJsonCopy />} />
                    <Route path='/subscribers' element={<Subscribers />} />
                </Routes>
            </div>
        </>
    );
};

const mapStateToProps = ({ gloryReducer }) => {
    return {
        cargoList: gloryReducer.cargoList,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCargo: () => dispatch(addCargo()),
//     };
// };

export default connect(mapStateToProps)(App);
