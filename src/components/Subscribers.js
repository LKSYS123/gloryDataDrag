import React from 'react';
import { connect } from 'react-redux';
import { addSub } from '../actions/subAction';
import Display from './Display';

const Subscribers = ({ count, addSub }) => {
    return (
        <>
            <div>
                <h2>구독자 수: {count}</h2>
                <button onClick={() => addSub()}>구독하기</button>
            </div>
            <Display />
        </>
    );
};

const mapStateToProps = ({ subReducer }) => {
    return {
        count: subReducer.count,
    };
};

const mapDispatchToProps = {
    addSub,
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addSub: () => dispatch(addSub()),
//     };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
