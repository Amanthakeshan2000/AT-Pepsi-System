import React, { useState } from 'react'
import PageHeaderSetting from '@/components/shared/pageHeader/PageHeaderSetting'
import { settingOptions } from './settingsEmailForm'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { timezonesData } from '@/utils/fackData/timeZonesData'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import { languagesData } from '@/utils/fackData/languagesData'
import useLocationData from '@/hooks/useLocationData'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Footer from '@/components/shared/Footer'

const dateFormatOptions = [
    { value: "d-m-Y", label: "d-m-Y" },
    { value: "d/m/Y", label: "d/m/Y" },
    { value: "m-d-Y", label: "m-d-Y" },
    { value: "m.d.Y", label: "m.d.Y" },
    { value: "m/d/Y", label: "m/d/Y" },
    { value: "y-m-d", label: "y-m-d" },
    { value: "d.m.y", label: "d.m.y" },
]
const SettingsLocalizationForm = () => {
    const { countries, states, cities, loading, error, fetchStates, fetchCities } = useLocationData();
    const [selectedOption, setSelectedOption] = useState(null)
    const options = settingOptions
    return (
        <div className="content-area">
            <PerfectScrollbar>
                <PageHeaderSetting />
                <div className="content-area-body">
                    <div className="card mb-0">
                        <div className="card-body">
                            <div className="mb-5">
                                <label className="form-label">Disable Languages </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"yes"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Disable Languages [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label"> Output client PDF documents from admin area in client language </label>
                                <SelectDropdown
                                    options={options}
                                    defaultSelect={"no"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted"> Output client PDF documents from admin area in client language [Ex: Yes/No]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Date Format </label>
                                <SelectDropdown
                                    options={dateFormatOptions}
                                    defaultSelect={"d-m-Y"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Date Format [Ex: d/m/Y/m-d-Y/m.d.Y]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Default Timezone</label>
                                <SelectDropdown
                                    options={timezonesData}
                                    defaultSelect={"Western Europe Time"}
                                    selectedOption={selectedOption}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                                <small className="form-text text-muted">Default Timezone [Ex: (GMT) Western Europe Time, London, Lisbon, Casablanca]</small>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Default Language </label>
                                <MultiSelectTags
                                    options={languagesData}
                                    defaultSelect={[languagesData[25], languagesData[10]]}
                                />
                                <small className="form-text text-muted">Default Language [Ex: English/Hindi - हिन्दी]</small>
                            </div>
                            <div className="mb-0">
                                <label className="form-label">Default Country </label>
                                <SelectDropdown
                                    options={countries}
                                    selectedOption={selectedOption}
                                    defaultSelect="usa"
                                    onSelectOption={(option) => {
                                        setSelectedOption(option)
                                    }}
                                />
                                <small className="form-text text-muted">Default Country [Ex: United State/United Kingdom]</small>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </PerfectScrollbar>
        </div>

    )
}

export default SettingsLocalizationForm