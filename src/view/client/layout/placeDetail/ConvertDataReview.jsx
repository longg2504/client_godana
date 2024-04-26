import React from 'react'
import { format } from 'date-fns';

const ConvertDateReview = ({ date }) => {
    const formattedDate = format(new Date(date), "d 'tháng' M 'năm' yyyy");
  
    return <span>{formattedDate}</span>;
}

export default ConvertDateReview