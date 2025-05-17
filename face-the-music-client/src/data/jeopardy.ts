export type Question = {
  value: number;
  question: string;
  answer: string;
  isAnswered: boolean;
};

export type Category = {
  name: string;
  questions: Question[];
};

export const gameData: Category[] = [
  {
    name: "Music Theory",
    questions: [
      { value: 200, question: "This symbol indicates how loud or soft to play", answer: "What is dynamics?", isAnswered: false },
      { value: 400, question: "The distance between two musical pitches", answer: "What is an interval?", isAnswered: false },
      { value: 600, question: "A group of three or more notes played together", answer: "What is a chord?", isAnswered: false },
      { value: 800, question: "The speed at which music is played", answer: "What is tempo?", isAnswered: false },
      { value: 1000, question: "The organization of musical sounds in time", answer: "What is rhythm?", isAnswered: false },
    ],
  },
  {
    name: "Famous Composers",
    questions: [
      { value: 200, question: "This composer wrote 'Symphony No. 5'", answer: "Who is Beethoven?", isAnswered: false },
      { value: 400, question: "Known as the 'King of Waltz'", answer: "Who is Johann Strauss II?", isAnswered: false },
      { value: 600, question: "Composed 'The Four Seasons'", answer: "Who is Vivaldi?", isAnswered: false },
      { value: 800, question: "This child prodigy composed his first piece at age 5", answer: "Who is Mozart?", isAnswered: false },
      { value: 1000, question: "Composed the 'Brandenburg Concertos'", answer: "Who is Bach?", isAnswered: false },
    ],
  },
  {
    name: "Musical Instruments",
    questions: [
      { value: 200, question: "The largest instrument in the string family", answer: "What is the double bass?", isAnswered: false },
      { value: 400, question: "This woodwind instrument has a double reed", answer: "What is the oboe?", isAnswered: false },
      { value: 600, question: "The highest-pitched brass instrument", answer: "What is the trumpet?", isAnswered: false },
      { value: 800, question: "This percussion instrument is known as the 'timpani'", answer: "What are kettledrums?", isAnswered: false },
      { value: 1000, question: "This keyboard instrument uses hammers to strike strings", answer: "What is the piano?", isAnswered: false },
    ],
  },
  {
    name: "Music History",
    questions: [
      { value: 200, question: "The era of Mozart and Haydn", answer: "What is the Classical period?", isAnswered: false },
      { value: 400, question: "This 1950s music style combined country and R&B", answer: "What is Rock and Roll?", isAnswered: false },
      { value: 600, question: "The birthplace of Jazz music", answer: "What is New Orleans?", isAnswered: false },
      { value: 800, question: "This 1920s dance music emerged from Harlem", answer: "What is Swing?", isAnswered: false },
      { value: 1000, question: "The first opera ever written", answer: "What is Dafne?", isAnswered: false },
    ],
  },
  {
    name: "Music Terms",
    questions: [
      { value: 200, question: "Italian term for 'very loud'", answer: "What is fortissimo?", isAnswered: false },
      { value: 400, question: "A gradual increase in volume", answer: "What is crescendo?", isAnswered: false },
      { value: 600, question: "The term for a series of eight notes", answer: "What is an octave?", isAnswered: false },
      { value: 800, question: "Italian term meaning 'beautiful singing'", answer: "What is bel canto?", isAnswered: false },
      { value: 1000, question: "A musical composition for nine instruments", answer: "What is a nonet?", isAnswered: false },
    ],
  },
];
