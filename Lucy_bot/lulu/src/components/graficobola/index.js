import React from 'react';
import { Chart } from 'react-google-charts';

const PizzaChart = () => {
  const data = [
    ['Localizaçoes', 'Casas'],
    ['faculdade', 11],
    ['centro', 2],
    ['academia', 2],
    ['supermercado', 2]
  ];

  const options = {
    title: 'Localizaçoes',
    pieHole: 0.4, 
    titleTextStyle: {
      color: '#f5f6fa', 
      fontSize: 24,
      bold: true,
    },
    legend: {
      position: 'bottom',
      textStyle: {
        color: 'f5f6fa',
        fontSize: 14,
      },
    },
    slices: {
      0: { color: '#9c88ff' }, // Cor da primeira fatia
      1: { color: '#A48EE7' }, // Cor da segunda fatia
      2: { color: '#6E88E7' }, // Cor da terceira fatia
      3: { color: '#DD90E0' }, // Cor da quarta fatia
    },
    backgroundColor: 'transparent', // Fundo transparente
    theme: {
      arrow: {
        color: '#f5f6fa', 
        size: 12, 
      },
    },
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default PizzaChart;