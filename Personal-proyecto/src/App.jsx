import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/registerPage";
import LoginPage from './pages/loginPage';
import { Home } from './pages/HomePage';
import { TaskR } from './pages/TaskPage';
import { Taskf } from './pages/TaskForm';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';

import { taskProvider } from './context/Taskcontext';

function App() {
  return(
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<di>home</di>}/>
          <Route path='/login' element={<LoginPage/>}/> 
          <Route path='/register' element={<RegisterPage/>}/>  
          
          <Route element={<ProtectedRoute/>}>  
            <Route path='/tasks' element={<TaskR/>}/>    
            <Route path='/add-task' element={<Taskf/>}/>    
            <Route path='/tasks/:id' element={<Home/>}/>    
            <Route path='/profile' element={<Profile/>}/>           
          </Route>
        </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;