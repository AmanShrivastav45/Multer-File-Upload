import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import UploadFiles from '../pages/UploadFiles'
import ViewFiles from '../pages/ViewFiles'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<UploadFiles/>} />
        <Route path='/files' element={<ViewFiles/>} />
      </Routes>
      <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            style: {
              zIndex: 20000,
              border: "1px solid #D1D5DC",
              borderRadius: "4px",
              height: "35px",
              fontSize: "12px",
            },
          }}
        />
    </>
  )
}

export default App
