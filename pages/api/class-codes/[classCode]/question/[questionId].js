import * as db from "../../../../../services/database.mjs";

export default async function handler(req, res) {
  const {
    query: { questionId },
  } = req;

  if (req.method === "DELETE") {
    // DELETE /api/class-codes/:class-codes/question/:question-id returns 200 when a question is deleted
    await db.deleteQuestion(questionId);

    return res.status(200).send();
  } else {
    return res.status(405).send(req.query);
  }
}
