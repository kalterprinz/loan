import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate hook
import { jwtDecode } from 'jwt-decode';

const LoanStatus = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  const fetchLoanStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage. Please log in.');
        setError('You must log in.');
        setLoading(false);
        navigate('/login'); // Redirect to login if no token
        return;
      }
  
      // Decode the token and extract the user ID
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      const userId = decodedToken?.id; // Use 'id' as per the decoded token
      if (!userId) {
        throw new Error('Invalid token: id not found.');
      }
  
      console.log("id:", userId);

      // Fetch loan details using the loan ID
      const loanResponse = await fetch(`http://localhost:3001/api/statusget/${userId}`);
      const loanData = await loanResponse.json();
      const loanStatus = loanData.defaultStatus; // Assuming the response contains loanStatus field
  
      // Map loan status to step numbers
      const statusMapping = {
        pending: 1,
        review: 2,
        approved: 3,
        disbursed: 4,
      };
  
      // Set the current step based on the fetched loan status
      setCurrentStep(statusMapping[loanStatus] || 0); // Default to 0 if status is unknown
    } catch (error) {
      console.error("Error fetching loan status:", error);
      setError('Error fetching loan status.');
    } finally {
      setLoading(false); // Stop loading when done
    }
  };
  

  useEffect(() => {
    fetchLoanStatus(); // Fetch loan status when the component mounts
  }, []);

  return (
    <div className="loan-status-progress">
      <h3><i className="fas fa-clock" style={{ marginRight: '8px' }}></i>Loan Application Status</h3>
      {loading ? (
        <p>Loading...</p> // Show loading message
      ) : error ? (
        <p>{error}</p> // Show error message
      ) : (
        <div className="progress-container">
          <div className="progres-status">
            <div className="filler" style={{ width: `${(currentStep - 1) * 20}%` }}></div>
          </div>
          <div className={`progress-step ${currentStep >= 1 ? 'completed' : ''}`}>
            <span className="step-icon">1</span>
            <p>Pending</p>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'completed' : ''}`}>
            <span className="step-icon">2</span>
            <p>In Review</p>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'completed' : ''}`}>
            <span className="step-icon">3</span>
            <p>Approved</p>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'completed' : ''}`}>
            <span className="step-icon">4</span>
            <p>Disbursed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanStatus;