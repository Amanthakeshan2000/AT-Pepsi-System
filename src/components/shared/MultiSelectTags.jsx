import React, { useEffect } from 'react'
import Select from 'react-select'
const MultiSelectTags = ({ options, defaultSelect, placeholder }) => {
    return (
        <Select
            defaultValue={defaultSelect}
            isMulti
            name="tags"
            placeholder={placeholder}
            options={options}
            className={`basic-multi-select`}
            classNamePrefix="select"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: state.hasValue ? '6px 12px' : '13px',
                }),
            }}
            hideSelectedOptions={false}
            isSearchable={false}
            // onChange={(e) => console.log(e)}
            formatOptionLabel={tags => (
                <div className="user-option d-flex align-items-center gap-2">
                    <span style={{ marginTop: "1px", backgroundColor: `${tags.color}` }} className={`wd-7 ht-7 rounded-circle`}></span>
                    <span>{tags.label}</span>
                </div>
            )}
        />
    )
}

export default MultiSelectTags