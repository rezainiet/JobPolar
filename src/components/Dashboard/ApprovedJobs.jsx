import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../PageHeader';
import PaymentSection from './PaymentSection';

const ApprovedJobs = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [job, setJob] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/job-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-blue bg-opacity-10 py-5">
      <PageHeader title={"Approved Job Details"} path={"Job_Info"} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  py-10 px-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">{job.jobTitle}</h2>
          <p className="text-gray-500 mb-4">{job.companyName}</p>

          <p>{job.minPrice} - {job.maxPrice} {job.salaryType}</p>
          <p>{job.jobLocation}</p>

          <img
            src={job.companyLogo}
            alt={`${job.companyName} Logo`}
            className="max-w-full h-auto mb-4 rounded-md shadow-md"
          />

          <p className="font-bold">Description:</p>
          <p>{job.description}</p>

          <p className="font-bold">Skills:</p>
          <ul className="list-disc pl-4">
            {job.skills &&
              job.skills.map((skill) => (
                <li key={skill.label}>{skill.value}</li>
              ))}
          </ul>

          <p className="font-bold">Experience Level:</p>
          <p>{job.experienceLevel}</p>

          <p className="font-bold">Posted By:</p>
          <p>{job.postedBy}</p>

          <p className="font-bold">Posting Date:</p>
          <p>{job.postingDate}</p>
        </div>

        {/* Include the new payment section */}
        <PaymentSection />
      </div>
    </div>
  );
};

export default ApprovedJobs;
