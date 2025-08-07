// Importing dependencies
import { useEffect, useState, useRef } from "react";
import { supabase } from "@lib/supabaseClient";

// Importing common components
import FormInput from "@common/FormInput"
import FunctionButton from "@common/FunctionButton.jsx";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [expanded, setExpanded] = useState(false);
  // For image upload
  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  // useState init to store the form data in a JSON format
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    salePrice: '',
    category: '',
    weight: '',
    image_name: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");
      if (error) console.error("Erreur chargement produits :", error);
      else setProducts(data);
    };
    const updateForm = async () => {
      setFormData(formData)
    }
    fetchProducts();
    updateForm();
  }, []);

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedValues(product);
  };

  const handleChangeInProd = (e) => {
    setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
  };

  // function to set the new formData value whenever the inputs are changed
  function handleChangeInForm(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleValidate = async () => {
    console.log("editedValues" + editedValues)
    const { error } = await supabase
      .from("Products")
      .update(editedValues)
      .eq("id", editingProductId);
    if (error) console.error("Erreur update :", error);
    else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProductId ? editedValues : p))
      );
      setEditingProductId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(e) {

    console.log("Form submitted with data:", formData, "Need API call to send this data");

    // Adding a new row to the 'Products' database
    const { error } = await supabase
      .from('Products')
      .insert(formData)

    if (error) {
      console.error("Erreur lors de la création Supabase:", error.message);
      return;
    }

    // Saving locally the user info to use it after the mail verification
    localStorage.setItem("pendingUserData", JSON.stringify(formData));

    setFormData({
      name: '',
      price: '',
      salePrice: '',
      category: '',
      weight: '',
      image_name: '',
    })

    setExpanded(false)
  }

  const BrowseImage = (newProduct, product) => {
    const handleFileUpload = e => {
      const { files } = e.target;
      if (files && files.length) {
        {
          newProduct ? (
            setFormData(prevData => ({
              ...prevData,
              image_name: files[0].name
            }))
          ) : (
            () => handleEdit(product),
            setEditedValues(prevData => ({
              ...prevData,
              image_name: files[0].name
            })),
            () => handleChangeInProd(product)
          )
        }
        setImage(files[0]);
      }
    };

    const onButtonClick = () => {
      inputFile.current.click();
    };

    return (
      <div>
        <input
          style={{ display: "none" }}
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <div className="bg-rayonorange px-2 py-1 rounded button text-white" onClick={onButtonClick}>
          Browse
        </div>
      </div>
    );
  };

    const BrowseImageChange = (product) => {
    const handleFileUpload = e => {
      const { files } = e.target;
      if (files && files.length) {
        () => handleEdit(product),
          setEditedValues(prevData => ({
            ...prevData,
            image_name: files[0].name
          }))
      }
      setImage(files[0]);
    };

    const onButtonClick = () => {
      inputFile.current.click();
    };

    return (
      <div>
        <input
          style={{ display: "none" }}
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <div className="bg-rayonorange px-2 py-1 rounded button text-white" onClick={onButtonClick}>
          Browse
        </div>
      </div>
    );
  };

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
                        value={editedValues["name"]}
                        onChange={handleChangeInProd}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="price"
                        value={editedValues["price"]}
                        onChange={handleChangeInProd}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="salePrice"
                        value={editedValues["salePrice"]}
                        onChange={handleChangeInProd}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="weight"
                        value={editedValues["weight"]}
                        onChange={handleChangeInProd}
                        type="number"
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        name="category"
                        value={editedValues["category"]}
                        onChange={handleChangeInProd}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <BrowseImageChange newProduct={false} product={p}></BrowseImageChange>
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
                    <td className="p-2">{p["price"]}</td>
                    <td className="p-2">{p["salePrice"]}</td>
                    <td className="p-2">{p["weight"]}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">
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
      <FunctionButton
        className="bg-rayonorange  w-[1/2] content-center ml-30 my-4 text-white px-10 py-1 rounded"
        buttonText={expanded ? 'Annuler' : 'Ajouter un produit'}
        fun={expanded ? (() => setExpanded(false)) : (() => setExpanded(true))}
      />
      {expanded && (
        <div>
          <p className='text-red text-center text-[1.2rem] mlr-[8%] '>Les informations avec une étoile rouge sont indispensables à l'ajout d'un produit dans la base de données.</p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            {[
              ['name', 'Nom', false, "text"],
              ['price', 'Prix en magasin (€)', false, "number"],
              ['salePrice', 'Prix rayon22 (€)', false, "number"],
              ['category', 'Catégorie', true, "text"],
              ['weight', 'Poids (g)', false, "number"],
              ['image_name', 'Poids (g)', false, "text"],
            ].map(([field, label, nullable, type]) => (
              field === 'image_name' ? (
                <BrowseImage newProduct={true}></BrowseImage>
              ) : (
                <div key={field}>
                  <FormInput
                    labelClassName="ml-[8%]"
                    type={type}
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    inputText={label}
                    name={field}
                    value={formData[field] ?? ""}
                    onChange={handleChangeInForm}
                    isStarred={nullable ? false : true} />
                </div>
              )
            ))}
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#038709] text-white rounded"
            >Valider</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default ProductTable;