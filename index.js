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
    //The logic here boils down to checking the additional usages for the current category, 
    //  and if there are none, then check if the food usage is considered valid for all foods
    return (additionalUsagesMap[food.category] && additionalUsagesMap[food.category].includes(food.usage)) || allItemsUsage.includes(food.usage);
}

function calculateOverallUsageValue(listOfFood) {
    var totalValue = 0;

    //loops through the supplied listOfFood items
    //  and checks to make sure the food has "valid" usage
    //  then adds to the total
    if(listOfFood) {
        listOfFood.forEach(food => {
            //could use the shortcircuit here to save a line, but since it's not returning anything, it's probably
            //  not best practice
            if (validateFoodUsage(food)) {
                totalValue += (food.cost * costValues[food.usage]);
            }
        });
    }

    //parseFloat to ensure we're changing a floating point number
    //.toFixed has a weird issue due to how floating point numbers work in
    //  JS. .555 won't round to .56, but .55 instead (not the case for .455 or .655).
    //  Would probably consider an outside library in order to get the proper calculation
    //I'm avoiding using simple arithmetic to do this because if, in the future, this needs to be
    //  updated (from 2 decimal places to 3), this is much easier than trying to figure out a new 
    //  formula. This also gives better justification to find an outside library to handle this 
    //  for us. 
    return new Number(parseFloat(totalValue).toFixed(2));
}

module.exports = calculateOverallUsageValue;

/**
 * Additional comments/things to be considered for the future:
 *      1. costValue, allItemsUsage, and additionalUsagesMap should realistically 
 *          be coming from a DB or a config object, rather than hardcoded within the script itself.
 *          But the solution presented should be able to be used during a promise chain, observable subscribe,
 *          or just importing the data directly. 
 *      2. You could use an external utility library like lodash or underscore here, but the gains would be negligible.
 *          If this was a fullscale application with the libraries already being used, then it would be worth using them,
 *          but for a simple file like this, it would be overkill.
 *      3. I purposefully chose not to do any kind of data validation here (i.e., checking that
 *          all the categories are strings). In a real world scenario that's something that would
 *          (hopefully) be done in the data layer stage as things are attempted to be entered wherever 
 *          they are stored. 
 */