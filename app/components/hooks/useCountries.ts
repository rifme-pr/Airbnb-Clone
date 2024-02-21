import countries from "world-countries";


const formattedCOuntries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}));

const useCountries = () => {
    const getAll = () => formattedCOuntries;
    const getByValue = (value: string) => {
        return formattedCOuntries.find((item) => item.value === value);
    }
    return {
        getAll,getByValue
    }
}

export default useCountries;