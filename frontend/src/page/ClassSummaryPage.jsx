// ClassSummaryPage.jsx
import { useState } from "react";


function ClassSummaryPage() {
    const [summary, setSummary] = useState(null);

    const requestAnalysis = async () =>{
        const response = await fetch("http://localhost:8000/analysis/class-summary");
        const data = await response.json();
        if (!response.ok){  // 요청에 오류가 있다면
            alert(data);
            return;
        }
        setSummary(data);    
    };

  return (
    <div>
      <h1>반 전체 통계</h1>
      <p>반 전체 학습 데이터를 기반으로 통계 정보를 확인합니다.</p>

      <section className="flex justify-around">
        <h2>분석 조건</h2>

        <div>
          <label>반 선택</label>
          <select>
            <option>1반</option>
            <option>2반</option>
          </select>
        </div>

        <button type="button" onClick={requestAnalysis}>분석 실행</button>
      </section>

      <section  className="flex justify-around">
        <h2>요약 통계</h2>

        <div>
          <h3>전체 학생 수</h3>
          <p>{summary ? summary.total_student : 0 } 명</p>
        </div>

        <div>
          <h3>반 평균 점수</h3>
          <p>{summary ? summary.avg_score:0} 점</p>
        </div>

        <div>
          <h3>평균 출석률</h3>
          <p>{summary ? summary.avg_attend_rate:0}% </p>
        </div>
      </section>

      <section>
        <h2>과목별 최고점 / 최저점</h2>

        <table>
          <thead>
            <tr>
              <th>과목</th>
              <th>최고 점수</th>
              <th>최저 점수</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Python</td>
              <td>{summary ? summary.python_max: 0}</td>
              <td>{summary ? summary.python_min:0}</td>
            </tr>

            <tr>
              <td>NumPy</td>
              <td>{summary ? summary.numpy_max:0}</td>
              <td>{summary ? summary.numpy_min:0}</td>
            </tr>

            <tr>
              <td>Pandas</td>
              <td>{summary ? summary.pandas_max:0}</td>
              <td>{summary ? summary.pandas_min:0}</td>
            </tr>

            <tr>
              <td>Java</td>
              <td>{summary ? summary.java_max:0}</td>
              <td>{summary ? summary.java_min:0}</td>
            </tr>

            <tr>
              <td>Project</td>
              <td>{summary ? summary.project_max:0}</td>
              <td>{summary ? summary.project_min:0}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ClassSummaryPage;