import * as db from "../../../../../services/database.mjs";

export default async function handler(req, res) {
  const {
    query: { classCode },
  } = req;

  if (req.method === "POST") {
    const { question, name } = req.body;

    const newQuestion = await db.createQuestionForClassCode(classCode, {
      question,
      name,
    });

    if (!newQuestion) {
      return res.status(404).send("Class code not found");
    }

    res.status(201).json(newQuestion);
  } else if (req.method === "GET") {
    const questions = await db.getQuestions(classCode);

    if (!questions) {
      return res.status(404).send("Class code not found");
    }

    res.status(200).json(questions);
  } else if (req.method === "DELETE") {
    // DELETE /api/class-codes/:class-codes/question/:question-id returns 200 when a question is deleted
    const { questionId } = req.query;

    await db.deleteQuestion(questionId);

    return res.status(200).send();
  } else {
    return res.status(405).send();
  }
}
