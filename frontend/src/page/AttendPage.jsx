import { useEffect, useState } from "react";

function AttendPage() {
  const [students, setStudents] = useState([]);
  const [attendList, setAttendList] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [attend, setAttend] = useState("");
  const [late, setLate] = useState("");
  const [absent, setAbsent] = useState("");
  const [earlyLeave, setEarlyLeave] = useState("");

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    getStudents();
    getAttendList();
  }, []);

  const getStudents = async () => {
    const response = await fetch(`${API_URL}/students`);
    const data = await response.json();
    setStudents(data);
  };

  const getAttendList = async () => {
    const response = await fetch(`${API_URL}/attend`);
    const data = await response.json();
    setAttendList(data);
  };

  const saveAttend = async () => {
    const requestData = {
      student_id: Number(studentId),
      attend: Number(attend),
      late: Number(late),
      absent: Number(absent),
      early_leave: Number(earlyLeave),
    };

    const response = await fetch(`${API_URL}/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    alert(data.message);

    setStudentId("");
    setAttend("");
    setLate("");
    setAbsent("");
    setEarlyLeave("");

    getAttendList();
  };

  const totalCount =
    Number(attend) + Number(late) + Number(absent) + Number(earlyLeave);

  const attendanceRate =
    totalCount === 0 ? 0 : ((Number(attend) / totalCount) * 100).toFixed(1);

  return (
    <div>
      <h1>출석 입력 / 조회</h1>
      <p>학생별 출석, 지각, 결석, 조퇴 횟수를 입력하고 출석률을 확인할 수 있습니다.</p>

      <section>
        <h2>출석 정보 입력</h2>

        <div>
          <label>학생 선택</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">학생을 선택하세요</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>출석 횟수</label>
          <input
            type="number"
            value={attend}
            onChange={(e) => setAttend(e.target.value)}
          />
        </div>

        <div>
          <label>지각 횟수</label>
          <input
            type="number"
            value={late}
            onChange={(e) => setLate(e.target.value)}
          />
        </div>

        <div>
          <label>결석 횟수</label>
          <input
            type="number"
            value={absent}
            onChange={(e) => setAbsent(e.target.value)}
          />
        </div>

        <div>
          <label>조퇴 횟수</label>
          <input
            type="number"
            value={earlyLeave}
            onChange={(e) => setEarlyLeave(e.target.value)}
          />
        </div>

        <div>
          <p>출석률</p>
          <strong>{attendanceRate}%</strong>
        </div>

        <button type="button" onClick={saveAttend}>
          저장하기
        </button>
      </section>

      <section>
        <h2>출석 목록</h2>

        <button type="button" onClick={getAttendList}>
          조회
        </button>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>학생ID</th>
              <th>이름</th>
              <th>출석</th>
              <th>지각</th>
              <th>결석</th>
              <th>조퇴</th>
              <th>전체 출결 횟수</th>
              <th>출석률</th>
            </tr>
          </thead>

          <tbody>
            {attendList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.student_id}</td>
                <td>{item.student_name}</td>
                <td>{item.attend}</td>
                <td>{item.late}</td>
                <td>{item.absent}</td>
                <td>{item.early_leave}</td>
                <td>{item.total_count}</td>
                <td>{item.attendance_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AttendPage;