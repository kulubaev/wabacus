import React, { Component  } from 'react';
import { connect  } from 'react-redux';
import * as actions from '../store/actions';

import './styles/ops-list.scss';

export class OpsHistory extends Component {

  render() {
    const { list, page  } = this.props;
    return (
      <div className="ops-container">
        <header className="ops-line">
          <h5 className="ops-header">History</h5>
        </header>
        <>
        <ul className="ops-list">

          <li className="ops-entry ops-entry-header">
            <span className="ops-operation">operation</span> 
            <span className="ops-params">expression</span>
            <span className="ops-result">result</span> 
            <span className="ops-date">date</span>
          </li>
            {list.map((item, i) => (
              <li key={i} className="ops-entry">

                <span className="ops-operation">{item.operation}</span> 
                <span className="ops-params">{item.expression}</span>
                <span className="ops-result">{item.result}</span> 
                <span className="ops-date">{item.date}</span>

              </li>
            ))}
          </ul>
          <div className="ops-pagination">
            <div className="ops-middle">
              <span
                className="ops-pager"
                onClick={e => this._onShuffle(e, 'prev')}
              >
                prev
              </span>
              <span className="ops-page">{page}</span>
              <span
                className="ops-pager"
                onClick={e => this._onShuffle(e, 'next')}
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


OpsHistory.defaultProps = {
  list: []
}


const mapToProps = (state) => ({
  list: state.home.operations

});

export default connect( mapToProps,actions)(OpsHistory);

