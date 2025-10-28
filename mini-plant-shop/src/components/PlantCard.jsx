export default function PlantCard({ name, price, img }) {
  return (
    <div className="bg-green-950/40 p-6 rounded-2xl shadow-md hover:shadow-green-800/40 transition">
      <img src={img} alt={name} className="rounded-xl w-full h-52 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-green-400 mt-2">{price}</p>
      <button className="mt-4 px-4 py-2 border border-green-500 rounded-lg hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
}
