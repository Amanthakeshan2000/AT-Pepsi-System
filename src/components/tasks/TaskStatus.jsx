import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'


const TaskStatus = ({ label, options, defaultSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="form-group mb-4">
            <label className="form-label">{label}</label>
            <SelectDropdown
                options={options}
                defaultSelect={defaultSelect}
                selectedOption={selectedOption}
                onSelectOption={(option) => setSelectedOption(option)}
            />
        </div>
    )
}

export default TaskStatus