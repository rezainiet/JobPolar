import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const AppliedJobs = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/get-applied-jobs/${user?.email}`)
        .then(res => res.json())
        .then(data => setJobs(data));
    }, [user]);

    console.log(jobs);

    const appliedJobs = [
        {
            id: jobs._id,
            companyName: 'ABC Corporation',
            appliedTime: jobs?.appliedTime,
            companyLocation: 'City, Country',
            companyLogo: 'https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg',
            designation: 'Front-end Developer',
            applyStatus: 'Approved',
        },
        {
            id: 2,
            companyName: 'XYZ Tech Solutions',
            appliedTime: '1 week ago',
            companyLocation: 'Another City, Country',
            companyLogo: 'data:image/png;base64,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',
            designation: 'UI/UX Designer',
            applyStatus: 'Under Review',
        },
        // Add more job entries as needed
    ];
    return (
        <div>
            <div>
                <div className="max-w-screen-2xl container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job) => (
                        <div key={job?._id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between mb-4">
                                <img
                                    src={job?.companyLogo}
                                    alt={`${job.companyName} Logo`}
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                                <span className="text-gray-500 text-sm">{job.appliedTime}</span>
                            </div>
                            <h2 className="text-lg font-semibold mb-2">{job.companyName}</h2>
                            <p className="text-gray-600 mb-2">{job?.jobTitle}</p>
                            <p className="text-gray-600 mb-2">{job?.jobLocation}</p>
                            <div className='flex justify-between items-center'>
                                <span className={`text-sm font-semibold ${job.applyStatus === 'Approved' ? 'text-blue' : 'text-yellow-500'}`}>
                                    {job.applyStatus}
                                </span>
                                <button disabled={job.applyStatus !== 'Approved'} className='btn btn-sm'>
                                <Link to={`/details/${job?.jobID}`}>More Info</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppliedJobs;