import { useEffect, useState } from 'react';

function Admin() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/submissions")
            .then(res => res.json())
            .then(data => setSubmissions(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="etusivu-esittely">
            <h2>Tallennetut lomakkeet</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#228B22', color: 'white' }}>
                        <th>Nimi</th>
                        <th>Sähköposti</th>
                        <th>Ikä</th>
                        <th>Päivä</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #ccc' }}>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.age}</td>
                            <td>{s.submission_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Admin;