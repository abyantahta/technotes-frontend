// import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
// import NotesList from './featues/notes/NotesList';
import UsersList from './features/users/UsersList';
// import NotesList from './features/notes/NotesList';
import EditUser from './features/users/EditUser';
import EditNote from './features/notes/EditNote';
import NewUserForm from './features/users/NewUserForm';
import NewNote from './features/notes/NewNote';
import NotesList from './features/notes/NotesList';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import { ROLES } from './config/roles';
import RequireAuth from './features/auth/RequireAuth';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Bengkel Laptop')
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
       {/* PUBLIC ROUTES  */}
        <Route index element={<Public/>}/>
        <Route path='login' element={<Login/>}/>
        {/* PROTECTED ROUTES  */}
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
            <Route element={<Prefetch/>}>
              <Route path='dash' element={<DashLayout/>}>
                <Route index element={<Welcome/>}/>
                
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager]}/>}>
                  <Route path='users'>
                    <Route index element={<UsersList/>}/> 
                    <Route path=':id' element={<EditUser/>}/> 
                    <Route path='new' element={<NewUserForm/>}/> 
                  </Route>
                </Route>

                <Route path='notes'>
                  <Route index element={<NotesList/>}/> 
                  <Route path=':id' element={<EditNote/>}/> 
                  <Route path='new' element={<NewNote/>}/> 
                </Route>

                
              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
