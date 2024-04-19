import { getServerSession } from "next-auth/next";
import * as db from "../../services/database.mjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (req.method === "GET") {
    // GET /api/class-codes returns 401 when user is not logged in
    if (!session) {
      return res
        .status(401)
        .send("You must be signed in to view the class codes.");
    }

    // GET /api/class-codes returns 200 with empty classes for signed in users
    return res.status(200).send(await db.getClassCodes(session.user.name));
  } else if (req.method === "POST") {
    // POST /api/class-codes returns 401 when user is not logged in
    if (!session) {
      return res
        .status(401)
        .send("You must be signed in to create a class code.");
    }

    // POST /api/class-codes returns 400 when name field is missing
    if (!req.body.id) {
      return res.status(400).send("Class code must have an id.");
    }

    // POST /api/class-codes returns 201 when a class is created for current user
    const newClassCode = await db.createClassCode({
      id: req.body.id,
      owner: session.user.name,
    });
    return res.status(201).send(newClassCode);
  } else {
    res.status(405).send();
  }
}
