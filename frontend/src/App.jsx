// import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from './components/UploadPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path='/upload' element={<UploadPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
