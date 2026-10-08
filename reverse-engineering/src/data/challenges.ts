import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    number: '01',
    title: 'Smart Traffic Signal',
    marks: 15,
    difficulty: 'Easy',
    description:
      'Design a smart traffic signal system that responds to repeated user input and alternates between states correctly.',
    status: 'available',
    problemStatement:
      'Design and implement a smart traffic signal system that alternates between red and green states based on user input. The system must begin in a defined state and respond correctly to repeated button interactions.',
    requirements: [
      'Green light should initially be ON.',
      'Red light should initially be OFF.',
      'First button interaction changes the state.',
      'Second button interaction changes it back.',
      'The behavior should continue reliably.',
    ],
    components: [
      'Arduino Uno ×1',
      'Red LED ×1',
      'Green LED ×1',
      'Push Button ×1',
      '220Ω Resistor ×2',
    ],
    expectedBehavior: [
      'On startup: Green ON, Red OFF.',
      'After first press: Green OFF, Red ON.',
      'After second press: Green ON, Red OFF.',
      'Pattern repeats indefinitely.',
    ],
    submissionInstructions:
      'Upload your solution file and provide a link to your implementation. Include notes describing your approach.',
  },
  {
    id: 2,
    number: '02',
    title: 'Digital Security Lock',
    marks: 20,
    difficulty: 'Medium',
    description:
      'Implement a digital security lock that accepts a 4-digit PIN and grants or denies access based on the input.',
    status: 'available',
    problemStatement:
      'Build a digital security lock system that reads a 4-digit PIN from a keypad and compares it against a stored password. The system should indicate access granted or denied using output indicators.',
    requirements: [
      'Accept a 4-digit numeric PIN from the user.',
      'Compare entered PIN against stored value.',
      'Display ACCESS GRANTED when correct.',
      'Display ACCESS DENIED when incorrect.',
      'Lock out after 3 consecutive failed attempts.',
    ],
    components: [
      'Arduino Uno ×1',
      '4×4 Keypad ×1',
      'LCD Display 16×2 ×1',
      'Green LED ×1',
      'Red LED ×1',
      '10kΩ Potentiometer ×1',
    ],
    expectedBehavior: [
      'System waits for 4-digit input.',
      'Correct PIN shows granted message.',
      'Wrong PIN shows denied message.',
      'After 3 failures, system locks for 30 seconds.',
    ],
    submissionInstructions:
      'Submit your solution file with the implementation. Do not hard-code the PIN in an obvious location. Include notes on your logic.',
  },
  {
    id: 3,
    number: '03',
    title: 'Automatic Street Light',
    marks: 25,
    difficulty: 'Medium',
    description:
      'Create an automatic street lighting system that activates based on ambient light levels.',
    status: 'available',
    problemStatement:
      'Design an automatic street light controller that reads ambient light levels using a sensor and automatically switches a street light ON when it gets dark and OFF when sufficient light is available.',
    requirements: [
      'Read ambient light level continuously.',
      'Turn light ON when brightness falls below threshold.',
      'Turn light OFF when brightness exceeds threshold.',
      'Threshold must be configurable.',
      'System should respond within 2 seconds of light change.',
    ],
    components: [
      'Arduino Uno ×1',
      'LDR Sensor ×1',
      'LED (White/Yellow) ×1',
      '10kΩ Resistor ×1',
      '220Ω Resistor ×1',
    ],
    expectedBehavior: [
      'In darkness: Street light turns ON automatically.',
      'In daylight: Street light turns OFF automatically.',
      'Smooth transition without flickering.',
      'Serial monitor displays current light level.',
    ],
    submissionInstructions:
      'Provide your solution file and a brief description of the threshold value you chose and why. Upload to the submission page.',
  },
  {
    id: 4,
    number: '04',
    title: 'Temperature-Controlled Fan',
    marks: 40,
    difficulty: 'Hard',
    description:
      'Build a temperature-controlled fan system that adjusts fan speed automatically based on temperature readings.',
    status: 'locked',
    problemStatement:
      'Implement a temperature-controlled fan system that reads temperature data and adjusts fan speed proportionally. The fan should operate at different speed levels based on defined temperature ranges.',
    requirements: [
      'Read temperature from a sensor.',
      'Fan OFF below 25°C.',
      'Fan at LOW speed between 25°C and 30°C.',
      'Fan at MEDIUM speed between 30°C and 35°C.',
      'Fan at HIGH speed above 35°C.',
      'Display current temperature and fan speed on output.',
    ],
    components: [
      'Arduino Uno ×1',
      'DHT11 Temperature Sensor ×1',
      'DC Motor (Fan) ×1',
      'L298N Motor Driver ×1',
      'LCD Display 16×2 ×1',
      '10kΩ Potentiometer ×1',
    ],
    expectedBehavior: [
      'Continuous temperature reading.',
      'Automatic fan speed adjustment.',
      'LCD shows temperature and fan status.',
      'No manual intervention required after startup.',
    ],
    submissionInstructions:
      'This is the highest-value challenge. Submit your complete solution with a link and detailed notes about your implementation approach and any edge cases handled.',
  },
];
