type Service = {
  number: string;
  /** Also used as the `?type=` preset for the project brief. */
  title: string;
  text: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "New homes",
    text: "From the first design conversations to the final construction details, a home built around its site and the people who will live in it.",
  },
  {
    number: "02",
    title: "Major renovations",
    text: "A new chapter for an existing home. Thoughtful coordination of structure, materials, and spaces with the design team.",
  },
  {
    number: "03",
    title: "Distinctive additions",
    text: "New rooms and new possibilities, integrated with the character and function of the home already there.",
  },
];
