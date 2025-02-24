import { useState, useEffect } from 'react';

const useLocationData = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStates = async (country) => {
        setError(null);
        setLoading(true)
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ country: country })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const transformedStates = data.data.states.map(state => ({
                value: state.name.toLowerCase().replace(/\s+/g, '-'),
                label: state.name
            }));

            setStates(transformedStates);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchCountry = async () => {
        setError(null);
        setLoading(true)
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const transformedStates = data.data.map(country => ({
                value: country.iso3.toLowerCase().replace(/\s+/g, '-'),
                label: country.name,
                img: country.flag
            }));

            setCountries(transformedStates);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchCities = async (country) => {
        setError(null);
        setLoading(true)
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: country,
                }),
            });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const transformedStates = data.data.map(city => ({
                value: city.toLowerCase().replace(/\s+/g, '-'),
                label: city,
            }));
            setCities(transformedStates); // Assuming the cities are in data.data

        } catch (err) {
            setLoading(false);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    useEffect(() => {
        if (countries?.length > 0) {
            const x = countries.findIndex((country) => country?.value === "usa")
            fetchStates(countries[210]?.label);
            fetchCities(countries[210]?.label);
        }
    }, [countries]);
    
    return {
        selectedOption,
        countries,
        states,
        cities,
        loading,
        error,
        fetchCountry,
        fetchStates,
        fetchCities,
    };
};

export default useLocationData;