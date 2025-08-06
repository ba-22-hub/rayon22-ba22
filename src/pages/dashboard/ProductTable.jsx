// Importing dependencies
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";
import { useAuthor } from '../../context/AuthorContext';
import { useNavigate } from 'react-router-dom';

// Importing common components
import FunctionButton from "@common/FunctionButton.jsx";
import Loading from '@common/Loading.jsx';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const { isAdmin, loading } = useAuthor()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return <Loading/>; // wait for the author informations to be fetch
		if (!isAdmin){
			navigate('/admin')
			return;	
		}
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");
      if (error) console.error("Erreur chargement produits :", error);
      else setProducts(data);
    };
    fetchProducts();
  }, [loading]);

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditValues(product);
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleValidate = async () => {
    const { error } = await supabase
      .from("Products")
      .update(editValues)
      .eq("id", editingProductId);
    if (error) console.error("Erreur update :", error);
    else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProductId ? editValues : p))
      );
      setEditingProductId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Produits</h1>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nom</th>
              <th className="p-2">Prix en magasin (euro)</th>
              <th className="p-2">Prix rayon22 (euro)</th>
              <th className="p-2">Poids (gramme)</th>
              <th className="p-2">Catégorie</th>
              <th className="p-2">Image</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-t">
                {editingProductId === p.id ? (
                  <>
                    <td className="p-2">
                      <input
                        name="name"
                        value={editValues.name}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="price_eur"
                        value={editValues["price_eur"]}
                        onChange={handleChange}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="salePrice_eur"
                        value={editValues["salePrice_eur"]}
                        onChange={handleChange}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="weight_g"
                        value={editValues["weight_g"]}
                        onChange={handleChange}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="category"
                        value={editValues.category}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <FunctionButton
                        className="bg-gray px-2 py-1 rounded"
                        buttonText="Browse"
                        fun={() => { }}
                      />
                    </td>
                    <td className="p-2 space-x-2">
                      <FunctionButton
                        className="bg-green text-white px-2 py-1 rounded"
                        buttonText="Valider"
                        fun={handleValidate}
                      />
                      <FunctionButton
                        className="bg-gray text-white px-2 py-1 rounded"
                        buttonText="Annuler"
                        fun={() => setEditingProductId(null)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p["price_eur"]}</td>
                    <td className="p-2">{p["salePrice_eur"]}</td>
                    <td className="p-2">{p["weight_g"]}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">
                      <FunctionButton
                        className="bg-gray px-2 py-1 rounded"
                        buttonText="Browse"
                        fun={() => { }}
                      />
                    </td>
                    <td className="p-2 space-x-2">
                      <FunctionButton
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                        buttonText="Modifier"
                        fun={() => handleEdit(p)}
                      />
                      <FunctionButton
                        className="bg-red text-white px-2 py-1 rounded"
                        buttonText="Supprimer"
                        fun={() => console.log("Suppression :", p.id)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;