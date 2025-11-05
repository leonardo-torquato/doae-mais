import React from 'react';

const NeedsList = ({ needs }) => {
    return (
        <div className="needs-list">
            <h2>Current Needs</h2>
            {needs.length === 0 ? (
                <p>No current needs available.</p>
            ) : (
                <ul>
                    {needs.map((need) => (
                        <li key={need.id}>
                            <h3>{need.title}</h3>
                            <p>{need.description}</p>
                            <p><strong>Goal: </strong>${need.goal}</p>
                            <p><strong>Raised: </strong>${need.raised}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NeedsList;