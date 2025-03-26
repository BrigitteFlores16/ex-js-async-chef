//Bonus 1
//Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
//Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

async function getChefBirthday(id) {
  let recipe;
  try {
    const ricettaresponse = await fetch(
      `https://dummyjson.com/recipes/${1234}`
    );
    recipe = await ricettaresponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Non posso recuperare la ricetta ${id}`);
  }

  if (!recipe) {
    throw new Error(`La ricetta ${id} non esiste`);
  }

  let user;
  try {
    const userresponse = await fetch(
      `https://dummyjson.com/users/${recipe.userId}`
    );
    user = await userresponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Non posso recuperare le informazioni dello chef ${id}`);
  }

  if (!user) {
    throw new Error(`Lo chef ${recipe.userId} non esiste`);
  }

  return user.birthDate;
}
(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error("Errore:", error.message);
  }
  console.log("Fine del programma!");
})();
