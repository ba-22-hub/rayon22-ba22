// Importing dependencies
import { useEffect, useState, useRef } from "react";
import { supabase } from "@lib/supabaseClient";
import { uploadImage, normalizeFileName } from '@lib/uploadImage.js'
import { useAuthor } from '@context/AuthorContext';
import { useNavigate } from 'react-router-dom';
import { displayNotification } from '@lib/displayNotification.jsx';

// Importing common components
import FormInput from "@common/FormInput"
import FunctionButton from "@common/FunctionButton.jsx";
import Loading from '@common/Loading.jsx';

// Importing assets
import roundLogo from "@assets/logos/roundLogo.png"


function ProductTable() {
  const categoriesList = ["légumes", "fruits", "féculents", "conserves", "hygiène", "autre"]

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [expanded, setExpanded] = useState(false);    // new product form expanded or not
  const [expandedSettings, setExpandedSettings] = useState(false);
  const [oldImageName, setOldImageName] = useState("");   // Old image name when product's image changed (so the old image can be removed from the bucket)
  const [productImages, setProductImages] = useState({});

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
    stock: '',
    productStockIncertainThreshold: '',
    description: '',
    image_name: '',
  });

  const [settings, setSettings] = useState({
    stockIncertainThreshold: '',
    shippingCost: '',
  })

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Erreur chargement produits :", error)
      displayNotification("Erreur lors du chargment des produits", error.message, "danger")
    }
    else {
      setProducts(data)
      data.forEach(async product => {
        const { data: imgData, error: imgError } = await supabase
          .storage
          .from("images")
          .download(product.image_name);

        if (imgError) {
          displayNotification("Erreur lors du téléchargement de l'image " + product.image_name, imgError.message, "warning")
        } else {
          const url = URL.createObjectURL(imgData);
          setProductImages(prev => ({
            ...prev,
            [product.id]: url
          }));;
        }
        return product;
      })
    }
  };

  const { isAdmin, loading } = useAuthor()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return; // wait for the author informations to be fetch
    if (!isAdmin) {
      navigate('/admin')
      return;
    }

    fetchProducts();
    fetchCurrentStockIncertainThreshold();
  }, [loading]);

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedValues(product);
  };

  const handleChangeInProd = (e) => {
    setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
    if (e.target.name == "image_name") {
      const { files } = e.target;
      setImage(files[0])
    }
  };

  const removeProd = async (product) => {
    // Removing image from bucket
    const { error } = await supabase
      .storage
      .from('images')
      .remove([product.image_name])
    if (error) {
      console.error("Erreur suppression image :", error)
      displayNotification("Erreur lors de la suppression de l'image " + product.image_name, error.message, "danger")
    }

    // Removing product row from 'products' table
    const { response, errorDelete } = await supabase
      .from("products")
      .delete()
      .eq('id', product.id)
    if (errorDelete) {
      console.error("Erreur lors de la suppression du produit " + product.name + errorDelete)
      displayNotification("Erreur lors de la suppression du produit " + product.name, errorDelete.message, "danger")
    } else {
      displayNotification("Produit " + product.name + " supprimé avec succès", response, "success")
    }
    fetchProducts()
  }

  // function to set the new formData value whenever the inputs are changed
  function handleChangeInForm(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleValidate = async () => {
    if (oldImageName != "") {
      // Removing old image from bucket
      const { error } = await supabase
        .storage
        .from('images')
        .remove([oldImageName])
      if (error) {
        console.error("Erreur suppression ancienne image :", error)
        displayNotification("Erreur lors de la suppression de l'ancienne image " + oldImageName + " de la base de données", error.message, "danger")
      }
    }

    if (image != "") {
      // Uploading new image to bucket
      await uploadImage(image, image.name)
      const url = URL.createObjectURL(image);
      setProductImages(prev => ({
        ...prev,
        [editingProductId]: url
      }));;
    }

    const { error } = await supabase
      .from("products")
      .update(editedValues)
      .eq("id", editingProductId);
    if (error) {
      console.error("Erreur update :", error)
      displayNotification("Erreur lors de la mise à jour du produit", error.message, "danger")
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProductId ? editedValues : p))
      );
      setEditingProductId(null);
    }
    setImage("")
    setOldImageName("")
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function nullProductStockIncertainThreshold() {
    if (formData.productStockIncertainThreshold == "") {
      setFormData(prevData => ({
        ...prevData,
        "productStockIncertainThreshold": null
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Normalize filename
    const dataToSubmit = {
      ...formData,
      productStockIncertainThreshold: formData.productStockIncertainThreshold === "" ? null : formData.productStockIncertainThreshold
    };

    // Adding a new row to the 'products' database
    const { error } = await supabase
      .from('products')
      .insert(dataToSubmit)

    if (error) {
      console.error("Erreur lors de l'ajout du nouveau produit", error);
      displayNotification("Erreur lors de l'ajout du nouveau produit", error.message, "danger")
      return;
    }

    // Uploading the image to the 'images' bucket
    if (image && image.name) {
      await uploadImage(image, image.name)
    }
    setImage("")

    setFormData({
      name: '',
      price: '',
      salePrice: '',
      category: '',
      weight: '',
      stock: '',
      productStockIncertainThreshold: '',
      description: '',
      image_name: '',
    })

    setExpanded(false);
    fetchProducts();
  }

  const BrowseImage = (newProduct, product) => {
    const handleFileUpload = e => {
      const { files } = e.target;
      if (files && files.length) {
        const normalizedName = normalizeFileName(files[0].name);
        {
          newProduct ? (
            setFormData(prevData => ({
              ...prevData,
              image_name: normalizedName
            }))
          ) : (
            () => handleEdit(product),
            setEditedValues(prevData => ({
              ...prevData,
              image_name: normalizedName
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
    const handleFileUpload = async (e) => {
      async function fetchOldImageName() {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq('id', editingProductId)
          .maybeSingle();

        if (error && Object.keys(error.message).length > 0) {
          console.error("Erreur lors du téléchargement du nom de de l'image : ", error.message);
          displayNotification("Erreur lors du téléchargement du nom de de l'image", error.message, "danger")
          return;
        }

        setOldImageName(data.image_name);
      }
      await fetchOldImageName();    // waiting for old image name to be fetched before uploading new image

      const { files } = e.target;
      if (files && files.length) {
        const normalizedName = normalizeFileName(files[0].name);
        () => handleEdit(product),
          setEditedValues(prevData => ({
            ...prevData,
            image_name: normalizedName
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

  async function fetchCurrentStockIncertainThreshold() {
    // Fetches global stock incertain threshold
    const { data, error } = await supabase
      .from('constants')
      .select('value')
      .eq("name", "stockIncertainThreshold")
      .maybeSingle();
    if (!error) {
      setSettings(prevData => ({
        ...prevData,
        stockIncertainThreshold: data.value
      }))
    } else {
      console.error("Erreur lors du téléchargement de l'ancienne valeur seuil ", error)
      displayNotification("Erreur lors du téléchargement de l'ancienne valeur seuil", error.message, "danger")
    }
  }

  const handleChangeInSettings = (e) => {
    setSettings(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };

  async function handleSubmitSettings(e) {
    e.preventDefault();

    const updates = Object.entries(settings).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    const { error } = await supabase
      .from("constants")
      .upsert(updates);

    if (error) {
      displayNotification("Erreur lors de la mise à jour des paramètres", error.message, "danger")
    } else {
      displayNotification("Les paramètres ont été mis à jour avec succès", "", "success")
    }

    setExpandedSettings(false);
  }

  function modifySettings() {
    fetchCurrentStockIncertainThreshold();
    setExpandedSettings(true);
  }

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
                  <th className="p-2">Stock</th>
                  <th className="p-2">Limite stock incertain</th>
                  <th className="p-2">Description</th>
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
                            categoriesList.map((category) => (
                              <div key={category}>
                                <input
                                  type="radio"
                                  name="category"
                                  value={category}
                                  onChange={handleChangeInProd}
                                  defaultChecked={category == editedValues["category"]}
                                  required />
                                <a className="ml-1 mr-5">{category}</a>
                              </div>
                            ))}
                        </td>
                        <td className="p-2">
                          <input
                            name="stock"
                            value={editedValues["stock"]}
                            onChange={handleChangeInProd}
                            type="number"
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            name="productStockIncertainThreshold"
                            value={editedValues["productStockIncertainThreshold"] || settings.stockIncertainThreshold}
                            onChange={handleChangeInProd}
                            type="number"
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2">
                          <textarea
                            name="description"
                            value={editedValues["description"] || ""}
                            onChange={handleChangeInProd}
                            className="border p-1 rounded w-full"
                            rows={2}
                          />
                        </td>
                        <td className="p-2">
                          <BrowseImageChange product={p}></BrowseImageChange>
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
                        <td className="p-2">{p.stock}</td>
                        <td className="p-2">{p.productStockIncertainThreshold ? p.productStockIncertainThreshold : settings.stockIncertainThreshold}</td>
                        <td className="p-2">{p.description || "-"}</td>
                        <td><img src={productImages[p.id] || roundLogo} alt={p.name} className="w-[50%] h-20 object-contain" /></td>
                        <td className="p-2 space-x-2">
                          <FunctionButton
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                            buttonText="Modifier"
                            fun={() => handleEdit(p)}
                          />
                          <FunctionButton
                            className="bg-red text-white px-2 py-1 rounded"
                            buttonText="Supprimer"
                            fun={() => removeProd(p)}
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
            <form onSubmit={handleSubmit}>
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
                    categoriesList.map((category) => (
                      <label key={category}>
                        <input type="radio" name="category" value={category} onChange={handleChangeInForm} required /> <a className="text-rayonblue ml-1 mr-5">{category}</a>
                      </label>
                    ))}
                </div>
                <div>
                  <FormInput
                    name="stock"
                    type="number"
                    value={formData["stock"] ?? ""}
                    inputText="Stock"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={true} />
                </div>
                <div>
                  <FormInput
                    name="productStockIncertainThreshold"
                    type="number"
                    value={formData["productStockIncertainThreshold"] ?? ""}
                    inputText="Limite stock incertain"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={false} />
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
                <div>
                  <FormInput
                    name="description"
                    type="text"
                    value={formData["description"] ?? ""}
                    inputText="Description (optionnel)"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInForm}
                    isStarred={false} />
                </div>
                <div>
                  <BrowseImage newProduct={true}></BrowseImage>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#038709] text-white rounded mx-[20%]">
                Valider
              </button>
            </form>
          )}
          <FunctionButton
            className="bg-rayonorange  w-[1/2] content-center ml-30 my-4 text-white px-10 py-1 rounded"
            buttonText={expandedSettings ? 'Annuler' : 'Modifier les paramètres'}
            fun={expandedSettings ? (() => setExpandedSettings(false)) : (() => modifySettings())}
          />
          {expandedSettings && (
            <form onSubmit={handleSubmitSettings}>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4 items-center">
                <div>
                  <FormInput
                    name="stockIncertainThreshold"
                    type="number"
                    value={settings.stockIncertainThreshold ?? ""}
                    inputText="Seuil en deçà duquel le label 'Stock Incertain' apparaît dans le catalogue utilisateur"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInSettings} />
                </div>
                <div>
                  <FormInput
                    name="shippingCost"
                    type="number"
                    value={settings.shippingCost ?? ""}
                    inputText="Participation solidaire aux frais de livraison"
                    labelClassName="ml-[8%]"
                    className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                    onChange={handleChangeInSettings} />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#038709] text-white rounded mx-[20%]">
                Valider
              </button>
            </form>
          )}
        </div>)}
    </>
  );
}

export default ProductTable;