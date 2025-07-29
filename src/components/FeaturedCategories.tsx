
import Image from "next/image";

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Traditional Indian Elegance
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Discover the timeless beauty of Indian traditional wear, from elegant
            sarees to stunning lehengas, comfortable kurtis to exquisite
            jewelry
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                alt="Beautiful traditional sarees"
                className="w-full h-48 object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb"
                width={400}
                height={400}
                data-ai-hint="elegant sarees"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Elegant Sarees
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Timeless drapes in silk, cotton, and designer fabrics with
              intricate patterns and rich colors
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                alt="Stunning traditional lehengas"
                className="w-full h-48 object-cover rounded-xl"
                src="https://images.pexels.com/photos/32761637/pexels-photo-32761637.jpeg"
                width={400}
                height={400}
                data-ai-hint="stunning lehengas"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Stunning Lehengas
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Magnificent bridal and festive lehengas with exquisite embroidery
              and contemporary designs
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                alt="Comfortable traditional kurtis"
                className="w-full h-48 object-cover rounded-xl"
                src="https://placehold.co/400x400.png"
                width={400}
                height={400}
                data-ai-hint="designer kurtis"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Designer Kurtis
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Comfortable yet elegant kurtis perfect for daily wear and special
              occasions
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                alt="Exquisite traditional jewelry"
                className="w-full h-48 object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1707149974694-59aeae107d7f"
                width={400}
                height={400}
                data-ai-hint="traditional jewelry"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Traditional Jewelry
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Handcrafted jewelry pieces that complement every traditional
              outfit with timeless elegance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
