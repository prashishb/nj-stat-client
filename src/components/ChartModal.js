import React from 'react';
import Modal from 'react-modal';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { getChartOptions, getCustomStyles } from '../utils/chartUtils';

Modal.setAppElement('#root');

const ChartModal = ({ isOpen, onRequestClose, data, title, theme }) => {
  const customStyles = getCustomStyles(theme);
  const sortedData = data.sort((a, b) => a[0] - b[0]);
  const chartOptions = getChartOptions(sortedData, title, theme);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ overlay: customStyles.overlay, content: customStyles.content }}
    >
      <div className='modal-close' onClick={onRequestClose}>
        X
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chartOptions}
      />
    </Modal>
  );
};

export default ChartModal;
