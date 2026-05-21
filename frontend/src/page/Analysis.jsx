//  Analysis.jsx
import ClassSummaryPage from "./ClassSummaryPage";
import StudentAnalysisPage from "./StudentAnalysisPage";
import GraphPage from "./GraphPage";


function Analysis(){
    const downloadReport = async () =>{
        const res = await fetch("http://localhost:8000/analysis/report");
        if( !res.ok ) {
            alert("리포트 생성 실패"); return;
        }
        const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href= url;
        link.download = "학생_학습_분석_리포트.pdf";

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    };

    return(
        <>
            <ClassSummaryPage />
            <hr/>
            <StudentAnalysisPage/>
            <hr/>
            <GraphPage/>
            <section className="m-3">
                <h2> 리포트 출력 </h2>
                <p> 위 분석 결과를 pdf 리포트로 다운로드 합니다.</p>
                <button className="border bg-green-600 text-white px-2"
                type="button" onClick={downloadReport}>
                    PDF 다운로드
                </button>
            </section>
        </>
    );
}
export default Analysis;