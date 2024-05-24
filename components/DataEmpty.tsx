const DataEmpty = ({ context }: { context: string }) => {
  if (context === "adherent") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border p-4 m-4 rounded-xl text-center">
          <h2 className="text-xl font-semibold">Aucun adhérent trouvé</h2>
          <p className="mt-2">
            Vous pouvez créer un nouvel adhérent en utilisant le bouton
            ci-dessus ↗️
          </p>
        </div>
      </div>
    );
  }

  if (context === "partenariat") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border p-4 m-4 rounded-xl text-center">
          <h2 className="text-xl font-semibold">Aucun partenaire trouvé</h2>
          <p className="mt-2">
            Vous pouvez créer un nouveau partenaire en utilisant le bouton
            ci-dessus ↗️
          </p>
        </div>
      </div>
    );
  }
};

export default DataEmpty;
