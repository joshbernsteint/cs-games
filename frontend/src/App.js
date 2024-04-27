import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Nav, Navbar, Container, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
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

  function Proxy(){
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(undefined);
    const [questions, setQuestions] = useState([]);
    const [teamData, setTeamData] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
      async function getUserData(){
        if(isLoggedIn && username){
            // Get team data
            const team_data = await axios.post('/api/teams/get_user', {username: username});
            if(!team_data.data.error){
              setTeamData(team_data.data);
              navigate('/');
            }
            else{
              navigate("/teams")
            }
        }
        else{
          const {data} = await axios.get('/api/get_data');
          if(data.loggedIn){
            setUsername(data.username);
            setLoggedIn(true);
          }
          else{
            navigate('/login');
          }
        }
      }
      getUserData();
    }, [isLoggedIn, username]);


    return (
      <div>
              <Navbar expand="lg" className={`${navStyles.main}`} sticky="top">
                    <Navbar.Brand style={{paddingLeft: ".5rem", color: "white", fontSize: "24pt"}}>
                      CS Games!
                    </Navbar.Brand>

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
                          <Nav.Link as="button" className={`${navStyles.nav_items}`} onClick={async () => {
                            setUsername(undefined);
                            setTeamData(undefined);
                            setLoggedIn(false);
                            await axios.get('/api/logout');
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
      </div>
    )
  }

  return (
    <div className="App">

  
      <Router>
          <Proxy />
      </Router>


    </div>
  );
}

export default App;
