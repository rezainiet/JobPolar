import React, { useEffect, useState } from 'react';

const PaymentSection = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [searchChar, setSearchChar] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

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

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value);
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
                        <label htmlFor="bKash" className="text-sm flex items-center justify-center">
                            <img
                                src="https://download.logo.wine/logo/BKash/BKash-Logo.wine.png"  // Replace with the actual path to your bKash logo
                                alt="bKash Logo"
                                className="w-8 h-8 mr-2"  // Adjust the size as needed
                            />
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
                        onChange={() => {
                            setSelectedPaymentOption('Credit Card');
                            setAdditionalInfo(''); // Reset additional info when changing payment option
                        }}
                        className="mr-2"
                    />
                    <label className="text-sm flex items-center justify-center" htmlFor="creditCard">
                        <img
                            src="https://unblast.com/wp-content/uploads/2018/08/Credit-Card-Icons.jpg"  // Replace with the actual path to your credit card logo
                            alt="Credit Card Logo"
                            className="w-8 h-8 mr-2"  // Adjust the size as needed
                        />
                        Credit Card
                    </label>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md mb-8">
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

            <p className="text-normal text-gray-500">
                Choose your preferred payment method for {selectedCountry}.
            </p>
            {/* Render payment options based on the selected country */}
            {renderPaymentOptions()}

            {/* Additional details and instructions */}
            {selectedPaymentOption === 'Credit Card' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Additional Credit Card Info
                    </label>
                    <input
                        type="text"
                        placeholder="Enter additional info..."
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleAdditionalInfoChange}
                        value={additionalInfo}
                    />
                </div>
            )}
            {selectedPaymentOption === 'bKash' && (
                <div className="mb-4">
                    <em className='text-yellow-500'>Please follow the instructions for bKash payment:</em>
                    <h2 className='text-xl font-semibold mb-4'>This is a <span className='text-red-600'>bKash Merchant</span> account</h2>
                    <p className="text-sm">To make your payment with bKash, follow the steps below:</p>
                    <div className="overflow-x-auto max-w-full items-start flex justify">
                        <ul className="timeline timeline-vertical mx-4 md:mx-0 -ml-60 md:-ml-96 my-10">
                            <li>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Go to your bKash Mobile Menu by dialing *247#</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Choose “Payment”</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Enter the Merchant bKash Account Number you want to pay to</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Enter the amount you want to pay</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Enter a reference* against your payment (you can mention the purpose of the transaction in one word. e.g. Bill)</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Enter the Counter Number* (the salesperson at the counter will tell you the number)</div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Now enter your bKash Mobile Menu PIN to confirm</div>
                                <hr />
                            </li>

                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end timeline-box">Done! You will receive a confirmation message from bKash.</div>
                            </li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        {`*If Reference or Counter No. or both are not applicable, you can skip them by entering "0".`}
                    </p>
                    <label className="block text-sm font-medium text-gray-700">
                        Additional bKash Transaction Info
                    </label>
                    <input
                        type="text"
                        placeholder="Enter additional info..."
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleAdditionalInfoChange}
                        value={additionalInfo}
                    />
                </div>
            )}




            {/* Payment button or confirmation */}
            <button className="bg-blue text-white py-2 px-4 rounded mt-3">
                Pay Now
            </button>
        </div>
    );
};

export default PaymentSection;