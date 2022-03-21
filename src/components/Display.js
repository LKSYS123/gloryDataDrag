import React from 'react';
import { connect } from 'react-redux';

const Display = ({ count }) => {
    return (
        <div>
            <h3>구독자 수: {count}</h3>
        </div>
    );
};

const mapStateToProps = ({ subReducer }) => {
    return {
        count: subReducer.count,
    };
};

export default connect(mapStateToProps)(Display);
