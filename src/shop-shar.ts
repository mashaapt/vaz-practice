import { Subject } from 'rxjs';
import { select, input, confirm } from '@inquirer/prompts';
// import { NumberPrompt, prompt } from '@enquirer';

import * as chalk from 'chalk';
import * as clear from 'clear';
import * as figlet from 'figlet';

const { NumberPrompt } = require('enquirer');

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
        public category: CategoryFeat,
        public subcategory: SubCatFeat) { }
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


interface Filter {
    property: string;
    value: string;
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
    new Product('Animals', 12, true, 'Pastel', 'Gemar', 'purple', 'Latex', 'with print'),
    new Product('HB', 14, true, 'Chrome', 'China', 'purple', 'Latex', 'without print'),
    new Product('Elephants', 10, false, 'Pastel', 'Qualatex', 'gold', 'Latex', 'with print'),
    new Product('Pink', 11, true, 'Pastel', 'Gemar', 'pink', 'Latex', 'with print'),
    new Product('Couple', 12, false, 'Crystal', 'China', 'fuxia', 'Foil', 'without print'),
    new Product('Rave', 14, true, 'Metallic', 'China', 'silver', 'Foil', 'without print'),
    new Product('Infant', 10, false, 'Pastel', 'Qualatex', 'purple', 'Foil', 'with print')
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

    while (true) {
        await firstChoice();

        const shouldCont = await confirm({
            message: 'Would you like to restart the programm?'
        })

        if (!shouldCont) {
            break;
        }

    }


}

// type FirstOptions = 'ViewAll' | 'Search' | 'AddProduct';
enum FirstOptions {
    ViewAll,
    Search,
    AddProduct
}

enum SearchOption {
    ByText,
    ByCategory
}

async function firstChoice() {

    const firstSelection = await select({
        message: 'What do you want to do?',
        choices: [
            { name: 'View  all products', value: FirstOptions.ViewAll },
            { name: 'Search product', value: FirstOptions.Search },
            { name: 'Add product', value: FirstOptions.AddProduct }
        ]
    });

    switch (firstSelection) {
        case FirstOptions.ViewAll:
            return viewAllProducts();
        case FirstOptions.Search:
            return chooseSearchType();
        case FirstOptions.AddProduct:
            return addProduct();
    }

    function viewAllProducts() {
        console.table(products);
    }

    async function chooseSearchType() {

        const searchSelection = await select({
            message: 'What do you want to do?',
            choices: [
                { name: 'Search by text', value: SearchOption.ByText },
                { name: 'Search by categories', value: SearchOption.ByCategory },

            ]
        });

        switch (searchSelection) {
            case SearchOption.ByText:
                return searchByName();
            case SearchOption.ByCategory:
                return searchByCategory();
        }


        async function searchByName() {

            const textInput = await input({
                message: 'Type name of the product'
            })

            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(textInput.toLowerCase()));
            console.table(filteredProducts);
        }

        async function searchByCategory() {
            const filters = await chooseFilters();

            console.table(filterProducts(filters))
        }

    }

    function filterProducts(filters: Filter[]) {
        return products.filter(product =>
            product.category === getFilter(filters, 'category') &&
            product.subcategory === getFilter(filters, 'subcategory') &&
            product.productType === getFilter(filters, 'Type') &&
            product.productMaker === getFilter(filters, 'Maker') &&
            product.productColor === getFilter(filters, 'Color')
        )
    }

    function getFilter(filters: Filter[], property: string) {
        return filters.find(filter => filter.property === property)?.value;
    }

    async function addProduct() {
        const name = await getProductsName();
        const filters = await chooseFilters();
        const price = await getProductsPrice();
        const isAvaliable = await getIsAvailable();;

        const product = new Product(
            name,
            price,
            isAvaliable,
            getFilter(filters, 'Type') as Type,
            getFilter(filters, 'Maker') as Maker,
            getFilter(filters, 'Color') as Color,
            getFilter(filters, 'category') as CategoryFeat,
            getFilter(filters, 'subcategory') as SubCatFeat,
        );


        products.push(product);
console.log(price)
        console.log('Added product!')
        console.table(product);


    }
}


async function getProductsName() {
    const nameInput = await input({
        message: 'Type name for this product'
    })
    return nameInput;
}

async function getProductsPrice() {
    const priceInput = await input({
        message: 'Type price for this product'
    })
    return +priceInput;
}

async function getIsAvailable() {
    const isAvaliableNewProduct = await confirm({
        message: 'Is this produst available now?'
    })
    return isAvaliableNewProduct;
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

    // console.log('Picked filters', { filter1, filter2, filter3 });

    return [
        { property: 'category', value: categoryAnswer.name },
        { property: 'subcategory', value: subcategoryAnswer.name },
        filter1,
        filter2,
        filter3
    ]

}


function getFilterOptions(filter: string) {
    switch (filter) {
        case 'Type':
            return TYPES.map(type => ({ value: type as string }));

        case 'Maker':
            return MAKERS.map(maker => ({ value: maker as string }));

        case 'Color':
            return COLORS.map(color => ({ value: color as string }));

        default: return [];
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

    return {
        property: picked,
        value: answer
    } as Filter;
}


startTerminal();
