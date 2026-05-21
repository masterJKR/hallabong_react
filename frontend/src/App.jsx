import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import StudentPage from './page/StudentPage'
import ScorePage from './page/ScorePage'
import AttendPage from './page/AttendPage'
import MainLayout from './layout/MainLayout'
import Analysis from './page/Analysis'

function DashBoard(){
  return(
    <div>
      <h1>대시보드 이지만....</h1>
      <p>학생 학습 분석을 위한 사이트 입니다.</p>
    </div>
  );
}

function App() {
  const [ students, setStudents] =useState([]);
  const getStudents = async () => {
        const response = await fetch("http://localhost:8000/students");
        const data = await response.json();
        setStudents(data);
  }
  useEffect( ()=> {
        getStudents();
    }, [] );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>} >
          <Route path="/" element={ <DashBoard/> }/>
          <Route path="/students" element={ <StudentPage students={students} getStudents={getStudents}/> }/>
          <Route path="/scores" element={ <ScorePage  students={students}/> }/>
          <Route path="/attend" element={<AttendPage  students={students}/>} />
          <Route path="/analysis" element={ <Analysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
