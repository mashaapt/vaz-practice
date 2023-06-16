

// class Bolt {

//     checkIsTight() {
//         console.log('Bolt good and tight!');
//     }
// }


// class Cylinder {
//     constructor(private bolt: Bolt) {

//     }

//     moveCylinder() {
//         console.log('Choochoo');
//     }
// }

// @Injectable()
// class Engine {

//     constructor(private cylinder: Cylinder) {

//     }

//     start() {
//         console.log('Vroom vroom');
//     }
// }

// @Injectable()
// class Car {

//     constructor(public engine: Engine) {
//     }

//     drive() {
//         this.engine.start();

//     }
// }




// const car = new Car(
//     new Engine(
//         new Cylinder(
//             new Bolt()
//         )
//     )
// );

// console.log(`Created car`);

// car.drive();





