import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const questions = [
  {
    question: "Где я могу заказать справку об обучении?",
    answer: "...",
  },
  {
    question: "Какие справки мне нужны для подачи заявления на социальную стипендию?",
    answer: "...",
  },
  {
    question: "...",
    answer:
      "...",
  },
];

export default function FaQPage() {
  return (
    <div className=" mt-10 container mx-auto">
      <Accordion>
        {questions.map((question, index) => (
          <AccordionTab
            className="mb-4 rounded-xl overflow-hidden"
            header={question.question}
            key={index}
          >
            <p>{question.answer}</p>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}
