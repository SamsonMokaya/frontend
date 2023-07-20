import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../images/profile.png';
import rectangleImage from '../../images/rectangle2.png';
import '../../css/Dashboard.css';



function Medicine() {

    
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [totalPrescriptions, setTotalPrescriptions] = useState('');
  const [totalMedicine, setTotalMedicine] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [updateMedicineName, setUpdateMedicineName] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedicineName, setNewMedicineName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/')
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.name);
          navigate('/pharmacist/medicine');
        } else {
          navigate('/pharmacist_login');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/medicine/')
      .then((res) => {
        setMedicines(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/medicine/count')
      .then((res) => {
        setTotalMedicine(res.data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/prescription/count')
      .then((res) => {
        setTotalPrescriptions(res.data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      navigate('/pharmacist_login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleShowUpdateModal = (medicine) => {
    setSelectedMedicine(medicine);
    setUpdateMedicineName(medicine.MedicineName);
    setUpdateQuantity(medicine.Quantity);
    setShowUpdateModal(true);
  };

  const handleHideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateMedicine = () => {
    const updatedMedicineData = {
      MedicineName: updateMedicineName,
      MedicineID: selectedMedicine.MedicineID,
      Quantity: updateQuantity,
    };

    axios
      .put(`http://localhost:5000/api/medicine/${selectedMedicine.MedicineID}`, updatedMedicineData)
      .then((response) => {
            window.location.reload()          
      })
      .catch((error) => {
        console.error(error);
      });

    setShowUpdateModal(false);
  };

  const handleAddMedicine = () => {
    const newMedicineData = {
      MedicineName: newMedicineName,
      Quantity: newQuantity,
    };

    axios
      .post('http://localhost:5000/api/medicine/', newMedicineData)
      .then((response) => {
        setShowAddModal(false);
        window.location.reload()
        setNewMedicineName('');
        setNewQuantity('');
      })
      .catch((error) => {
        console.error(error);
      });

    setShowAddModal(false);
  };

  const handleDeleteMedicine = (id) => {
    axios
      .delete(`http://localhost:5000/api/medicine/${id}`)
      .then((response) => {
        setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.MedicineID !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="overall">
        <div className="navigation" style={{ backgroundImage: 'linear-gradient(#E68A54, #D95204)' }}>
          <div className="welcome">
            <p>
              welcome
              <br />
              <span>{name}</span>
            </p>
          </div>
          <div className="list">
            <p className="patients">
              <a href="/pharmacist/prescription">Prescription</a>
            </p>
            <div className="orange" style={{ marginTop: '20%' }}>
              <img src={rectangleImage} alt="rectangle" style={{ width: '75%' }} />
              <p className="medicine" style={{ marginTop: '-60px' }}>
                <a href="/pharmacist/Medicine">Medicine</a>
              </p>
            </div>
            <p className="profile">
              <a href="/pharmacist/Profile">Profile</a>
            </p>
          </div>
        </div>
        <div className="main">
          <div className="main-header">
            <div className="header">
              <h4>
                Medicine <span>Page</span>
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

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addMedicineModal" onClick={() => setShowAddModal(true)}>
            Add New Medicine
          </button>

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
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => handleShowUpdateModal(medicine)}
                      >
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteMedicine(medicine.MedicineID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal form for updating a medicine */}
          {showUpdateModal && (
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update Medicine
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleHideUpdateModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="updateMedicineName">Medicine Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="updateMedicineName"
                          value={updateMedicineName}
                          onChange={(e) => setUpdateMedicineName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="updateMedicineID">Medicine ID:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="updateMedicineID"
                          value={selectedMedicine?.MedicineID}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="updateQuantity">Quantity:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="updateQuantity"
                          value={updateQuantity}
                          onChange={(e) => setUpdateQuantity(e.target.value)}
                          required
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleHideUpdateModal}>
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateMedicine}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

           


           {/* Modal form for adding a new medicine */}
           <div className="modal fade" id="addMedicineModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Medicine
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowAddModal(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="newMedicineName">Medicine Name:</label>
                      <input type="text" className="form-control" id="newMedicineName" value={newMedicineName} onChange={(e) => setNewMedicineName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newQuantity">Quantity:</label>
                      <input type="number" className="form-control" id="newQuantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} required />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowAddModal(false)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleAddMedicine}>
                    Add Medicine
                  </button>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Medicine;
