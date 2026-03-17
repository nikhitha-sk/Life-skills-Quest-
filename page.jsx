import React, { useState } from 'react';
import { 
  Trophy, AlertTriangle, Play, RefreshCw, CheckCircle2, 
  XCircle, Brain, Users, Wrench, Shield, Lightbulb, Heart,
  Image as ImageIcon, Server, Code, FileQuestion
} from 'lucide-react';

// --- QUESTION DATABASE (50 Questions) ---
const QUESTION_BANK = [
  // --- Teamwork & Communication ---
  {
    id: 1, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "Your team is falling behind on a critical project deadline. What is the most effective first step?",
    options: ["Work 15-hour days individually to catch up", "Call a brief team meeting to reassess priorities and redistribute tasks", "Find out whose fault the delay is and report them", "Ignore the deadline and work at a normal pace"],
    correct: "Call a brief team meeting to reassess priorities and redistribute tasks"
  },
  {
    id: 2, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "Two of your colleagues are having a heated argument over a design choice during a meeting. What should you do?",
    options: ["Take the side of the person you like more", "Stay silent and let them fight it out", "Intervene calmly and suggest listing the pros and cons of both approaches", "Cancel the meeting immediately"],
    correct: "Intervene calmly and suggest listing the pros and cons of both approaches"
  },
  {
    id: 3, category: 'Teamwork', icon: <Heart size={32} className="text-pink-500" />,
    question: "A junior team member makes a mistake that causes a minor bug. How do you handle it?",
    options: ["Publicly scold them so they learn", "Fix it yourself and never mention it", "Privately walk them through what went wrong and how to fix it together", "Revoke their access to the codebase"],
    correct: "Privately walk them through what went wrong and how to fix it together"
  },
  {
    id: 4, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "A client gives vague feedback: 'Make it pop more.' How does your team respond?",
    options: ["Add bright neon colors everywhere", "Ask clarifying questions to understand their specific goals and preferences", "Ignore the feedback, the design is fine", "Tell the client they are wrong"],
    correct: "Ask clarifying questions to understand their specific goals and preferences"
  },
  {
    id: 5, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "During a brainstorming session, a colleague suggests an idea you think is terrible. Your response?",
    options: ["Laugh and say it's a bad idea", "Say nothing but roll your eyes", "Acknowledge the idea and try to build upon it or pivot to a related concept", "Immediately shoot it down with facts"],
    correct: "Acknowledge the idea and try to build upon it or pivot to a related concept"
  },
  {
    id: 6, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "You notice a team member hasn't spoken at all during a collaborative planning session. What's the best approach?",
    options: ["Assume they have nothing to add", "Force them to speak by putting them on the spot abruptly", "Gently ask, 'Do you have any thoughts on this, [Name]?' to invite them in", "Complain to the manager that they aren't participating"],
    correct: "Gently ask, 'Do you have any thoughts on this, [Name]?' to invite them in"
  },
  {
    id: 7, category: 'Teamwork', icon: <Heart size={32} className="text-pink-500" />,
    question: "When giving constructive criticism to a peer, which framework is most effective?",
    options: ["The 'Blame and Shame' model", "Situation, Behavior, Impact (SBI)", "Vague suggestions via email", "Waiting for their annual review"],
    correct: "Situation, Behavior, Impact (SBI)"
  },
  {
    id: 8, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "Your remote team spans three different global time zones. How do you schedule a crucial sync?",
    options: ["Pick a time that works best for you only", "Rotate meeting times so the inconvenience is shared equally", "Force everyone to meet at 3 AM your time", "Never hold meetings, only use email"],
    correct: "Rotate meeting times so the inconvenience is shared equally"
  },
  {
    id: 9, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "A colleague presents an idea that is almost identical to one you shared last week, taking full credit. What do you do?",
    options: ["Yell at them in front of the team", "Say, 'I'm glad you liked the idea I brought up last week, let's expand on it'", "Quit your job", "Sabotage their presentation"],
    correct: "Say, 'I'm glad you liked the idea I brought up last week, let's expand on it'"
  },
  {
    id: 10, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "You are going on a 2-week vacation. What is the most responsible way to hand off your work?",
    options: ["Just turn on your out-of-office auto-responder and leave", "Create a clear handover document detailing project statuses and emergency contacts", "Tell your boss everything is fine verbally", "Give all your work to the newest intern without telling them"],
    correct: "Create a clear handover document detailing project statuses and emergency contacts"
  },
  {
    id: 11, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "You discover two team members are unknowingly working on the exact same task. What's the immediate action?",
    options: ["Let them finish and see who did it better", "Bring them together to consolidate their work and reassign one of them", "Delete one person's work secretly", "Tell the manager to fire one of them"],
    correct: "Bring them together to consolidate their work and reassign one of them"
  },
  {
    id: 12, category: 'Teamwork', icon: <Users size={32} className="text-blue-500" />,
    question: "What is 'Scope Creep' in project management?",
    options: ["A creepy team member", "When a project finishes faster than expected", "The continuous, uncontrolled growth of a project's requirements", "Using a microscope to check code"],
    correct: "The continuous, uncontrolled growth of a project's requirements"
  },

  // --- Life Skills & Critical Thinking ---
  {
    id: 13, category: 'Life Skills', icon: <Shield size={32} className="text-green-500" />,
    question: "You receive an urgent email from 'admin@paypa1-security.com' asking you to verify your password. What is this?",
    options: ["A legitimate security warning", "A routine system update", "A phishing scam attempting to steal your credentials", "A network error message"],
    correct: "A phishing scam attempting to steal your credentials"
  },
  {
    id: 14, category: 'Life Skills', icon: <Brain size={32} className="text-purple-500" />,
    question: "You have a major presentation tomorrow, but you feel overwhelmed. What is the best coping strategy?",
    options: ["Stay up all night rehearsing", "Drink 5 cups of coffee", "Take a short walk, practice deep breathing, and review your key points", "Call in sick"],
    correct: "Take a short walk, practice deep breathing, and review your key points"
  },
  {
    id: 15, category: 'Life Skills', icon: <Lightbulb size={32} className="text-yellow-500" />,
    question: "When managing a monthly budget, what does the '50/30/20 rule' generally recommend?",
    options: ["50% Needs, 30% Wants, 20% Savings", "50% Savings, 30% Needs, 20% Wants", "50% Wants, 30% Savings, 20% Needs", "50% Rent, 30% Food, 20% Entertainment"],
    correct: "50% Needs, 30% Wants, 20% Savings"
  },
  {
    id: 16, category: 'Life Skills', icon: <Brain size={32} className="text-purple-500" />,
    question: "Which of the following is the strongest password?",
    options: ["password123", "admin", "CorrectHorseBatteryStaple!", "JohnDoe1990"],
    correct: "CorrectHorseBatteryStaple!"
  },
  {
    id: 17, category: 'Life Skills', icon: <Lightbulb size={32} className="text-yellow-500" />,
    question: "You find a USB drive in the company parking lot. What should you do?",
    options: ["Plug it into your work computer to find the owner", "Plug it into your personal laptop", "Give it to the IT or Security department immediately", "Keep it for personal use"],
    correct: "Give it to the IT or Security department immediately"
  },
  {
    id: 18, category: 'Life Skills', icon: <Brain size={32} className="text-purple-500" />,
    question: "What is the 'Pomodoro Technique'?",
    options: ["A way to make pasta sauce", "Working in focused 25-minute intervals followed by a short break", "A method for typing faster", "Sleeping for 20 minutes every 4 hours"],
    correct: "Working in focused 25-minute intervals followed by a short break"
  },
  {
    id: 19, category: 'Life Skills', icon: <Lightbulb size={32} className="text-yellow-500" />,
    question: "When writing a professional email, what is the difference between CC and BCC?",
    options: ["CC is for text, BCC is for attachments", "CC sends a copy visibly to others; BCC sends a hidden copy", "CC means 'Copy Cat', BCC means 'Bad Copy Cat'", "There is no difference"],
    correct: "CC sends a copy visibly to others; BCC sends a hidden copy"
  },
  {
    id: 20, category: 'Life Skills', icon: <Shield size={32} className="text-green-500" />,
    question: "A grease fire starts in a frying pan on your stove. What is the WORST thing you can do?",
    options: ["Turn off the heat", "Cover the pan with a metal lid", "Pour baking soda on it", "Pour a bucket of water on it"],
    correct: "Pour a bucket of water on it"
  },
  {
    id: 21, category: 'Life Skills', icon: <Brain size={32} className="text-purple-500" />,
    question: "When setting goals, the SMART acronym stands for Specific, Measurable, Achievable, Relevant, and...?",
    options: ["Technical", "Time-bound", "Thoughtful", "Tolerable"],
    correct: "Time-bound"
  },
  {
    id: 22, category: 'Life Skills', icon: <Lightbulb size={32} className="text-yellow-500" />,
    question: "When reading a nutritional label on food, what is usually the most important thing to look at first?",
    options: ["Total Calories", "Serving Size", "Vitamin C content", "The color of the box"],
    correct: "Serving Size"
  },
  {
    id: 23, category: 'Life Skills', icon: <Brain size={32} className="text-purple-500" />,
    question: "What is 'Compound Interest' in personal finance?",
    options: ["Interest paid only on the principal amount", "A bank fee for complex transactions", "Interest calculated on the initial principal and also on the accumulated interest", "A type of mortgage"],
    correct: "Interest calculated on the initial principal and also on the accumulated interest"
  },
  {
    id: 24, category: 'Life Skills', icon: <Shield size={32} className="text-green-500" />,
    question: "For proper office ergonomics to avoid neck pain, where should your computer monitor be positioned?",
    options: ["Way below eye level so you look down", "The top of the screen should be at or slightly below eye level", "High up so you have to stretch your neck upward", "Off to the far left or right"],
    correct: "The top of the screen should be at or slightly below eye level"
  },

  // --- Technical & Knowledge ---
  {
    id: 25, category: 'Technical', icon: <Code size={32} className="text-slate-700" />,
    question: "In computer science, which data structure operates on a 'Last In, First Out' (LIFO) principle?",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    correct: "Stack"
  },
  {
    id: 26, category: 'Technical', icon: <Server size={32} className="text-slate-700" />,
    question: "You are the on-call engineer and a critical server goes down. First step?",
    options: ["Acknowledge the alert, assess initial impact, and escalate if needed", "Ignore it until morning", "Start randomly restarting services", "Delete the database to clear errors"],
    correct: "Acknowledge the alert, assess initial impact, and escalate if needed"
  },
  {
    id: 27, category: 'Technical', icon: <Wrench size={32} className="text-slate-700" />,
    question: "What is the primary purpose of version control software like Git?",
    options: ["To make code run faster", "To design user interfaces", "To track changes in source code and collaborate", "To automatically fix bugs"],
    correct: "To track changes in source code and collaborate"
  },
  {
    id: 28, category: 'Technical', icon: <Code size={32} className="text-slate-700" />,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
    correct: "Hyper Text Markup Language"
  },
  {
    id: 29, category: 'Technical', icon: <Server size={32} className="text-slate-700" />,
    question: "What does 'HTTP 404' mean?",
    options: ["Server overloaded", "Payment required", "Not Found", "Unauthorized"],
    correct: "Not Found"
  },
  {
    id: 30, category: 'Technical', icon: <Code size={32} className="text-slate-700" />,
    question: "In software development, what is an API?",
    options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Process Integration", "Apple Product Interface"],
    correct: "Application Programming Interface"
  },
  {
    id: 31, category: 'Technical', icon: <Server size={32} className="text-slate-700" />,
    question: "What is the primary purpose of a VPN (Virtual Private Network)?",
    options: ["To make your internet speed faster", "To create a secure, encrypted connection over a less secure network like the internet", "To block all advertisements", "To bypass paying for streaming services"],
    correct: "To create a secure, encrypted connection over a less secure network like the internet"
  },
  {
    id: 32, category: 'Technical', icon: <Code size={32} className="text-slate-700" />,
    question: "What is the difference between SQL and NoSQL databases?",
    options: ["SQL is for images, NoSQL is for text", "SQL uses tables and rows; NoSQL is non-tabular (e.g., document-based)", "SQL is free, NoSQL is paid", "There is no difference"],
    correct: "SQL uses tables and rows; NoSQL is non-tabular (e.g., document-based)"
  },
  {
    id: 33, category: 'Technical', icon: <Wrench size={32} className="text-slate-700" />,
    question: "In Agile methodology, what is a 'Sprint'?",
    options: ["A race between developers to write the most code", "A short, time-boxed period when a scrum team works to complete a set amount of work", "A software bug that causes crashes", "The final release of a product"],
    correct: "A short, time-boxed period when a scrum team works to complete a set amount of work"
  },
  {
    id: 34, category: 'Technical', icon: <Server size={32} className="text-slate-700" />,
    question: "What does DNS stand for in networking?",
    options: ["Domain Name System", "Digital Network Service", "Data Notation Standard", "Download Node Server"],
    correct: "Domain Name System"
  },
  {
    id: 35, category: 'Technical', icon: <Wrench size={32} className="text-slate-700" />,
    question: "What is 'Two-Factor Authentication' (2FA)?",
    options: ["Entering your password twice", "Using two different passwords for the same account", "Requiring two distinct forms of identification to access something", "Having two separate user accounts"],
    correct: "Requiring two distinct forms of identification to access something"
  },
  {
    id: 36, category: 'Technical', icon: <Code size={32} className="text-slate-700" />,
    question: "In a relational database, what ensures each record in a table is unique?",
    options: ["Foreign Key", "Index", "Primary Key", "Row ID"],
    correct: "Primary Key"
  },

  // --- Playful / Visual / Logic Puzzles ---
  {
    id: 37, category: 'Playful Logic', icon: <ImageIcon size={32} className="text-indigo-500" />,
    question: "Solve the visual pattern: 🔴 🔵 🔴 🔵 🔴 ? What comes next?",
    options: ["🔴", "🔵", "🟢", "🟡"],
    correct: "🔵"
  },
  {
    id: 38, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "You have a 3-liter jug and a 5-liter jug. How do you measure exactly 4 liters?",
    options: [
      "Fill the 3L, pour into 5L. Fill 3L again, pour into 5L until full. 1L remains in 3L. Empty 5L, pour the 1L into 5L. Fill 3L, pour into 5L.",
      "Fill the 5L half way, then add 1.5L from the 3L jug.",
      "It is impossible to measure exactly 4 liters with these jugs.",
      "Fill both jugs and pour them out simultaneously until only 4L is left."
    ],
    correct: "Fill the 3L, pour into 5L. Fill 3L again, pour into 5L until full. 1L remains in 3L. Empty 5L, pour the 1L into 5L. Fill 3L, pour into 5L."
  },
  {
    id: 39, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    options: ["A cloud", "An echo", "A ghost", "A shadow"],
    correct: "An echo"
  },
  {
    id: 40, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "If you are running in a race and you pass the person in second place, what place are you in?",
    options: ["First place", "Second place", "Third place", "Last place"],
    correct: "Second place"
  },
  {
    id: 41, category: 'Playful Logic', icon: <ImageIcon size={32} className="text-indigo-500" />,
    question: "Look at the sequence: ⬜ ⬛ ⬜ ⬛. If the pattern continues, what is the 7th shape?",
    options: ["⬜", "⬛", "🔲", "🔳"],
    correct: "⬜"
  },
  {
    id: 42, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "I have keys but no locks. I have space but no room. You can enter but not go outside. What am I?",
    options: ["A house", "A keyboard", "A puzzle", "A safe"],
    correct: "A keyboard"
  },
  {
    id: 43, category: 'Playful Logic', icon: <ImageIcon size={32} className="text-indigo-500" />,
    question: "Identify the odd one out in this pattern series: ♠️ ♥️ ♣️ ♠️ ♥️ ♣️ ♦️",
    options: ["♠️", "♥️", "♣️", "♦️"],
    correct: "♦️"
  },
  {
    id: 44, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "Mary's father has four children: North, South, East, and...?",
    options: ["West", "Mary", "John", "Equator"],
    correct: "Mary"
  },
  {
    id: 45, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "A bat and a ball together cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.10", "$0.05", "$1.00", "$0.01"],
    correct: "$0.05"
  },
  {
    id: 46, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "Find the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ?",
    options: ["10", "11", "12", "13"],
    correct: "13"
  },
  {
    id: 47, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "What gets wetter the more it dries?",
    options: ["A sponge", "A towel", "Water", "Soap"],
    correct: "A towel"
  },
  {
    id: 48, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "Which is heavier: a ton of bricks or a ton of feathers?",
    options: ["A ton of bricks", "A ton of feathers", "They weigh the same", "It depends on gravity"],
    correct: "They weigh the same"
  },
  {
    id: 49, category: 'Playful Logic', icon: <ImageIcon size={32} className="text-indigo-500" />,
    question: "If 🍎 = 10, 🍌🍌 = 8, and 🍒 = 2. What is 🍎 + 🍌 + 🍒?",
    options: ["20", "16", "14", "18"],
    correct: "16"
  },
  {
    id: 50, category: 'Playful Logic', icon: <FileQuestion size={32} className="text-orange-500" />,
    question: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on the boat. Why?",
    options: ["They all drowned", "They were all married", "The boat was a ghost ship", "They were hiding"],
    correct: "They were all married"
  }
];

// --- UTILS ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [gameState, setGameState] = useState('start'); // start, playing, won, lost
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize a new match
  const startMatch = () => {
    const shuffled = shuffleArray(QUESTION_BANK);
    const selected = shuffled.slice(0, 3).map(q => ({
      ...q,
      options: shuffleArray(q.options) // Shuffle options for each question
    }));
    
    setCurrentQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setGameState('playing');
  };

  // Handle user selecting an answer
  const handleAnswerClick = (option) => {
    if (isAnimating) return; // Prevent multiple clicks
    
    setSelectedAnswer(option);
    setIsAnimating(true);

    const currentQ = currentQuestions[currentQuestionIndex];
    const isCorrect = option === currentQ.correct;

    setTimeout(() => {
      if (isCorrect) {
        if (currentQuestionIndex === 2) {
          // Answered all 3 correctly
          setGameState('won');
        } else {
          // Move to next question
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
        }
      } else {
        // Wrong answer -> Sudden Death
        setGameState('lost');
      }
      setIsAnimating(false);
    }, 1200); // 1.2s delay to show feedback (green/red)
  };

  // --- RENDER HELPERS ---

  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
      <div className="bg-blue-100 p-6 rounded-full shadow-inner mb-4">
        <Trophy size={64} className="text-blue-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Skill Builder Quest</h1>
      <p className="text-lg text-slate-600 max-w-md">
        Test your life skills, technical knowledge, and teamwork. 
        Answer 3 random questions correctly to win. <br/><br/>
        <span className="font-semibold text-red-500 flex items-center justify-center gap-2">
          <AlertTriangle size={20}/> One wrong answer and the game quits!
        </span>
      </p>
      <button 
        onClick={startMatch}
        className="mt-8 flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xl shadow-lg transform transition hover:scale-105 active:scale-95"
      >
        <Play fill="currentColor" /> Start Match
      </button>
    </div>
  );

  const renderGameScreen = () => {
    const question = currentQuestions[currentQuestionIndex];
    
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-8 px-4">
          <div className="flex justify-between mb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
            <span>Match Progress</span>
            <span>Question {currentQuestionIndex + 1} of 3</span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((step) => (
              <div 
                key={step} 
                className={`h-3 rounded-full flex-1 transition-all duration-500 ${
                  step < currentQuestionIndex ? 'bg-green-500' :
                  step === currentQuestionIndex ? 'bg-blue-500 animate-pulse' :
                  'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border border-slate-100 mx-4">
          <div className="bg-slate-50 p-6 flex items-start gap-4 border-b border-slate-100">
            <div className="bg-white p-3 rounded-2xl shadow-sm shrink-0">
              {question.icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                {question.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                {question.question}
              </h2>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 gap-4">
            {question.options.map((option, idx) => {
              let btnClass = "text-left p-5 rounded-xl border-2 transition-all duration-200 text-lg font-medium ";
              
              if (selectedAnswer === null) {
                // Default state
                btnClass += "border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
              } else if (selectedAnswer === option) {
                // The option user clicked
                if (option === question.correct) {
                  btnClass += "border-green-500 bg-green-50 text-green-800 scale-[1.02]";
                } else {
                  btnClass += "border-red-500 bg-red-50 text-red-800 scale-[1.02]";
                }
              } else if (option === question.correct && selectedAnswer !== null) {
                // Show correct answer if they got it wrong
                btnClass += "border-green-500 bg-green-50 text-green-800 opacity-70";
              } else {
                // Dim other options
                btnClass += "border-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswerClick(option)}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === option && option === question.correct && <CheckCircle2 className="text-green-500 shrink-0 ml-4" />}
                    {selectedAnswer === option && option !== question.correct && <XCircle className="text-red-500 shrink-0 ml-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderResultScreen = () => {
    const isWin = gameState === 'won';
    
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in p-4">
        <div className={`p-8 rounded-full shadow-2xl mb-4 ${isWin ? 'bg-green-100' : 'bg-red-100'}`}>
          {isWin ? (
            <Trophy size={80} className="text-green-600" />
          ) : (
            <XCircle size={80} className="text-red-600" />
          )}
        </div>
        
        <h1 className={`text-5xl font-extrabold tracking-tight ${isWin ? 'text-green-600' : 'text-red-600'}`}>
          {isWin ? "Victory!" : "Game Over"}
        </h1>
        
        <p className="text-xl text-slate-600 max-w-md font-medium">
          {isWin 
            ? "Excellent work! You demonstrated great skills and answered all 3 questions correctly." 
            : `You made it to Question ${currentQuestionIndex + 1}, but chose the wrong path. Better luck next time!`}
        </p>

        <button 
          onClick={startMatch}
          className="mt-8 flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-bold text-xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          <RefreshCw /> Play Another Match
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 font-sans selection:bg-blue-200">
      <div className="w-full max-w-4xl flex items-center justify-center">
        {gameState === 'start' && renderStartScreen()}
        {gameState === 'playing' && currentQuestions.length > 0 && renderGameScreen()}
        {(gameState === 'won' || gameState === 'lost') && renderResultScreen()}
      </div>

      {/* Global styles for simple animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
}
