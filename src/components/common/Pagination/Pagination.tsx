import React from 'react';

interface IPaginationProps {
  onPageForward: any;
  onPageBack: any;
  currentPage: number;
  selectPage: any;
  totalPages: number;
}

const renderPages = (props: any) => {
  const pageNums = [];
  for (let i = 0; i < props.totalPages; i++) {
    pageNums.push(
      <input type='submit' onClick={props.selectPage} value={i + 1} />,
    );
  }
  return pageNums;
};

const Pagination: React.FunctionComponent<IPaginationProps> = props => {
  return (
    <div>
      {renderPages(props)}
      <button onClick={props.onPageBack}>Previous</button>
      <button onClick={props.onPageForward}>Next</button>
    </div>
  );
};

export default Pagination;
