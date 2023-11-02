import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Services = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://pedu-ibrahimecste.vercel.app/enrollmentbystudent?id=" + props.match.params.id
      );

      setData(response.data);
    }

    fetchData();
  }, [props.match.params.id]);

  const Datalist = data.map((val, i) => (
    <div className="col-lg-4 col-md-6 col-12 section-space--bottom--30" key={i}>
      <div className="service-grid-item">
        <div className="service-grid-item__image">
          
          <div className="service-grid-item__content">
            {/* <h3 className="title">
              <a
                href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val.course._id}`}
              >
                
              </a>
            </h3> */}
           <div className="container mt-5">
                  <div className="card">
                    <img
                      src={`https://drive.google.com/uc?id=${
                        val?.course?.banner?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)[1]
                      }`}
                      className="card-img-top"
                      alt="Product Image"
                    />
                    <div className="card-body">
                      <h4 className="card-title">{val?.course?.courseName}</h4>
                        <Link
                          className="btn btn-primary"
                          to={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val.course._id}`}
                        >
                          Watch
                        </Link>
                     
                    </div>
                  </div>
                </div>


          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      {/* Navigation bar */}
      <NavBar />

      {/* breadcrumb */}
      {/*====================  breadcrumb area ====================*/}
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="page-banner text-center">
                <h1>MY COURSES</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====================  End of breadcrumb area  ====================*/}

      {/*====================  service page content ====================*/}
      <div className="page-wrapper section-space--inner--120">
        {/*Service section start*/}
        <div className="service-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="service-item-wrapper">
                  {
                    data.length>0?<div className="row">{Datalist}</div>:<h3 style={{
                      textAlign:'center'
                    }}>No Course Buy!</h3>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Service section end*/}
      </div>

      {/*====================  End of service page content  ====================*/}

      {/* Brand logo */}
      <BrandLogoSlider background="grey-bg" />

      {/* Footer */}
      <Footer />

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  );
};

export default Services;
