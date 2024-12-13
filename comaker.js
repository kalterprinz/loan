import './appform.css';
import Footer from './footer';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BorrowerHeader from './borrowerheader';

// Set up a custom icon for the Leaflet marker


const CoMaker = () => {
    const navigate = useNavigate();
    const [loanId, setloanId] = useState("6745461586fc37bf52a1fa2e");
    const [branch, setBranch] = useState("Tibanga-Main");
    const [applicationDate, setApplicationDate] = useState("");
    const [comakerName, setComakerName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [presentAddress, setPresentAddress] = useState("");
    const [telMob, setTelMob] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("female");
    const [civilStatus, setCivilStatus] = useState("single");
    const [spouseName, setSpouseName] = useState("");
    const [residentStatus, setResidentStatus] = useState("owned");
    const [amortization, setAmortization] = useState("");

    const [employer, setEmployer] = useState("");
    const [businessAdd, setBusinessAdd] = useState("");
    const [empStatus, setEmpStatus] = useState("");
    const [lengthService, setLengthService] = useState("");
    const [annualSalary, setAnnualSalary] = useState("");

    const [firm, setFirm] = useState("");
    const [businessAdd2, setBusinessAdd2] = useState("");
    const [natureBus, setNatureBus] = useState("");
    const [soleOwner, setSoleOwner] = useState("");
    const [capitalInvest, setCapitalInvest] = useState("");

    const [creditor1, setCreditor1] = useState("");
    const [creditor2, setCreditor2] = useState("");
    const [creditor3, setCreditor3] = useState("");
    const [principalAmount1, setPrincipalAmount1] = useState("");
    const [principalAmount2, setPrincipalAmount2] = useState("");
    const [principalAmount3, setPrincipalAmount3] = useState("");
    const [presentBalance1, setPresentBalance1] = useState("");
    const [presentBalance2, setPresentBalance2] = useState("");
    const [presentBalance3, setPresentBalance3] = useState("");
    const [maturityDate1, setMaturityDate1] = useState("");
    const [maturityDate2, setMaturityDate2] = useState("");
    const [maturityDate3, setMaturityDate3] = useState("");
    
    const [description1, setDescription1] = useState("");
    const [location1, setLocation1] = useState("");
    const [area1, setArea1] = useState("");
    const [marketValue1, setMarketValue1] = useState("");
    const [encumbrances1, setEncumbrances1] = useState("");
    const [description2, setDescription2] = useState("");
    const [location2, setLocation2] = useState("");
    const [area2, setArea2] = useState("");
    const [marketValue2, setMarketValue2] = useState("");
    const [encumbrances2, setEncumbrances2] = useState("");
    const [description3, setDescription3] = useState("");
    const [location3, setLocation3] = useState("");
    const [area3, setArea3] = useState("");
    const [marketValue3, setMarketValue3] = useState("");
    const [encumbrances3, setEncumbrances3] = useState("");
    

    const [relationship, setRelationship] = useState("");
    const [yearsKnown, setYearsKnown] = useState("");
    const [memberSig, setMemberSig] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('loanId', loanId);
        formData.append('branch', branch);
        formData.append('applicationDate', applicationDate);
        formData.append('comakerName', comakerName);
        formData.append('emailAddress', emailAddress);
        formData.append('permanentAddress', permanentAddress);
        formData.append('presentAddress', presentAddress);
        formData.append('telMob', telMob);
        formData.append('age', age);
        formData.append('sex', sex);
        formData.append('civilStatus', civilStatus);
        formData.append('spouseName', spouseName);
        formData.append('residentStatus', residentStatus);
        formData.append('amortization', amortization);
        formData.append('employer', employer);
        formData.append('businessAdd', businessAdd);
        formData.append('empStatus', empStatus);
        formData.append('lengthService', lengthService);
        formData.append('annualSalary', annualSalary);
        formData.append('firm', firm);
        formData.append('natureBus', natureBus);
        formData.append('soleOwner', soleOwner);
        formData.append('capitalInvest', capitalInvest);
        formData.append('businessAdd2', businessAdd2);
        formData.append('creditor1', creditor1);
        formData.append('creditor2', creditor2);
        formData.append('creditor3', creditor3);
        formData.append('principalAmount1', principalAmount1);
        formData.append('principalAmount2', principalAmount2);
        formData.append('principalAmount3', principalAmount3);
        formData.append('presentBalance1', presentBalance1);
        formData.append('presentBalance2', presentBalance2);
        formData.append('presentBalance3', presentBalance3);
        formData.append('maturityDate1', principalAmount1);
        formData.append('maturityDate2', principalAmount2);
        formData.append('maturityDate3', principalAmount3);
        formData.append('description1', description1);
        formData.append('location1', location1);
        formData.append('area1', area1);
        formData.append('marketValue1', marketValue1);
        formData.append('encumbrances1', encumbrances1);
        formData.append('description2', description2);
        formData.append('location2', location2);
        formData.append('area2', area2);
        formData.append('marketValue2', marketValue2);
        formData.append('encumbrances2', encumbrances2);
        formData.append('description3', description3);
        formData.append('location3', location3);
        formData.append('area3', area3);
        formData.append('marketValue3', marketValue3);
        formData.append('encumbrances3', encumbrances3);
        formData.append('relationship', relationship);
        formData.append('yearsKnown', yearsKnown);

        if (memberSig) formData.append('memberSig', memberSig);

        console.log('Submitting data:', formData);

        try {
            const response = await axios.post('http://localhost:3001/comaker', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                navigate(`/`); // Adjust navigation path if needed
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
        <div className="application-form-pageapp1">
            {/* Header Section */}
            <BorrowerHeader/>

            {/* Form Container */}
            <div className="sulodPorm1">
            <h3 className="lontaytel1">Co-Maker's Statement</h3>
                <form className="porm1" onSubmit={handleSubmit}>
                    <div className="plesDet1">
                        <div className="lugar1">
                        <label for="branch">BRANCH</label>
                            <select 
                                id="branch" 
                                name="branch" 
                                required 
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}  
                            >
                                <option value="Tibanga-Main">Tibanga-Main</option>
                                <option value="Pala-o">Pala-o</option>
                                <option value="Buru-un">Buru-un</option>
                                <option value="Kiwalan">Kiwalan</option>
                                <option value="Poblacion">Poblacion</option>
                                <option value="Suarez-Tominobo">Suarez-Tominobo</option>
                                <option value="Tubod Iligan">Tubod Iligan</option>
                            </select>
                        </div>

                        <div className="det1">
                            <label htmlFor="dateFiled">DATE FILED</label>
                            <input
                                type="date"
                                id="applicationDate"
                                name="applicationDate"
                                required
                                className="date-input"
                                value={applicationDate} 
                                onChange={(e) => setApplicationDate(e.target.value)} 
                            />
                        </div>

                    </div>
                            <br></br>
                            <p className="aboutp">
                            I hereby agree to be the co-maker of member-borrower in signing the note which will evidence the loan he/she is applying for if granted. 
                            I am aware that in signing the note as co-maker, I become jointly and solidarily liable with the member-borrower.
                            I am also aware that you will rely on the truthfulness of the following statements in considering the 
                            risk relative to the requested loan of the above- named member-borrower.
                            </p>
                            <br></br>
                            <p className="aboutp">
                            As co-maker/s of this loan, I do hereby assign in favor of MSU-IIT NMPC all my deposits. Furthermore, with this note, 
                            I empower and authorize MSU-IIT NMPC  to off-set my/our deposits and apply as payment to the loan of the principal 
                            borrower including interests and penalty/ies, in the event of the principalborrowers' failure to pay the same after 
                            its maturity and without any prior notice or written demand from MSU-IIT NMPC.
                            </p>

                            <br></br>

                    <div className="isa1">

                        <div className="pormleft1">
                            <div className="fillupan1">
                                <label htmlFor="name">Name:</label>
                                <input 
                                    type="text" 
                                    id="applicantName" 
                                    name="comakerName" 
                                    value={comakerName} // Access from state
                                    onChange={(e) => setComakerName(e.target.value)} // Update state
                                    required 
                                />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="email">Email Address:</label>
                                <input 
                                    type="text" 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    value={emailAddress} // Access from state
                                    onChange={(e) => setEmailAddress(e.target.value)} // Update state
                                    required 
                                />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="permanentAddress">Permanent Address:</label>
                                <textarea 
                                    id="permanentAddress" 
                                    name="permanentAddress" 
                                    value={permanentAddress} // Access from state
                                    onChange={(e) => setPermanentAddress(e.target.value)} // Update state
                                    required
                                ></textarea>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="presentAddress">Present Address:</label>
                                <textarea 
                                    id="presentAddress" 
                                    name="presentAddress" 
                                    value={presentAddress} // Access from state
                                    onChange={(e) => setPresentAddress(e.target.value)} // Update state
                                    required
                                ></textarea>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="phone">Telephone/Mobile No.:</label>
                                <input 
                                    type="text" 
                                    id="telMob" 
                                    name="telMob" 
                                    value={telMob} // Access from state
                                    onChange={(e) => setTelMob(e.target.value)} // Update state
                                    required 
                                />
                            </div>

                            <div className='ubosbali'>
                                <h4>IF EMPLOYED</h4>
                                <div className="fillupan1">
                                    <label htmlFor="employerContact">Employer:</label>
                                    <input 
                                        type="text" 
                                        id="employer" 
                                        name="employer" 
                                        value={employer} // Access from state
                                        onChange={(e) => setEmployer(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Address</label>
                                    <input 
                                        type="text" 
                                        id="businessAdd" 
                                        name="businessAdd" 
                                        value={businessAdd} // Access from state
                                        onChange={(e) => setBusinessAdd(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Employment Status/Position Head</label>
                                    <input 
                                        type="text" 
                                        id="empStatus" 
                                        name="empStatus" 
                                        value={empStatus} // Access from state
                                        onChange={(e) => setEmpStatus(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Length of Service</label>
                                    <input 
                                        type="text" 
                                        id="lengthService" 
                                        name="lengthService" 
                                        value={lengthService} // Access from state
                                        onChange={(e) => setLengthService(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Annual Salary</label>
                                    <input 
                                        type="text" 
                                        id="annualSalary" 
                                        name="annualSalary" 
                                        value={annualSalary} // Access from state
                                        onChange={(e) => setAnnualSalary(e.target.value)} // Update state
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pormrayt1">

                            <div className='gagmay'>
                            <div className="ageco">
                                <label htmlFor="age">Age:</label>
                                <input 
                                    type="text" 
                                    id="age" 
                                    name="age" 
                                    value={age} // Access from state
                                    onChange={(e) => setAge(e.target.value)} // Update state
                                    required 
                                />
                            </div>

                            <div className="genderco">
                                <label htmlFor="sex">Sex:</label>
                                <select 
                                    id="sex" 
                                    name="sex" 
                                    required 
                                    value={sex} // Access from state
                                    onChange={(e) => setSex(e.target.value)} // Update state
                                >
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>

                            <div className="civilco">
                                <label htmlFor="civilStatus">Civil Status:</label>
                                <select 
                                    id="civilStatus" 
                                    name="civilStatus" 
                                    required 
                                    value={civilStatus} // Access from state
                                    onChange={(e) => setCivilStatus(e.target.value)} // Update state
                                >
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="employerContact">Name of Spouse:</label>
                                <input 
                                    type="text" 
                                    id="spouseName" 
                                    name="spouseName" 
                                    value={spouseName} // Access from state
                                    onChange={(e) => setSpouseName(e.target.value)} // Update state
                                />
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="employmentStatus">Residence Status</label>
                                <select 
                                    id="resident" 
                                    name="residence" 
                                    required 
                                    value={residentStatus} // Access from state
                                    onChange={(e) => setResidentStatus(e.target.value)} // Update state
                                >
                                    <option value="owned">Owned</option>
                                    <option value="free of use">Free of Use</option>
                                    <option value="renting">Renting</option>
                                </select>
                            </div>

                            <div className="fillupan1">
                                <label htmlFor="employmentStatus">/on Amortization</label>
                                <input 
                                    type="text" 
                                    id="amortization" 
                                    name="amortization" 
                                    value={amortization} // Access from state
                                    onChange={(e) => setAmortization(e.target.value)} // Update state
                                    required 
                                />
                            </div>

                            <div className='ubosbali2'>
                                <h4>IF SELF-EMPLOYED</h4>
                                <div className="fillupan1">
                                    <label htmlFor="employerContact">Firm/ Trade Name:</label>
                                    <input 
                                        type="text" 
                                        id="firm" 
                                        name="firm" 
                                        value={firm} // Access from state
                                        onChange={(e) => setFirm(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Address</label>
                                    <input 
                                        type="text" 
                                        id="businessAdd2" 
                                        name="businessAdd2" 
                                        value={businessAdd2} // Access from state
                                        onChange={(e) => setBusinessAdd2(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Nature of Business</label>
                                    <input 
                                        type="text" 
                                        id="natureBus" 
                                        name="natureBus" 
                                        value={natureBus} // Access from state
                                        onChange={(e) => setNatureBus(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Sole Owner/Partner</label>
                                    <input 
                                        type="text" 
                                        id="soleOwner" 
                                        name="soleOwner" 
                                        value={soleOwner} // Access from state
                                        onChange={(e) => setSoleOwner(e.target.value)} // Update state
                                    />
                                </div>

                                <div className="fillupan1">
                                    <label htmlFor="employmentStatus">Capital Invested</label>
                                    <input 
                                        type="text" 
                                        id="capitalInvest" 
                                        name="capitalInvest" 
                                        value={capitalInvest} // Access from state
                                        onChange={(e) => setCapitalInvest(e.target.value)} // Update state
                                    />
                                </div>
                            </div>
                        </div> 
                    </div>
                                            {/* Outstanding Obligations Table */}
                    <h4 className="table-header">OUTSTANDING OBLIGATION/S, IF ANY (As Principal or Co-maker)</h4>
                    <table class="obligation-table">
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
                            <td><input 
                                    type="text" 
                                    id="creditor1" 
                                    name="creditor1" 
                                    value={creditor1} 
                                    onChange={(e) => setCreditor1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="principalAmount1" 
                                    name="principalAmount1" 
                                    value={principalAmount1} 
                                    onChange={(e) => setPrincipalAmount1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="presentBalance1" 
                                    name="presentBalance1" 
                                    value={presentBalance1} 
                                    onChange={(e) => setPresentBalance1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="date" 
                                    id="maturityDate1" 
                                    name="maturityDate1" 
                                    value={maturityDate1} 
                                    onChange={(e) => setMaturityDate1(e.target.value)} 
                                /></td>
                        </tr>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="creditor2" 
                                    name="creditor2" 
                                    value={creditor2} 
                                    onChange={(e) => setCreditor2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="principalAmount2" 
                                    name="principalAmount2" 
                                    value={principalAmount2} 
                                    onChange={(e) => setPrincipalAmount2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="presentBalance2" 
                                    name="presentBalance2" 
                                    value={presentBalance2} 
                                    onChange={(e) => setPresentBalance2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="date" 
                                    id="maturityDate2" 
                                    name="maturityDate2" 
                                    value={maturityDate2} 
                                    onChange={(e) => setMaturityDate2(e.target.value)} 
                                /></td>
                        </tr>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="creditor3" 
                                    name="creditor3" 
                                    value={creditor3} 
                                    onChange={(e) => setCreditor3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="principalAmount3" 
                                    name="principalAmount3" 
                                    value={principalAmount3} 
                                    onChange={(e) => setPrincipalAmount3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="presentBalance3" 
                                    name="presentBalance3" 
                                    value={presentBalance3} 
                                    onChange={(e) => setPresentBalance3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="date" 
                                    id="maturityDate3" 
                                    name="maturityDate3" 
                                    value={maturityDate3} 
                                    onChange={(e) => setMaturityDate3(e.target.value)} 
                                /></td>
                        </tr>

                        </tbody>
                    </table>

                    {/* List of Properties Table */}
                    <h4 className="table-header">LIST OF PROPERTIES (REAL AND PERSONAL)</h4>
                    <table className="property-table">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Area</th>
                            <th>Market Value</th>
                            <th>Encumbrances</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="description1" 
                                    name="description1" 
                                    value={description1} 
                                    onChange={(e) => setDescription1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="location1" 
                                    name="location1" 
                                    value={location1} 
                                    onChange={(e) => setLocation1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="area1" 
                                    name="area1" 
                                    value={area1} 
                                    onChange={(e) => setArea1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="number" 
                                    id="marketValue1" 
                                    name="marketValue1" 
                                    value={marketValue1} 
                                    onChange={(e) => setMarketValue1(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="encumbrances1" 
                                    name="encumbrances1" 
                                    value={encumbrances1} 
                                    onChange={(e) => setEncumbrances1(e.target.value)} 
                                /></td>
                        </tr>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="description2" 
                                    name="description2" 
                                    value={description2} 
                                    onChange={(e) => setDescription2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="location2" 
                                    name="location2" 
                                    value={location2} 
                                    onChange={(e) => setLocation2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="area2" 
                                    name="area2" 
                                    value={area2} 
                                    onChange={(e) => setArea2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="number" 
                                    id="marketValue2" 
                                    name="marketValue2" 
                                    value={marketValue2} 
                                    onChange={(e) => setMarketValue2(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="encumbrances2" 
                                    name="encumbrances2" 
                                    value={encumbrances2} 
                                    onChange={(e) => setEncumbrances2(e.target.value)} 
                                /></td>
                        </tr>
                        <tr>
                            <td><input 
                                    type="text" 
                                    id="description3" 
                                    name="description3" 
                                    value={description3} 
                                    onChange={(e) => setDescription3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="location3" 
                                    name="location3" 
                                    value={location3} 
                                    onChange={(e) => setLocation3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="area3" 
                                    name="area3" 
                                    value={area3} 
                                    onChange={(e) => setArea3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="number" 
                                    id="marketValue3" 
                                    name="marketValue3" 
                                    value={marketValue3} 
                                    onChange={(e) => setMarketValue3(e.target.value)} 
                                /></td>
                            <td><input 
                                    type="text" 
                                    id="encumbrances3" 
                                    name="encumbrances3" 
                                    value={encumbrances3} 
                                    onChange={(e) => setEncumbrances3(e.target.value)} 
                                /></td>
                        </tr>

                        </tbody>
                    </table>

                    {/* Additional Information */}
                    <div className="additional-info">
                        <div>
                            <label htmlFor="relationship">What is your relationship to the Member-borrower?</label>
                            <input 
                                type="text" 
                                id="relationship" 
                                name="relationship" 
                                value={relationship} // Access from state
                                onChange={(e) => setRelationship(e.target.value)} // Update state
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="yearsKnown">How many years have you known the Member-borrower?</label>
                            <input 
                                type="text" 
                                id="yearsKnown" 
                                name="yearsKnown" 
                                value={yearsKnown} // Access from state
                                onChange={(e) => setYearsKnown(e.target.value)} // Update state
                                required 
                            />
                        </div>
                    </div>

                            <p className="aboutp">
                            The undersigned authorized MSU-IIT NMPC to obtain such information as it may 
                            require concerning this application and agree that this document shall remain 
                            its property whether or not the loan is granted. The undersigned hereby 
                            certifies that the information stated is true and correct and agrees to 
                            notify the company of any material change affecting any loan based on the 
                            information contained herein.
                            </p>
                            <br></br>
                            {/* Upload Signature and Date */}

{/* Share Residence Location */}

                                    

                    <div className="form-row-checkbox-upload-date">
                        <div className="upload-field">
                            <label htmlFor="coMakerSignature" className="upload-label">Co-maker's Name under Signature</label>
                            <input
                                type="file"
                                id="borrower-signature"
                                name="memberSig"
                                onChange={(e) => handleFileChange(e, setMemberSig)}
                                required
                            />
                        </div>
                    </div>

                           

                            <div class="parent-containerapp1">
                                <button type="submit" className="submit-btn">Next →</button>
                            </div>


                        </form>
                    </div>

         <Footer />
        </div>
    );
};

export default CoMaker;
