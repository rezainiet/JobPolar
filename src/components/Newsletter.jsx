import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const Newsletter = () => {
  return (
    <div>
      {/* 1st section */}
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          {" "}
          <FaEnvelopeOpenText /> Subscribe to Job Alerts
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Stay updated with the latest job opportunities. Receive job alerts
          directly to your email.
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      {/* 2nd section */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> Boost Your Career
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Upload your resume and get noticed faster by potential employers.
          Take the next step in your career journey.
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
