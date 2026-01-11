# Vue Basics

## Components

A __Component__ is a bit of code that is ideally completely reusable and independent from all of the other code in your project. It is best to think of components as building blocks in modular design. You should always strive to make your components completely reusable (meaning they have as few dependencies as possible). In Vue, they have it set up so that your component is in a single file ([Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)).

There are two types of internal API styles built in to Vue3: Options API and Composition API. 
The Options API is easier for people that have a background in Object-Oriented Programming. It is denoted with `<script><script>` tags and includes options such as `data`, `methods`, and `mounted`.
The Composition API requires a greater knowledge of the inner workings of Vue3. It is denoted by the `<script setup></script>` tags. The Composition API has the benefit of reducing boiler-plate code. This makes the component more efficient at compile time. The Compositon API is also better suited for large applications because logic in mulitiple components can be exported to a "Composable" (a file that contains javascript logic). This "Composable" can then be imported into a component for direct use.

>Note: For this class you will want to use Options API. Keep this in mind when researching Vue documentation.

We discussed earlier the different parts of these files. The `<script>` section is the most important for us in this project. This is where you tell the component what it is, what it has access to, and what it does.

Components in Vue have a wide range of capabilities that help with development. You'll be using __Props__, __The `data` object__, __The `methods` object__, and __The `mounted()` method__. The `data` object will be used to store variables, the `methods` object will be used to store methods, and the `mounted()` executes JavaScript when the component loads.  

## Data Object (method)

The `data` property of a Vue Component should be a function that returns an object. That object can be thought of as a small database just for this component containing instances of different data types.

In technical terms Vue takes all objects in the `data` function and converts them to an equivalent object that can be accessed throughout the component. In otherwords, this is where you declare variables for the component. JavaScript objects produced from the `data` object can be accessed in other parts of the script tag using the `this` keyword. Then, in the template, you can access your variables inside of elements using "mustache syntax", or double curly braces (`{{}}`). For example:

```html
<template>
  <div id='some-component'>
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: `some-component`,
  data: () => ({
    message: `welcome to vue!`
  })
}
</script>
```

## Methods Object

The methods object functions like the `data` object, but for methods. The methods declared in `methods` are made avaliable for the component and are called using the `this` object. That means you can do something like this:

```html
<template>
  <div id='some-component'>
    <button @click="messageInception"></button>
  </div>
</template>

<script>
export default {
  name: `some-component`,
  data: () => ({
    message: `welcome to vue!`,
  }),
  methods: {
    showMessage() {
      alert(this.message)
    },
    messageInception(){
      this.showMessage();
    }
  },
}
</script>
```

>Explanation: The `@` symbol is kinda hard to explain. It's syntactic sugar for the `v-on` directive, which is how you define events. In this case, `@click=""` is equivalent to `v-on:click=""`, which is equivalent to the native HTML `onclick=""` attribute.

## Props

Props are probably the most important tool when using components. Props allow you give a component data from a parent component, kind of like the parameters of a function. Let's say you had a component called `blue-button`. In the component's `.vue` file (probably named `BlueButton.vue`), there would be a `<template>`, `<script>`, and `<style>` tag that has all the information about it and any methods. Lastly, let's say that someone designed this component to take a prop, which takes in a method that should be executed when the button is clicked.

>Note: File names are written in "Pascal case" or "Capital Case" (every new word starts with a capital letter), and tags are written in "Kebab case" (words are all lower-case with hyphens between each word). The associated file for `<blue-button>` would be called `BlueButton.vue`. You can just have the tag use the same casing: `<BlueButton>`, but students have experienced odd errors from this in the past.

The following is our `BlueButton.vue`. In the `<script>` section, you'll find some code that describes the prop:

##### BlueButton.vue
```html
<template>
  <div id='blue-button'>
    <button @click='clickHandler'>Click Me</button>
  </div>
</template>

<script>
export default {
  name: `blue-button`,
  props: {
    clickHandler: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
```

Now that we've defined our `blue-button` component, we need to use it. Now, go to the `.vue` file that will become a parent component. Our example will be named `OtherComponent.vue`. We will first import `BlueButton` into `OtherComponent.vue`. Then we will insert the `blue-button` component into our `<template>` area using the following code:

```HTML
<blue-button></blue-button>
```


From our parent component, you can specify values for one or more props inside the `<blue-button>`. First,
give the name of the prop declared in the child component, and then the value to be passed in. We have defined the method `myClickHandler()` in `OtherComponent.vue` to be used by our `blue-button`. Pass your `MyClickHandler` method to the `<blue-button>` using the following syntax:

##### OtherComponent.vue
```html
<template>
  <div id='other-component'>
    <blue-button clickHandler="myClickHandler"></blue-button>
  </div>
</template>

<script>
import BlueButton from './BlueButton.vue'

export default {
  name: `other-component`,
  components: {
    BlueButton,
  },
  methods: {
    myClickHandler() {
      alert(`You clicked the blue button!`)
    },
  },
}
</script>
```

We have now given the `<blue-button>`'s `clickHandler` prop the value of the method `myClickHandler()` in `OtherComponent.vue`.

## Importing and Exporting

JavaScript, along with many other coding languages, is constantly undergoing big changes to ease development. One more recent suggestion is that instead of using `module.exports = {}`, you should be able to use `export default {}`. Newer suggestions, like this, are added one step at a time, at a pretty slow pace. However, it's slow because so many tools depend on JavaScript. The addition of new functionality means that newer applications (with the newer syntax) will not run on older browsers that lack the ability to read the newer syntax. JavaScript is called EcmaScript, and therefore you'll see the word `ES5` and `ES5` thrown around, or maybe even `ESNext`, which is an unofficial collection of syntaxes that developers like.

To make sure our application can run ANYWHERE, we use an npm package called `babel` to translate newer syntax into older syntax (And yes, it's a reference to the biblical Tower of Babel). Babel is capable of changing almost ANY of these newer sets of syntax into older JavaScript syntax. Part of the reason we're developing a website using Node.js is that when we run the site, Babel does some live translation for us. What you see in your files is not what the browser sees. To see what Babel does first-hand, run `npm run build` in a terminal and check the `dist` folder. That's your entire website, but translated into plain HTML, CSS, and ES5 JavaScript!

In a Vue project, you can use ES6 syntax instead of ES5 syntax. So this:

##### es5_export.js
```js
module.exports = {
  name: `daniel`,
  age: 25,
  country: `canada`,
}
```

##### es5_import.js
```js
const { name, age, country } = require(`./es5_export.js`)
```

is the same as this:

##### es6_export.js
```js
export default {
  name: `daniel`,
  age: 25,
  country: `canada`,
}
```

##### es6_import.js
```js
import { name, age, country } from './es6_export.js'
```

You can also export one `default` and multiple other things from a file:

##### es6_export2.js
```js
const wowza = `🤩`
export wowza

export default {
  name: `daniel`,
  age: 25,
  country: `canada`,
}
```

##### es6_import2.js
```js
import person, { wowza } from './es6_export2.js'
```

But keep in mind that the non-default exports need to be named variables.