import React, { useEffect, useState } from 'react';

const PaymentSection = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [searchChar, setSearchChar] = useState('');


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data) => {
                const sortedCountries = data.sort((a, b) =>
                    a?.name?.common.localeCompare(b?.name?.common)
                );
                setCountries(sortedCountries);
                setFilteredCountries(sortedCountries);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchChar(searchTerm);
        const filtered = countries.filter(
            (country) =>
                country?.name?.common.toLowerCase().includes(searchTerm)
        );
        setFilteredCountries(filtered);
    };

    console.log(selectedPaymentOption);

    const renderPaymentOptions = () => {
        const bangladeshSubstrings = ['bang', 'bangl', 'bangla', 'banglad', 'banglade', 'banglades', 'bangladesh'];
        const isBangladesh = selectedCountry.trim().toLowerCase() === 'bangladesh' || bangladeshSubstrings.some(substring => searchChar.toLowerCase().includes(substring));

        return (
            <div className="flex items-center space-x-4 mb-4">
                {/* bKash payment option */}
                {isBangladesh && (
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="bKash"
                            name="paymentOption"
                            value="bKash"
                            checked={selectedPaymentOption === 'bKash'}
                            onChange={() => setSelectedPaymentOption('bKash')}
                            className="mr-2"
                        />
                        <img
                            src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"  // Replace with the actual path to your bKash logo
                            alt="bKash Logo"
                            className="w-8 h-8 mr-2"  // Adjust the size as needed
                        />
                        <label htmlFor="bKash" className="text-sm">
                            bKash
                        </label>
                    </div>
                )}

                {/* Credit Card payment option */}
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="creditCard"
                        name="paymentOption"
                        value="Credit Card"
                        checked={selectedPaymentOption === 'Credit Card'}
                        onChange={() => setSelectedPaymentOption('Credit Card')}
                        className="mr-2"
                    />
                    <img
                        src="https://unblast.com/wp-content/uploads/2018/08/Credit-Card-Icons.jpg"  // Replace with the actual path to your credit card logo
                        alt="Credit Card Logo"
                        className="w-8 h-8 mr-2"  // Adjust the size as needed
                    />
                    <label htmlFor="creditCard" className="text-sm">
                        Credit Card
                    </label>
                </div>
            </div>
        );
    };




    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-8">
            <h3 className="text-lg font-bold mb-2">Payment Options</h3>

            {/* Choose Country section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Choose Country
                </label>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
                    onChange={handleSearchChange}
                />
                <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                >
                    {filteredCountries.map((country, index) => (
                        <option
                            value={country?.name?.common}
                            key={country?.name?.common}
                        >
                            {country?.name?.common}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render payment options based on the selected country */}
            {renderPaymentOptions()}

            {/* Additional details and instructions */}
            <p className="text-normal text-gray-500">
                Choose your preferred payment method for {selectedCountry}.
            </p>

            {/* Payment button or confirmation */}
            <button className="bg-blue text-white py-2 px-4 rounded mt-3">
                Pay Now
            </button>
        </div>
    );
};

export default PaymentSection;
