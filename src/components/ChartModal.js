import React from 'react';
import Modal from 'react-modal';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';

Modal.setAppElement('#root');

const ChartModal = ({ isOpen, onRequestClose, data, title, theme }) => {
  const customStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      background: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      backgroundColor: theme === 'dark' ? '#212529' : '#fff',
      border: 'none',
      borderRadius: '10px',
      inset: 'auto',
      overflow: 'hidden',
      width: window.innerWidth > 768 ? '40%' : '90%',
    },
  };

  // Sort the data in ascending order of the timestamp only when the data is not empty
  const sortedData = data.sort((a, b) => a[0] - b[0]);

  const chartOptions = {
    chart: {
      type: 'line',
      backgroundColor: theme === 'dark' ? '#212529' : '#fff',
    },
    title: {
      text: title,
      align: 'left',
      style: {
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'black',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: '1rem',
        marginTop: '1rem',
        textAlign: 'left',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: '1 1 auto',
        boxSizing: 'border-box',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'black',
        },
      },
      events: {
        setExtremes: function (e) {
          const diff = e.max - e.min;
          const sixMonths = 15552000000;
          this.series[0].update({
            dataGrouping: {
              enabled: diff < sixMonths ? true : false,
            },
          });
        },
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return (this.value / 1000000).toFixed(1) + 'M';
        },
        align: 'left',
        style: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'black',
        },
      },
      gridLineColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e9ecef',
    },
    series: [
      {
        name: title,
        data: sortedData,
        color: '#56ab2f',
        type: 'area',
        threshold: null,
        lineWidth: 2,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, '#448825'],
            [1, Highcharts.color('#448825').setOpacity(0).get('rgba')],
          ],
        },
      },
    ],
    legend: {
      enabled: false,
    },
    rangeSelector: {
      buttonTheme: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'none',
        'stroke-width': 0,
        r: 8,
        style: {
          color: 'silver',
          fontWeight: 'bold',
        },
        states: {
          hover: {
            fill: '#56ab2f',
          },
          select: {
            fill: '#56ab2f',
            style: {
              color: 'white',
            },
          },
        },
      },
      inputBoxBorderColor: 'gray',
      inputBoxWidth: 120,
      inputBoxHeight: 18,
      inputStyle: {
        color: 'silver',
        fontWeight: 'bold',
      },
      labelStyle: {
        color: 'silver',
        fontWeight: 'bold',
      },
      selected: 0, // Default to 'All'
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'month',
          count: 6,
          text: '6m',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      inputEnabled: false,
      backgroundColor:
        theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e9ecef',
    },
    tooltip: {
      split: false,
      shared: true,
      xDateFormat: '%b %e, %Y',
      formatter: function () {
        const date = Highcharts.dateFormat('%b %e, %Y', this.x);
        let previousPoint;
        let valChange;

        this.points.forEach(function (point) {
          const index = point.series.xData.indexOf(point.x);
          previousPoint = index > 0 ? point.series.yData[index - 1] : null;

          const change = previousPoint != null ? point.y - previousPoint : 0;
          const changeText =
            change > 0
              ? `+${Highcharts.numberFormat(change, 0, '.', ',')}`
              : Highcharts.numberFormat(change, 0, '.', ',');

          valChange = `<br/><span style="color: ${point.color}">\u25CF</span> ${
            point.series.name
          }: <b>${Highcharts.numberFormat(
            point.y,
            0,
            '.',
            ','
          )} (${changeText})</b>`;
        });
        return `
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <span>${date}</span>
            ${valChange}
          </div>
        `;
      },
    },
    navigator: {
      enabled: true,
      series: {
        type: 'line',
        color: '#56ab2f',
      },
      outlineColor: '#56ab2f',
      outlineWidth: 1,
      maskFill:
        theme === 'dark' ? 'rgba(130, 130, 130, 0.3)' : 'rgba(0, 0, 0, 0.1)', // rgba(130, 130, 130, 0.3
      handles: {
        backgroundColor: '#56ab2f',
        borderColor: '#56ab2f',
      },
      xAxis: {
        labels: {
          style: {
            color: theme === 'dark' ? 'white' : 'black',
          },
        },
      },
    },
    scrollbar: {
      enabled: true,
      barBackgroundColor: '#56ab2f',
      barBorderRadius: 5,
      barBorderWidth: 0,
      buttonBackgroundColor: '#56ab2f',
      buttonBorderWidth: 0,
      buttonArrowColor: '#fff',
      buttonBorderRadius: 5,
      rifleColor: '#fff',
      trackBackgroundColor:
        theme === 'dark' ? 'rgba(130, 130, 130, 0.3)' : 'rgba(0, 0, 0, 0.1)', // rgba(130, 130, 130, 0.3
      trackBorderWidth: 0,
      trackBorderColor: 'transparent',
      trackBorderRadius: 5,
    },
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: false,
        },
        pointStart:
          sortedData.length > 0
            ? moment(sortedData[0][0]).format('YYYY-MM-DD')
            : null,
        pointInterval: 24 * 3600 * 1000, // one day
      },

      line: {
        marker: {
          enabled: false,
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ overlay: customStyles.overlay, content: customStyles.content }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chartOptions}
      />
    </Modal>
  );
};

export default ChartModal;
