import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Gatos',
		'Ganancias',
		'Inversion'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

export default class LineChart_ extends React.Component{
  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    //console.log(datasets[0].data);
  }
  render() {
    return (
      <div>
		<h2 className="mb-0">Grafica</h2>
        <h5 className="text-muted mb-3">Datos del estado de tu negocio</h5>
        <Pie  ref="chart" data={data} width={550} height={450} />
      </div>
    );
  }
};