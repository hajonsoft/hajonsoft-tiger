import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Box, TableRow } from '@material-ui/core';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import _ from 'lodash';
import React from 'react';

const NationalityStatistics = ({ data }) => {
    const chatData = Object.keys(_.groupBy(data, "nationality")).map(nationality => {
        return {
            name: nationality,
            nationalities: Math.round((data.filter(x => x.nationality === nationality).length / data.length) * 100),
            amount: Math.round((data.filter(x => x.nationality === nationality).length / data.length) * 100)
        }
    })

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
                {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                <Bar dataKey="nationalities" stackId="a" fill="#82ca9d" />
            </BarChart>
        </Box>
    )
}

export default NationalityStatistics