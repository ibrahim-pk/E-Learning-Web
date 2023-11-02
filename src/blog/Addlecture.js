import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowCourse = (props) => (
  <option key={props.todo.courseName} value={props.todo.courseName}>
    {props.todo.courseName}
  </option>
);

const Upload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubelink, setYouTubeLink] = useState("");
  const [loaded, setLoaded] = useState(0);
  const [Courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("https://pedu-ibrahimecste.vercel.app/coursebyinstructor?id=" + props.match.params.id)
      .then((response) => {
        setCourses(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);

  const CourseList = () => {
    return Courses.map((currentTodo, i) => (
      <ShowCourse todo={currentTodo} key={i} />
    ));
  };

  const onChangeCourse = (e) => {
    setCourse(e.target.value);
    //console.log(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);

  };

  const onChangeYouTubeLink = (e) => {
    setYouTubeLink(e.target.value);
   
  };

  const checkMimeType = (event) => {
    let files = event.target.files;
    let err = [];
    const types = ["video/mp4", "video/mkv"];
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  const maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };

  const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000000000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + " is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  const onChangeHandler = (event) => {
    var files = event.target.files;
    if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) {
      setSelectedFile(files);
      setLoaded(0);
    }
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("course", course);
    data.append("title", title);
    if (youtubelink === "") {
      for (var x = 0; x < selectedFile.length; x++) {
        data.append("file", selectedFile[x]);
      }
    } else {
      data.append("videoLink", youtubelink);
    }
     console.log(data)
    axios
      .post("https://pedu-ibrahimecste.vercel.app/lectures/localupload", data, {
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        toast.success("upload success");
      })
      .catch((err) => {
        toast.error("upload fail");
      });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1300);
  };

  var message2 = "you have selected " + course;

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="offset-md-3 col-md-6">
            <form action="lectures/localupload" method="POST" encType="multipart/form-data">
              <h1 className="h3 mb-3 font-weight-normal">Upload Video</h1>
              <div className="form-group files">
                <div className="form-group">
                  <label>Course Name </label>
                  <select
                    className="form-control"
                    name="course"
                    id="ada"
                    onChange={onChangeCourse}
                    value={course}
                  >
                    {CourseList()}
                  </select>
                  <p>{message2}</p>
                </div>
                <div className="form-group">
                  <label>Video Title </label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}
                  />
                </div>
                <label>Upload Your File </label>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  multiple
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <ToastContainer />
                <Progress max="100" color="success" value={loaded}>
                  {Math.round(loaded, 2)}%
                </Progress>
              </div>
              <h3 style={{ textAlign: "center" }}> OR </h3>
              <div className="form-group">
                <label>Add YouTube Video URL </label>
                <input
                  type="text"
                  placeholder="ex: https://www.youtube.com/embed/yO7Q3YWzY"
                  className="form-control"
                  value={youtubelink}
                  onChange={onChangeYouTubeLink}
                />
              </div>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={onClickHandler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
