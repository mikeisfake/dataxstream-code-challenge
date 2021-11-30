/*----------------------------------------------------------------------------------------------------------------
 General Notes
 
 * For all exercises, please prefer readability/expressiveness over maximum algorithmic efficiency.
 
 * You may add any other code such as functions, data structures, etc. that you may want in order to better complete
 an exercise, beyond what is explicitly asked for. Feel free to reuse code for multiple exercises as well.
-----------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------
1) Create a function that takes an array of integers as its lone argument and returns an array containing
 the square of each value in the input.
 
 For example, an input of `[2, 4, 6, 8, 10]` should result in an output of `[4, 16, 36, 64, 100]`.
-----------------------------------------------------------------------------------------------------------------*/

const squareArray = (numArray) => {
  return numArray.map((n) => n * n);
};

/*----------------------------------------------------------------------------------------------------------------
 2) Create a function that takes an array of counter objects (see example) as its lone argument and returns
 the sum of all of the counters' `count` properties.
 
 For example, an input of `[{count: 1}, {count: 2}, {count: 3}]` should result in an output of `6`.
-----------------------------------------------------------------------------------------------------------------*/
const objectSum = (objArray) => {
  const reducer = (x, y) => x + y;
  return objArray
    .map((obj) => {
      return obj.count;
    })
    .reduce(reducer);
};
/*----------------------------------------------------------------------------------------------------------------
 3) Create a function that takes an object in the general shape of `movies` (see below) as the first argument,
 and the name of an actor as the second argument. The function should return an object that is equivalent to
 the input, only with the given actor's name included in each movie's `actors` array. If the name is already
 present, it should not be added again. The function should not mutate the input object, or any of its sub-structures.
 
 Note: `movies` is just an example, the function should not assume that the movies in the object will be hard-coded.
-----------------------------------------------------------------------------------------------------------------*/
const movies = {
  theGoonies: {
    actors: ["Josh Brolin", "Corey Feldman", "Kerri Green", "Guy Pearce"],
  },

  momento: {
    actors: ["Guy Pearce", "Carrie-Anne Moss", "Josh Brolin"],
  },
};

const addActor = (movies, actor) => {
  moviesClone = { ...movies };

  for (const [key, val] of Object.entries(moviesClone)) {
    if (!val.actors.map((a) => a.toLowerCase()).includes(actor.toLowerCase())) {
      val.actors.push(actor);
    }
  }
  return moviesClone;
};

/*----------------------------------------------------------------------------------------------------------------
 4) Create a procedure that takes an object in the general shape of `movies` as its lone argument and appends
 an unordered list of every actor's name to the DOM's `body` element.
 
 The names in the list should be unique (no actor's name should appear in the list more than once).
 If the list element already exists in the DOM, the procedure should replace the existing list with a new one.
 
 Bonus points if the names are alphabetically sorted :)
-----------------------------------------------------------------------------------------------------------------*/
const listActors = (movies) => {
  let list;
  if (document.body.contains(document.getElementsByTagName("ul")[0])) {
    const oldList = document.getElementsByTagName("ul")[0];
    list = document.createElement("ul");

    oldList.parentNode.replaceChild(list, oldList);
  } else {
    list = createElement("ul");
  }

  let actorsArr = [];
  for (const [key, val] of Object.entries(movies)) {
    actorsArr = [...new Set([...actorsArr, val.actors].flat())].sort();
  }
  actorsArr.map((actor) => {
    let li = document.createElement("li");
    li.innerText = actor;
    list.appendChild(li);
  });

  document.body.appendChild(list);
};
/*----------------------------------------------------------------------------------------------------------------
5) Create a procedure that retrieves the data from the REST API endpoint hosted here: https://jsonplaceholder.typicode.com/posts.
The procedure should then log the id of the first post with a userId of 7 and a title that begins with the letter "e"
(or undefined if it does not exist). It should also log any potential retrieval errors using `console.error`.
-----------------------------------------------------------------------------------------------------------------*/
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    console.error(`Error status ${res.status}`);
    return;
  }
  const posts = await res.json();

  let filteredPosts = posts.filter((post) => {
    return post.userId === 7 && post.title.charAt(0) === "e";
  });

  let result = filteredPosts.length > 0 ? filteredPosts[0].id : undefined;

  console.log(result);
};
