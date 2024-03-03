import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchTotalPages() {
            try {
                const response = await axios.get('/products/total');
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        }
        fetchTotalPages();
    }, []);

    return (
        <div>
            Current Page: {currentPage}
            <br />
            Total Pages: {totalPages}
        </div>
    );
};

export default Pagination;
