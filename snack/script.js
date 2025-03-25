//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
//Recuperare la ricetta da https://dummyjson.com/recipes/{id}
//Estrarre la proprietà userId dalla ricetta
//Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
//Restituire la data di nascita dello chef
//Note del docente
//Scrivi la funzione getChefBirthday(id), che deve:
//Essere asincrona (async).
//Utilizzare await per chiamare le API.
//Restituire una Promise con la data di nascita dello chef.
//Gestire gli errori con try/catch

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

const getChefBirthday = async (id) => {
  let recipe;
  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  } catch (error) {
    throw new Error(`Non posso recuperare la ricetta ${id}`);
  }

  let user;
  try {
    user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
  } catch (error) {
    throw new Error(
      `Non posso recuperare le informazioni dello chef ${recipe.userId}`
    );
  }

  return user.birthDate;
};

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));
