const costValues = {
        eaten: 1,
        composted: .1,
        recycled: .05,
        trashed: 0
    },
    allItemsUsage = ['trashed', 'eaten'],
    //need to use concat here because it returns a copy of the array
    //  whereas push just adds to the same array
    additionalUsagesMap = {
        produce: allItemsUsage.concat(['composted']),
        dairy: allItemsUsage.concat(['composted']),
        drinks: allItemsUsage.concat(['recycled'])
    };

function validateFoodUsage(food) {
    //using javascript shortcircuit here because an if/switch statement would be too verbose,
    //  and this makes things cleaner at the sacrifice of readability. 
    //The logic here boils down to checking the additional usages for the current category, 
    //  and if there are none, then check if the food usage is considered valid for all foods
    return (additionalUsagesMap[food.category] && additionalUsagesMap[food.category].includes(food.usage)) || allItemsUsage.includes(food.usage);
}

function calculateOverallUsageValue(listOfFood) {
    var totalValue = 0;

    //loops through the supplied listOfFood items
    //  and checks to make sure the food has "valid" usage
    //  then adds to the total
    listOfFood.forEach(food => {
        if (validateFoodUsage(food)) {
            totalValue += (food.cost * costValues[food.usage]);
        }
    });

    //parsing value to be more inline with a dollar amount
    /*
        TODO: how to handle 1.555 (toFixed rounds to .55 and not .56)
     */
    return parseFloat(totalValue).toFixed(2);
}

module.exports = calculateOverallUsageValue;

/**
 * Additional comments/things to be considered for the future:
 *      1. costValue, allItemsUsage, and additionalUsagesMap should realistically 
 *          be coming from a DB or a config object, rather than hardcoded within the script itself.
 *      2. the use of an external utility library, such as lodash or underscore, could simplify
 *          and clean up a good portion of the code here (replacing .includes with .find, .concat 
 *          with more of an object merge), while being as optimized as possible. 
 *      3. I purposefully chose not to do any kind of data validation here (i.e., checking that
 *          all the categories are strings). In a real world scenario that's something that would
 *          (hopefully) be done in the data layer stage as things are attempted to be entered wherever 
 *          they are stored. 
 */