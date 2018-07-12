var calculateOverallUsageValue = require('../index');

describe('calculateOverallUsageValue', () => {
    it('should be defined', () => {
        expect(calculateOverallUsageValue).toBeDefined();
    });

    [
        {
            testName: 'supplied example',
            data: [
                {category: 'produce', cost: 1.00, usage: 'eaten'},
                {category: 'produce', cost: 1.50, usage: 'trashed'},
                {category: 'dairy',   cost: 3.00, usage: 'composted'},
                {category: 'dairy',   cost: 4.00, usage: 'recycled'},
                {category: 'drinks',  cost: 2.00, usage: 'recycled'},
                {category: 'meat',    cost: 5.00, usage: 'composted'},    
            ],
            expectedResult: '1.40'
        },
        //I'm focusing on testing requirements over things like "single item valid/invalid"
        //  or "all items valid/invalid". I feel as though those ideas are covered by 
        //  having more requirment driven tests
        {
            testName: 'additional usage requirements',
            data: [
                //Adding only one extra "non additional requirement" to ensure that 
                //  only the specified categories affect the final result
                {category: 'produce', cost: 1.00, usage: 'composted'},
                {category: 'dairy', cost: 1.00, usage: 'composted'},
                {category: 'drinks', cost: 1.00, usage: 'recycled'},
                {category: 'meat', cost: 1.00, usage: 'recycled'}
            ],
            expectedResult: '0.25'
        },
        {
            //The idea here was to use different categories than those of the additionally defined
            //  requirements. Because trashed and eaten can be used for any food category,
            //  testing them through different categories, will also test them through the ones above
            testName: 'base usage requirements',
            data: [
                {category: 'meat', cost: 1.00, usage: 'trashed'},
                {category: 'snacks', cost: 1.00, usage: 'eaten'},
            ],
            expectedResult: '1.00'
        }
    ]
    .forEach((config, index) => {
        it(`should output the correct value: ${config.testName}`, () => {
            expect(calculateOverallUsageValue(config.data)).toEqual(config.expectedResult);
        });
    });
});