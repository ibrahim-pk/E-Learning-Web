import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Services = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pedu-ibrahimecste.vercel.app/coursebyinstructor?id=${props.match.params.id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [props.match.params.id]);

  const Datalist = data.map((val, i) => (
    <div className="col-lg-4 col-md-6 col-12 section-space--bottom--30" key={i}>
      <div className="service-grid-item">
        <div className="service-grid-item__image">
          <div className="service-grid-item__image-wrapper">
            {/* <a
              href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`}
            >
              <img src={val.banner} className="img-fluid" alt="Service Grid" />
            </a> */}

            {/* // Your Google Drive link
const googleDriveLink = "https://drive.google.com/file/d/ABC123/view";

// Use a regular expression to extract the file ID
const match = googleDriveLink.match(/\/file\/d\/(.+?)\//); */}
            <div className="container mt-5">
              <div className="card">
                <img
                  src={
                    val?.banner &&
                    val.banner.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
                      ? `https://drive.google.com/uc?id=${
                          val.banner.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)[1]
                        }`
                      : "" // Provide a default value or handle the case when val?.banner is null or doesn't match the expected pattern
                  }
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
                    <Link
                      to={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`}
                    >
                      Check the course Content
                    </Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
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
                  <div className="row">{Datalist}</div>
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
