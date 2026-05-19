//  ScorePage.jsx
import { useEffect, useState } from "react";

function ScorePage() {
    // 성적 등록 state
    const [studentId, setStudentId]= useState("");
    const [pythonScore, setPythonScore] = useState("");
    const [numpyScore, setNumpyScore] = useState("");
    const [pandasScore, setPandasScore]=useState("");
    const [javaScore, setJavaScore] = useState("");
    const [projectScore, setProjectScore] = useState("");

    // 성적목록 state
    const [students, setStudents] = useState([]);
    const [scores, setScores] = useState([]);

    const API_URL = "http://localhost:8000";

    //등록된 학생 전체 조회
    const getStudents = async () => {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        setStudents(data);
    };

    // 등록된 성적 목록 조회
    const getScores = async () => {
        const response = await fetch(`${API_URL}/scores`);
        const data = await response.json();
        setScores(data);
    }

    // 성적 저장하기 
    const addScore = async () => {
        if( studentId === "" ){
            alert("학생을 선택하시오"); return;
        }

        const scoreData = {
            student_id: Number(studentId),
            python_score: Number(pythonScore),
            numpy_score: Number(numpyScore),
            pandas_score: Number(pandasScore),
            java_score: Number(javaScore),
            project_score: Number(projectScore)
        };
        const response = await fetch(`${API_URL}/scores`, {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(scoreData)
        });
        const result = await response.json();
        if( !response.ok ){ // 성적 저장 실패
            alert(result.message); return;
        }
        setStudentId("");  setPythonScore("");  setNumpyScore("");
        setPandasScore(""); setJavaScore(""); setProjectScore("");

        getScores(); 
    };

    useEffect( () => {
        getStudents();
        getScores();
    }, [] );

  return (
    <div className="my-4">
      <h1>성적 입력 / 조회</h1>
      <p>학생별 과목 점수를 입력하고 조회할 수 있습니다.</p>

      <section>
        <h2>성적 입력</h2>

        <form className="flex">
          <div>
            <label>학생 선택</label>
            <select className="border  w-30" value={studentId}
            onChange={(e)=>setStudentId(e.target.value)}>
              <option value="">학생을 선택하세요</option>
              { students.map( (std) => (
                <option key={std.id} value={std.id}>
                    {std.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Python 점수</label>
            <input type="number" value={pythonScore}
            onChange={(e)=>setPythonScore(e.target.value)} className="border w-30" />
          </div>

          <div>
            <label>NumPy 점수</label>
            <input type="number" value={numpyScore}
            onChange={(e)=>setNumpyScore(e.target.value)} className="border w-30"/>
          </div>

          <div>
            <label>Pandas 점수</label>
            <input type="number" value={pandasScore}
            onChange={(e)=>setPandasScore(e.target.value)} className="border w-30"/>
          </div>

          <div>
            <label>Java 점수</label>
            <input type="number" value={javaScore}
            onChange={(e)=>setJavaScore(e.target.value)} className="border w-30"/>
          </div>

          <div>
            <label>Project 점수</label>
            <input type="number" value={projectScore}
            onChange={(e)=>setProjectScore(e.target.value)} className="border w-30"/>
          </div>

          <button type="button" onClick={addScore} className="border w-30 bg-green-700 text-white">저장하기</button>
        </form>
      </section>

      <section>
        <h2>성적 목록</h2>

        <div>
          <input type="text" placeholder="이름 검색" />

          <select>
            <option>반 전체</option>
            <option>1반</option>
            <option>2반</option>
          </select>

          <button type="button">조회</button>
        </div>

        <table className="w-[700px]">
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>Python</th>
              <th>NumPy</th>
              <th>Pandas</th>
              <th>Java</th>
              <th>Project</th>
              <th>총점</th>
              <th>평균점수</th>
              <th>등록일</th>
              <th>수정</th>
            </tr>
          </thead>

          <tbody>
            {scores.map( (score) => (
                <tr key={score.id}>
                <td className="text-center">{score.student_id}</td>
                <td className="text-center">{score.student_name}</td>
                <td className="text-center">{score.python_score}</td>
                <td className="text-center">{score.numpy_score}</td>
                <td className="text-center">{score.pandas_score}</td>
                <td className="text-center">{score.java_score}</td>
                <td className="text-center">{score.project_score}</td>
                <td className="text-center">{score.total_score}</td>
                <td className="text-center">{score.avg_score}</td>
                <td className="text-center">{score.create_at}</td>
                <td>
                    <button type="button">수정</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ScorePage;