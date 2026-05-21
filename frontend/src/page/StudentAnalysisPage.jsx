//  StudentAnalysisPage.jsx

import { useEffect, useState } from "react";

function StudentAnalysisPage(){
    const[dangerStd, setDangerStd] = useState([]);
    const [excellentStd , setExcellentStd] = useState([]);

    const getAnalysis = async () =>{
        const response = await fetch(
            "http://localhost:8000/analysis/student-status");
        const data = await response.json();
        setDangerStd(data.danger_std);
        setExcellentStd(data.excellent_std);
    };

    useEffect( ()=>{
        getAnalysis();
    }, []);

    return(
        <div>
            <section>
                <h2>관리 학생</h2>
                <table>
                    <tr>
                        <th>이름</th>
                        <th>평균점수</th>
                        <th>출석률</th>
                        <th>상태</th>
                    </tr>
                    { dangerStd.map( (std) => (
                    <tr>
                        <td>{std.name}</td>
                        <td>{std.avg_score}</td>
                        <td>{std.attend_rate}</td>
                        <td>{std.status}</td>
                    </tr>
                    ))}
                </table>
            </section>
            <section>
                <h2>우수 학생</h2>
                <table>
                    <tr>
                        <th>이름</th>
                        <th>평균점수</th>
                        <th>출석률</th>
                        <th>상태</th>
                    </tr>
                    { excellentStd.map( (std) => (
                    <tr>
                        <td>{std.name}</td>
                        <td>{std.avg_score}</td>
                        <td>{std.attend_rate}</td>
                        <td>{std.status}</td>
                    </tr>
                    ))}
                </table>
            </section>
        </div>
    )
}

export default StudentAnalysisPage;