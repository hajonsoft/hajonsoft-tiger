import { Box } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const BioStatistics = ({ data }) => {


    const chatData = [
        { name: "Female", 'gender&ageGroup': data.filter(f => f.gender && f.gender.startsWith('F')).length, amount: data.filter(f => f.gender && f.gender.startsWith('F')).length },
        { name: "Male", "gender&ageGroup": data.filter(f => f.gender && f.gender.startsWith('M')).length, amount: data.filter(f => f.gender && f.gender.startsWith('M')).length },
        { name: "between 18 and 50 years old", "gender&ageGroup": data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') > 18 && moment().diff(f.birthDate, 'years') < 50).length, amount: data.filter(f => f.birthDate && f.birthDate && moment().diff(f.birthDate, 'years') > 18 && moment().diff(f.birthDate, 'years') < 50).length },
    ]

    return (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart
                width={600}
                height={400}
                data={chatData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gender&ageGroup" stackId="a" fill="#82ca9d" />
            </BarChart>
        </Box>
    )
}

export default BioStatistics
