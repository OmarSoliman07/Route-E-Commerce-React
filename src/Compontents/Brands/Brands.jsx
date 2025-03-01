import { useEffect, useState } from "react";

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://ecommerce.routemisr.com/api/v1/brands")
            .then(response => response.json())
            .then(data => {
                setBrands(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching brands:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-main">Our Brands</h2>
            
           

   
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brands.map((brand) => (
                    <div 
                        key={brand._id} 
                        className="p-4 mt-6 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)] border border-transparent hover:border-main duration-500 group overflow-hidden space-y-3 text-center bg-white rounded-lg h-40"
                       
                    >
                        <img src={brand.image} className="w-full h-24 object-contain mx-auto" alt={brand.name} />
                        <h5 className="text-main font-semibold mt-2">{brand.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}
