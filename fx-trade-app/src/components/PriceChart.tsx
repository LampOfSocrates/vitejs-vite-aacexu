import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { Layout, PlotData } from 'plotly.js';

interface PriceChartProps {
  data: any[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const sortedData = useMemo(() => {
    // Sort data by date
    return [...data].sort(
      (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
    );
  }, [data]);

  const chartData: Partial<PlotData>[] = useMemo(() => {
    const dates = sortedData.map((row) => row.Date);
    const prices = sortedData.map((row) => parseFloat(row.Price));

    return [
      {
        x: dates,
        y: prices,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'rgba(75, 192, 192, 1)' },
        line: { shape: 'linear' },
        name: 'Price',
      },
    ];
  }, [sortedData]);

  const layout: Partial<Layout> = {
    title: 'Price vs Date',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Price' },
    autosize: true,
  };

  return (
    <div className="price-chart">
      <Plot
        data={chartData}
        layout={layout}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PriceChart;
