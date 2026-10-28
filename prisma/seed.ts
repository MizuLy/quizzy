import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    name: "Math",
    questions: [
      { text: "What is 2 + 2?", answer: "4", distractors: ["3", "5", "22"] },
      { text: "What is 9 x 7?", answer: "63", distractors: ["56", "72", "54"] },
      { text: "What is the square root of 144?", answer: "12", distractors: ["14", "11", "13"] },
    ],
  },
  {
    name: "Geography",
    questions: [
      {
        text: "What is the capital of France?",
        answer: "Paris",
        distractors: ["Lyon", "Rome", "Madrid"],
      },
      {
        text: "Which is the largest ocean?",
        answer: "Pacific",
        distractors: ["Atlantic", "Indian", "Arctic"],
      },
      {
        text: "Which country has the city of Phnom Penh?",
        answer: "Cambodia",
        distractors: ["Laos", "Vietnam", "Thailand"],
      },
    ],
  },
  {
    name: "Science",
    questions: [
      {
        text: "What is the chemical symbol for water?",
        answer: "H2O",
        distractors: ["CO2", "O2", "HO"],
      },
      {
        text: "Which planet is known as the Red Planet?",
        answer: "Mars",
        distractors: ["Venus", "Jupiter", "Mercury"],
      },
      {
        text: "What gas do plants absorb from the air?",
        answer: "Carbon dioxide",
        distractors: ["Oxygen", "Nitrogen", "Helium"],
      },
    ],
  },
];

async function main() {
  for (const { name, questions } of data) {
    const topic = await prisma.topic.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // questions have no unique key, so reset this topic's questions to keep the seed re-runnable
    await prisma.question.deleteMany({ where: { topicId: topic.id } });
    await prisma.question.createMany({
      data: questions.map((q) => ({ ...q, topicId: topic.id })),
    });

    console.log(`Seeded "${name}" with ${questions.length} questions`);
  }
}

// a rejected main() is re-thrown by finally, so the script still exits non-zero on failure
main().finally(() => prisma.$disconnect());
