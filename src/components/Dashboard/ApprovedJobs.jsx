import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import PageHeader from '../PageHeader';
import PaymentSection from './PaymentSection';
import { AuthContext } from '../../context/AuthProvider';

const ApprovedJobs = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null); // Ref for the messages container

  // React Query hooks for fetching data
  const { data: job, isLoading: jobLoading } = useQuery(['jobDetails', id], async () => {
    const response = await fetch(`https://job-polar-server.vercel.app/job-details/${id}`);
    const data = await response.json();
    return data;
  });

  const { data: messages, isLoading: messagesLoading, refetch: refetchMessages } = useQuery(['messages', id], async () => {
    const response = await fetch(`https://job-polar-server.vercel.app/messages/${id}`);
    const data = await response.json();
    return data;
  });

  // React Query mutation for adding a new message
  const addMessageMutation = useMutation(
    async () => {
      const response = await fetch('https://job-polar-server.vercel.app/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: id,
          sender: user?.email,
          user: true,
          content: newMessage,
          time: new Date(),
          isRead: false,
          photoUrl: user?.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFfdPAfeJKYiwglp2z9IjDwphJAqEgyAsUv9nfcDLPVXRPzL2B0pLAvUoyVf4QTzoyso&usqp=CAU',
        }),
      });

      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        // Refetch messages after a new message is added
        refetchMessages();
        setNewMessage('');

        // Scroll to the bottom when a new message is added
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      },
    }
  );

  console.log(messagesContainerRef?.current?.scrollTop, messagesContainerRef?.current?.scrollHeight);

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      // Trigger the mutation
      addMessageMutation.mutate();
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#F3F7FB] py-5">
      <PageHeader title={"Approved Job Details"} path={"Job_Info"} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 px-5">
        <div>
          <h2 className="text-2xl font-bold mb-4">{job?.jobTitle}</h2>
          <div className="mb-4 flex items-center bg-green-50 justify-center py-5 px-0 rounded">
            <img
              src={job?.companyLogo}
              alt={`${job?.companyName} Logo`}
              className="h-auto mr-4 rounded-md shadow-md max-w-xs w-16"
            />
            <div>
              <p className="">{job?.companyName}</p>
              <p className='text-gray-500'>{job?.minPrice}k - {job?.maxPrice}k/Yearly</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold">Description:</p>
            <p>{job?.description}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Skills:</p>
            <ul className="list-disc pl-4">
              {job?.skills &&
                job?.skills.map((skill) => (
                  <li key={skill.label}>{skill.value}</li>
                ))}
            </ul>
          </div>
          <div className="mb-4">
            <p className="font-bold">Experience Level:</p>
            <p>{job?.experienceLevel}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Posted By:</p>
            <p>{job?.postedBy}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Posting Date:</p>
            <p>{job?.postingDate}</p>
          </div>
        </div>


        {/* Chat section */}
        <div className="flex flex-col h-full bg-white px-5 pt-5 rounded-lg" >
          <div className="flex-1 overflow-y-auto max-h-[600px]" ref={messagesContainerRef}>
            <div className='my-5'>
              <div className='bg-blue rounded-lg py-5 px-3 flex items-center justify-center gap-2'>
                <img src={job?.companyLogo} className='w-16 rounded-full' alt={job?.companyName} />
                <h1 className='text-xl text-white font-semibold'>Chat with {job?.companyName}</h1>
              </div>
            </div>
            {messages &&
              messages.map((message, key) => (
                <div key={key} className={message?.user ? 'chat chat-end' : 'chat chat-start'} >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Chat bubble component" src={message?.user ? message?.photoUrl : job?.companyLogo} />
                    </div>
                  </div>
                  <div className="chat-header opacity-50">
                    {message?.user ? "You" : job?.companyName}
                  </div>
                  <div className={message?.user ? "chat-bubble chat-bubble-success" : "chat-bubble chat-bubble-info"}>{message?.content}</div>
                </div>
              ))}
          </div>
          <div className='flex items-center justify-items-center gap-2 my-5 mx-5'>
            <input
              type="text"
              placeholder="Type your message..."
              className="border p-2 w-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addMessage();
                }
              }}
            />
            <button
              className='bg-blue text-white px-4 py-2 rounded-md'
              onClick={addMessage}
              disabled={addMessageMutation.isLoading}
            >
              {addMessageMutation.isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        <PaymentSection />
      </div>
    </div>
  );
};

export default ApprovedJobs;
