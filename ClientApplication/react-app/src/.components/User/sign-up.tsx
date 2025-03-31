import React, { useState } from 'react';
import { Button, Form, Image, Col, Row } from 'react-bootstrap';
import NoImage from '../../no-image.png';
import ErrorPopup from '../.common-components/ErrorPopup';
import SuccessPopup from '../.common-components/SuccessPopup';
import { useTranslation } from 'react-i18next';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Link } from 'react-router-dom';
import { UserController } from '../../.controllers/userController';
import { User } from '../../.entities/.MainEntitiesExport';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    imageFile: null,
    imageFileUrl: NoImage,
  });

  const [validated, setValidated] = useState(false);

  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

  // Handle input changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          imageFile: file,
          imageFileUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Check if passwords match
    if (user.password !== user.passwordRepeat) {
      setErrorMessage(t('signup.passwordsDoNotMatch'));
      setShowErrorModal(true);
      return;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      console.log(user);
      let myUser = new User();
      myUser.username = user.username;
      myUser.email = user.email;
      myUser.password = user.password;
      await UserController.Post(myUser);
      await UserController.Login(myUser);


      setSuccessMessage(t('signup.successMessage'));
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };

  // Function to close the error modal
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/categories'); 
    window.location.reload();
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formUsername" className="input">
              <Form.Label>{t('signup.username')}</Form.Label>
              <Form.Control
                name="username"
                value={user.username}
                autoComplete="off"
                placeholder={t('signup.enterUsername')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                required
                type="text"
                //minLength={ValidationConstants.MinUsernameLength}
                //maxLength={ValidationConstants.MaxUsernameLength}
                //pattern={ValidationPatternConstants.UsernamePattern.source}
              />
              <Form.Control.Feedback type="invalid">
                {t('signup.plsEnterUsername')}.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="input">
              <Form.Label>{t('signup.email')}</Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                autoComplete="off"
                placeholder={t('signup.enterEmail')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                required
                type="email"
                //pattern={ValidationPatternConstants.EmailPattern.source}
              />
              <Form.Control.Feedback type="invalid">
                {t('signup.plsEnterValidEmail')}.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="input">
              <Form.Label>{t('signup.password')}</Form.Label>
              <Form.Control
                name="password"
                value={user.password}
                autoComplete="off"
                placeholder={t('signup.enterPassword')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                required
                type="password"
                //minLength={ValidationConstants.MinPasswordLength}
                //maxLength={ValidationConstants.MaxPasswordLength}
              />
              <Form.Control.Feedback type="invalid">
                {t('signup.plsEnterPassword')}.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPasswordRepeat" className="input">
              <Form.Label>{t('signup.passwordRepeat')}</Form.Label>
              <Form.Control
                name="passwordRepeat"
                value={user.passwordRepeat}
                autoComplete="off"
                placeholder={t('signup.repeatPassword')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                required
                type="password"
                //minLength={ValidationConstants.MinPasswordLength}
                //maxLength={ValidationConstants.MaxPasswordLength}
              />
              <Form.Control.Feedback type="invalid">
                {t('signup.plsRepeatPassword')}.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
          <div style={{width:'100%', textAlign:'center'}}>
            <Form.Label>{t('signup.profilePicture')}</Form.Label>
            <span style={{color:'grey'}}>{' ('}{t('signup.optional')}{')'}</span>
          </div>
            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px' }}
            >
              <Image height="200" src={user.imageFileUrl} alt="Profile Image" />
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px' }}
            >
              <input
                className="form-control darkInput"
                type="file"
                onChange={handleFileUpload}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          className="buttons pink"
          type="submit"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {t('login.signUp')}
        </Button>

        <Row style={{ marginTop: '25px' }}>
         <Col style={{ textAlign: 'center', color: 'grey' }}>
          {t('signup.alreadyHaveAnAccount')}?{' '}
          <Link to="/log-in" style={{ color: 'var(--color-blue-light)', textDecoration: 'none' }}>
            {t('login.logIn')}
          </Link>
         </Col>
        </Row>
      </Form>

      {/* Error Popup */}
      <ErrorPopup
        showErrorModal={showErrorModal}
        errorMessage={errorMessage}
        onClose={closeErrorModal}
      />

      {/* Success Popup */}
      <SuccessPopup
        showCreateModal={showSuccessModal}
        message={successMessage}
        onClose={closeSuccessModal}
      />
    </>
  );
};

export default SignUp;
