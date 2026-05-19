import { useState } from 'react'
import StudentPage from './page/StudentPage'
import ScorePage from './page/ScorePage'
import AttendPage from './page/AttendPage'
function App() {
  
  return (
    <>
      <h1>학생 학습 분석 리포트 시스템</h1>
      <StudentPage />
      <ScorePage />
      <AttendPage />
    </>
  )
}

export default App
