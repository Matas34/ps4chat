import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

import { IoIosLogOut } from "react-icons/io";
import { UserController } from './.controllers/userController';
import LanguageSelector from './.components/LanguageSelector/LanguageSelector';
import { IoIosLogIn } from "react-icons/io";
import logo from './logo.svg';
import './App.css';

import Landing from './pages/HomePage/homePage';
import Categories from './pages/Categories/categories';
import About from './pages/About/AboutPage';
import ArticleHomePage from './pages/Articles/articleManagementPage';
import Exercise from './pages/Exercise/exercise';
import CreateArticle from './pages/CreatePages/createArticlePage';
import CreateParagraph from './pages/CreatePages/createParagraphPage';
import CreateQuestion from './pages/CreatePages/createQuestionPage';
import EditArticleParagraphQuestion from './pages/EditPages/editAll';
import EditParagraphQuestion from './pages/EditPages/editParagraphQuestionPage';
import EditQuestion from './pages/EditPages/editQuestionPage';
import CreateCategory from './pages/Categories/createCategoryPage';
import SignUpPage from './pages/UserPages/signUpPage';
import LogInPage from './pages/UserPages/logInPage';
import ProfilePage from './pages/UserPages/profilePage';
import ArticleListFromCategory from './pages/Categories/ArticleListFromCategories';
import ArticleUserHomePage from './pages/Articles/articleManagementForUserPage';
import CategoriesUserEditing from './pages/Categories/categoriesForUserPage';

function App() {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await UserController.GetUser();
        setLoggedInUser(user); 
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoggedInUser(null);
      }
    }

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await UserController.Logout();
      setLoggedInUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" style={{ borderRadius: '15px', fontSize: '20px' }} className='navBar'>
        <Navbar.Brand as={Link} to="/" className='siteLogo'>
          <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }}/>
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/" className='siteName'>Speedreader.com</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">{t('homepage.home')}</Nav.Link>
          <Nav.Link as={Link} to="/about">{t('homepage.about')}</Nav.Link>

          {/* {!loggedInUser && <Nav.Link as={Link} to="/sign-up">{t('signup.signUp')}</Nav.Link>}
          {!loggedInUser && <Nav.Link as={Link} to="/log-in">{t('login.logIn')}</Nav.Link>} */}
          {loggedInUser && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}

        </Nav>
        <Nav>
        <Nav>
  {loggedInUser ? (
    <>
    <Nav.Link as={Link} to="/profile" style={{ marginRight: '5px' }}>
      <span style={{color:'var(--color-lime-light)'}}>{loggedInUser.username} <CgProfile data-testid="profile-icon" size={27}/></span> 
    </Nav.Link>
    <div style={{height:"100%", width:"2.5px", backgroundColor:"grey", borderRadius:"10%"}}></div>
    <Nav.Link onClick={handleLogout}>
      {t('homepage.logOut')} <IoIosLogOut className='icon' size={'30px'}/>
    </Nav.Link>
    </>
  ) : (
    <Nav.Link as={Link} to="/log-in">{t('login.logIn')} <IoIosLogIn className='icon' size={'30px'}/>
    </Nav.Link>
  )}

    </Nav>
        </Nav>
        <Nav style={{ marginRight: '10px' }}>
          <LanguageSelector data-testid="language-selector"/>
        </Nav>
      </Navbar>

      <Routes>
        <Route exact path="/" Component={Landing} />
        <Route exact path="/categories" Component={Categories} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/articles" Component={() => <ArticleHomePage loggedInUser={loggedInUser} />} />
        <Route exact path="/user-articles" Component={() => <ArticleUserHomePage loggedInUser={loggedInUser} />} />
        <Route exact path="/exercise" Component={Exercise} />
        <Route exact path="/create-article" Component={CreateArticle} />
        <Route exact path="/create-paragraph" Component={CreateParagraph} />
        <Route exact path="/create-question" Component={CreateQuestion} />
        <Route exact path="/edit-all" Component={EditArticleParagraphQuestion} />
        <Route exact path="/edit-paragraph-question" Component={EditParagraphQuestion} />
        <Route exact path="/edit-question" Component={EditQuestion} />
        <Route exact path="/create-category" Component={CreateCategory} />
        <Route exact path="/user-categories" Component={CategoriesUserEditing} />
        <Route exact path="/sign-up" Component={SignUpPage} />
        <Route exact path="/log-in" Component={LogInPage} />
        <Route exact path="/profile" Component={() => <ProfilePage loggedInUser={loggedInUser} />}/>
        <Route exact path="/category" Component={ArticleListFromCategory} />
      </Routes>


    </Container>
  );
}

export default App;
