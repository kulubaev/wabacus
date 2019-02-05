import React, { Component  } from 'react';
import { connect  } from 'react-redux';
import  PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import * as actions from '../store/actions';
import { PAGE_SIZE } from '../constants';
import './styles/ops-list.scss';

import {
  ALL,
  TODAY,
  THIS_WEEK,
  THIS_MONTH
} from '../constants';


export class OpsHistory extends Component {

  exportLink = React.createRef();

  componentDidMount( ) {
    const { page, loadHistory }  = this.props;
    loadHistory('all', {page});
  }

  onExportData= (e) => {
    const { interval, loadExportData } = this.props;

    loadExportData(interval)
      .then((e) => {
        this.exportLink.current.link.click();
      })
  }

	onIntervalChange = (e) => {
    e.preventDefault();
    const interval = e.target.value;
    const { page, loadHistory }  = this.props;
    loadHistory(interval, {page});
	}

  onShuffle (e, dir) {

    e.preventDefault();
    
    let { page} = this.props;

    if (dir === 'prev') {
      page = page ? page - 1 : page;
    } else if (dir === 'next') {
      page++;
    }

    this.props.loadHistory('all', {page});
  }

  render() {
    const { list, page, exportData } = this.props;

    const columns = [
      { label: 'operation', key: 'operation'},
      { label: 'expression', key: 'expression'},
      { label: 'result', key: 'result'},
      { label: 'date', key: 'date'}
    ]; 
    const starting = page * PAGE_SIZE;
    const ending =  starting + list.length;
    const { interval } = this.props;

    return (
      <div className="ops-container">
        <header className="ops-line">
          <h5 className="ops-header">History</h5>
          <div className="ops-export-btn">
            <CSVLink data={exportData} 
              filename={`${interval}_report.csv`}
              headers={columns}
              className="ops-hidden"
              target="_blank"
              ref={this.exportLink}
            />
            <button
              onClick={this.onExportData}>
              <svg version="1.1" height="15px"  width="15px" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
                <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M2868.7,4995.1C2836.2,4976,960.4,2897.3,770.9,2667.6l-53.6-63.2v-3627.1v-3627.1l65.1-65.1l65.1-65.1h3544.8h3544.8l65.1,65.1l65.1,65.1v545.5v547.4l388.5,5.7l386.7,5.7l120.6,65.1c134,72.7,191.4,132.1,268,277.5l51.7,97.6v1387.7v1387.7l-47.9,95.7c-59.3,122.5-174.2,237.3-296.7,296.7c-90,45.9-116.8,47.9-482.4,53.6l-388.5,5.8v2384.9v2383l-65.1,65.1l-65.1,65.1H5422.1C3486.9,5018.1,2899.3,5012.3,2868.7,4995.1z M7661.5,2365.2l3.8-2245.2l-2023.2-3.8l-2025.1-5.7l-95.7-47.9c-51.7-24.9-130.2-82.3-172.3-124.4c-42.1-42.1-99.5-118.7-124.4-172.3l-47.9-95.7v-1387.7v-1387.7l47.9-95.7c59.3-122.5,174.2-237.3,296.7-296.7l95.7-47.9l2025.1-5.7l2023.2-3.8l-3.8-407.7l-5.7-405.8H4392.3H1128.8V-1105v3263.5l957,9.6c526.4,5.7,970.4,17.2,987.7,24.9c15.3,7.7,44,40.2,61.2,68.9c28.7,51.7,32.5,158.9,32.5,1205.9V4618l2245.2-3.8l2243.3-5.7L7661.5,2365.2z M2759.6,2575.7c-3.8-3.8-348.4-3.8-765.6-1.9l-759.9,5.7l759.9,849.8l761.8,847.9l5.7-846C2763.4,2964.3,2763.4,2579.6,2759.6,2575.7z M8765.9-312.6c128.2-59.4,124.4-21.1,124.4-1404.9c0-1096.7-3.8-1255.6-30.6-1311.1c-63.2-132.1,111-124.4-2629.9-124.4c-2740.9,0-2566.8-7.7-2629.9,124.4c-26.8,55.5-30.6,214.4-30.6,1311.1c0,1094.8,3.8,1255.6,30.6,1311.1C3661.1-274.3,3485-282,6226-282C8442.4-282,8708.5-285.8,8765.9-312.6z"/><path d="M4889.9-1078.2c-313.9-84.2-524.5-344.5-549.3-687.2c-26.8-354.1,132.1-660.4,411.5-790.5c97.6-45.9,132.1-51.7,319.7-51.7c187.6,0,222,5.7,315.8,49.8c57.4,28.7,135.9,76.6,172.3,109.1l67,57.4l-45.9,49.8c-55.5,59.3-99.5,63.2-145.5,11.5c-103.4-112.9-423-141.7-597.2-51.7c-109.1,57.4-174.2,130.2-239.3,273.7c-61.2,132.1-61.2,417.3-1.9,545.5c57.4,128.3,162.7,235.4,277.5,285.2c84.2,36.4,124.4,42.1,266,34.4c149.3-7.6,178-15.3,269.9-70.8l101.4-63.2l51.7,63.2c61.3,72.8,53.6,88.1-76.6,164.6C5322.5-1051.4,5090.9-1024.6,4889.9-1078.2z"/><path d="M6151.3-1072.5c-229.7-65.1-363.7-290.9-304.3-511.1c36.4-135.9,149.3-231.6,344.5-296.7c302.4-99.5,369.4-151.2,369.4-285.2c0-105.3-51.7-197.1-139.7-245c-51.7-28.7-95.7-34.5-193.3-30.6c-109.1,5.7-141.7,17.2-237.4,78.5c-59.3,40.2-120.6,68.9-134,63.2c-15.3-5.8-40.2-34.5-55.5-67c-28.7-55.5-28.7-57.4,32.5-109.1c118.7-101.5,216.3-132.1,415.4-132.1c151.2,0,195.2,7.7,260.3,42.1c223.9,120.6,325.4,440.2,195.2,627.8c-59.3,88-139.7,137.8-348.4,210.6c-223.9,80.4-277.5,112.9-310.1,193.3c-99.5,239.3,218.2,402,482.3,246.9c105.3-61.3,124.4-59.3,166.5,11.5c42.1,74.6,26.8,93.8-109.1,158.9C6465.2-1057.1,6273.8-1038,6151.3-1072.5z"/><path d="M6861.4-1083.9c0-7.7,135.9-350.3,302.4-759.9l302.4-744.6l97.6-5.7c65.1-3.8,99.5,1.9,107.2,19.1c5.7,13.4,143.6,354.1,308.2,756.1c164.6,401.9,298.6,736.9,298.6,742.6s-42.1,9.6-95.7,9.6c-76.6,0-99.5-7.7-122.5-42.1c-40.2-61.3-470.8-1150.4-470.8-1188.6c0-17.2-7.7-32.5-19.1-32.5c-9.6,0-19.1,11.5-19.1,24.9c0,28.7-459.4,1182.9-484.3,1215.4C7045.2-1064.8,6861.4-1057.1,6861.4-1083.9z"/></g></g>
              </svg>
            </button>

            <select onChange={this.onIntervalChange} value={interval}>
              <option  value={ALL}>all</option>
              <option  value={TODAY} >today</option>
              <option  value={THIS_WEEK}>last 7 days</option>
              <option  value={THIS_MONTH}>last 30 days</option>
            </select>
          </div>
        </header>
        <>
        <ul className="ops-list">

          <li className="ops-entry ops-entry-header">
						{
							columns.map((col, i)  => <span className={`ops-${col.key}`}>{col.label}</span>)
						}
					</li>
          {list.map((item, i) => (
            <li key={i} className="ops-entry">
						{
							columns.map((col, i)  => <span className={`ops-${col.key}`}>{item[col.key]}</span>)
						}
            </li>
          ))}
        </ul>
       <div className="ops-pagination">
          <div className="ops-middle">
            <span
              className="ops-pager"
              onClick={e => this.onShuffle(e, 'prev')}
            >
              prev
            </span>
            <small className="ops-page"> 
              {starting} - {ending}
            </small>
            <span
              className="ops-pager"
              onClick={e => this.onShuffle(e, 'next')}
            >
              next
            </span>
          </div>
        </div>
    </>
      </div>
    );
  }

}


OpsHistory.propTypes = {
  list: PropTypes.array,
  exportData: PropTypes.array,
  page: PropTypes.number


}

OpsHistory.defaultProps = {
  list: [],
  exportData: [],
  page: 0,
  interval: ALL
}


const mapToProps = ({home: { operations:list, page, exportData, interval }}) => ({
  list,
  page,
  exportData,
  interval
});

export default connect( mapToProps,actions)(OpsHistory);

