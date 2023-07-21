import { Types } from 'mongoose';
import { Subject } from 'rxjs';
import { types } from 'util';
import { select, input } from '@inquirer/prompts';
// import { list } from '@inquirer/lib/prompts';
import { Separator } from '@inquirer/prompts';

import {
    createPrompt,
    useState,
    useKeypress,
    usePrefix,
    isEnterKey,
    isBackspaceKey,
    AsyncPromptConfig,
} from '@inquirer/core';
import type { } from '@inquirer/type';
import { filter } from 'lodash';
//   import chalk from 'chalk';
//   import clear from 'clear';
//   import figlet from 'figlet';


//   type InputConfig = AsyncPromptConfig & {
//     default?: string;
//     transformer?: (value: string, { isFinal }: { isFinal: boolean }) => string;
//   };

//   export default createPrompt<string, InputConfig>((config, done) => {
//     const [status, setStatus] = useState<string>('pending');
//     const [defaultValue = '', setDefaultValue] = useState<string | undefined>(
//       config.default,
//     );
//     const [errorMsg, setError] = useState<string | undefined>(undefined);
//     const [value, setValue] = useState<string>('');

//     const isLoading = status === 'loading';
//     const prefix = usePrefix(isLoading);

//     useKeypress(async (key, rl) => {
//       // Ignore keypress while our prompt is doing other processing.
//       if (status !== 'pending') {
//         return;
//       }

//       if (isEnterKey(key)) {
//         const answer = value || defaultValue;
//         setStatus('loading');
//         const isValid = await config.validate(answer);
//         if (isValid === true) {
//           setValue(answer);
//           setStatus('done');
//           done(answer);
//         } else {
//           // Reset the readline line value to the previous value. On line event, the value
//           // get cleared, forcing the user to re-enter the value instead of fixing it.
//           rl.write(value);
//           setError(isValid || 'You must provide a valid value');
//           setStatus('pending');
//         }
//       } else if (isBackspaceKey(key) && !value) {
//         setDefaultValue(undefined);
//       } else if (key.name === 'tab' && !value) {
//         setDefaultValue(undefined);
//         rl.clearLine(0); // Remove the tab character.
//         rl.write(defaultValue);
//         setValue(defaultValue);
//       } else {
//         setValue(rl.line);
//         setError(undefined);
//       }
//     });

//     const message = chalk.bold(config.message);
//     let formattedValue = value;
//     if (typeof config.transformer === 'function') {
//       formattedValue = config.transformer(value, { isFinal: status === 'done' });
//     }
//     if (status === 'done') {
//       formattedValue = chalk.cyan(formattedValue);
//     }

//     let defaultStr = '';
//     if (defaultValue && status !== 'done' && !value) {
//       defaultStr = chalk.dim(` (${defaultValue})`);
//     }

//     let error = '';
//     if (errorMsg) {
//       error = chalk.red(`> ${errorMsg}`);
//     }

//     return [`${prefix} ${message}${defaultStr} ${formattedValue}`, error];
//   });

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const list = require('list');

const TYPES = ['Pastel', 'Crystal', 'Metallic', 'Chrome'] as const;
type Type = typeof TYPES[number];

const MAKERS = ['Gemar', 'Qualatex', 'China'] as const;
type Maker = typeof MAKERS[number];

const COLORS = ['purple', 'green', 'silver', 'gold', 'fuxia', 'pink'] as const;
type Color = typeof COLORS[number];

type CategoryFeat = 'Latex' | 'Foil';
type SubCatFeat = 'with print' | 'without print';

class Page {
    sideBar: SideBar;
    header: Header;
    content: Content;
}

abstract class FilterSelection {
    public types: Type[];
    public makers: Maker[];
    public colors: Color[];


}

class SideBar extends FilterSelection {
    filtersChanged = new Subject<any>();

    constructor(
        public typeFilters: Type[],
        public makerFilters: Maker[],
        public colorFilters: Color[]
    ) {
        super();
    }

    selectTypeFilters(types: Type[]) {
        this.types = types;

        this.filtersChanged.next({
            types
        });
    }

    selectMakerFilters(makers: Maker[]) {
        this.makers = makers;

        this.filtersChanged.next({
            makers
        });
    }

    selectColorFilters(colors: Color[]) {
        this.colors = colors;

        this.filtersChanged.next({
            colors
        });
    }

}

class Product {
    constructor(
        public name: string,
        public price: number,
        public isAvaliable: boolean,
        public productType: Type,
        public productMaker: Maker,
        public productColor: Color,
        public category: CategoryFeat) { }
}

class Header {
    category: Category[] = [];
}

class Content extends FilterSelection {
    products: Product[];
    filteredProducts: Product[];

    filterProductsByType(types: Type[]) {
        this.filteredProducts = this.products.filter(product => types.includes(product.productType))
    };

    filterProductsByMaker(makers: Maker[]) {
        this.filteredProducts = this.products.filter(product => makers.includes(product.productMaker))
    };

    filterProductsByColor(colors: Color[]) {
        this.filteredProducts = this.products.filter(product => colors.includes(product.productColor))
    };
}

class Category {
    // public products: Product[]
    constructor(
        public name: string,
        public subcategories: Category[] = []) { }
}

// class SubCategory {
//     // subCategory: SubCatFeat;
//     constructor(public name: SubCatFeat,
//         public products: Product[]) { }
// }



// const categories = ['cat1', 'cat2'].map(name => new Category(name))

const content = new Content();

const sidebar = new SideBar(
    Array.from(TYPES),
    Array.from(MAKERS),
    Array.from(COLORS)
)

// sidebar.filtersChanged.subscribe((types, makers, colors) => {

//     content.filterProductsByType(types);
//     content.filterProductsByMaker(makers);
//     content.filterProductsByColor(colors);

// });


const products = [
    new Product('Animals', 12, true, 'Pastel', 'Gemar', 'purple', 'Latex'),
    new Product('HB', 14, true, 'Chrome', 'China', 'purple', 'Latex'),
    new Product('Elephants', 10, false, 'Pastel', 'Qualatex', 'gold', 'Latex'),
    new Product('Pink', 11, true, 'Pastel', 'Gemar', 'pink', 'Latex'),
    new Product('Couple', 12, false, 'Crystal', 'China', 'fuxia', 'Foil'),
    new Product('Rave', 14, true, 'Metallic', 'China', 'silver', 'Foil'),
    new Product('Infant', 10, false, 'Pastel', 'Qualatex', 'purple', 'Foil')
];

// let category1 = Category.name
const categories = [
    new Category('Latex', [
        //subcategories
        new Category('with print'),
        new Category('without print')
    ]),
    new Category('Foil', [
        //subcategories
        new Category('with print'),
        new Category('without print')
    ])
];






async function startTerminal() {


    clear();

    console.log(
        chalk.blue(
            figlet.textSync('Shop Shar', { horizontalLayout: 'full' })
        ))

    firstChoice();

    // chooseFilters();

}
async function firstChoice() {

    const firstOpts = await select({
        message: 'What do you want to do?',
        choices: [
            { value: 'View  all products' },
            { value: 'Search product' },
            { value: 'Add product' }
        ]
    });
    function choicess(v) {
        switch (v) {
            case 'View  all products':
                return pickFilter(v);
        }
        return v;
    }

}

async function chooseFilters() {

    const categoryAnswer = await select({
        message: 'Choose category',
        choices: [
            ...categories.map(category => ({
                name: category.name,
                value: category
            }))
        ]
    })


    clear();

    const subcategoryAnswer = await select({
        message: 'Choose subcategory',
        choices: [
            ...categoryAnswer.subcategories.map(category => ({
                name: category.name,
                value: category
            }))
        ]
    });

    clear();

    const alreadySelected: string[] = [];

    const filter1 = await pickFilter(alreadySelected);
    const filter2 = await pickFilter(alreadySelected);
    const filter3 = await pickFilter(alreadySelected);

    console.log('Picked filters', { filter1, filter2, filter3 });

    console.table(products.filter(product =>
        product.productType === filter1 &&
        product.productMaker === filter2 &&
        product.productColor === filter3
    ))

}


function getFilterOptions(filter: string) {
    switch (filter) {
        case 'Type':
            return TYPES.map(type => ({ value: type })) as any;

        case 'Maker':
            return MAKERS.map(maker => ({ value: maker })) as any;

        case 'Color':
            return COLORS.map(color => ({ value: color })) as any;
    }
}

async function pickFilter(alreadySelected: string[]) {
    const picked = await select({
        message: 'Now I wanna add',
        choices: [
            { value: 'Type' },
            { value: 'Maker' },
            { value: 'Color' },
        ].filter(choice => !alreadySelected.includes(choice.value))
        // choices: ['Type', 'Maker', 'Color'].map(v => ({
        //     value: v
        // }))
    });



    alreadySelected.push(picked);

    const answer = await select({
        message: 'Choose option',
        choices: getFilterOptions(picked)
    })

    return answer;
}

startTerminal();
