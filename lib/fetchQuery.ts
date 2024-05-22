export const fetchAdherents = async () => {
  try {
    const response = await fetch("/api/allAdherent");
    console.log("je suis dans fetchAdherents après reponse");

    console.log(response);
    return response.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des adhérents");
  }
};
