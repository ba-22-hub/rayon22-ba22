// Importing dependencies
import { useEffect, useState, useRef } from "react";
import { supabase } from "@lib/supabaseClient";
import { uploadImage } from '@lib/uploadImage.js'
import { useAuthor } from '../../context/AuthorContext';
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

// Importing common components
import FormInput from "@common/FormInput"
import FunctionButton from "@common/FunctionButton.jsx";
import Loading from '@common/Loading.jsx';

// Importing assets
import roundLogo from "../../assets/logos/roundLogo.png"

// Importing styles
import 'react-notifications-component/dist/theme.css'

function ProductTable() {
  const categoriesList = ["légumes", "fruits", "féculents", "conserves", "hygiène", "autre"]

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [oldImageName, setOldImageName] = useState("");   // Old image name when product's image changed (so the old image can be removed from the bucket)
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
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Erreur chargement produits :", error)
      Store.addNotification({
        title: "Erreur lors du chargment des produits",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
    }
    else {
      setProducts(data)
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
      Store.addNotification({
        title: "Erreur lors de la suppression de l'image " + product.image_name,
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
    }

    // Removing product row from 'products' table
    const { response, errorDelete } = await supabase
      .from("products")
      .delete()
      .eq('id', product.id)
    if (errorDelete) {
      console.error("Erreur lors de la suppression du produit " + product.name + errorDelete)
      Store.addNotification({
        title: "Erreur lors de la suppression du produit " + product.name,
        message: errorDelete.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
    } else {
      Store.addNotification({
        title: product.name + " supprimé avec succès",
        message: response,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
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
    console.log("editedValues : " + editedValues)
    if (oldImageName != "") {
      // Removing old image from bucket
      const { error } = await supabase
        .storage
        .from('images')
        .remove([oldImageName])
      if (error) {
        console.error("Erreur suppression ancienne image :", error)
        Store.addNotification({
          title: "Erreur lors de la suppression de l'ancienne image " + oldImageName + " de la base de données",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true
          }
        });
      }
    }

    if (image != "") {
      // Uploading new image to bucket
      await uploadImage(image, image.name)
    }

    const { error } = await supabase
      .from("products")
      .update(editedValues)
      .eq("id", editingProductId);
    if (error) {
      console.error("Erreur update :", error)
      Store.addNotification({
        title: "Erreur lors de la mise à jour du produit",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
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

  async function handleSubmit(e) {

    // Adding a new row to the 'products' database
    const { error } = await supabase
      .from('products')
      .insert(formData)

    if (error) {
      console.error("Erreur lors de l'ajout du nouveau produit", error.message);
      Store.addNotification({
        title: "Erreur lors de l'ajout du nouveau produit",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true,
          showIcon: true
        }
      });
      return;
    }

    // Uploading the image to the 'images' bucket
    if (image != "") {
      await uploadImage(image, image.name)
    }
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

    setExpanded(false);
    fetchProducts();
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
    const handleFileUpload = async (e) => {
      async function fetchOldImageName() {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq('id', editingProductId)
          .maybeSingle();

        if (error && Object.keys(error.message).length > 0) {
          console.error("Erreur lors du téléchargement du nom de de l'image : ", error.message);
          Store.addNotification({
            title: "Erreur lors du téléchargement du nom de de l'image",
            message: error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true
            }
          });
          return;
        }

        setOldImageName(data.image_name);
      }
      await fetchOldImageName();    // waiting for old image name to be fetched before uploading new image

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

  function DisplayImage({ product }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      async function fetchImage() {
        const { data, error } = await supabase
          .storage
          .from("images")
          .download(product.image_name);

        if (error && Object.keys(error.message).length > 0) {
          console.error("Erreur lors du téléchargement de l'image " + product.image_name + " : ", error.message);
          Store.addNotification({
            title: "Erreur lors du téléchargement de l'image " + product.image_name,
            message: error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              showIcon: true
            }
          });
          return
        }

        const url = URL.createObjectURL(data);
        setImageUrl(url);

      }

      if (product.image_name != "") {
        fetchImage();
      }
    }, [product.image_name]);

    return <>
      <img src={imageUrl || roundLogo} alt={product.name} className="w-[50%] h-20 object-contain" />
    </>
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
                        <td><DisplayImage product={p}></DisplayImage></td>
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
        </div>)}
    </>
  );
}

export default ProductTable;