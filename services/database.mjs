import fsPromises from "fs/promises";

/*
CS5356 TODO 2a. Data Model

Fill in the methods below that will create,
read, update, and delete data.

All the data will be stored in ./db.json so you can view
what your data looks like locally.
*/

export const openDb = async () => {
  // CS5356 TODO 2a Set the initial structure of your database here
  // @type {dbObject}
  let dbObject = {
    // Fill in collections
    classCodes: [],
  };

  // Don't edit below this line.
  try {
    const text = await fsPromises.readFile("./db.json");
    return JSON.parse(text);
  } catch (err) {
    await saveData(dbObject);
    return dbObject;
  }
};

export const getQuestions = async (classCode) => {
  const dbObject = await openDb();

  // Fill in below
  const classCodeObj = dbObject.classCodes.find((cc) => cc.id === classCode);

  if (!classCodeObj) return null;

  return classCodeObj.questions;
};

export const getClassCodes = async (username) => {
  const dbObject = await openDb();

  // Fill in below
  return dbObject.classCodes.filter(
    (classCode) => classCode.owner === username
  );
};

export const createQuestionForClassCode = async (classCode, question) => {
  const dbObject = await openDb();

  // Fill in below
  const classCodeObj = dbObject.classCodes.find((cc) => cc.id === classCode);

  // If class code doesn't exist, return null
  if (!classCodeObj) return null;

  // Create a new question with a unique id
  const newQuestion = {
    id: Math.random().toString(36).substring(7),
    createdAt: Date.now(),
    ...question,
  };

  // Add the question to the class code
  classCodeObj.questions.push(newQuestion);
  await saveData(dbObject);

  // Return the new question
  return newQuestion;
};

export const createClassCode = async ({ id, owner }) => {
  const dbObject = await openDb();

  // Fill in below
  // Create a new class code with a unique id
  const classCode = {
    id: id,
    owner: owner,
    createdAt: Date.now(),
    questions: [],
  };

  // Add the class code to the dbObject
  dbObject.classCodes.push(classCode);
  await saveData(dbObject);

  return classCode;
};

export const deleteQuestion = async (questionId) => {
  const dbObject = await openDb();

  // Fill in below
  dbObject.classCodes.forEach((cc) => {
    cc.questions = cc.questions.filter((q) => q.id !== questionId);
  });

  await saveData(dbObject);
};

// -------------------------------
// Do not edit the functions below
const saveData = async (dbObject) => {
  await fsPromises.writeFile("./db.json", JSON.stringify(dbObject));
};

export const clear = async () => {
  try {
    await fsPromises.rm("./db.json");
  } catch (err) {} // ignore error if file doesnt exist
};
