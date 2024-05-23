export const fetchAdherents = async () => {
  try {
    const response = await fetch("/api/allAdherent");
    return response.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des adhérents");
  }
};
