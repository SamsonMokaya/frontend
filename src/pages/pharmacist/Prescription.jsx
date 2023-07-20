import '../../css/Dashboard.css';
import profileImage from '../../images/profile.png'
import rectangleImage from '../../images/rectangle2.png'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Prescription() {

    axios.defaults.withCredentials = true;
    const [totalPrescriptions, setTotalPrescriptions] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);
    const [totalMedicine, setTotalMedicine] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [patientID, setPatientID] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/')
        .then(res => {
            if(res.data.valid){
                setName(res.data.name)
                navigate('/pharmacist/prescription')
            }else{
                navigate('/pharmacist_login')
            }
        })
        .catch(err => console.log(err))
    })

    useEffect(() => {
        axios.get('http://localhost:5000/api/prescription/')
          .then((res) => {
            setPrescriptions(res.data.data);
          })
          .catch((err) => console.log(err));
      }, []);

      const handleUpdateStatus = (prescriptionId) => {
        axios.put(`http://localhost:5000/api/prescription/${prescriptionId}`)
          .then((response) => {
            window.location.reload()
          })
          .catch((error) => {
            console.error(error);
            // Perform any error handling if needed
          });
      };

    useEffect(() => {
        axios.get('http://localhost:5000/api/medicine/count')
          .then((res) => {
            setTotalMedicine(res.data.total);
          })
          .catch((err) => console.log(err));
      }, []);

      useEffect(() => {
        axios.get('http://localhost:5000/api/prescription/count')
        .then(res => {
            setTotalPrescriptions(res.data.total)
        })
        .catch(err => console.log(err))
    })

    

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:5000/api/logout');
          navigate('/pharmacist_login'); // Redirect to login page after successful logout
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle error
        }
      };


        return (
            <div className="App">
              <div class="overall">
                <div class="navigation" style={{backgroundImage: "linear-gradient(#E68A54, #D95204)"}}>
                    <div class="welcome">
                        <p>
                    welcome<br/><span>{name}</span>
                    </p>
                    </div>
                    <div class="list">
                        <div class="orange" style={{marginTop:"20%"}}>
                            <img src={rectangleImage} alt="rectangle" style={{width:"75%"}}/>
                            <p class="patients" style={{marginTop:"-60px"}}><a href="/pharmacist/prescription">Prescription</a></p>
                        </div>
                        <p class="medicine"><a href="/pharmacist/Medicine">Medicine</a></p>
                        <p class="profile"><a href="/pharmacist/Profile">Profile</a></p>
                    </div>
                </div>
                <div class="main">
                    <div class="main-header">
                        <div class="header">
                            <h4>Prescription <span>Page</span></h4>
                        </div>
                        <div class="profile" style={{marginLeft: "50%"}}>
                        <img style={{width: "45%"}} src={profileImage} alt=""/>
                        <p><button className='logout-btn' onClick={handleLogout}>Logout</button></p>
                    </div>
                    </div>
                    <div class="counts">
                        <div class="count-one">
                            <p><span>200</span><br/>Patients</p>
                        </div>
                        <div class="count-two">
                            <p><span>{totalPrescriptions}</span><br/>Prescriptions</p>
                        </div>
                        <div class="count-three">
                            <p><span>{totalMedicine}</span><br/>Medicine</p>
                        </div>
                    </div>

                    {/* Table to display prescriptions data */}
           <div className="prescription-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>PrescriptionID</th>
                    <th>DoctorName</th>
                    <th>PatientID</th>
                    <th>MedicineID</th>
                    <th>MedicineName</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.PrescriptionID}>
                      <td>{prescription.PrescriptionID}</td>
                      <td>{prescription.DoctorName}</td>
                      <td>{prescription.PatientID}</td>
                      <td>{prescription.MedicineID}</td>
                      <td>{prescription.MedicineName}</td>
                      <td>{prescription.Quantity}</td>
                      <td>
                      <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => handleUpdateStatus(prescription.PrescriptionID)}
                    >
                      {prescription.Status}
                    </button>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            

                </div>
          </div>
        </div>
      );
    }
    
    export default Prescription;
    
