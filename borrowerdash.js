import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './borrowerdash.css'; 
import LoanStatus from './loanstatus';
import TransactionHistory from './transac';
import BorrowerHeader from './borrowerheader';
import Footer from './footer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Borrowerdash = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loanData = {
        loanAmount: "₱5,000",
        paymentAmount: "₱300",
        accountNumber: "4398526514",
        dueDate: "Oct 15, 2024",
        remainingTerm: "12 months",
        progress: 70 // Progress percentage
      };

      useEffect(() => {
        const fetchUsername = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must log in.');
                    navigate('/login');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.id;
                console.log (userId)
                const response = await axios.get(`http://localhost:3001/api/users/${userId}`);

                setUsername(response.data?.username || 'Unknown User');
            } catch (error) {
                console.error('Error fetching username:', error);
                setError('Error fetching user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsername();
    }, [navigate]);
       
    return (
        <div className="dashboardb">
           <BorrowerHeader /> 
            <div >
                <div className="cover"> 
                    <img src="cover.png" alt="MSU-IIT NMPC Logo" className="banner"/>
                </div>
              <div className="content">
                <aside>
                    <div className="profile-section">
                        <div className="profile-info">
                            <img src="User_circle1.png" alt="Profile" className="profile-photo" />
                            {/*<button className="edit">Edit Profile</button> */}
                            <h2 className="name2">{username || 'User'}</h2>
                            
                        </div>
                    
                        <div className="about-info">
                            <h4 className="about">About</h4>
                            <p><i className="fas fa-male" style={{ marginRight: '8px' }}></i>
                                <strong>Male</strong>
                            </p><hr />
                            <p><i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                                2nd Floor, Robinsons Mall, Macapagal Ave, Iligan City
                            </p><hr />
                            <p><i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
                                charles5182@ummoh.com
                            </p><hr />
                            <p><i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                                33757005467
                            </p> <hr />
                        </div>
                    </div>
                </aside>
                <main>
                        <div className="col">
                        <div className="ngalan">
                            <p className="welcome">Welcome back,</p>
                            <p className="nameO">{username || 'User'}!</p>
                        </div>

                        <div className="cards-containerb">
                            {/* Active Loan Card */}
                            <div className="loan-cardborrow active-loan">
                            <div className="loan-details">
                                <h3>Active Loan</h3>
                                <p className="current">Loan Amount: {loanData.loanAmount}</p>
                                <p className="due1">Payment amount: {loanData.paymentAmount}</p>
                                <p className="due1">Loan Account Number: {loanData.accountNumber}</p>
                                <p className="due">Pay on or before: {loanData.dueDate}</p>
                                <p className="term">Remaining Term: {loanData.remainingTerm}</p>
                                <div className="progress-bar">
                                <div
                                    className="progressp"
                                    style={{ width: `${loanData.progress}%` }}
                                ></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>



                            <LoanStatus />
                            <TransactionHistory />
                        </main>
                    </div>
                </div>
             <Footer/>
        </div>
    );
};

export default Borrowerdash;