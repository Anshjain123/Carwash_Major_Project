import React, { useState } from 'react'
import car from '../carLogo.png'
import cleaner from '../cleaner_onboarding.jpg'
import client from '../client_onboarding.jpg'
import './Dashboard.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import  car1  from "../Assets/car1.avif"
import  car2  from "../Assets/car2.jpeg"
import  car3  from "../Assets/car3.jpg"
import  car4  from "../Assets/car4.avif"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';

const Dashboard = () => {
    const height = window.innerHeight;


    const navigate = useNavigate();
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    return (


        // <div className="container" style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>

        //     <div class="Daily-Car-Wash" style={{ textAlign: 'center' }}>
        //         <div style={{ display: 'flex' }}>
        //             <div style={{ display: 'flex', flexDirection: 'column' }} >
        //                 <h1 className='text1' style={{ fontSize: '40px', fontWeight: 'bolder', color: 'black' }}>
        //                     Complete Car Wash
        //                 </h1>
        //                 <div style={{ display: 'flex', justifyContent: 'space-evenly', color: 'black' }}>
        //                     <h4>
        //                         S t a r t s
        //                     </h4>
        //                     <h4>
        //                         f r o m
        //                     </h4>
        //                     <h4>
        //                         j u s t
        //                     </h4>
        //                 </div>

        //             </div>
        //             <div>

        //                 <h1 style={{ fontSize: '70px', marginLeft: "20px", marginTop: "-5px", color: 'black' }} >480 Rs</h1>
        //             </div>
        //         </div>



        //         <hr style={{ color: 'black', height: '1px' }} />

        //         <h1 className='text2' style={{ color: 'rgb(239, 63, 73)' }}>
        //             At your DoorStep!
        //         </h1>
        //     </div>

            // <div className='Car__class' style={{ flex: 0.5, alignContent: 'center' }}>
            //     <img class="home_car" src={car} />
            // </div>


        // </div>

        <>
            <main class="flex">
            {/* <div className='Car__class' style={{ flex: 0.5, alignContent: 'center' }}>
                <img class="home_car" src="http://172.31.70.13:8080/getMedia/image0Up102" />
            </div> */}
                <section class="flex-content padding_2x">
                    <article>
                        <h1 class="title big">Best <em>Professional Car</em> Cleaning Service.</h1>
                        <p1 style={{ color: "#ABABBE" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p1>
                    </article>
                </section>
                <section class="flex-content padding_2x">
                </section>
            </main>

            {/* <!--SECTION1--> */}
            <div class="section1">
                <section class="flex-content padding_2x">
                    <em class="tag">ABOUT US</em>
                    <h1 class="title medium" style={{ textAlign: 'center' }} >We help you to keep your place clean</h1>
                    <div style={{ textAlign: 'center', margin: "10px" }} >
                        <p style={{ zIndex: "1", color: "#ABABBE" }} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex nobis unde quae tenetur suscipit eaque nulla ad illum obcaecati beatae voluptates sint assumenda voluptatum, ipsa omnis velit molestias ea dolorem consequuntur, adipisci pariatur. Numquam debitis pariatur illum laboriosam, animi officiis magni impedit tempore accusantium blanditiis deserunt magnam id ipsam ea nisi rerum harum laborum sed. Soluta temporibus quia vitae culpa fugiat rerum veritatis animi harum molestiae hic officia dignissimos laudantium laborum, veniam unde est porro maiores. Aliquid, fugit vitae placeat, ipsam quam maiores at laudantium cum nam commodi voluptates velit asperiores, laborum animi minus officia natus! Perspiciatis tenetur inventore dolorum a dicta, veritatis porro impedit excepturi tempora odio, veniam voluptate beatae, necessitatibus itaque minus iste earum corporis? Impedit a, ut commodi eligendi quo perspiciatis tempore, dolores veritatis ipsa fugit quaerat, quam nisi molestiae maiores soluta debitis. Hic ipsum sequi aperiam ea, assumenda, excepturi exercitationem perspiciatis distinctio ipsam iste, non enim.</p>
                        {/* <p>Lorem, ipsum.</p> */}
                    </div>
                    {/* <em style="color:var(--secondary)">It is a long established fact</em> */}
                </section>

            </div>

            {/* <!--SECTION2--> */}
            <div class="sections section2 padding_2x" style={{ zIndex: "-1" }} >
                <article class="cards padding_2x">
                    <section class="flex-content padding_2x">
                        <figure>
                            <img src="https://i.postimg.cc/J7yFYNtr/01.png" alt="" loading="lazy" />
                        </figure>
                        <h2 class="title small">Pick a <em>plan</em></h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </section>
                    <section class="flex-content padding_2x">
                        <figure>
                            <img src="https://i.postimg.cc/jSTkjBc2/02.png" alt="" loading="lazy" />
                            <h2 class="title small"><em>Schedule</em> with us</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </figure>
                    </section>
                    <section class="flex-content padding_2x">
                        <figure>
                            <img src="https://i.postimg.cc/FKsWyc2Q/03.png" alt="" loading="lazy" />
                            <h2 class="title small">Get things <em>done</em></h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </figure>
                    </section>
                </article>
            </div>

            {/* <!--SECTION4--> */}
            <div class="section4 flex">
                <section class="flex-content padding_2x">
                    <figure>
                        <img src="https://static.vecteezy.com/system/resources/previews/016/269/572/non_2x/foam-car-wash-illustration-concept-on-white-background-vector.jpg" alt="" />
                        <span class="padding_1x">
                            <p class="title medium">5+</p>
                            <em>Years of experience</em>
                        </span>
                    </figure>
                </section>
                <section class="flex-content padding_2x">
                    <em class="tag" >WHY CHOOSE US?</em>
                    <h1 class="title medium">We provide the best services for your help!</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                    <ul>
                        <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                        <li>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</li>
                        <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                    </ul>
                </section>
            </div>

            {/* <!--SECTION3--> */}
            <div class="section3 padding_2x">
                <div class="title_header">
                    <h1 class="title medium">Quality Service</h1>
                </div>
                <div class="flex">
                    <section class="flex-content padding_1x">
                        <figure>
                            <img src={car1} alt="" />
                            <article>
                                <span class="padding_1x">
                                    <h2 class="cursive">Happy Customers</h2>
                                    <p>There are more than 80 lakhs customers who are happy to purchase services from us</p>
                                </span>
                            </article>
                        </figure>
                    </section>
                    <section class="flex-content padding_1x">
                        <figure>
                            <img src={car2} alt="" />
                            <article>
                                <span class="padding_1x">
                                    <h2 class="cursive">Better Relaibility</h2>
                                    <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </span>
                            </article>
                        </figure>
                    </section>
                    <section class="flex-content padding_1x">
                        <figure>
                            <img src={car3} alt="" />
                            <article>
                                <span class="padding_1x">
                                    <h2 class="cursive">Best Washing Service</h2>
                                    <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </span>
                            </article>
                        </figure>
                    </section>
                    <section class="flex-content padding_1x">
                        <figure>
                            <img src={car4} alt="" />
                            <article>
                                <span class="padding_1x">
                                    <h2 class="cursive">Relaible Cleaners and Cost Effective</h2>
                                    <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </span>
                            </article>
                        </figure>
                    </section>
                </div>
            </div>

            {/* <!--SECTION5--> */}
            <div class="section5 flex">
                <section class="flex-content padding_2x">
                    <h1 class="title small">Stay connected with us</h1>
                    <p>Have any questions? please feel free to contact us. We are always happy to hear from you.</p>
                    <a href="" class="btn1">Contact us - 7454985109</a>
                    
                </section>
            </div>

            {/* <!--FOOTER--> */}
            <footer>
                
                <section class="flex-content padding_2x">
                    <h3 class="title small">Opening hours</h3>
                    <p>Monday ~ Saturday, 8am-6pm || Sunday, 10am-1pm</p>
                </section>
                <section class="flex-content padding_2x">
                    <h3 class="title small">Other Links</h3>
                    <a href="#" onClick={() => navigate("/terms")} >Terms & conditions</a>
                    <a href="#">Privacy policy</a>
                    <a href="#">Cookie policy</a>
                </section>
                <section class="flex-content padding_2x">
                    <h3 class="title small">Social Media Platforms</h3>
                    <div style={{display:'flex'}} >
                        <a href="https://www.instagram.com/anshjain_123/"><InstagramIcon/></a>
                        <a href="https://www.facebook.com/profile.php?id=100018158384568"><FacebookIcon/> </a>
                    </div>
                    {/* <a href=""> <XIcon/> </a> */}
                    
                </section>
            </footer>
            <div class="sub_footer">
                <p> 2022 © All rights reserved byx</p>
            </div>

            {/* <!--JAVASCRIPT */}
            {/* <script type="text/javascript" src="js/#"></script>--> */}

          
        </>

    )
}

export default Dashboard