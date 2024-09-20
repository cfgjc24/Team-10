"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
 
export function IdCard() {
  const cards = data.map((card, index) => (
    <Card key={card.name} card={card} index={index} />
  ));
 
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Patients
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
 
const data = [
  {
    patient_id: "id99",
    name: "name 1",
  },
  {
    patient_id: "id23",
    name: "name 2",
  },
  {
    patient_id: "id645",
    name: "name 3",
  },
 
  {
    patient_id: "id34e",
    name: "name 4",
  },
  {
    patient_id: "id325",
    name: "name 5",
  },
  {
    patient_id: "id3425",
    name: "name 6",
  },
];