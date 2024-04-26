import React, { useEffect } from 'react';
import "../css/Client.css"
import "../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"


const Pagination = ({ currentPage, totalPages, onPageChange, handlePrevPage, handleNextPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        console.log("pageNumbers", pageNumbers);
    }, [[pageNumbers]])

    const getPaginationRange = () => {
        const range = [];
        const maxPagesToShow = 5; // Số trang tối đa được hiển thị

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            const halfMax = Math.floor(maxPagesToShow / 2);
            const startRange = Math.max(currentPage - halfMax, 1);
            const endRange = Math.min(currentPage + halfMax, totalPages);

            if (startRange > 1) {
                range.push(1);
                if (startRange > 2) {
                    range.push('...');
                }
            }

            for (let i = startRange; i <= endRange; i++) {
                range.push(i);
            }

            if (endRange < totalPages) {
                if (endRange < totalPages - 1) {
                    range.push('...');
                }
                range.push(totalPages);
            }
        }

        return range;
    };

    // Sử dụng getPaginationRange thay cho pageNumbers
    const paginationRange = getPaginationRange();

    return (
        <nav>
            <ul className="pagination">
                <button className='previous-pagination'
                onClick={handlePrevPage} disabled={currentPage === 1}>
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                {paginationRange.map((item, index) => (
                    <li key={index} className={item === currentPage ? 'active-page' : 'not-active'}>
                        {item === '...' ? '...' : (
                            <a href="#" className={item === currentPage ? 'active-page-a' : 'not-active-a'} onClick={() => onPageChange(item)}>
                                {item}
                            </a>
                        )}
                    </li>
                ))}
                <button className='next-pagination'
                onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <i class="fa-solid fa-chevron-right "></i>
                </button>
            </ul>
        </nav>
    );
};

export default Pagination;