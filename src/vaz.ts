class Person {

    constructor(public name: string,
                public age: number) { }

    write() {
        return 'Writing a letter'
    }

    speak() {
        return 'Saying Hi!'
    }
}

class Hand {
    constructor(public handShape: string,
                public handAbility: string) { }
}

// class Hand{
//     constructor(public giggle: function name(params:type) {
        
//     })
// }

class Hands {
    rightHand: Hand;
    leftHand: Hand;
}

class Vaz extends Person {
    constructor(public hands: Hands ) { 
        super('Vaz', 31);
    }
}

const vazgen = new Vaz(
    {
        rightHand: new Hand('rectangle', 'strong'),
        leftHand: new Hand('circle','weak')
    }
)

console.log('He is ' + vazgen.name + '. ' , 'He is ' + vazgen.age + '. ' + 'He has two hands.' , ' His right hand has shape of ' + vazgen.hands.rightHand.handShape ,
 ', and also it is ' + vazgen.hands.rightHand.handAbility + '.', 'And his left hand has shape of ' + vazgen.hands.leftHand.handShape , ', and it is kinda ' + vazgen.hands.leftHand.handAbility + '.');