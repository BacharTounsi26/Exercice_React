
export default function PromoStrip() {
  const items = [
    { title: "Free Shipping", icon: "🚚", desc: "On orders over 100$" },
    { title: "Secure Payment", icon: "🔒", desc: "100% secure checkout" },
    { title: "24/7 Support", icon: "💬", desc: "We’re here to help" },
    { title: "New Products", icon: "✨", desc: "Updated weekly" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
      {items.map((i, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-slate-50 rounded py-6 shadow-sm"
        >
          <div className="text-3xl">{i.icon}</div>
          <h3 className="mt-2 font-semibold">{i.title}</h3>
          <p className="text-sm text-slate-500">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}