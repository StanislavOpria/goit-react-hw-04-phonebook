import PropTypes from 'prop-types';
import { FilterInput } from './Filter.styled';

export const Filter = ({ filterValue, onChange }) => {
  const handleChange = event => {
    onChange(event.target);
  };
  return (
    <FilterInput>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filterValue}
        onChange={handleChange}
      />
    </FilterInput>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  onChange: PropTypes.func,
};
