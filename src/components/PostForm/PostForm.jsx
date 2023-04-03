import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getPosition, postUser, fetchUsers } from '../../Api/Api';
import succesImage from '../../images/success-image.png';
import scrollToSection from '../../hooks/ScrollToSection';

const FILE_SIZE = 70 * 70 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Username should contain 2-60 characters')
    .max(60, 'Username should contain 2-60 characters')
    .required('Required'),
  email: Yup.string()
    .trim()
    .min(2, 'Username should contain 2-100 characters')
    .max(100, 'Username should contain 2-100 characters')
    .email('User email, must be a valid email according to RFC2822')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      {
        message: 'User email, must be a valid email according to RFC2822',
      }
    )
    .required('Required'),
  phone: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
  photo: Yup.mixed()
    .required('A file is required')
    .test(
      'fileSize',
      'File too large',
      value => value && value.size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'The photo format must be jpeg/jpg type',
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export default function PostForm({ postUsers }) {
  const [position, setPosition] = useState([]);
  const [succesSignUp, setSuccesSignUp] = useState(false);

  useEffect(() => {
    const getAllPosition = async () => {
      try {
        const res = await getPosition();
        const positions = res.positions;
        setPosition(positions);
      } catch (error) {
        console.log('error', error);
      }
    };
    getAllPosition();
  }, []);
  return (
    <section id="postForm">
      {succesSignUp ? (
        <div className="container succes-block">
          <h2 className="title">User successfully registered</h2>
          <img
            src={succesImage}
            alt="successfully registered"
            width="300px"
            height="300px"
          />
        </div>
      ) : (
        <div className="container ">
          <h2 className="title">Working with POST request</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              position: '',
              photo: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('email', values.email);
              formData.append('phone', values.phone);
              formData.append('position_id', values.position);
              formData.append('photo', values.photo);

              try {
                await postUser(formData);
              } catch (error) {
                console.log('error', error);
              } finally {
                setSuccesSignUp(true);
                const response = await fetchUsers();
                postUsers(response.users);
                scrollToSection('users');
              }
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="form">
                <div className="input-group">
                  <Field
                    className={`input ${
                      errors.name && touched.name ? 'error' : ''
                    } `}
                    type="name"
                    name="name"
                    placeholder=" "
                  />
                  <label className="placeholder" htmlFor="">
                    Your name
                  </label>
                  {errors.name && touched.name ? (
                    <p className="error-text">{errors.name}</p>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field
                    className={`input ${
                      errors.email && touched.email ? 'error' : ''
                    } `}
                    type="email"
                    name="email"
                    placeholder=" "
                  />
                  <label className="placeholder" htmlFor="">
                    Email
                  </label>
                  {errors.email && touched.email ? (
                    <p className="error-text">{errors.email}</p>
                  ) : null}
                </div>
                <div className="input-group">
                  <Field
                    className={`input ${
                      errors.phone && touched.phone ? 'error' : ''
                    } `}
                    type="number"
                    name="phone"
                    placeholder=" "
                  />
                  <label className="placeholder" htmlFor="">
                    Phone
                  </label>
                  {!errors.phone && (
                    <p className="exampleText">+38 (XXX) XXX - XX - XX</p>
                  )}
                  {errors.phone && touched.phone ? (
                    <p className="error-text">{errors.phone}</p>
                  ) : null}
                </div>
                <p className="form_radio-title">Select your position</p>
                <div
                  role="group"
                  aria-labelledby="position_id"
                  className="form_radio-box"
                >
                  {position.map(position => (
                    <div key={position.id} className="radio-container">
                      <Field
                        className="form_radio"
                        type="radio"
                        name="position"
                        id={position.id}
                        value={position.id}
                        onChange={() => setFieldValue('position', position.id)}
                      />
                      <label className="radio-label" htmlFor={position.id}>
                        {position.name}
                      </label>
                    </div>
                  ))}
                  {errors.position && touched.position ? (
                    <p className="position-error">{errors.position}</p>
                  ) : null}
                </div>
                <div className="input__wrapper">
                  <Field
                    className="input__file"
                    type="file"
                    value=""
                    name="photo"
                    id="input__file"
                    onChange={event => {
                      const file = event.currentTarget.files[0];
                      setFieldValue('photo', file);
                    }}
                  />
                  <label htmlFor="input__file" className="input__file-button">
                    <span
                      className={`input__file-icon-wrapper ${
                        errors.photo && touched.photo ? 'photo-error' : ''
                      } `}
                    >
                      Upload
                    </span>
                    <span
                      className={`input__file-button-text ${
                        errors.photo && touched.photo ? 'photo-error' : ''
                      } `}
                    >
                      {values.photo ? (
                        <p>{values.photo.name}</p>
                      ) : (
                        <p>Upload your photo</p>
                      )}
                    </span>
                  </label>
                </div>
                {errors.photo && touched.photo ? (
                  <p className="photo-validation">{errors.photo}</p>
                ) : null}
                {values.email &&
                values.name &&
                values.phone &&
                values.photo &&
                values.position ? (
                  <button className="btn_form yellow_mod" type="submit">
                    Sign up
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn_form disable_mod"
                    type="submit"
                  >
                    Sign up
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </section>
  );
}
