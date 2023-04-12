import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
    return (
        <ReactPaginate
            className='paginate'
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => props.onChangePage(event.selected +1)}
            pageRangeDisplayed={8}
            pageCount={6}
            renderOnZeroPageCount={null}
      />   
    )
};

export default Pagination;