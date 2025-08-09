// Importing dependencies
import { useEffect, useState, useRef } from "react";
import { supabase } from "@lib/supabaseClient";
import { uploadImage } from '@lib/uploadImage.js'

// Importing common components
import FormInput from "@common/FormInput"
import { useAuthor } from '../../context/AuthorContext';
import { useNavigate } from 'react-router-dom';

// Importing common components
import FunctionButton from "@common/FunctionButton.jsx";
import Loading from '@common/Loading.jsx';

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

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) console.error("Erreur chargement produits :", error);
    else setProducts(data);
  };

  const { isAdmin, loading } = useAuthor()
  const navigate = useNavigate()

  useEffect(() => {
    const updateForm = async () => {
      setFormData(formData)
    }

    if (loading) return; // wait for the author informations to be fetch
    if (!isAdmin) {
      navigate('/admin')
      return;
    }

    fetchProducts();
    updateForm();
  }, [loading]);

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedValues(product);
  };

  const handleChangeInProd = (e) => {
    setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
    if (e.target.name == "image_name") {
      console.log("Setting image")
      const { files } = e.target;
      setImage(files[0])
    }
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
    if (image != "") {
      uploadImage(image, image.name)
    }
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
    setImage("")
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

    // Uploading the image to the 'images' bucket
    uploadImage(image, image.name)
    setImage("")

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
    fetchProducts()
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
        <div className="bg-rayonorange px-2 py-1 rounded button text-white text-center mx-[8%]" onClick={onButtonClick}>
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
    <>
      {loading ? (
        <Loading />
      ) : (
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
                          {
                            ["légumes", "fruits", "féculents", "conserves", "hygiène", "autre"].map((category) => (
                              <div key={category}>
                                <input type="radio" name="category" value={category} onChange={handleChangeInProd} required /> <a className="ml-1 mr-5">{category}</a>
                              </div>
                            ))}
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
              <div className="grid grid-cols-2 gap-4 text-sm mb-4 items-center">
                <div>
                  <FormInput
                    name="name"
                    type="text"
                    value={formData["name"] ?? ""}
                    inputText="Nom"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={true} />
                </div>
                <div>
                  <FormInput
                    name="price"
                    type="number"
                    value={formData["price"] ?? ""}
                    inputText="Prix en magasin (€)"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={true} />
                </div>
                <div>
                  <FormInput
                    name="salePrice"
                    type="number"
                    value={formData["salePrice"] ?? ""}
                    inputText="Prix rayon22 (€)"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={true} />
                </div>
                <div className="ml-[8%]">
                  <p className="text-rayonblue mb-1">Catégorie <a className="text-red">*</a></p>
                  {
                    ["légumes", "fruits", "féculents", "conserves", "hygiène", "autre"].map((category) => (
                      <label key={category}>
                        <input type="radio" name="category" value={category} onChange={handleChangeInForm} required /> <a className="text-rayonblue ml-1 mr-5">{category}</a>
                      </label>
                    ))}
                </div>
                <div>
                  <FormInput
                    name="weight"
                    type="number"
                    value={formData["weight"] ?? ""}
                    inputText="Poids (g)"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={true} />
                </div>
                <BrowseImage newProduct={true}></BrowseImage>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#038709] text-white rounded mx-[20%]"
              >Valider</button>

            </div>
          )}
        </div>)}
    </>
  );
}

export default ProductTable;