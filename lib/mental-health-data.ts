// lib/mental-health-data.ts

export type CopingStep = {
  id: number;
  text: string;
};

export type MentalHealthFeeling = {
  id: string;          // usado en la URL: /mental-health/[id]/coping
  label: string;       // texto de la tarjeta
  icon: string;        // emoji grande que ya usas en el grid
  headline: string;    // titulo en la pantalla de coping
  subText: string;     // subtitulo cortito bajo el titulo
  copingSteps: CopingStep[]; // pasos para el mecanismo de afrontamiento
};

const feelings: MentalHealthFeeling[] = [
  {
    id: "anxiety",
    label: "Anxiety / Panic Attack",
    icon: "😰",
    headline: "Anxiety or panic can feel very scary.",
    subText: "Lets slow things down and help your body feel safer.",
    copingSteps: [
      {
        id: 1,
        text: "Slow breath: breathe in through your nose for 4 seconds, hold for 4, then breathe out slowly through your mouth for 6 seconds. Repeat this 10 times.",
      },
      {
        id: 2,
        text: "Look around and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      },
      {
        id: 3,
        text: "Press your feet into the ground and gently tense then relax your shoulders, hands, and jaw. Tell yourself: \"This feeling will pass. I am doing my best right now.\"",
      },
    ],
  },
  {
    id: "very-sad",
    label: "Very Sad / No Hope",
    icon: "😢",
    headline: "Feeling very sad or without hope is heavy.",
    subText: "You do not have to carry this alone.",
    copingSteps: [
      {
        id: 1,
        text: "Look around and find 3 things or people that have helped you keep going before (a person, a place, a memory, a pet, or something you care about). Say them out loud or in your mind.",
      },
      {
        id: 2,
        text: "Move your body a little: stand up if you can, stretch your arms above your head, roll your shoulders, or take a slow short walk nearby.",
      },
      {
        id: 3,
        text: "Choose one small safe thing you can do in the next hour (drink water, eat something, talk to staff, call a friend or hotline). Remind yourself: \"I only need to get through this moment, not my whole life.\"",
      },
    ],
  },
  {
    id: "ptsd",
    label: "PTSD Episode / Flashbacks",
    icon: "⚡",
    headline: "It may feel like the bad moment is happening again.",
    subText: "Lets help your brain notice that right now is different.",
    copingSteps: [
      {
        id: 1,
        text: "Say to yourself: \"Right now is today.\" Name todays date, the city you are in, and one person or place you know is nearby.",
      },
      {
        id: 2,
        text: "Press your feet into the floor or ground. Notice how it feels. Look for 5 details in the room or street that prove you are here now (colors, signs, objects).",
      },
      {
        id: 3,
        text: "Hold onto something safe you can touch (a key, a coin, your sleeve, a bottle). Describe it in detail: its temperature, texture, weight, and color. Keep your eyes on the object while you breathe slowly.",
      },
    ],
  },
  {
    id: "voices",
    label: "Hearing Voices",
    icon: "🧠",
    headline: "Hearing things that others do not can be upsetting.",
    subText: "Lets help you focus on the world around you.",
    copingSteps: [
      {
        id: 1,
        text: "Look around and name 5 things you can see right now. Say them in your head or out loud: colors, shapes, objects, signs.",
      },
      {
        id: 2,
        text: "Cover one ear gently, then the other, and listen for 3 real sounds around you (cars, people talking, wind, birds, music). Focus on those sounds, not on the other noise.",
      },
      {
        id: 3,
        text: "If you can, move a little closer to a calmer or safer spot (near staff, inside a shelter, near light). Tell yourself: \"These experiences come and go. I can still choose what I do next.\"",
      },
    ],
  },
  {
    id: "anger",
    label: "Anger",
    icon: "😡",
    headline: "Feeling very angry can make it hard to think clearly.",
    subText: "We will slow your body down so you do not act on impulse.",
    copingSteps: [
      {
        id: 1,
        text: "Close your hands into tight fists for 5 seconds, then slowly open them and let your fingers relax. Repeat this 5 times while you breathe out slowly.",
      },
      {
        id: 2,
        text: "Look away from the person or thing making you angry. Gently turn your body a little, and count backwards from 20 to 1 in your head.",
      },
      {
        id: 3,
        text: "Think of one safe thing you can do with the anger: walk away for a minute, talk to staff, squeeze a piece of clothing, or write a word in the air with your finger instead of shouting or hitting.",
      },
    ],
  },
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    icon: "😥",
    headline: "When everything feels too much, it is hard to decide what to do.",
    subText: "We will break things into tiny steps.",
    copingSteps: [
      {
        id: 1,
        text: "Take 3 slow breaths. On each exhale, drop your shoulders a little. Tell yourself: \"I do not have to fix everything right now.\"",
      },
      {
        id: 2,
        text: "Look at what is in front of you and choose just one small thing to do next (drink water, find a seat, ask a question, stand in line, send one message).",
      },
      {
        id: 3,
        text: "If you can, think of one person or place that could support you (shelter staff, outreach worker, clinic, hotline, friend). Plan the next step to reach them, even if it is just walking toward their building or asking someone for directions.",
      },
    ],
  },
];

export default feelings;
