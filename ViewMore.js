import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './ViewMore.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ViewMorePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loanId = searchParams.get('loanId');
  
  const [borrower, setBorrower] = useState(null);
  const [cashflow, setCashflow] = useState(null);
  const [comaker, setComaker] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleSave = async () => {
    try {
      // Ensure that borrower._id and editData are correctly set
      const response = await axios.put(`http://localhost:3001/loan/${borrower._id}`, editData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      // Handle the successful response
      if (response.status === 200) {
        console.log('Updated loan:', response.data);
        setIsModalOpen(false);  // Close the modal
        // You can also set updated data or show a success message here
      } else {
        console.error('Failed to update loan. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating loan:', error);
    }
  };



  const [editData, setEditData] = useState({
    loanTerm: '',
    loanAmount: '',
    interestRate: '',
    riskRating: '',
    verifiedby: '',
    defaultStatus: '',
    approvalDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);  // Handle loading state
  const [error, setError] = useState(null); 
  

  const handleBack = () => {
    navigate('/officerdashboard3'); 
};

useEffect(() => {
  if (!loanId) {
    setError('Loan ID is missing.');
    setLoading(false);
    return;
  }


  const fetchBorrower = async () => {
    try {
      const [borrowerResponse, cashflowResponse, comakerResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/borrower/${loanId}`),
        fetch(`http://localhost:3001/api/cashflow/${loanId}`),
        fetch(`http://localhost:3001/api/comaker/${loanId}`)
      ]);

      if (!borrowerResponse.ok || !cashflowResponse.ok || !comakerResponse.ok) {
        throw new Error('Failed to fetch data from the server.');
      }

      const borrowerData = await borrowerResponse.json();
      const cashflowData = await cashflowResponse.json();
      const comakerData = await comakerResponse.json();

      setBorrower(borrowerData);
      setCashflow(cashflowData);
      setComaker(comakerData);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchBorrower();
}, [loanId]);

// PDF Download Function
const overviewRef = useRef(null);
const handleDownloadPDF = async () => {
 if (!overviewRef.current) {
   console.error("Element not attached to the DOM.");
   return;
 }

 try {
   const canvas = await html2canvas(overviewRef.current, { scale: 2 });
   const imgData = canvas.toDataURL('image/png');
   
   // Set up PDF dimensions
   const pdf = new jsPDF('p', 'mm', 'a4'); // Adjust for long paper size
   const imgWidth = pdf.internal.pageSize.getWidth();
   const imgHeight = (canvas.height * imgWidth) / canvas.width;
   
   let position = 0; // To track the vertical position
   const pageHeight = pdf.internal.pageSize.getHeight(); // Height of one page in PDF
   
   // Loop through canvas and create pages if the content exceeds one page
   while (position < imgHeight) {
     pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight); // Y position set to -position
     position += pageHeight; // Move down by one page height

     // Add a new page if there's still content left to add
     if (position < imgHeight) {
       pdf.addPage();
     }
   }
   
   pdf.save('Borrower_Information 1/2.pdf');
 } catch (error) {
   console.error("Error generating PDF:", error);
 }
};

const [currentDateTime, setCurrentDateTime] = useState(new Date());

 useEffect(() => {
   // Update date and time every second
   const timer = setInterval(() => {
     setCurrentDateTime(new Date());
   }, 1000);

   // Clear timer on component unmount
   return () => clearInterval(timer);
 }, []);

 // Format date and time
 const formattedDate = currentDateTime.toLocaleDateString();
 const formattedTime = currentDateTime.toLocaleTimeString();

 const handleEditClick = () => {
  setEditData({
    loanTerm: borrower?.loanTerm || '',
    loanAmount: borrower?.loanAmount || '',
    interestRate: borrower?.interestRate  ||'',
    riskRating: borrower?.riskRating||  '',
    verifiedby: borrower?.verifiedby  ||'',
    defaultStatus: borrower?.defaultStatus  ||'',
    approvalDate: borrower?.approvalDate || '',
  });
  setIsModalOpen(true);
};
 const handleCloseModal = () => setIsModalOpen(false);


 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};


 const handleSaveChanges = () => {
   // Save updated data logic here
   console.log("Updated Form Data:", formData);
   setIsModalOpen(false);
 };


 const handleEdit = (transaction) => {
  const fileType = transaction.documentType; // Assuming fileType is either 'image' or 'pdf'
  const fileContent = transaction.fileContent; // Assuming the file content is stored as a URL or base64


  setModalContent({ fileType, content: fileContent });
  setIsModalOpen1(true); // Open the modal
};
const closeModal = () => {
  setIsModalOpen(false); // Close the modal
  setModalContent(null); // Clear modal content
};


// Handle View Button
const handleView = (transaction) => {
  const fileType = transaction.documentType; // Assuming you have document type (image/pdf)
  const fileContent = transaction.documents.collateral; // Assuming the document content (URL or base64)


  setModalContent({ fileType, content: fileContent });
  setIsModalOpen(true); // Open the modal
}; 


  return (
    <div className="pdf-container">
      <header className="headeroff">
          <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logooff"/>
          <h2 className="landingh2off">MSU-IIT National Multi-Purpose Cooperative</h2>
      </header>
        <button className="back-btn1" onClick={handleBack}>Back</button>
        <button className="printDownload1" onClick={handleDownloadPDF}>Download</button>
       
      <br/> {/*first page*/}
      <div ref={overviewRef} id="overviewRef"><br/>
        <div className="headerview">
          <h1>Borrower Information</h1>
          <p>Loan Application and Transaction Summary</p>
          <h5>Date: {formattedDate} Time: {formattedTime}</h5>
        </div> <br/>

        <div className="section">
          <h2>Borrower Profile</h2>
          <div className="section-content1">
            <div class="profile-column">
            <p><strong>Member ID:</strong> {borrower?.userId}</p>
              <p><strong>Full Name:</strong> {borrower?.applicantName}</p>
              <p><strong>Contact/Telephone Number:</strong> {borrower?.telMob}</p>
              <p><strong>Email Address:</strong> {borrower?.emailAddress}</p>
              <p><strong>Permanent Address:</strong> {borrower?.permanentAddress}</p>
              <p><strong>Present Address:</strong> {borrower?.presentAddress}</p>
              <p><strong>Sex:</strong> {borrower?.sex}</p>
              <p><strong>Age:</strong> {borrower?.age}</p>
              <p><strong>Civil Status:</strong> {borrower?.civilStatus}</p>
              <p><strong>Name of Spouse:</strong> {borrower?.spouseName}</p>
              <p><strong>Spouse Occupation:</strong> {borrower?.spouseOccu}</p>
            </div>
            <div class="profile-column">
              <p><strong>Employer:</strong> {borrower?.employer}</p>
              <p><strong>Employer Contact Number:</strong> {borrower?.empCon}</p>
              <p><strong>Employment Status/Position Held:</strong> {borrower?.empStatus}</p>
              <p><strong>Business Name:</strong> {borrower?.businessName}</p>
              <p><strong>Business Address:</strong> {borrower?.businessAdd}</p>
              <p><strong>Length of Coop Membership:</strong> {borrower?.lengthMem}</p>
              <p><strong>Account Balance:</strong></p>
              <ul>
                <li><strong>Share Capital:</strong> {borrower?.shareCapital}</li>
                <li><strong>Savings Deposit:</strong> {borrower?.savingsDepo}</li>
                <li><strong>Other Deposit:</strong> {borrower?.otherDepo}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Cash Flow Statement</h2>
          <div className="section-content">
          <table className="cash-flow-table">
            <tbody>
              <tr>
                <td><strong>Total Income</strong></td>
                <td>{cashflow?.totalIncome}</td>
              </tr>
              <tr>
                <td><strong>Total Expenditures</strong></td>
                <td>${cashflow?.totalExpenditures}</td>
              </tr>
              <tr>
                <td>Other Cash Outlays</td>
                <td>{cashflow?.totalCashOutlays}</td>
              </tr>
              <tr>
                <td><strong>Total Expenditures ad Cash Outlays</strong></td>
                <td>{cashflow?.totalExpenditureAndCashOutlays}</td>
              </tr>
              <tr>
                <td>Net Savings</td>
                <td>{cashflow?.netSavings}</td>
              </tr>
            </tbody>
          </table><br/>
          
          </div>
        </div>

        <div className="section">
            <button className="edit-buttonB" onClick={handleEditClick}>
              Edit
            </button>
          <h2>Loan Application Details</h2>
          <div className="section-content1">
            <div class="profile-column">
              <p><strong>Loan ID:</strong> {borrower?._id}</p>
              <p><strong>Branch Applied:</strong> {borrower?.branch}</p>
              <p><strong>Date Filed:</strong> {borrower?.applicationDate}</p>
              <p><strong>New/Renewal:</strong> {borrower?.newRe}</p>
              <p><strong>Loan Type:</strong> {borrower?.loanType}</p>
              <p><strong>Amount Applied:</strong> {borrower?.loanAmount}</p>
              <p><strong>Term of Loan:</strong> {borrower?.loanTerm}</p>
              <p><strong>Purpose of Loan:</strong> {borrower?.purposeLoan}</p>
              <p><strong>Loan Amount Approved:</strong> ${borrower?.loanAmount}</p>
            </div>
            <div class="profile-column">
              <p><strong>Loan Status:</strong> {borrower?.defaultStatus}</p>
              <p><strong>Interest Rate:</strong> {borrower?.interestRate}%</p>
              <p><strong>Collateral/Security Offered:</strong> {borrower?.collateral}</p>
              <p><strong>Source of Payment:</strong> {borrower?.sourcePay}</p>
              <p><strong>Mode of Payment:</strong> {borrower?.modePay}</p>
              <p><strong>Manner of Payment:</strong> {borrower?.mannerPay}</p>
              <p><strong>Loan Application Verified By:</strong> </p>
              <p><strong>Verified by:</strong>{borrower?.verifiedby} </p>
              <p><strong>Verified Date:</strong> {borrower?.approvalDate}</p>
            </div>
          </div><br/>

          {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <h4>Edit Loan Application Details</h4>
                  <form>
                    <label>
                      Term of Loan (in months):
                      <input
                        type="text"
                        name="loanTerm"
                        value={editData.loanTerm}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Loan Amount Approved:
                      <input
                        type="text"
                        name="loanAmount"
                        value={editData.loanAmount}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Interest Rate:
                      <input
                        type="text"
                        name="interestRate"
                        value={editData.interestRate}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Risk Rating:
                      <select
                        name="riskRating"
                        value={editData.riskRating}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low</option>
                        <option value="med">Medium</option>
                        <option value="hi">High</option>
                      </select>
                    </label>
                    <label>
                      Verified By:
                      <input
                        type="text"
                        name="verifiedby"
                        value={editData.verifiedby}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Loan Status:
                      <select
                        name="defaultStatus"
                        value={editData.defaultStatus}
                        onChange={handleInputChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="review">On Review</option>
                      </select>
                    </label>
                    <label>
                      Verified Date:
                      <input
                        type="date"
                        name="approvalDate"
                        value={editData.approvalDate}
                        onChange={handleInputChange}
                      />
                    </label>
                  </form>
                  <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCloseModal}>Cancel</button>
                  </div>
                </div>
              </div>
            )}


        </div>
        {/*2nd page*/}
        <div className="section">  
          <h2>Co-Maker's Statement Details</h2>
          <div className="section-content1">
            <div class="profile-column">
              <p><strong>Member ID:</strong> {comaker?._id}</p>
              <p><strong>From Branch:</strong> {comaker?.branch}</p>
              <p><strong>Date Signed:</strong> {comaker?.applicationDate}</p>
              <p><strong>Full Name:</strong> {comaker?.comakerName}</p>
              <p><strong>Civil Status:</strong> {comaker?.civilStatus}</p>
              <p><strong>Sex:</strong> {comaker?.sex}</p>
              <p><strong>Age:</strong> {comaker?.age}</p>
              <p><strong>Contact/Telephone Number:</strong> {comaker?.telMob}</p>
              <p><strong>Email Address:</strong> {comaker?.emailAddress}</p>
              <p><strong>Name of Spouse:</strong> {comaker?.spouseName}</p>
              <p><strong>Permanent Address:</strong> {comaker?.permanentAddress}</p>
              <p><strong>Present Address:</strong> {comaker?.presentAddress}</p>
              <p><strong>Residence Status:</strong> {comaker?.residentStatus}</p><br/>
              <p><strong>Realtionship to Member-borrower:</strong> {comaker?.relationship}</p>
              <p><strong>Known Member-borrower for how amny years?:</strong> {comaker?.yearsKnown}</p>
            </div>
            <div class="profile-column">
              <p><strong>Employer:</strong> {comaker?.employer}</p>
              <p><strong>Employement Status/Position Held:</strong> {comaker?.empStatus}</p>
              <p><strong>Annual Salary:</strong> {comaker?.annualSalary}</p>
              <p><strong>Length of Service:</strong> {comaker?.lengthService}</p>
              <br/>
              <p><strong>Firm/Trade/Business Name:</strong> {comaker?.firm}</p>
              <p><strong>Business Address:</strong> {comaker?.businessAdd2}</p>
              <p><strong>Nature of Business:</strong> {comaker?.natureBus}</p>
              <p><strong>Sole Owner or Partner:</strong> {comaker?.soleOwner}</p>
              <p><strong>Capital Invested:</strong> {comaker?.capitalInvest}</p>
            </div>
            </div><br/>
          </div>
        <div className="section">  
            <h2>Outstanding Obligation/s, if any: (As Proncipal or Co-maker)</h2> 
            <div className="section-content"> 
            <table className="obligations-table">
              <thead>
                <tr>
                  <th>Creditor</th>
                  <th>Principal Amount</th>
                  <th>Present Balance</th>
                  <th>Maturity Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{comaker?.creditor1}</td>
                  <td>{comaker?.principalAmount1}</td>
                  <td>{comaker?.presentBalance1}</td>
                  <td>{comaker?.maturityDate1}</td>
                </tr>
                <tr>
                  <td>{comaker?.creditor2}</td>
                  <td>{comaker?.principalAmount2}</td>
                  <td>{comaker?.presentBalance2}</td>
                  <td>{comaker?.maturityDate2}</td>
                </tr>
                <tr>
                  <td>{comaker?.creditor3}</td>
                  <td>{comaker?.principalAmount3}</td>
                  <td>{comaker?.presentBalance3}</td>
                  <td>{comaker?.maturityDate3}</td>
                </tr>
              </tbody>
            </table> <br/><br/>

            <h2>List of Properties(Real and Personal)</h2>  
            <table className="obligations-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Location </th>
                  <th>Area </th>
                  <th>Market value</th>
                  <th>Encumbrances </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{comaker?.description1}</td>
                  <td>{comaker?.location1}</td>
                  <td>{comaker?.area1}</td>
                  <td>{comaker?.marketValue1}</td>
                  <td>{comaker?.encumbrances1}</td>
                </tr>
                <tr>
                  <td>{comaker?.description2}</td>
                  <td>{comaker?.location2}</td>
                  <td>{comaker?.area2}</td>
                  <td>{comaker?.marketValue2}</td>
                  <td>{comaker?.encumbrances2}</td>
                </tr>
                <tr>
                  <td>{comaker?.description3}</td>
                  <td>{comaker?.location3}</td>
                  <td>{comaker?.area3}</td>
                  <td>{comaker?.marketValue3}</td>
                  <td>{comaker?.encumbrances3}</td>
                </tr>
              </tbody>
            </table> <br/>

          </div>
        </div>

        <div className="section">
          <h2>Repayment History</h2>
          <div className="section-content">
            {/* {borrower.repayments.length > 0 ? (
              <table className="repayment-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrower.repayments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.date}</td>
                      <td>${payment.amount}</td>
                      <td>{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No repayment history available</p>
            )} */}
          </div>
        </div>


        <div className="section">
          <h2>Documents</h2>
          <div className="section-content">
            <table className="cash-flow-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>Member-Borrower's Signature</td>
                <td>
                  {borrower?.memberSig ? (
                    <>
                      <button
                        className="btn1 btn-view"
                        onClick={() => {
                          try {
                            // Convert buffer data to Base64
                            const uint8Array = new Uint8Array(borrower.memberSig.data.data);
                            const base64String = btoa(
                              uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
                            );

                            // Create the image URL
                            const signatureUrl = `data:${borrower.memberSig.contentType};base64,${base64String}`;

                            // Open the image in a new window
                            const newWindow = window.open();
                            newWindow.document.write(
                              `<img src="${signatureUrl}" alt="Member Signature" style="max-width:100%;"/>`
                            );
                          } catch (error) {
                            console.error("Error displaying signature:", error);
                            alert("An error occurred while trying to display the signature.");
                          }
                        }}
                      >
                        View
                      </button>
                    </>
                  ) : (
                    "No signature available"
                  )}
                </td>
                </tr>
              </tbody>
            </table><br/>
          </div>
        </div>



      </div>
      <div   class="parent-container12">
          <a href="/viewmorepage" class="next-btn">Next →</a>
      </div>

      <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo1">
                    <h3>MSU-IIT NMPC</h3>
                    <img src="nmpc_logo1.jpg" alt="MSU-IIT NMPC Logo" className="logofooter1"/>
                </div>
                       
                        <ul className="footerUl">
                        <p>CONTACT US</p>
                            <li>Head Office: Gregorio T. Lluch Sr. Ave., Pala-o Iligan City, 9200, Philippines</li>
                            <li>Tel. No.: (063) 223-5874</li>
                            <li>Email: msuiitnmpc@msuiitcoop.org</li>
                            <li className="social-icons">
                                <img src="tw.png" alt="Twitter"/>
                                <img src="fb.png" alt="Facebook"/>
                                <img src="ig.png" alt="Instagram"/>
                            </li>
                        </ul>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2024 MSU-IIT National Multi-Purpose Cooperative. All rights reserved.
                    <a href="#terms">Terms and Condition</a>
                    <a href="#privacy">Privacy Policy</a></p>
            </div>
        </footer>
    </div>
  );
};

export default ViewMorePage;