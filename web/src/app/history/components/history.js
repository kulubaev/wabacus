
import React, { Component  } from 'react';
import { connect  } from 'react-redux';
import  PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import * as actions from '../store/actions';
import { PAGE_SIZE } from '../constants';
import './styles/history.scss';

import {
  ALL,
  TODAY,
  THIS_WEEK,
  THIS_MONTH
} from '../constants';

import { Busy }  from '../../generic';

import icon from './assets/icon.svg';


export class History extends Component {

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
    const { loadHistory }  = this.props;
    loadHistory(interval, {page:0});
	}

  onShuffle (e, dir) {

    e.preventDefault();
    
    let {interval, page} = this.props;

    if (dir === 'prev') {
      page = page ? page - 1 : page;
    } else if (dir === 'next') {
      page++;
    }

    this.props.loadHistory(interval, {page});
  }

  render() {
    const { list, page, exportData, busy } = this.props;

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
      <>
      {(busy > 0 && <Busy className="loading"/> || '')}
      <header className="content__header">
          <h5 className="content__header-title">History </h5>
          <div className="content__export">

           <CSVLink data={exportData} 
              filename={`${interval}_report.csv`}
              headers={columns}
              className="ops-hidden"
              target="_blank"
              ref={this.exportLink}
            />
            <button
              className="content__export-btn"
              onClick={this.onExportData}>

              <img src={icon} alt="export" className="export__icon"/>
           </button>

            <select className="content__export-interval" onChange={this.onIntervalChange} value={interval}>
              <option  value={ALL}>all</option>
              <option  value={TODAY} >today</option>
              <option  value={THIS_WEEK}>last 7 days</option>
              <option  value={THIS_MONTH}>last 30 days</option>
            </select>
          </div>
        </header>
        <>
        <ul className="content__body">

          <li className="content__item content__item--header">
						{
							columns.map((col, i)  => <span key={`${i}-col`}  className={`content__item-${col.key}`}>{col.label}</span>)
						}
					</li>
          {list.map((item, i) => (
            <li key={`${i}-op`} className="content__item contet__item--entry">
						{
							columns.map((col, i)  => <span key={`${i}-col`} className={`content__item-${col.key}`}>{item[col.key]}</span>)
						}
            </li>
          ))}
        </ul>
       <div className="content__footer">
          <div className="pagination">
            <span
              className="pagination__pager"
              onClick={e => this.onShuffle(e, 'prev')}
            >
              prev
            </span>
            <small className="pagination__page"> 
              {starting} - {ending}
            </small>
            <span
              className="pagination__pager"
              onClick={e => this.onShuffle(e, 'next')}
            >
              next
            </span>
          </div>
        </div>
    </>
      </>
    );
  }

}


History.propTypes = {
  list: PropTypes.array,
  exportData: PropTypes.array,
  page: PropTypes.number,
  busy: PropTypes.number


}

History.defaultProps = {
  list: [],
  exportData: [],
  page: 0,
  interval: ALL,
  busy: 0,
}

const mapToProps = ({history}) => {
  const  { operations, page, exportData, interval, busy } = history;
  return {
    list:operations,
    page,
    exportData,
    interval,
    busy
  }};

export default connect( mapToProps,actions)(History);

