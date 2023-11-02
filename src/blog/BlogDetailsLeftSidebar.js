import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import axios from "axios";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const BlogDetailsLeftSidebar = (props) => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userid")));
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("userRole")));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [enrolled, setEnrolled] = useState("ADD TO COURSE LIST");
  const [buttonClass, setButtonClass] = useState("btn btn-success");
  const [addCourse, setAddCourse] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    // console.log(`Form submitted:`);
    // console.log(`Todo studentid: ${user}`);
    // console.log(`Todo courseid: ${props.match.params.id}`);

    const newTodo = { 
      student: user,
      course: props.match.params.id,
      approved: true,
    };

    if (buttonClass === "btn btn-success") {
      axios
        .post("https://pedu-ibrahimecste.vercel.app/enrollbystudent/add", newTodo)
        .then((result) => {
          toast.success("Added successfully");
        })
        .catch((err) => {
          toast.error("Course not added");
        });
    } else {
      console.log(buttonClass);
      toast.error("Course already added");
    }
  }

  useEffect(() => {
    if (userRole === "student") {
      setAddCourse(true);
    }

    const fetchData = async () => {
      const response = await axios.get("https://pedu-ibrahimecste.vercel.app/lectures?id=" + props.match.params.id);
      const responseEnrolled = await axios.get(
        `https://pedu-ibrahimecste.vercel.app/checkenrollment?id=${user}&&courseid=${props.match.params.id}`
      );

      if (responseEnrolled.data !== undefined) {
        setEnrolled("ALREADY ENROLLED");
        setButtonClass("btn btn-danger");
      }

      setVideos(response.data);
      setSelectedVideo(response.data[0]);
    }

    fetchData();
  }, [props.match.params.id, user, userRole]);

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <NavBar />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="page-banner text-center">
                <h1>Course Details</h1>
                <ul className="page-breadcrumb">
                  {/* Add your breadcrumb items here */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrapper section-space--inner--120">
        <div className="project-section">
          <div className="container">
            <div className="row">
              <div className="col-12 section-space--bottom--40">
                <div className="ui container">
                  <div className="ui grid">
                    <div className="ui row">
                      <div className="eleven wide column">
                        <VideoDetail video={selectedVideo} />
                      </div>
                      <div className="five wide column">
                        <VideoList onVideoSelect={onVideoSelect} videos={videos} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                <div className="project-details">
                  <h2>
                    {selectedVideo ? selectedVideo.title : ""}
                  </h2>
                  <p>
                    {selectedVideo ? selectedVideo.course.courseDescription : ""}
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <ToastContainer />
                  <button
                    type="button"
                    style={addCourse ? {} : { display: "none" }}
                    className={buttonClass}
                    onClick={onClick}
                  >
                    {enrolled}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandLogoSlider background="grey-bg" />
      <Footer />
      <MobileMenu />
    </div>
  );
}

export default BlogDetailsLeftSidebar;
