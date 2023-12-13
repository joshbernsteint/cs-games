import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Nav, Navbar, Container, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import navStyles from './navstyles.module.css';

import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Questions from './components/Questions';
import axios from 'axios';
import Teams from './components/Team';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [teamData, setTeamData] = useState(undefined);




  return (
    <div className="App">

  
      <Router>
      <Navbar expand="lg" className={`${navStyles.main}`} sticky="top">
                    <Navbar.Brand style={{paddingLeft: ".5rem", color: "white", fontSize: "24pt"}}>
                      CS Games!
                    </Navbar.Brand>
                    {/* <Navbar.Toggle /> */}
                    {/* <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to="/" className={`${navStyles.nav_items}`}>Home</Nav.Link>
                            {
                              (username === "admin") ? (
                                <Nav.Link as={Link} to="/admin" className={`${navStyles.nav_items}`}>Admin Page
                                </Nav.Link>
                              ) : (<></>)
                            }
                        </Nav>
                    </Navbar.Collapse> */}

                    {/* Right aligned content */}
                    <Navbar.Collapse className="justify-content-end" style={{paddingRight: "1rem"}}>
                      
                        {(!isLoggedIn) ? 
                        (<Nav>
                            <Nav.Link className={`${navStyles.nav_items}`} style={{"justifyContent": "end"}} as={Link} to="/login">Login</Nav.Link>
                        </Nav>) : 
                        (<Nav>
                          <Nav.Link as={Link} to="/" className={`${navStyles.nav_items}`}>Home</Nav.Link>
                          {
                            (username === "admin") ? (
                              <Nav.Link as={Link} to="/admin" className={`${navStyles.nav_items}`}>Admin Page
                              </Nav.Link>
                            ) : (<></>)
                          }
                          <Nav.Link as="button" className={`${navStyles.nav_items}`} onClick={() => {
                            setUsername(undefined);
                            setTeamData(undefined);
                            setLoggedIn(false);
                          }}>Logout</Nav.Link>
                      </Nav>)
                        }
                        {
                          (teamData) ? (<><b>Team: </b> &nbsp; {teamData.teamName}
                          </>) : (<></>)
                        }
                    </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Questions setQuestions={setQuestions} questions={questions} teamData={teamData}/>}/>
          <Route exact path="/teams" element={<Teams username={username} setTeamData={setTeamData} teamData={teamData}/>}/>
          <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} setTeamData={setTeamData}/>}/>
          <Route exact path="/register" element={<Register setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
          <Route exact path="/admin" element={<Admin username={username}/>}/>
          <Route exact path="*" element={<>No</>}/>


        </Routes>
      </Router>


    </div>
  );
}

export default App;
