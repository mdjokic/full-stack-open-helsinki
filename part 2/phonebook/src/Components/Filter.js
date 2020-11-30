const Filter = ({ predicate, handlePredicateChange }) => {
  return (
    <div>
      filter shown with <input value={predicate} onChange={handlePredicateChange} />
    </div>
  );
};

export default Filter;
