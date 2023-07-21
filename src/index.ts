const { Quiz, run } = require('enquirer');
// import { prompt } from '@enquirer';

// const { prompt } = require('enquirer');
const capital = 'What is the capital of';

 const prompty = new Quiz({
  name: 'countries',
  message: 'How many countries are there in the world?',
  choices: ['165', '175', '185', '195', '205'],
  correctChoice: 3
});

const spain = new Quiz({
    message: capital + ' Spain?',
    choices: ['Rio', 'Paris', 'Madrid'],
    correctChoice: 2
});
 
 prompty.run()
  .then(answer => {
    if (answer.correct) {
      console.log('Correct!');
    } else {
      console.log(`Wrong! Correct answer is ${answer.correctAnswer}`);
    }
  })
  .catch(console.error);