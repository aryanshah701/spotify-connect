import React from 'react';
import { Bar } from 'react-chartjs-2';

import { histogram } from '../utility/graphs';

export default function ValenceGraph(props) {
  const { valenceData } = props;

  // Bin the valenceData
  const bins = histogram(valenceData, 5, 0, 1);

  // Get the labels
  const binLabels = bins.map((bin) => {
    let min = bin.minNum.toString().slice(0, 3);
    let max = bin.maxNum.toString().slice(0, 3);
    return min + ' - ' + max;
  });

  // Get the counts
  const binCounts = bins.map((bin) => bin.count);

  // Graph config vars
  const fontColor = 'white';
  const fontSize = 14;

  return (
    <div class="row">
      <div class="column">
        <Bar
          data={{
            labels: binLabels,
            datasets: [
              {
                label: '# of Songs',
                data: binCounts,
                backgroundColor: 'rgba(30, 215, 96, 1)',
                borderColor: 'white',
                borderWidth: 3,
              },
            ],
          }}
          height={350}
          width={100}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 3000,
              easing: 'easeOutQuint',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: fontColor,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Num Songs',
                    fontColor: fontColor,
                    fontSize: fontSize,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: fontColor,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Emotional Index',
                    fontColor: fontColor,
                    fontSize: fontSize,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          }}
        />
      </div>
    </div>
  );
}
