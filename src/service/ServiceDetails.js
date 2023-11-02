import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";

function CourseDetails() {
  //   const course = {
  //     title: "Course Title",
  //     details:
  //       "Course Details Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula odio id volutpat. Sed bibendum quam sed nunc malesuada, in vestibulum leo scelerisque.",
  //     instructor: {
  //       name: "Instructor Name",
  //       education: "Ph.D. in Computer Science",
  //       skills: "Web Development, Data Science, Machine Learning",
  //       avatar: "instructor-avatar.jpg",
  //       socialIcons: ["fa fa-linkedin", "fa fa-github", "fa fa-twitter"],
  //     },
  //     reviews: [
  //       {
  //         avatar: "student-avatar-1.jpg",
  //         name: "Student 1",
  //         email: "student1@example.com",
  //         review:
  //           "Great course! I learned a lot and the instructor was very knowledgeable.",
  //       },
  //       {
  //         avatar: "student-avatar-2.jpg",
  //         name: "Student 2",
  //         email: "student2@example.com",
  //         review: "This course exceeded my expectations. I highly recommend it.",
  //       },
  //     ],
  //   };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userid")));
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("userRole"))
  );
  const [enrolled, setEnrolled] = useState("ADD TO COURSE LIST");
  const [buttonClass, setButtonClass] = useState("btn btn-success");
  const [data, setData] = useState([]);
  const [addCourse, setAddCourse] = useState(false);



  const { id } = useParams();

 

  const onClick = (e) => {
    e.preventDefault();
    // console.log(`Form submitted:`);
    // console.log(`Todo studentid: ${user}`);
    // console.log(`Todo courseid: ${props.match.params.id}`);

    const newTodo = {
      student: user,
      course: id,
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
      //console.log(buttonClass);
      toast.error("Course already added");
    }
  };

  useEffect(() => {
     if (userRole === "student") {
      setAddCourse(true);
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pedu-ibrahimecste.vercel.app/courses?id=${id}`
        );
        setData(response.data);


        const responseEnrolled = await axios.get(
          `https://pedu-ibrahimecste.vercel.app/checkenrollment?id=${user}&&courseid=${id}`
        );
        
        //console.log(responseEnrolled)
        
        if (responseEnrolled?.data) {
          setEnrolled("ALREADY ENROLLED");
          setButtonClass("btn btn-danger");
        }
        //console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, user, userRole]);

  return (
    <div>
      <NavBar />
      <div style={{ marginBottom: "100px" }} className="container mt-5">
        <div className="row">
          {/* Left side - Course Banner */}
          <div className="col-md-4">
            <img
              src={`https://drive.google.com/uc?id=${
                data[0]?.banner?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)[1]
              }`}
              alt="Course Banner"
              className="img-fluid"
            />
          </div>
          {/* Right side - Course Details, Instructor Details, and Reviews */}
          <div className="col-md-8">
            {/* Course Title and Details */}
            <h3>{data[0]?.courseName}</h3>
            <p>{data[0]?.courseDescription}</p>
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

            {/* Instructor Details */}
            {/* <div className="instructor-details mt-4">
            <div className="instructor-avatar">
              <img
                src={course.instructor.avatar}
                alt="Instructor Avatar"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="instructor-info">
              <h4>{course.instructor.name}</h4>
              <p>Education: {course.instructor.education}</p>
              <p>Skills: {course.instructor.skills}</p>
              <div className="social-icons">
                {course.instructor.socialIcons.map((iconClass, index) => (
                  <i key={index} className={iconClass}></i>
                ))}
              </div>
            </div>
          </div> */}

            {/* Review System */}
            {/* <div className="reviews mt-4">
            <h4>Reviews & Ratings</h4>
            <div className="reviews-list">
              {course.reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="review-avatar">
                    <img
                      src={review.avatar}
                      alt={`Student ${index + 1} Avatar`}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="review-details">
                    <h5>{review.name}</h5>
                    <p>Email: {review.email}</p>
                    <p>{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          </div>
        </div>
      </div>
      {/* Brand logo */}
      <BrandLogoSlider background="grey-bg" />

      {/* Footer */}
      <Footer />

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  );
}

export default CourseDetails;
