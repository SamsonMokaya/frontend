import './App.css';
import image1 from './images/home-med.png';
import image2 from './images/doctor.png';
import image3 from './images/Doctors Bag.png';
import image4 from './images/Syringe.png';
import image5 from './images/face.png';
function App() {
  return (
    <div className="App">
        <div class="home" id="home">
           
            {/* <!-- this menu is displayed when the screen is greater than or equal to 750px --> */}
            <div class="nav-and-search">
                <div>
                    <nav>
                        <ul>
                            <div class="home-rectangle">
                                <li><a href="#home">Home</a></li>
                            </div>
                            <div class="rest">
                                <li><a href="#services">Services</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </div>
                        </ul>
                    </nav>
                </div>
                <div class="search">
                    <input type="search" placeholder="Search"/>
                </div>
            </div>
            {/* <!-- content of home page begins here --> */}
            <div class="overall-content">
                <div class="words">
                    <h1><span class="blue">Smart</span>Dawa</h1>
                    <p>
                        Welcome to SmartDawa, your trusted online destination for 
                        high-quality medical drugs. We are committed to providing 
                        convenient access to a wide range of pharmaceutical products, 
                        ensuring the health and well-being of our customers.
                    </p>
                    <button><a href='/doctor_login'>Get started</a></button>
                </div>
                <div class="content-image">
                    <img src={image1} alt=""/>
                </div>
            </div>
        </div>
        {/* <!-- this is the services section --> */}
        <div id="services" class="services">
            <div class="header">
                <h1><span class="blue">Our</span> Services</h1>
            </div>
            <div class="all-services">
                <div class="service-one" id="service">
                    <img src={image3} alt=""/>
                    <h5>Product Catalogue</h5>
                    <p>
                        Wide range of medical drugs and healthcare products, categorized for easy navigation.
                    </p>
                </div>
                <div class="service-two" id="service">
                    <img src={image4} alt=""/>
                    <h5>Online Ordering</h5>
                    <p>
                        A user-friendly platform allowing customers to conveniently browse, select, and order.
                    </p>
                </div>
                <div class="service-three" id="service">
                    <img src={image5} alt=""/>
                    <h5>Customer Support</h5>
                    <p>
                        A dedicated customer support team that is easily accessible through various channels.
                    </p>
                </div>
            </div>
        </div>
        {/* <!-- this is the about section --> */}
        <div id="about" class="about">
            <div class="header">
                <h1><span class="blue">About</span> Us</h1>
            </div>
            <div class="about-content">
                <div class="about-image">
                    <img src={image2}alt=""/>
                </div>
                <div class="about-words">
                    <p>
                        At SmartDawa, we understand the importance of reliable and 
                        safe medications. That's why we partner with reputable pharmaceutical 
                        manufacturers and distributors to offer only genuine, approved drugs. 
                        Whether you need prescription medications, over-the-counter products, 
                        or specialized treatments, our extensive catalog has you covered.
                        Shopping with us is easy and secure. Simply browse through our categories 
                        or use our search feature to find the medication you need. 
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
