import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const ShowCat = (props) => (
  <option key={props.todo._id} value={props.todo.categoryName}>
    {props.todo.categoryName}
  </option>
);

const AddCourse = (props) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseMap, setCourseMap] = useState("");
  const [banner, setBanner] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [instructor] = useState(props.match.params.id);
  const [category, setCategory] = useState("");
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://pedu-ibrahimecste.vercel.app/categories/")
      .then((response) => {
        setTodos(response.data);
        setCategory(response.data[0].categoryName);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const CatList = () => {
    return todos.map((currentTodo, i) => {
      return <ShowCat todo={currentTodo} key={i} />;
    });
  };

  const onChangeCourseName = (e) => {
    setCourseName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setCourseDescription(e.target.value);
  };

  const onChangeCourseMap = (e) => {
    setCourseMap(e.target.value);
  };
  const onChangeBanner = (e) => {
    setBanner(e.target.value);
  };
  const onChangeCourseOldPrice = (e) => {
    setOldPrice(e.target.value);
    //console.log(e.target.value)
  };

  const onChangeCourseNewPrice = (e) => {
    setNewPrice(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(`Form submitted:`);
    // console.log(`Todo name: ${courseName}`);
    // console.log(`Todo description: ${courseDescription}`);
    // console.log(`Todo instructor: ${instructor}`);
    // console.log(`Todo category: ${category}`);

    const newTodo = {
      courseName: courseName,
      courseDescription: courseDescription,
      courseMap:courseMap,
      oldPrice:oldPrice,
      newPrice:newPrice,
      banner:banner,
      instructor: props.match.params.id,
      category: category,
    };
    console.log(newTodo);

    axios.post("https://pedu-ibrahimecste.vercel.app/course/add", newTodo)
    .then((result) => {
      props.history.push("/add-lecture/" + props.match.params.id);
      console.log(result)
    });
  };

  const message = "You selected " + category;
 

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Add Course</h1>
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="coursename"
                  placeholder="Enter Course name"
                  value={courseName}
                  onChange={onChangeCourseName}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter Description"
                  value={courseDescription}
                  onChange={onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>Course Map</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="coursemap"
                  placeholder="Enter Course Map"
                  value={courseMap}
                  onChange={onChangeCourseMap}
                />
              </div>
              <div className="form-group">
                <label>Banner</label>
                <input
                  type="text"
                  className="form-control"
                  name="banner"
                  placeholder="Enter Banner Link"
                  value={banner}
                  onChange={onChangeBanner}
                />
                
              </div>
              <div className="form-group">
                <label>Old Fee</label>
                <input
                  type="text"
                  className="form-control"
                  name="oldFee"
                  placeholder="Enter Old Price"
                  value={oldPrice}
                  onChange={onChangeCourseOldPrice}
                />
                
              </div>
              <div className="form-group">
                <label>New Fee</label>
                <input
                  type="text"
                  className="form-control"
                  name="newFee"
                  placeholder="Enter New Price"
                  value={newPrice}
                  onChange={onChangeCourseNewPrice}
                />
                
              </div>
              <div>
                <label>Course Category</label>
                <br />
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                  name="category"
                  onChange={onChangeCategory}
                  value={category}
                >
                  {CatList()}
                </select>
              </div>
              <p>{message}</p>
              <br />
              <button
                type="submit"
                value="add course"
                className="btn btn-lg btn-primary btn-block mb-3"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
