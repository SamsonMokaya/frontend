import '../../css/Dashboard.css';
import profileImage from '../../images/profile.png'
import rectangleImage from '../../images/rectangle2.png'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [totalPrescriptions, setTotalPrescriptions] = useState('');
    const [totalMedicine, setTotalMedicine] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [patientID, setPatientID] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/')
        .then(res => {
            if(res.data.valid){
                setName(res.data.name)
                navigate('/pharmacist/profile')
            }else{
                navigate('/pharmacist_login')
            }
        })
        .catch(err => console.log(err))
    })

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
            <div class="welcome">
                <p>
                    welcome<br/><span>{name}</span>
                </p>
                    </div>
            </div>
            <div class="list">
            <p class="patients"><a href="/pharmacist/prescription">Prescription</a></p>
            <p class="medicine"><a href="/pharmacist/Medicine">Medicine</a></p>
                <div class="orange" style={{marginTop:"20%"}}>
                    <img src={rectangleImage} alt="rectangle" style={{width:"75%"}}/>
                    <p class="profile" style={{marginTop:"-60px"}}><a href="/pharmacist/Profile">Profile</a></p>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-header">
                <div class="header">
                    <h4>profile <span>Page</span></h4>
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
        </div>
        {/* <!-- insert table here --> */}
      </div>
    </div>
  );
}

export default Profile;
