 import express from "express";


 const app = express();  
 const PORT = process.env.PORT || 3000;



app.use(express.static("public"));
app.use(express.static("public", { maxAge: "1d" }));

 import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.locals.siteTitle = 'My Book to Movie Site Log';


app.use(express.json());

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

let sessionVisits = 0;
app.use((req, res, next) => {
  sessionVisits++;
  res.locals.sessionVisits = sessionVisits;
  next();
});





app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next(); // moves on to the next middleware or route
});

 app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});






app.get("/time", (req, res) => {
  res.send(`This request was received at ${req.requestTime}`);
});


app.get("/", (req, res) => {
  res.render("home", { pageTitle: "home", activePage: "home"  });
});
app.get("/add", (req, res) => {
  res.render("add", { pageTitle: "add", activePage: "add entry" });
});
app.get("/genres", (req, res) => {
  res.render("genres", { pageTitle: "genres", activePage: "genres" });
});

app.get("/Why", (req, res) => {
  res.render("why", { pageTitle: "Why I Have Made this App! 🖥❤", activePage: "why" });
});

app.get("/about", (req, res) => {
  const sampleabout = ["Safe Haven","Save the Last Dance", "Where the Heart Is", "The Last Song", "SisterHood of the Traveling Pants",
    "A Walk To Remember", "The Lucky One", "Secretariat","Flicka","One for the Money","The Fault in our Stars",
  ];
  res.render("about", { pageTitle: "Some Titles I love!", items: sampleabout });
});












const recipes = [
  { 
    id: 1, 
    title: "Classic Lasagna", 
    description: "Layers of pasta, cheese, and sauce.", 
    ingredients: ["pasta", "cheese", "tomato sauce"],
    image: "classiclasagna.png"
  },
  { 
    id: 2, 
    title: "Spinach Lasagna", 
    description: "A lighter take with spinach and ricotta.",
    ingredients: ["spinach", "ricotta", "pasta"],
    image: "spinachlasagna.jpg"
  },
  { 
    id: 3, 
    title: "Vegan Lasagna", 
    description: "Plant-based lasagna with cashew cheese.",
    ingredients: ["zucchini", "cashew cheese", "tomato"],
    image: "vegetablelasagna.png"
  }
];



app.use("/images", express.static("images"));
app.use(express.static("public"));

app.post("/color", (req, res) => {
  const color = req.body.color; // pulls data from the form
  console.log(req.body);

  res.send(`Your favorite color is ${color}! 🎨`);
});

// Route to handle form submission
app.post("/add", (req, res) => {
  const input = req.body.entry;
  console.log(req.body);
  res.send(`You submitted: ${input}`);
});


 
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};




app.get("/", (req, res) => {  
  res.send("Welcome to my first Book to Movie Log! 🎞📘");  
});
app.get("/about", (req, res) => {  
  res.send("About page: This is my first Book to Movie App! 📖🎞");  
});
app.get("/hello/:name", (req, res) => {
  const { name } = req.params; // pulls the dynamic value from the URL
  res.send(`Hello, ${name}! 👋`);
});
app.get("/Book/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Tracking Book and Movie: ${name} 📖📺`);
});
app.get("/Movie/:title", (req, res) => {
  const { title } = req.params;
  res.send(`Motion Picture: ${title}! 🤦‍♀️📕`);
});
app.get("/hello/:name/:timeOfDay", (req, res) => {
  const { name, timeOfDay } = req.params;
  res.send(`Good Evening ${timeOfDay}, ${name}! 🌨⛅`);
});
app.get("/search", (req, res) => {
  const term = req.query.term?.toLowerCase() || "";
  const limit = parseInt(req.query.limit) || 5;
  const results = recipes
    .filter(r => r.title.toLowerCase().includes(term))
    .slice(0, limit);
  res.send(`
<h1>Searching for "${term}" — showing up to ${limit} results.</h1>
    <ul>
${results.map(r => `<li><a href="/recipe/${r.id}">${r.title}</a></li>`).join("")}
    </ul>
  `);
});
app.get("/Book-Movie/:title", (req, res) => {
  const {title} = req.params;
  res.send (`Tracking Book-Movie: ${title}!`);
});
app.get("/Titles/:id", (req, res) => {
  res.send(`Titles of Motion Picture-Books #${req.params.id}`);
});
app.get("/fun", (req, res) => {
  res.send(`💯💬🦅👩‍🎓✍🖥 #${req.params.fun}`);
});
app.get("/recipe/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return res.status(404).send("Recipe not found!");
  }
  res.send(`
    <h1>${recipe.title}</h1>
<img src="/images/${recipe.image}" alt="${recipe.title}" style="max-width:300px; display:block; margin-bottom:10px;" />
    <p>${recipe.description}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <a href="/search?term=lasagna&limit=5">⬅ Back to search</a>
  `);
});
 app.get("/hello", (req, res) => {
  res.send("👋 Hello from Express!");
});
 app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome!</h1><p>This page is sent with Express 🚀</p>");
});
 app.get("/list", (req, res) => {
  res.send("<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>");
});
app.get("/tattoo", (req, res) => {
  res.send("One day at a time! 🦋");
});
 app.get("/Log", (req, res) => {
  res.send("<h1>Excited for my Book to Movie Log!</h1><p>See some Amazing Titles Here!</p>");
});
app.get("/titles", (req, res) => {
  res.send("<ul><li>Safe Haven</li><li>Where the Heart Is</li><li>The Last Song</li></ul>");
});
app.get("/why", (req, res) => {
  res.send("<p>I have created this log to remember my favorite Book to Movies that I have read and watched! 📚 📽</p>");
});
app.get("/genres", (req, res) => {
  res.send("<p>Romance,Comedy,Family,");
});

app.get("/movies", (req, res) => {
  res.send("Here’s where all the movies will go!");
});

app.get("/movies/:id", (req, res) => {
  res.send(`Details for movies #${req.params.id}`);
});

   app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, Express JSON!", emoji: "👋" });
});

  app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
    { id: 3, name: "Item Three" }
  ]);
});
 app.get("/api/movies", (req, res) => {
  res.json([
    { id: 1, title: "Safe Haven" },
    { id: 2, title: "Where The Heart Is" },
    { id: 3, title: "The Last Song" }
  ]);
});

app.get("/api/genres/", (req, res) => {
  res.json([ 
    { id: 1, genre: "Romance" },
    { id: 2, genre: "Comedy" },
    { id: 3, genre: "Family" }
  ]);
});

 


















app.listen(PORT, () => {  
  console.log(`Server running at http://localhost:${PORT}`);  
});




 app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Not Found",
    url: req.originalUrl,
    activePage: '404' // Pass a value for activePage
  });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  const status = err.status || 500;

  // Minimal logging
  console.error(`[ERROR] ${status} ${req.method} ${req.url}`, err.message);

  res.status(status).render("500", {
    pageTitle: "Server Error",
    message: isProd ? "Something went wrong." : (err.message || "Error"),
    stack: isProd ? null : err.stack,
    message: 'Internal Server Error',
    
    activePage: 'error', // Pass a value for activePage
  });
});
