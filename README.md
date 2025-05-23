# 🛒 Interactive Shopping Cart (React Mini Project)

This is a beginner-friendly React project built to practice core React concepts such as state management, list rendering, and handling user interactions.

---

## 📚 Features

- ✅ Add new products to the cart  
- ✅ Increase or decrease product quantity  
- ✅ Automatically remove product when quantity reaches 0  
- ✅ Toggle items as "purchased" using checkboxes  
- ✅ Delete a product manually  
- ✅ Display total number of items and number of purchased items  

---

## 🧠 What I Learned

This project was designed to reinforce the following key React concepts:

- JSX and rendering lists with `.map()`  
- Passing props and rendering conditional UI  
- Handling events like `onClick` and `onChange`  
- Managing state using `useState`  
- Updating objects and arrays in state  
- Pure component practices and UI tree structure thinking  

---

## 🧩 Data Structure

Each product in the cart is stored as an object with the following shape:

```js
{
  id: Number,
  name: String,
  count: Number,
  purchased: Boolean
}
```

Example:

```js
{
  id: 1,
  name: "Bread",
  count: 2,
  purchased: false
}
```

---

## 🏗️ Project Structure

```
/shopping-cart-app
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js          # Main component with cart logic
│   ├── index.js        # Entry point
│   ├── App.css         # Optional styling
│   └── ...             # Additional components (optional)
│
├── package.json
└── README.md           # Project description (this file)
```

---

## 🚀 Getting Started

To run the app locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Then open your browser and visit: [http://localhost:3000](http://localhost:3000)

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

---

## 📸 UI Preview

_Add a screenshot here when your project UI is ready._  
_(Tip: Use Lightshot, Snipping Tool, or Mac Screenshot shortcut)_

---

## ✅ To-Do (Optional Enhancements)

- [ ] Add filters: All / Purchased / Not Purchased  
- [ ] Persist cart using localStorage  
- [ ] Add categories or price field  
- [ ] Style with TailwindCSS or Bootstrap  
- [ ] Make the UI responsive for mobile  

---

## 🙌 Acknowledgments

This project was built as part of my React learning journey.  
It focuses on concepts like rendering lists, handling events, and updating state using `useState`.
