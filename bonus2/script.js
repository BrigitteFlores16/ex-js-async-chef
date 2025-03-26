// Bonus 2
//Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
//Esempio di output atteso con formattazione
//Data di nascita dello chef: 15/06/1990

async function getChefBirthday(id) {
  const ricettaresponse = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe = await ricettaresponse.json();
  const userresponse = await fetch(
    `https://dummyjson.com/users/${recipe.userId}`
  );
  const user = await userresponse.json();
  const data = dayjs(user.birthDate).format("DD/MM/YYYY");
  return data;
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
