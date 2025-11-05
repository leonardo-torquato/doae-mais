import React, { useContext } from 'react';
import NeedsList from '../components/Needs/NeedsList';
import { DataContext } from '../context/DataContext';

const Needs = () => {
    const { needs } = useContext(DataContext);

    return (
        <div className="container">
            <h1>Current Needs</h1>
            <NeedsList needs={needs} />
        </div>
    );
};

export default Needs;