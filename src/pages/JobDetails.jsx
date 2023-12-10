import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Modal from 'react-modal';
import './css/JobDetails.css';
import { AuthContext } from "../context/AuthProvider";

Modal.setAppElement('#root'); // Set the root element for accessibility

const JobDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const numbersOnly = id?.match(/\d+/g);
  const jobId = numbersOnly.join("");
  const [job, setJob] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // State for application data and errors
  const [applicationData, setApplicationData] = useState({
    email: '',
    phoneNumber: '',
    cvLink: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    cvLink: '',
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://job-polar-server.vercel.app/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(job);
  const handleApplySubmit = () => {
    // Basic form validation
    let isValid = true;
    const newErrors = {};

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicationData.email || !emailRegex.test(applicationData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone number validation using a regular expression
    const phoneRegex = /^[0-9]{9,13}$/;
    if (!applicationData.phoneNumber || !phoneRegex.test(applicationData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
      isValid = false;
    }

    if (!applicationData.cvLink) {
      newErrors.cvLink = 'CV Link is required';
      isValid = false;
    } else {
      // Validate the CV link using a regular expression
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(applicationData.cvLink)) {
        newErrors.cvLink = 'Please enter a valid URL';
        isValid = false;
      }
    }

    if (isValid) {
      // Log the input values
      console.log('Email:', applicationData.email);
      console.log('Phone Number:', applicationData.phoneNumber);
      console.log('CV Link:', applicationData.cvLink);

      // Prepare the data to be sent in the request body
      const requestBody = {
        userEmail: user?.email,
        email: applicationData.email,
        phoneNumber: applicationData.phoneNumber,
        cvLink: applicationData.cvLink,
        companyLogo: job?.companyLogo,
        companyName: job?.companyName,
        jobLocation: job?.jobLocation,
        jobID: job?._id,
        jobTitle:job?.jobTitle,
        appliedTime: new Date(),
        applyStatus: 'Under Review'
      };

      fetch('https://job-polar-server.vercel.app/apply-for-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that you are sending JSON data
          // Add any other headers as needed
        },
        body: JSON.stringify(requestBody), // Convert the data to JSON format
      })
        .then(response => {
          if (response.ok) {
            // For example, you can handle success here
            console.log('Application submitted successfully!');
            // Close the modal and reset the form
            setModalIsOpen(false);
            setApplicationData({
              email: '',
              phoneNumber: '',
              cvLink: '',
            });
          } else {
            // Handle errors if the request was not successful
            console.error('Failed to submit application:', response.status, response.statusText);
          }
        })
        .catch(error => {
          // Handle network errors or other issues
          console.error('Error during application submission:', error.message);
        });
    } else {
      // Display validation errors
      setErrors(newErrors);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-semibold text-gray-700">
          <div className="flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {parseInt(jobId.slice(0, 5))}</h3>

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Job details</h2>
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            Here<span>&apos;</span>s how the job details align with your job
            preferences. Manage job preferences anytime in your profile.
          </p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-3 py-1 text-white rounded-sm">
            {job?.employmentType}
          </button>
          <button className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" onClick={openModal}>
            Apply Now
          </button>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Benefits</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>
                1. ${job.minPrice}-{job.maxPrice}k <span className="text-green-500 text-sm">/year</span>
              </li>
              <li>2. Disability insurance</li>
              <li>3. Employee discount</li>
              <li>4. Flexible spending account</li>
              <li>5. Health insurance</li>
              <li>6. Paid time off</li>
              <li>7. Vision insurance</li>
              <li>8. Volunteer time off</li>
              <li> 9. Dental insurance</li>
            </ul>
          </div>

          {/* Outline */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Outline</h4>
            <p className="text-primary/90">
              {job.outline ||
                "Discover the exciting journey that awaits you in this role. Dive into projects, collaborate with a dynamic team, and contribute to groundbreaking initiatives that define our company's success."}
            </p>
          </div>

          {/* Future Growth */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Future Growth</h4>
            <p className="text-primary/90">
              {job.futureGrowth ||
                "Explore the endless possibilities for professional development and career advancement. Join us on a path of continuous learning and achievement as we grow together."}
            </p>
          </div>
        </div>

        {/* Additional information */}
        <div className="text-primary/75 my-5 space-y-6">
          <p>
            Join our innovative team where creativity meets technology. As pioneers in the industry, we foster a collaborative environment that values diversity, inclusion, and individual growth. Find purpose in your work and contribute to a culture that drives excellence and success.
          </p>
          <p>
            Your journey with us goes beyond the job description. We believe in work-life integration, offering flexibility and balance. Engage in meaningful projects, connect with like-minded professionals, and enjoy the perks of being part of a forward-thinking organization.
          </p>
        </div>

        {/* Application Modal */}
        {/* Application Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Job Application Modal"
          className="modal-content bg-white p-8 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-96 m-5 mx-auto"
          overlayClassName="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black"
        >
          <div className="modal-header flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Job Application</h2>
          </div>
          <div className="modal-body flex flex-col gap-4">
            <label className="text-sm font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={applicationData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <label className="text-sm font-semibold" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={applicationData.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}

            <label className="text-sm font-semibold" htmlFor="cvLink">
              CV Link:
            </label>
            <input
              type="text"
              id="cvLink"
              name="cvLink"
              required
              value={applicationData.cvLink}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.cvLink && <p className="text-red-500">{errors.cvLink}</p>}

            <button
              onClick={handleApplySubmit}
              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue"
            >
              Continue Application
            </button>

            <button
              className="close-button text-red-400 bg-red-500 font-semibold hover:bg-red-500 hover:text-white rounded px-3 py-2 mt-4"
              onClick={closeModal}
            >
              Cancel Application
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default JobDetails;
