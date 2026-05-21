//  MainLayout.jsx

import { Link, Outlet } from "react-router-dom";

function MainLayout(){
    return( 
        <div className="flex">
            <aside className="w-45 h-screen bg-slate-800 text-white
            flex flex-col items-center">
                <h2>학생 학습 분석 시스템</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/students">학생관리</Link>
                        </li>
                        <li>
                            <Link to="/scores">성적관리</Link>
                        </li>
                        <li>
                            <Link to="/attend">출결관리</Link>
                        </li>
                        <li>
                            <Link to="/analysis">분석</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;