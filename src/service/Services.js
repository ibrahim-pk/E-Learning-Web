import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import { Link } from "react-router-dom";

const Services = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pedu-ibrahimecste.vercel.app/courses");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                <h3>ALL COURSES</h3>
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
                  <div className="row">
                    {data.map((val, i) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 section-space--bottom--30"
                        key={i}
                      >
                        <div className="service-grid-item">
                          <div className="service-grid-item__image">
                            <div className="service-grid-item__image-wrapper">
                              <div className="container mt-5">
                                <div className="card">
                                  <img
                                    src={`https://drive.google.com/uc?id=${
                                      val?.banner?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)[1]
                                    }`}
                                    className="card-img-top"
                                    alt="Product Image"
                                  />
                                  <div className="card-body">
                                    <h4 className="card-title">{val.courseName}</h4>
                                    <h6 className="card-text">{val.newPrice}Tk</h6>
                                    <p>
                                      <del>{val.oldPrice}</del>
                                    </p>
                                    <p className="card-text">
                                      Rating: <span className="badge badge-primary">2</span>
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                      <Link to={`${process.env.PUBLIC_URL}/services/details/${val._id}`}>
                                        Details
                                      </Link>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
