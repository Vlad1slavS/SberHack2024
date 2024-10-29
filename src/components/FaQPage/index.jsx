import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const questions = [
  {
    question: "Где я могу заказать справку об обучении?",
    answer:
      "Справка об обучении заказывается в деканате",
  },
  {
    question: "Что такое JSX?",
    answer: "JSX — это синтаксический сахар для описания объектов React.",
  },
  {
    question: "Что такое компоненты?",
    answer:
      "Компоненты — это окна с параметрами, которые могут отслеживать свое состояние.",
  },
  {
    question: "Что такое props?",
    answer:
      "Props — это способ передачи данных от родительского компонента к дочернему.",
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
