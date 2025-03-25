//Bonus 1
//Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
//Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getChefBirthday(id) {
  let recipe;
  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  } catch (error) {
    throw new Error(`Non posso recuperare la ricetta ${id}`);
  }

  if (recipe.message) {
    throw new Error(recipe.message);
  }

  let user;
  try {
    user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
  } catch (error) {
    throw new Error(
      `Non posso recuperare le informazioni dello chef ${recipe.userId}`
    );
  }

  if (user.message) {
    throw new Error(user.message);
  }

  return user.birthDate;
}

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));
