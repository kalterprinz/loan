import React,  { useState } from 'react';
import axios from 'axios';
import { useNavigate,  useSearchParams } from 'react-router-dom';
import './cashflow.css'; // This file will contain the necessary CSS
import Footer from './footer';

const CashFlow = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const loanId = searchParams.get('loanId');

    if (!loanId) {
        console.error('No loanId found in the URL.');
        return <div>Error: No associated loan found. Please navigate with a valid loan ID.</div>;
    }

    const [income, setIncome] = useState({
        salaries: "",
        spouseIncome: "",
        businessIncome: "",
        investmentIncome: "",
        otherIncome: "",
    });

    const [expenditures, setExpenditures] = useState({
        food: "",
        rent: "",
        education: "",
        medical: "",
        clothing: "",
        hygiene: "",
        gas: "",
        transportation: "",
        water: "",
        electricity: "",
        internet: "",
        helperSalary: "",
        taxes: "",
        otherExpenses: "",
    });

    const [cashOutlays, setCashOutlays] = useState({
        productiveLoan: "",
        housingAmortization: "",
        vehicleAmortization: "",
        appliancesAmortization: "",
        otherDebts:"",
        insurance: "",
        otherCashOutlay: "",
    });

    const totalIncome = Object.values(income).reduce((acc, val) => acc + Number(val), 0);
    const totalExpenditures = Object.values(expenditures).reduce((acc, val) => acc + Number(val), 0);
    const totalCashOutlays = Object.values(cashOutlays).reduce((acc, val) => acc + Number(val), 0);
    
    // Calculate total expenditures and cash outlays
    const totalExpenditureAndCashOutlays = totalExpenditures + totalCashOutlays;
    const netSavings = totalIncome - totalExpenditureAndCashOutlays;

    const [otherDebts, setOtherDebts] = useState("");
    const [otherOutlays, setOtherOutlays] = useState("");
    const [memberBorSig, setMemberBorSig] = useState(null);
    const [comaker, setComaker] = useState("");
    const [cfaplidate, setCfaplidate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('loanId', loanId);
        formData.append('totalIncome', totalIncome);
        formData.append('totalExpenditures', totalExpenditures);
        formData.append('totalCashOutlays', totalCashOutlays);
        formData.append('totalExpenditureAndCashOutlays', totalExpenditureAndCashOutlays);
        formData.append('netSavings', netSavings);
        formData.append('otherDebts', otherDebts);
        formData.append('otherOutlays', otherOutlays);
        formData.append('comaker', comaker);
        formData.append('cfaplidate', cfaplidate);

        if (memberBorSig) formData.append('memberBorSig', memberBorSig);

        console.log('Submitting data:', formData);

        try {
            const response = await axios.post('http://localhost:3001/cashflow', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                navigate(`/`); 
            } else {
                alert('Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting loan:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Error submitting loan. Please check your input.');
        }
    }

    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    return (
        <div className="cashapplication">
            {/* Header Section */}
            <header className="header">
                <img src="logo.png" alt="MSU-IIT NMPC Logo" className="logol" />
                <h2 className="landingh2off2">MSU-IIT National Multi-Purpose Cooperative</h2>
            </header>


            {/* Form Container */}
            <div className="sulodPormcas">
                <h3 className="title">Cash Flow Statement</h3>
                <form className="cashflow" onSubmit={handleSubmit}>
                    <div className="section">
                        <h3>Income</h3>
                        <div className="item">
                            <label>Salaries and Wages:</label>
                            <input
                                type="number"
                                value={income.salaries}
                                onChange={(e) => setIncome({ ...income, salaries: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Spouse Income:</label>
                            <input
                                type="number"
                                value={income.spouseIncome}
                                onChange={(e) => setIncome({ ...income, spouseIncome: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Income from Business (Net):</label>
                            <input
                                type="number"
                                value={income.businessIncome}
                                onChange={(e) => setIncome({ ...income, businessIncome: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Income from Financial Investment/Dividend:</label>
                            <input
                                type="number"
                                value={income.investmentIncome}
                                onChange={(e) => setIncome({ ...income, investmentIncome: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Other Income:</label>
                            <input
                                type="number"
                                value={income.otherIncome}
                                onChange={(e) => setIncome({ ...income, otherIncome: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label style={{ fontWeight: "bold" }}>TOTAL INCOME</label>
                            <input type="number" value={totalIncome} readOnly placeholder="₱" style={{ borderStyle: 'double', borderWidth: '3px',borderColor: '#000', }} />
                        </div>
                    </div>

                    <div className="section">
                        <h3>Expenditures</h3>
                        <div className="item">
                            <label>Food Expenses:</label>
                            <input
                                type="number"
                                value={expenditures.food}
                                onChange={(e) => setExpenditures({ ...expenditures, food: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>House Rentals:</label>
                            <input
                                type="number"
                                value={expenditures.rent}
                                onChange={(e) => setExpenditures({ ...expenditures, rent: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Education:</label>
                            <input
                                type="number"
                                value={expenditures.education}
                                onChange={(e) => setExpenditures({ ...expenditures, education: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Medicals and Dental:</label>
                            <input
                                type="number"
                                value={expenditures.medical}
                                onChange={(e) => setExpenditures({ ...expenditures, medical: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Clothing:</label>
                            <input
                                type="number"
                                value={expenditures.clothing}
                                onChange={(e) => setExpenditures({ ...expenditures, clothing: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Personal Hygiene:</label>
                            <span> P</span>
                            <input
                                type="number"
                                value={expenditures.hygiene}
                                onChange={(e) => setExpenditures({ ...expenditures, hygiene: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Cooking/Gas:</label>
                            <input
                                type="number"
                                value={expenditures.gas}
                                onChange={(e) => setExpenditures({ ...expenditures, gas: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Transportation:</label>
                            <input
                                type="number"
                                value={expenditures.transportation}
                                onChange={(e) => setExpenditures({ ...expenditures, transportation: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Water Bill Payment:</label>
                            <input
                                type="number"
                                value={expenditures.water}
                                onChange={(e) => setExpenditures({ ...expenditures, water: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Electricity Bill Payment:</label>
                            <input
                                type="number"
                                value={expenditures.electricity}
                                onChange={(e) => setExpenditures({ ...expenditures, electricity: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Telephone/Mobile/Internet Bill Payment:</label>
                            <input
                                type="number"
                                value={expenditures.internet}
                                onChange={(e) => setExpenditures({ ...expenditures, internet: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Salary of Helper:</label>
                            <input
                                type="number"
                                value={expenditures.helperSalary}
                                onChange={(e) => setExpenditures({ ...expenditures, helperSalary: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Taxes and Licenses:</label>
                            <input
                                type="number"
                                value={expenditures.taxes}
                                onChange={(e) => setExpenditures({ ...expenditures, taxes: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                        <div className="item">
                            <label>Other Expenses:</label>
                            <input
                                type="number"
                                value={expenditures.otherExpenses}
                                onChange={(e) => setExpenditures({ ...expenditures, otherExpenses: e.target.value })}
                                placeholder="₱"
                            />
                        </div>
                    <div className="item">
                            <label style={{ fontWeight: "bold" }}>TOTAL EXPENDITURES</label>
                            <input type="number" value={totalExpenditures} readOnly placeholder="₱" style={{ borderStyle: 'double', borderWidth: '3px',borderColor: '#000', }}/>
                        </div>
                    </div>

                    
                                <div className="section">
                                    <h3>Cash Layout</h3>
                                    <div className="item">
                                        <label>Payment of other Debts/Amortization:</label>
                                    </div>
                                    <div className="group">
                                        <div className="item">
                                            <label>Productive loan from other banks/coop:</label>
                                            <input
                                                type="number"
                                                value={cashOutlays.productiveLoan}
                                                onChange={(e) => setCashOutlays({ ...cashOutlays, productiveLoan: e.target.value })}
                                                placeholder="₱"
                                            />
                                        </div>
                                        <div className="item">
                                            <label>Housing Amortization:</label>
                                            <input
                                                type="number"
                                                value={cashOutlays.housingAmortization}
                                                onChange={(e) => setCashOutlays({ ...cashOutlays, housingAmortization: e.target.value })}
                                                placeholder="₱"
                                            />
                                        </div>
                                        <div className="item">
                                            <label>Vehicle Amortization:</label>
                                            <input
                                                type="number"
                                                value={cashOutlays.vehicleAmortization}
                                                onChange={(e) => setCashOutlays({ ...cashOutlays, vehicleAmortization: e.target.value })}
                                                placeholder="₱"
                                            />
                                        </div>
                                        <div className="item">
                                            <label>Appliances Amortization:</label>
                                            <input
                                                type="number"
                                                value={cashOutlays.appliancesAmortization}
                                                onChange={(e) => setCashOutlays({ ...cashOutlays, appliancesAmortization: e.target.value })}
                                                placeholder="₱"
                                            />
                                        </div>
                                        <div className="item">
                                            <label>Others:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Specify details here..." 
                                                style={{ marginBottom: "4px", width: "50%", marginRight: "200px" }} 
                                                value={otherDebts}
                                                onChange={(e) => setOtherDebts(e.target.value)}
                                            />
                                            
                                            <input
                                                type="number"
                                                value={cashOutlays.otherDebts}
                                                onChange={(e) => setCashOutlays({ ...cashOutlays, otherDebts: e.target.value })}
                                                placeholder="₱"
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <label>Payments of Insurance or Pension Premiums:</label>
                                        <input
                                            type="number"
                                            value={cashOutlays.insurance}
                                            onChange={(e) => setCashOutlays({ ...cashOutlays, insurance: e.target.value })}
                                            placeholder="₱"
                                        />
                                    </div>
                                    <div className="item">
                                        <label>Other Cash Outlays:</label>
                                        <input type="text" 
                                        placeholder="Specify details here..." 
                                        style={{ marginBottom: "4px", width: "50%", marginRight: "200px" }} 
                                        value={otherOutlays}
                                        onChange={(e) => setOtherOutlays(e.target.value)}
                                        />
                                        
                                        <input
                                            type="number"
                                            value={cashOutlays.otherCashOutlay}
                                            onChange={(e) => setCashOutlays({ ...cashOutlays, otherCashOutlay: e.target.value })}
                                            placeholder="₱"
                                        />
                                    </div>
                                    <div className="item">
                                        <label style={{ fontWeight: "bold" }}>TOTAL CASH OUTLAYS</label>
                                        <input type="number" value={totalCashOutlays} readOnly placeholder="₱" style={{ borderStyle: 'double', borderWidth: '3px',borderColor: '#000', }} />
                                    </div>
                                    <div className="item">
                                        <label style={{ fontWeight: "bold" }}>TOTAL EXPENDITURE AND CASH OUTLAYS</label>
                                        <input type="number" value={totalExpenditureAndCashOutlays} readOnly placeholder="₱" style={{ borderStyle: 'double', borderWidth: '3px',borderColor: '#000', }} />
                                    </div>
                                    <div className="item">
                                        <label style={{ fontWeight: "bold" }}>NET SAVINGS</label>
                                        <input type="number" value={netSavings} readOnly placeholder="₱" style={{ borderStyle: 'double', borderWidth: '3px',borderColor: '#000', }} />
                                    </div>
                                </div>
                    <br></br>
                    <p className="aboutp">
                    I certify to the correctness and truthfulness of the above statements according to my knowledge and belief. 
                    Any false declaration made by me which may be 
                    found later shall cause the disapproval of my loan application.
                    </p>
                    <br></br>
                    <div className="form-row-5">
                                <div className="ubos">
                                    <div className="tulo">
                                        <label htmlFor="borrower-signature">Member-Borrower’s Signature</label>
                                        <input 
                                            type="file" 
                                            id="borrower-signature" 
                                            name="borrowerSignature" 
                                            onChange={(e) => handleFileChange(e, setMemberBorSig)}
                                            required />
                                    </div>
                                </div>

                                <div className="ubos">
                                    <div className="very">
                                        <label htmlFor="comaker">Verified by</label>
                                        <input 
                                            type="text" 
                                            id="verified" 
                                            name="verified" 
                                            placeholder="Co-maker's name" 
                                            value={comaker} // Access from state
                                            onChange={(e) => setComaker(e.target.value)} // Update state
                                            required/>
                                    </div>
                                </div>

                                <div className="ubos">
                                    <div className="tulo">
                                        <label htmlFor="date">Date</label>
                                        <input 
                                            type="date" 
                                            id="date" 
                                            name="date" 
                                            value={cfaplidate} 
                                            onChange={(e) => setCfaplidate(e.target.value)} 
                                            required />
                                    </div>
                                </div>

                            </div>

                            <button type="submit" class="submit-btn-1">Submit</button>
                </form>
                <br></br>

        

            </div>

            < Footer />
        </div>
    );
};

export default CashFlow;