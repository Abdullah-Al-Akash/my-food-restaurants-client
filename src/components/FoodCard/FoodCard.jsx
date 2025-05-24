const FoodCard = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="bg-[#f3f3f3] shadow-xl text-center relative">  {/* <-- এখানে relative যোগ করলাম */}
      <figure>
        <img className="w-full rounded-sm" src={image} alt={name} />
      </figure>

      <p className="bg-black text-white px-4 py-2 rounded-md absolute top-0 right-0">
        ${price}
      </p>

      <div className="card-body">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        <p className="text-gray-400">{recipe.slice(0, 70)}</p>
        <div className="card-actions justify-center items-center mt-4">
          <button className="btn btn-outline text-yellow-600 bg-gray-200 border-yellow-600 border-b-2 border-0 text-xl hover:border-b-yellow-600 hover:text-yellow-600">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;