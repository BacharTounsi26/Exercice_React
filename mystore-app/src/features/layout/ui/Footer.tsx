

export default function Footer() {
  return (
    <footer className="w-full bg-[#2f2f2f] text-slate-200">
      
      {/* Top area */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* -------- Column 1: Brand + Description -------- */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">MyStore</h2>

          <p className="text-sm leading-6 text-slate-300">
            At MyStore, we bring you the latest and most innovative mobile technology all in one place. From cutting-edge smartphones and high-performance devices to essential
             accessories and smart gadgets, our store is designed to meet every digital lifestyle need.
             We carefully select top brands known for quality, reliability, and performance, ensuring that our customers always get the best value. Whether you're upgrading to
             the newest flagship model, searching for budget-friendly options,
             or looking for accessories to enhance your device, our expert team is here to guide you. 
          </p>
        </div>

        {/* -------- Column 2: Categories -------- */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>

          <ul className="space-y-3 text-slate-300 text-sm">
            {["LG", "Samsung", "Sony", "Apple", "Huawei"].map((cat) => (
              <li
                key={cat}
                className="border-b border-slate-500/30 pb-2 hover:text-indigo-300 cursor-pointer"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* -------- Column 3: Newsletter -------- */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-sm text-slate-300 mb-4">
            Sign up to our newsletter and get exclusive deals you won’t find
            anywhere else straight to your inbox!
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Type your email"
              className="flex-1 px-4 py-2 rounded bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom area */}
      <div className="border-t border-slate-600/40 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} MyStore — All rights reserved.
      </div>

    </footer>
  );
}