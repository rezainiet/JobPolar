import React, { useState } from 'react';
import { Input, Button, Card, Badge } from 'react-daisyui';

const ManageProfile = () => {
    // State to manage profile information
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');
    const [designation, setDesignation] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update the candidate's profile in the database
        // This is where you might make an API call to update the profile information
        console.log('Profile Updated:', { fullName, email, phone, skills });
    };


    const dummyFullName = 'John Doe';
    const dummyEmail = 'john.doe@example.com';
    const dummyPhone = '+1 234 567 890';
    const dummySkills = 'React, JavaScript, CSS';
    const dummyDescription = 'Passionate and creative Front-End Developer with a keen eye for design and a love for crafting seamless user experiences. Armed with a solid foundation in HTML, CSS, and JavaScript, I specialize in translating UI/UX designs into responsive and interactive web applications. My commitment to clean and maintainable code, coupled with a continuous desire to learn and adapt to emerging technologies, allows me to stay at the forefront of front-end development.'

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4 bg-[#F3F7FB] h-full">
            <h1 className="text-4xl font-bold text-primary mb-8">
                Manage Your <span className='text-blue'>Job Profile</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg flex items-center justify-center">
                    <div>
                        <div className="avatar online placeholder mb-2">
                            <div className="bg-neutral text-neutral-content rounded-full w-16">
                                <span className="text-xl">
                                    {dummyFullName.slice(0, 1)}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-blue'>{dummyFullName}</h1>
                            <p className='font-normal text-sm text-green-500/70'>Front-end Developer</p>
                        </div>
                        <p className='my-3 text-primary/70'>{dummyDescription}</p>
                        <p className="text-gray-700 mb-2">
                            <strong>Full Name:</strong> {dummyFullName}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Email:</strong> {dummyEmail}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Phone Number:</strong> {dummyPhone}
                        </p>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">Your Skills</h2>
                            <div className="flex">
                                {dummySkills.split(',').map((skill, index) => (
                                    <p key={index} className='mr-2 bg-blue bg-opacity-20 rounded-full px-2 py-1 text-blue'>
                                        {skill.trim()}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
                    <div className="flex items-center justify-center gap-5">
                        <div className="mb-4 w-full">
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                                Full Name
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                                id="fullName"
                                type="text"
                                placeholder="Your Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="designation" className="block text-sm font-semibold text-gray-800 mb-2">
                                Designation
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                                id="designation"
                                type="text"
                                placeholder="What is your designation?"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-5'>
                        <div className="mb-4 w-full">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                                Email
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                                Phone Number
                            </label>
                            <input
                                className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                                id="phone"
                                type="tel"
                                placeholder="Your Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-sm font-semibold text-gray-800 mb-2">
                            Profile Description
                        </label>
                        <textarea
                            rows={4}
                            cols={50}
                            className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                            id="skills"
                            type="text"
                            placeholder="Write a short description..."
                            value={skills}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-sm font-semibold text-gray-800 mb-2">
                            Skills
                        </label>
                        <input
                            className='w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500'
                            id="skills"
                            type="text"
                            placeholder="Your Skills (comma-separated)"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <Button type="submit" className="w-full bg-blue text-white hover:bg-blue-700">
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageProfile;
