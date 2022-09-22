import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'

export const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	const pageCount = Math.ceil(itemsCount / pageSize); // Кол-во страниц

  if (pageCount === 1) {
    return null;
  }

	const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(item => (
          <li
            className={'page-item' + (item === currentPage ? ' active' : '')}
            key={'page _' + item}
          >
            <button className="page-link" onClick={() => onPageChange(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
  currentPage:PropTypes.number.isRequired,
}


