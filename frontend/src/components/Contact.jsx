// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Contact({ listing }) {
//   const [landlord, setLandlord] = useState(null);
//   const [message, setMessage] = useState('');
//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   useEffect(() => {
//     const fetchLandlord = async () => {
//       try {
//         const res = await fetch(`/backend/user/${listing.userRef}`);
//         const data = await res.json();
//         setLandlord(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchLandlord();
//   }, [listing.userRef]);
//   return (
//     <>
//       {landlord && (
//         <div className='flex flex-col gap-2'>
//           <p>
//             Contact <span className='font-semibold'>{landlord.username}</span>{' '}
//             for{' '}
//             <span className='font-semibold'>{listing.name.toLowerCase()}</span>
//           </p>
//           <textarea
//             name='message'
//             id='message'
//             rows='2'
//             value={message}
//             onChange={onChange}
//             placeholder='Enter your message here...'
//             className='w-full border p-3 rounded-lg'
//           ></textarea>

//           <Link
//           to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
//           className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
//           >
//             Send Message          
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }


import { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('Please enter a message before sending.');
      return;
    }

    // This WILL work - opens Gmail compose in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${landlord.email}&subject=${encodeURIComponent(`Regarding ${listing.name}`)}&body=${encodeURIComponent(message)}`;
    
    window.open(gmailUrl, '_blank');
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/backend/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          />

          {/* This button will definitely work */}
          <button
            onClick={handleSendMessage}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </button>
          
          {/* Backup: Show email for manual copy */}
          <div className='text-sm text-gray-600 text-center'>
            Email: <span className='font-mono bg-gray-100 px-2 py-1 rounded'>{landlord.email}</span>
          </div>
        </div>
      )}
    </>
  );
}


