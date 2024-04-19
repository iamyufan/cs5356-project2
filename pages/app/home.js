import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [classCodes, setClassCodes] = useState([]);

  const fetchClassCodes = async () => {
    const response = await fetch("/api/class-codes");
    const data = await response.json();
    setClassCodes(data);
  };

  const onCreateClassCodeSubmitted = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const classCode = formData.get("classCode");
    const response = await fetch("/api/class-codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: classCode }),
    });
    if (response.ok) {
      fetchClassCodes();
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  useEffect(() => {
    fetchClassCodes();
  }, []);

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <section className="section">
        <div className="title">Welcome back, {session.user.name}</div>
        <form
          onSubmit={(event) => {
            onCreateClassCodeSubmitted(event);
          }}
        >
          <div className="field">
            <label className="label">Create Class Code</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="classCode"
                placeholder="Class Code"
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-primary">Create</button>
          </div>
        </form>
      </section>
      <section className="section">
        <div className="title is-5">View Class Codes</div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Class Code</th>
              <th>Created At</th>
              <th>Question Count</th>
            </tr>
          </thead>
          <tbody>
            {classCodes.map((classCode) => (
              <tr key={classCode.id}>
                <td>
                  <a href={`/app/${classCode.id}`}>{classCode.id}</a>
                </td>
                <td>{new Date(classCode.createdAt).toLocaleString()}</td>
                <td>{classCode.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
