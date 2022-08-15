import { vi_enUpperChar } from "./constants"

/**
 * Auto generate FoodCode from FoodName
 * Author: VQPhong (20/07/2022)
 */
export const genCodeFromName = (name, isWholeName) => {
    if (isWholeName) {
        return name.split('')
            .filter(c => c !== ' ')
            .map(c => vi_enUpperChar[c.toUpperCase()] ? vi_enUpperChar[c.toUpperCase()] : c.toUpperCase())
            .join('');
    }

    if (name.split(' ').length <= 1) {
        return name.split('')
            .map(c => vi_enUpperChar[c.toUpperCase()] ? vi_enUpperChar[c.toUpperCase()] : c.toUpperCase())
            .join('');
    }

    return name.split(' ')
        .map(c => vi_enUpperChar[c[0].toUpperCase()] ? vi_enUpperChar[c[0].toUpperCase()] : c[0].toUpperCase())
        .join('');
}

/**
 * Author: VQPhong (08/08/2022)
 * Generate code from name (priority 1)
 * Get the 1st letters in each word in the name
 */
export const genCode_1 = (name) => {
    return name
        .toString()
        .trim()
        .split(' ')
        .map(c => vi_enUpperChar[c[0].toUpperCase()] ? vi_enUpperChar[c[0].toUpperCase()] : c[0].toUpperCase())
        .join('');
}

/**
 * Author: VQPhong (08/08/2022)
 * Generate code from name (priority 2)
 * Get the first 2 letters in each word in the name
 */
export const genCode_2 = (name) => {
    return name
        .toString()
        .trim()
        .split(' ')
        .map(c => {
            let first = vi_enUpperChar[c[0].toUpperCase()] ? vi_enUpperChar[c[0].toUpperCase()] : c[0].toUpperCase();
            let second;
            if (c.length > 1) {
                second = vi_enUpperChar[c[1].toUpperCase()] ? vi_enUpperChar[c[1].toUpperCase()] : c[1].toUpperCase();
            } else {
                second = ' ';
            }

            return first + second;
        })
        .join('')
        .trim();
}

/**
 * Author: VQPhong (08/08/2022)
 * Generate code from name (priority 3)
 * Get the all letters in the name (except space)
 */
export const genCode_3 = (name) => {
    return name
        .toString()
        .trim()
        .split('')
        .filter(c => c !== ' ')
        .map(c => vi_enUpperChar[c.toUpperCase()] ? vi_enUpperChar[c.toUpperCase()] : c.toUpperCase())
        .join('');
}

/**
 * Change money (1000000 => 1.000.000)
 * Author: VQPhong (20/07/2022)
 */
export const filterFromMoney = (money) => {
    if (typeof money === 'number') {
        money = Math.round(money);
    }
    return money
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Filter money (Another way to filter money to right format string)
 * Author: VQPhong (19/07/2022)
 */
export const filterMoney = (value) => {
    value = Math.round(value);

    const formatterVN = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return formatterVN.format(value).slice(0, -2);
}

/**
 * Change string to money (1.000.000 => 1000000 ~ number)
 * Author: VQPhong (20/07/2022)
 */
export const filterToMoney = (money) => {
    return parseFloat(money.toString().split('').filter(c => c !== '.').join(''));
}

/**
 * Define the event blur of an element
 * Copy from stackoverflow
 * Author: VQPhong (21/07/2022)
 */
export const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

/**
 * Author: VQPhong (10/08/2022)
 * Ignore favorite services which are empty (Content: "", Surcharge: 0) from list of Favorite service
 */
export const filterEmptyFavorService = (listFS) => {
    if (listFS === []) return [];

    let res = [];

    for (const item of listFS) {
        if (!item.Content && (item.Surcharge === 0 || item.Surcharge === '0')) {
            continue;
        } else {
            res.push({ FavorServiceID: item.FavorServiceID, Content: item.Content, Surcharge: filterToMoney(item.Surcharge) });
        }
    }

    return res;
}

/**
 * Author: VQPhong (14/08/2022)
 * Check if list of favorite services contains element that has no content but Surcharge
 */
export const isNoContentInFS = (listFS) => {
    if (listFS === []) return false;

    return listFS.some(i => !i.Content && i.Surcharge !== '0' && i.Surcharge > 0 && i.Surcharge !== null);
}

/**
 * Author: VQPhong (12/08/2022)
 * Return a list of FS which are duplicated
 */
export const listDuplicatedFS = (listFS) => {
    if (listFS === []) return [];

    let res = [];
    let tempListFS = listFS.sort(sortFavorService);

    for (let i = 1; i < tempListFS.length; i++) {
        if (sortFavorService(tempListFS[i - 1], tempListFS[i]) === 0) {
            if (!res.includes(tempListFS[i])) {
                res.push(tempListFS[i]);
            }
        }
    }

    return res;
}

/**
 * Author: VQPhong (12/08/2022)
 * Function for custom sort for FS 
 */
export const sortFavorService = (a, b) => {
    if (a.Content.toUpperCase() < b.Content.toUpperCase()) {
        return -1;
    } else if (a.Content.toUpperCase() > b.Content.toUpperCase()) {
        return 1;
    } else {
        if (filterToMoney(a.Surcharge) < filterToMoney(b.Surcharge)) {
            return -1;
        } else if (filterToMoney(a.Surcharge) > filterToMoney(b.Surcharge)) {
            return 1;
        } else {
            return 0;
        }
    }
}