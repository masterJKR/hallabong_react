import { useState, useEffect } from 'react'
import StudentPage from './page/StudentPage'
import ScorePage from './page/ScorePage'
import AttendPage from './page/AttendPage'
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
    <>
      <h1>학생 학습 분석 리포트 시스템</h1>
      <StudentPage students={students} getStudents={getStudents}/>
      <ScorePage  students={students}/>
      <AttendPage  students={students}/>
    </>
  )
}

export default App
