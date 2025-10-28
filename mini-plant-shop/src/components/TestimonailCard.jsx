export default function TestimonialCard({ name, review }) {
  return (
    <div className="bg-green-950/40 p-6 rounded-2xl shadow-md text-left">
      <p className="text-gray-300 mb-4">“{review}”</p>
      <h4 className="font-semibold text-green-400">{name}</h4>
    </div>
  );
}
