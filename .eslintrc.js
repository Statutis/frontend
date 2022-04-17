module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/no-unescaped-entities": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "settings":{
        "react": {
            "version": "detect",
        },
    }
}
