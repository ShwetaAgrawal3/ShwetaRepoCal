import React from 'react';
import PropTypes from 'prop-types';
import Headers from '../Headers';
import './labelStyle.css';

const InputSection = ({
  title,
  fields,
  values,
  handleChange,
}) => {
  
  return (
    <fieldset className="input-section">
      <legend>
        <Headers level={2} text={title} className="header-primarys" />
      </legend>
      {fields.map((field) => (
        <div key={field.id}>
          <label className="label" htmlFor={field.id}>{field.label}</label>
          {field.type === 'select' ? (
            <select
              id={field.id}
              value={values[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="input-field"
              aria-label={field.label}
            >
              
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type={field.type}
              value={values[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="input-field"
              min={field.min}
              step={field.step}
              aria-label={field.label}
            />
          )}
        </div>
      ))}
    </fieldset>
  );
};

InputSection.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'select']).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),
    min: PropTypes.number,
    step: PropTypes.number,
  })).isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputSection;