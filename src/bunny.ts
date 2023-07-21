// type PawsColor = "white" | "black" | "pink";

// class Paw {
//     constructor(private pawSize: string,
//         public pawColor: PawsColor,
//         private hasClaws: boolean,
//     ) { }

//     scrath() {
//         return 'Scratch-Scratch'
//     }
// }

// class Paws {
//     firstPaw: Paw;
//     secondPaw: Paw;
//     thirdPaw: Paw;
//     fourthPaw: Paw;
// }

// class Fur {
//     furColors = ['pink', 'red', 'white', 'black'];

//     get color() {
//         return this.furColors[this.furIndex];
//     }

//     constructor(public furIndex: number,
//         public furLength: number) { }

// }

// class Rabbit {

//     constructor(public paws: Paws,
//         public fur: Fur) { }


// }

// const newRabbit = new Rabbit(
//     {
//         firstPaw: new Paw('big', 'white', true),
//         secondPaw: new Paw('big', 'white', true),
//         thirdPaw: new Paw('big', 'black', false),
//         fourthPaw: new Paw('big', 'white', true)
//     },
//     new Fur(2, 10)
// )
// // const fur = new Fur(2, 10);

// // console.log(fur.furColors[fur.furIndex])

// const rabbit = new Paws
// // console.log(newRabbit.paws.secondPaw.pawColor);
// console.log(
//     'This is our rabbit:',
//     'His fur color is ' + newRabbit.fur.color + '.',
//     'His fur length is ' + newRabbit.fur.furLength + 'cm.',
//     'He has four.',
//     'Each paw is ' + newRabbit.paws.firstPaw.pawColor + '.',
//     'Except the third paw, it is ' + newRabbit.paws.thirdPaw.pawColor + '.',
//     'And every time he does: "' + newRabbit.paws.firstPaw.scrath() + '" with his paws.'
// );
