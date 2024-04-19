import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClassCodePage() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [userName, setUserName] = useState("Anonymous");
  const router = useRouter();
  const { classCode } = router.query;

  const fetchQuestions = async () => {
    if (!router.isReady || !classCode) return;

    const response = await fetch(`/api/class-codes/${classCode}/question`);
    const data = await response.json();
    setQuestions(data || []);
  };

  useEffect(() => {
    fetchQuestions();
  }, [router.isReady, classCode]);

  async function submitQuestion(e) {
    e.preventDefault();
    const response = await fetch(`/api/class-codes/${classCode}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionText, name: userName }),
    });
    if (response.ok) {
      setQuestionText(""); // Reset question input
      setUserName("Anonymous"); // Reset user name to default
      // Re-fetch questions to include the new one
      fetchQuestions();
    }
  }

  async function deleteQuestion(questionId) {
    const response = await fetch(
      `/api/class-codes/${classCode}/question/${questionId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // Re-fetch questions after deletion
      fetchQuestions();
    }
  }

  return (
    <div>
      <section className="section">
        <div className="title">Welcome to {classCode}</div>
        <form onSubmit={submitQuestion}>
          <div className="field">
            <label className="label">Question</label>
            <input
              className="input"
              type="text"
              placeholder="Your question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Your Displayed Name</label>
            <input
              className="input"
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="control">
            <button className="button is-primary" type="submit">
              Submit Question
            </button>
          </div>
        </form>
      </section>
      <section className="section">
        {questions.length > 0 ? (
          <div>
            {questions.map((question) => (
              <div className="card mb-6" key={question.id}>
                <header className="card-header">
                  <p className="card-header-title">{question.name}</p>
                </header>
                <div className="card-content">
                  <div className="content is-size-5">{question.question}</div>
                  <div>{new Date(question.createdAt).toLocaleString()}</div>
                  <br />
                  <button
                    className="button is-danger is-small"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no questions yet.</p>
        )}
      </section>
    </div>
  );
}
