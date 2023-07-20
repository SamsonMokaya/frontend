import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../../css/Dashboard.css';
import profileImage from '../../images/profile.png';
import rectangleImage from '../../images/rectangle.png';

function Medicine() {

    axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [totalPrescriptions, setTotalPrescriptions] = useState('');
  const [totalMedicine, setTotalMedicine] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:5000/api/medicine/')
      .then((res) => {
        setMedicines(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/prescription/count')
      .then((res) => {
        setTotalPrescriptions(res.data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/medicine/count')
      .then((res) => {
        setTotalMedicine(res.data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/')
    .then(res => {
        if(res.data.valid){
            setName(res.data.name)
            navigate('/doctor/medicine')
        }else{
            navigate('/doctor_login')
        }
    })
    .catch(err => console.log(err))
})

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      navigate('/doctor_login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error
    }
  };

  const handlePrescribe = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleSubmit = () => {
    // Close the modal
    setShowModal(false);
  
    // Prescription creation logic
    const prescriptionData = {
      DoctorName: name,
      PatientID: patientID,
      MedicineID: selectedMedicine.MedicineID,
      Quantity: quantity,
    };
  
    // Make an API call to create the prescription using prescriptionData
    axios.post('http://localhost:5000/api/prescription/', prescriptionData)
      .then((response) => {
        // Display the API response message as an alert
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        // Display error message from the API response, if available
        if (error.response && error.response.data.error) {
          alert(`Error while creating prescription: ${error.response.data.error}`);
        } else {
          alert('An error occurred while creating the prescription.');
        }
        window.location.reload();
      });
  };
  

  return (
    <div className="overall">
      <div className="navigation">
        <div className="welcome">
          <p>
            welcome
            <br />
            <span>{name}</span>
          </p>
        </div>
        <div className="list">
          <p className="patients">
            <a href="/doctor/patient">Patients</a>
          </p>
          <div className="orange" style={{ marginTop: '20%' }}>
            <img src={rectangleImage} alt="rectangle" style={{ width: '75%' }} />
            <p className="medicine" style={{ marginTop: '-60px' }}>
              <a href="/doctor/medicine">Medicine</a>
            </p>
          </div>
          <p className="prescription">
            <a href="/doctor/prescription">Prescription</a>
          </p>
          <p className="profile">
            <a href="/doctor/profile">Profile</a>
          </p>
        </div>
      </div>
      <div className="main">
        <div className="main-header">
          <div className="header">
            <h4>
              Patients <span>Page</span>
            </h4>
          </div>
          <div class="profile" style={{marginLeft: "50%"}}>
                        <img style={{width: "45%"}} src={profileImage} alt=""/>
                        <p><button className='logout-btn' onClick={handleLogout}>Logout</button></p>
                    </div>
        </div>
        <div className="counts">
          <div className="count-one">
            <p>
              <span>200</span>
              <br />
              Patients
            </p>
          </div>
          <div className="count-two">
            <p>
              <span>{totalPrescriptions}</span>
              <br />
              Prescriptions
            </p>
          </div>
          <div className="count-three">
            <p>
              <span>{totalMedicine}</span>
              <br />
              Medicine
            </p>
          </div>
        </div>

        {/* Table to display medicine data */}
        <div className="medicine-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>MedicineID</th>
                <th>MedicineName</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.MedicineID}>
                  <td>{medicine.MedicineID}</td>
                  <td>{medicine.MedicineName}</td>
                  <td>{medicine.Quantity}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => handlePrescribe(medicine)}
                    >
                      Prescribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal form for prescription */}
      {showModal && (
        <div className="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Prescribe Medicine</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Medicine Name:</label>
                    <input type="text" className="form-control" value={selectedMedicine?.MedicineName} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Medicine ID:</label>
                    <input type="text" className="form-control" value={selectedMedicine?.MedicineID} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Quantity:</label>
                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Doctor Name:</label>
                    <input type="text" className="form-control" value={name} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Patient ID:</label>
                    <input type="text" className="form-control" value={patientID} onChange={(e) => setPatientID(e.target.value)} required />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Prescribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medicine;