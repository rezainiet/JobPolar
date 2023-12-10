import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import AppliedJobs from './AppliedJobs';

const Dashboard = () => {

    const appliedJobs = [
        {
            id: 1,
            companyName: 'ABC Corporation',
            appliedTime: '2 days ago',
            companyLocation: 'City, Country',
            companyLogo: 'https://example.com/company-logo1.png',
            designation: 'Front-end Developer',
            applyStatus: 'Applied',
        },
        {
            id: 2,
            companyName: 'XYZ Tech Solutions',
            appliedTime: '1 week ago',
            companyLocation: 'Another City, Country',
            companyLogo: 'https://example.com/company-logo2.png',
            designation: 'UI/UX Designer',
            applyStatus: 'Under Review',
        },
        // Add more job entries as needed
    ];


    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4 bg-[#F3F7FB]">
            <h1 className="text-4xl font-bold text-primary mb-3">
                Welcome to <span className='text-blue'>Your Job Portal Dashboard</span>
            </h1>
            <p className="text-lg text-black/70 mb-8">
                Explore and apply for thousands of jobs in the computer, engineering, and technology sectors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-4 rounded-md shadow-md hover:bg-purple-500 hover:bg-opacity-25 hover:text-blue cursor-pointer hover:translate-x-1 duration-300">
                    <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
                    <p className="text-gray-600">
                        Keep track of your job applications and stay updated on their status. View the progress of your applications and any feedback from employers.
                    </p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md hover:bg-purple-500 hover:bg-opacity-25 hover:text-blue cursor-pointer hover:translate-x-1 duration-300">
                    <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
                    <p className="text-gray-600">
                        Discover personalized job recommendations based on your skills and preferences. Our advanced matching algorithm suggests jobs tailored just for you.
                    </p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md hover:bg-purple-500 hover:bg-opacity-25 hover:text-blue cursor-pointer hover:translate-x-1 duration-300">
                    <h2 className="text-2xl font-bold mb-4">Saved Jobs</h2>
                    <p className="text-gray-600">
                        Save interesting job listings for future reference or application. Build your own curated list of potential opportunities.
                    </p>
                </div>
            </div>

            <div className="mt-20">
                <h1 className="text-3xl font-bold mb-4">Explore <span className='text-blue'>Applied Jobs</span></h1>
                <div className="flex items-center mb-4">
                    <FiMapPin className="text-xl mr-2" />
                    <span className="text-gray-600">Location: Your City, Country</span>
                </div>
                <p className="text-gray-600">
                    {`Dive deeper into the jobs you've applied for. Track your application history, review interview schedules, and manage your overall job-seeking journey.`}
                </p>
            </div>
            <div className='my-10'>
            <AppliedJobs/>
            </div>
        </div>
    );
};

export default Dashboard;
