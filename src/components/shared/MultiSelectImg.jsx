import React from 'react'
import Select from 'react-select'
const MultiSelectImg = ({ options, defaultSelect, placeholder }) => {
    return (
        <Select
            defaultValue={defaultSelect}
            isMulti
            placeholder={placeholder}
            name="assignee"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: state.hasValue ? '6px 12px' : '13px',
                }),
            }}
            hideSelectedOptions={false}
            isSearchable={false}
            formatOptionLabel={assignee => (
                <div className="user-option d-flex align-items-center gap-3">
                    <img src={assignee.img} alt="user-image" className='avatar avatar-sm rounded-5' />
                    <span>{assignee.label}</span>
                </div>
            )}
        />
    )
}

export default MultiSelectImg