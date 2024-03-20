import PropTypes from 'prop-types';

import './Input.scss';
const Input = ({
  id,
  name,
  type,
  value,
  className,
  labelText,
  placeHolder,
  handleChange,
  style,
}) => {
  return (
    <>
      <div className="form-row">
        {labelText && (
          <label htmlFor={name} className="form-label">
            {labelText}
          </label>
        )}

        <input
          style={style}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
          className={`form-input ${className}`}
          autoComplete="false"
        ></input>
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  placeHolder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object,
};

export default Input;
