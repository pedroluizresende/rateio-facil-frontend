import PropTypes from 'prop-types';

function ListItem({ label, value }) {
  return (
    <li>
      <strong>
        {label}
        :
      </strong>
      <p>{value}</p>
    </li>
  );
}

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ListItem.defaultProps = {
  value: '',
};

export default ListItem;
