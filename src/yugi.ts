class Animal {
    snore() {
        return 'HRHRHRHR';
    }

    happy() {
        return 'YIYIYIY';
    }

    confused() {
        return 'UHUHUHUHUH';
    }

    hot() {
        return 'HEHEHHEHE';
    }
}

class Booger {
    constructor(public boogerSize: string,
        public boogerCount: number) { }
}

class Boogers {
    firstTypeB: Booger;
    secondTypeB: Booger;
}

class Yugi extends Animal {

    constructor(public boogers: Boogers) {
        super();
    }

    // sounding() {
    //     this.sounds.snore(),
    //     this.sounds.hot(),
    //     this.sounds.happy(),
    //     this.sounds.confused()
    // }


}

// const yugi = new Yugi();


// class YugiSounds {
//     constructor(public sounds: Sounds) { }

//     // sounding() {
//     //     this.sounds.snore();
//     //     this.sounds.hot();
//     //     this.sounds.happy();
//     //     this.sounds.confused();
//     // }
// }

// const yugiNoises = new YugiSounds( )
const yugi = new Yugi(
    {
        firstTypeB: new Booger('big', 4),
        secondTypeB: new Booger('small', 3)
    }
)
// yugi.snore();
// yugi.hot();
// yugi.happy();
// yugi.confused();

    console.log('Yugi is my dog.' + 'He always has a boogers.' + 'Now he has: ' + yugi.boogers.firstTypeB.boogerCount + ' ' + yugi.boogers.firstTypeB.boogerSize
        + ' and ' + yugi.boogers.secondTypeB.boogerCount + ' ' + yugi.boogers.secondTypeB.boogerSize + ' boogers.' + ' Also he likes to make different sounds, like: '
        + yugi.snore() + ', when he snore; ' + yugi.hot() + ', when he is hot; ' + yugi.happy() + ', when he is happy; and ' + yugi.confused() + ', when he is confused.');