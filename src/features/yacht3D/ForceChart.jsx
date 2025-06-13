import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const ForceChart = ({ data }) => {
    return (
        <div style={{ height: 200, width: '100%', background: '#1e1e1e', padding: '1rem' }}>
            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Storico Forza G</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="time" stroke="#ccc" />
                    <YAxis domain={[0, 'dataMax + 0.1']} stroke="#ccc" />
                    <Tooltip />
                    <Line type="monotone" dataKey="g" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ForceChart;
