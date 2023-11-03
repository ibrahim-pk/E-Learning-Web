
module.exports = {
overrides: [
    {
        files: [ "**/*.ts?(x)" ],
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            },
            ecmaVersion: 2018,
            sourceType: "module"
        },
        plugins: [
            "@typescript-eslint"
        ],
        // You can add Typescript specific rules here.
        // If you are adding the typescript variant of a rule which is there in the javascript
        // ruleset, disable the JS one.
        rules: {
            "@typescript-eslint/no-array-constructor": "warn",
            "no-array-constructor": "off"
        }
    }
]

}