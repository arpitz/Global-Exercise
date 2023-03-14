import { useState } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import "./AddStation.css";
import { Link } from "react-router-dom";

interface AddNewStationType {
  name?: string;
  tagline?: string;
  logo?: string;
}

const AddStationComponent = () => {
  const initialState = {
    name: "",
    tagline: "",
    logo: "",
  };
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const sanitize = (values: AddNewStationType) => {
    const sanitizedObj: AddNewStationType = {};
    for (const prop in values) {
      sanitizedObj[prop as keyof AddNewStationType] = sanitizeHtml(
        values[prop as keyof AddNewStationType] || ""
      );
    }
    return sanitizedObj;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      // To sanitize and clean the inputs entered by the user
      // To prevent any malicious code or XSS attacks
      const sanitizedData = sanitize(formValues);
      // To post the form data to server where a new station can be added to the database
      const res = await axios.post(`post_endpoint/`, { ...sanitizedData });
    } catch (error) {
      console.log(error);
    }
    console.log(formValues);
  };

  return (
    <>
      <h2>Add New Station</h2>
      <Link to='/' className='float-start'>
        {"< Back"}
      </Link>
      <form>
        <div className='form-group mt-4'>
          <label htmlFor='name' className='float-start'>
            Station Name
          </label>
          <input
            className='form-control'
            id='name'
            name='name'
            placeholder='Enter station name'
            value={formValues["name"]}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-4'>
          <label htmlFor='tagline' className='float-start'>
            Tag Line
          </label>
          <input
            className='form-control'
            id='tagline'
            name='tagline'
            placeholder='Tagline'
            value={formValues["tagline"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group mt-4'>
          <label htmlFor='logo' className='float-start'>
            Logo url
          </label>
          <input
            name='logo'
            className='form-control'
            id='logo'
            aria-describedby='logo'
            placeholder='Enter logo url'
            value={formValues["logo"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary mt-3'
          onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddStationComponent;
