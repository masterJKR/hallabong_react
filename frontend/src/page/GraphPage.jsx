
import { useState , useEffect } from "react";

function GraphPage(){
    const [ summary , setSummary] = useState(null);
    const requestGraph = async () => {
        const res = await fetch("http://localhost:8000/analysis/graph-summary")
        const data = await res.json();
        setSummary(data);
    }

    useEffect(() => { requestGraph(); },[])

    return(
        <div>
            <h2>성적 & 출석 그래프</h2>
            <div className="flex gap-3">
                <section>
                    <h2>성적 분포 그래프</h2>
                    <img width="400" src="http://localhost:8000/analysis/score-graph" />
                    <div className="flex justify-between">
                        <p>평균점수<br/> {summary ? summary.avg_score :0}</p>
                        <p>최고점수<br/>{summary ? summary.max_score:0}</p>
                        <p>최저점수<br/>{summary ? summary.min_score:0}</p>
                        <p>표준편차<br/>{summary ? summary.std_score:0}</p>
                    </div>
                </section>
                <section>
                    <h2>출석률 분포 그래프</h2>
                    <img width="400" src="http://localhost:8000/analysis/attend-graph" />
                    <div className="flex justify-between">
                        <p>평균출석률<br/>{summary ? summary.avg_attend_rate:0}</p>
                        <p>최고출석률<br/>{summary ? summary.max_rate:0}</p>
                        <p>최저출석률<br/>{summary ? summary.min_rate:0}</p>
                        <p>표준편차<br/>{summary ? summary.std_rate:0}</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default GraphPage;