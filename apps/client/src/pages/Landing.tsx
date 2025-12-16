import { useNavigate } from "react-router-dom";

export default function Landing() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Landing</h1>
            <button className="bg-black text-white p-3 rounded-md hover:cursor-pointer" onClick={() => navigate('/login')}>Book an appointment</button>
        </div>
    );
}