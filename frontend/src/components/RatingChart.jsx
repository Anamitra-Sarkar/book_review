import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingChart = ({ ratingDistribution }) => {
  const data = [
    { rating: '1 Star', count: ratingDistribution[1] },
    { rating: '2 Stars', count: ratingDistribution[2] },
    { rating: '3 Stars', count: ratingDistribution[3] },
    { rating: '4 Stars', count: ratingDistribution[4] },
    { rating: '5 Stars', count: ratingDistribution[5] },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Rating Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4338ca" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
