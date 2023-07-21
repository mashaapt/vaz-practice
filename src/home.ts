import { extend } from "lodash";


// class IsComfortable {
//     constructor(public isDirty: boolean,
//         public hasPets: boolean,
//         public isLight: boolean,
//         public hasWindows: boolean,
//         public whatToDoThere: string) {
//     }
// }

class Room<T> {
    objectsInRoom: T[] = [];

    constructor(public itsName: string) {

    }

    addObjectToRoom(obj: T) {
        this.objectsInRoom.push(obj);
    }
}

class Bathroom extends Room<BathObject> {

}

// class Rooms extends Array<Room> {


// }



const livingRoom = new Room(
    'livingroom'
)

const bathRoom = new Bathroom(
    'bathroom'
)

const bedRoom = new Room(
    'bedroom'
)

const diningRoom = new Room(
    'diningroom'
)

type ItemBrand = 'Ikea' | 'Herman Miller' | 'LocalBrand' | 'Jusk' | 'LG' | 'Bosch';

class HouseholdObject {
    constructor(
        public brand: ItemBrand,
        public material: string,
        public color: string,
        public purchasedLocation?: string) {

    }
}



class Furniture extends HouseholdObject {

}


class Bed extends Furniture {

}

// console.log(bed.furnName + ' '+ bed.furnBrand+ ' ' + bed.material+ ' ' + bed.color);
class Table extends Furniture { }

const table = new Table(
    'Ikea',
    'wooden',
    'brown'
)

class Armchair extends Furniture { }

const armchair = new Armchair(
    'Herman Miller',
    'satin',
    'light blue'
)

class Sofa extends Furniture { }

class Carpet extends HouseholdObject { }


class Chair extends Furniture { }

class BathObject extends HouseholdObject {
    public isClogged: boolean;
}

// const bathObj = new BathObject(null, null, null);
// bathObj.isClogged = true;

class Bath extends BathObject { }


class Shower extends BathObject { }


class Sink extends BathObject { }


class Mat extends HouseholdObject { }



const bed = new Bed(
    'Ikea',
    'wooden',
    'white'
)

const sofa = new Sofa(
    'LocalBrand',
    'cotton',
    'lilac',
    'local furniture store'
)


const carpet = new Carpet(
    'Jusk',
    'wool',
    'mint'
)

const chair = new Chair(
    'Herman Miller',
    'iron',
    'silver',
    'art exhibition'
)

const bath = new Bath(
    'Ikea',
    'ceramic',
    'light green'
)

const shower = new Shower(
    'Ikea',
    'metal',
    'silver'
)

const sink = new Sink(
    'Ikea',
    'ceramic',
    'white'
)
const mat = new Mat(
    'Ikea',
    'rubbery',
    'green'
)

class Electronics extends HouseholdObject {

    constructor(
        brand: ItemBrand,
        material: string,
        color: string,

        public price: string) {

        super(brand, material, color)
    }
}

class Tv extends Electronics {
    constructor(public pixels: number) {
        super(
            'LG',
            'plastic',
            'black',
            'expensive');
    }
}

const tv = new Tv(
    2000
)
//  console.log(tv.electBrand)

class Microwave extends Electronics { }

const microwave = new Microwave(
    'Bosch',
    'metal',
    'red',
    'cheap'
)

class House {
    rooms: Room<any>[] = [];

    constructor(public houseName: string) { }

    // rooms = 'rooms';
    // room = [
    //     livingRoom,
    //     diningRoom,
    //     bedRoom,
    //     bathRoom
    // ]


    addRoom(room: Room<any>) {
        this.rooms.push(room);
    }
}

class NotHouseholdObject {

}

const nothhObj = new NotHouseholdObject();

const home = new House('home');
home.addRoom(livingRoom);
home.addRoom(diningRoom);
home.addRoom(bedRoom);
home.addRoom(bathRoom);

livingRoom.addObjectToRoom(tv);

// bathRoom.addObjectToRoom(tv);

bathRoom.addObjectToRoom(bath);
bathRoom.addObjectToRoom(shower);
bathRoom.addObjectToRoom(sink);
// bathRoom.addObjectToRoom(mat);


console.log(`Let me describe you my ${home.houseName}. It has ${home.rooms.length} rooms. There are: ${home.rooms.map(room => {
        return `${room.itsName}`
    }).join(', ')}.  
`)













// const house = new House(
//     {
//         livingroom: new Room('Livingroom', ['sofa', 'armchair', 'table', 'tv'], 'green'),
//         bathroom: new Room('Bathroom', ['bath', 'shower', 'sink', 'mat'], 'blue'),
//         bedroom: new Room('Bedroom', ['bed', 'chair', 'table', 'carpet'], 'pink'),
//         diningroom: new Room('Diningroom', ['table', 'chairs', 'microwave'], 'yellow')
//     },
//     {
//         isDirty: false,
//         hasPets: true,
//         isLight: true,
//         hasWindows: true,
//         whatToDoThere: 'chilling'
//     },
//     4
// )

// console.log('This is my house.', `It has ${house.countRooms} rooms.`, 'The first  room is a ' + house.rooms.livingroom.itsName + '.', 'It has ' +
//     house.rooms.livingroom.furniture + '. And also the color of the furniture is ' + house.rooms.livingroom.furnitureColor + '. The next room is a ' +
//     house.rooms.bathroom.itsName + '.', 'It has ' + house.rooms.bathroom.furniture + '. And also the color of the furniture is ' + house.rooms.bathroom.furnitureColor +
//     '. The third room is a ' + house.rooms.bedroom.itsName + '.', 'It has ' + house.rooms.bedroom.furniture + '. And also the color of the furniture is ' + house.rooms.bedroom.furnitureColor +
//     '. And the last rooms is a ' + house.rooms.diningroom.itsName + '.', 'It has ' +
//     house.rooms.diningroom.furniture + '. And also the color of the furniture is ' + house.rooms.diningroom.furnitureColor + '.'
// );












// class LivingRoom extends HasFurniture {
//     constructor(itsName: string,
//         furniture: string[],
//         furnitureColor: string) {
//         super(false, false, true, true, 'chilling');
//     }

//     chill() {
//         return 'You can chill here';
//     }
// }

// class BathRoom extends HasFurniture {
//     constructor(itsName: string,
//         furniture: string[],
//         furnitureColor: string) {
//         super(false, true, false, false, 'showering');
//     }

//     bath() {
//         return 'Take a shower here';
//     }
// }

// class BedRoom extends HasFurniture {
//     constructor(itsName: string,
//         furniture: string[],
//         furnitureColor: string
//     ) {
//         super(true, false, true, true, 'sleeping');
//     }

//     sleep() {
//         return 'Take a nap here';
//     }
// }

// class DiningRoom extends HasFurniture {
//     constructor(itsName: string,
//         furniture: string[],
//         furnitureColor: string) {
//         super(false, false, true, true, 'dinning');
//     }

//     dine() {
//         return 'Lets eat here';
//     }
// }


// const rooms: new Rooms(
//         livingroom: new LivingRoom(
//             { 'Livingroom';['sofa' 'armchair' 'table' 'tv']; 'green'}
//         ),

// new BathRoom(
//     { 'Bathroom', ['bath', 'shower', 'sink', 'mat'], 'blue'}
// ),

//     new BedRoom(
//         { 'Bedroom', ['bed', 'chair', 'table', 'carpet'], 'pink'}
//     ),

//     new DiningRoom(
//         { 'Diningroom', ['table', 'chairs', 'microwave'], 'yellow'}
//     )
//     )
// )

// const livingroom: new LivingRoom(
//     {
//         'Livingroom';
//         ['sofa' 'armchair' 'table' 'tv'];
//         'green';
//             }

// )

// const bathroom: new BathRoom(
//     {

//     }
// )