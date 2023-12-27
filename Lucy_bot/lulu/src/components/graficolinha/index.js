import React from 'react';
import { Chart } from 'react-google-charts';

const LineChart = () => {
  const data = [
    ['Mês', 'Imoveis'],
    ['Segunda', 12],
    ['terça', 19],
    ['quinta', 3],
    ['sexta', 5],
    ['sabado', 2],
    ['domingo', 80]
  ];

  const options = {
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'none',


    series: {
      0: {
        color: '#9c88ff', 
        lineWidth: 2, 
        visibleInLegend: false, 
      },
    },

    hAxis: {
        gridlines: {
            color: 'transparent',
          },
      textStyle: {
        color: ' #f5f6fa', 
        fontSize: 14,
      },
    },

    vAxis: {
          
      textStyle: {
        color: ' #f5f6fa', 
        fontSize: 14, 
      },
    },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
};

export default LineChart;
