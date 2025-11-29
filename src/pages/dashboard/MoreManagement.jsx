// Importing dependencies
import { useEffect, useState, useRef } from 'react';
import { useAuthor } from '@context/AuthorContext';
import { useActionData, useNavigate } from 'react-router-dom';
import { displayNotification } from '@lib/displayNotification.jsx';

import { supabase } from '@lib/supabaseClient';

// Importing common components

import Loading from '@common/Loading.jsx';
import FormInput from '@common/FormInput.jsx';
import FormTextArea from '@common/FormTextArea.jsx';
import ArticleModal from '@common/ArticleModal';


function MoreManagment() {

    const { isAdmin, loading } = useAuthor()
    const navigate = useNavigate()
    const [newArticle, setNewArticle] = useState({
        title: '',
        content: '',
        file: null,
        image: null
    })
    const [articles, setArticles] = useState([])

    const [submitting, setSubmitting] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(null)


    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);


    useEffect(() => {
        if (loading) return; // wait for the author informations to be fetch
        if (!isAdmin) {
            navigate('/admin')
            return;
        }
        fetchArticles()
    }, [loading]);

    useEffect(() => {
        fetchArticles()
    }, [submitting])

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('Articles')
            .select(`
          id,
          edited_at, 
          title, 
          content, 
          image, 
          file
        `)
            .order('edited_at', { ascending: false });

        if (error) {
            console.error('Erreur de chargement des articles:', error);
            displayNotification("Erreur de chargement des articles", error.message, "danger")
        } else {
            console.log(data)
            setArticles(data);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setNewArticle(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    function handleFileChange(e, name) {
        const file = e.target.files[0];
        setNewArticle(prevData => ({
            ...prevData,
            [name]: file
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Validation for mandatory field
        if (!newArticle.title.trim()) {
            displayNotification("Erreur", "Le titre est obligatoire", "error");
            return;
        }

        if (!newArticle.content.trim()) {
            displayNotification("Erreur", "Le contenu est obligatoire", "error");
            return;
        }

        setSubmitting(true);

        try {
            let imageName = null;
            let fileName = null;

            // Upload of the image (if there is an image)
            if (newArticle.image) {
                imageName = `${Date.now()}_${newArticle.image.name}`
                const imagePath = `images/${imageName}`;

                const { data: imageData, error: imageError } = await supabase.storage
                    .from('articles')
                    .upload(imagePath, newArticle.image);

                if (imageError) throw imageError;
            }

            // Upload of the PDF (if there is an image)
            if (newArticle.file) {
                fileName = `${Date.now()}_${newArticle.file.name}`
                const filePath = `files/${fileName}`;

                const { data: fileData, error: fileError } = await supabase.storage
                    .from('articles')
                    .upload(filePath, newArticle.file);

                if (fileError) throw fileError;
            }

            // Insertion of the article in the db 
            const { data, error } = await supabase
                .from('Articles')
                .insert([
                    {
                        title: newArticle.title,
                        content: newArticle.content,
                        image: imageName,
                        file: fileName,
                    }
                ])
                .select();

            if (error) throw error;

            displayNotification("Succès", "Article publié avec succès !", "success");

            // clean the form
            setNewArticle({
                title: '',
                content: '',
                file: null,
                image: null
            });

            // clean inputs files   
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (imageInputRef.current) imageInputRef.current.value = '';

        } catch (error) {
            console.error('Erreur lors de la publication:', error);
            displayNotification("Erreur", error.message || "Une erreur est survenue", "error");
        } finally {
            setSubmitting(false);
        }
    }

    function truncateContent(text, maxLength = 50) {
        if (!text) return '';

        // find first \n
        const firstNewlineIndex = text.indexOf('\n');

        // if '/n' < max length truncate to \n
        if (firstNewlineIndex !== -1 && firstNewlineIndex < maxLength) {
            return text.substring(0, firstNewlineIndex) + '...';
        }
        // else truncate to max length
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }

    const handleArticleClick = async (article) => {
        let imageUrl = null;
        let fileUrl = null;

        if (article.image) {
            const { data } = supabase.storage
                .from('articles')
                .getPublicUrl(`images/${article.image}`);
            imageUrl = data?.publicUrl;
        }

        if (article.file) {
            const { data } = supabase.storage
                .from('articles')
                .getPublicUrl(`files/${article.file}`);
            fileUrl = data?.publicUrl;
        }

        // Préparer l'article avec les URLs
        const articleWithUrls = {
            ...article,
            image: imageUrl,
            file_url: fileUrl
        };

        setSelectedArticle(articleWithUrls);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedArticle(null);
    }

    const handleDelete = async (article) => {
        // ask for confirmation 
        const confirmDelete = window.confirm(
            `Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ?\n\nCette action est irréversible.`
        );

        if (!confirmDelete) return;

        setSubmitting(true);

        try {
            // delete image
            if (article.image) {
                const imagePath = `images/${article.image}`;
                const { error: imageError } = await supabase.storage
                    .from('articles')
                    .remove([imagePath]);

                if (imageError) {
                    console.error('Erreur lors de la suppression de l\'image:', imageError);
                    // On continue quand même pour supprimer le reste
                }
            }

            // delete pdf 
            if (article.file) {
                const filePath = `files/${article.file}`;
                const { error: fileError } = await supabase.storage
                    .from('articles')
                    .remove([filePath]);

                if (fileError) {
                    console.error('Erreur lors de la suppression du fichier:', fileError);
                }
            }

            // delete from db 
            const { error: deleteError } = await supabase
                .from('Articles')
                .delete()
                .eq('id', article.id);

            if (deleteError) throw deleteError;

            displayNotification("Succès", "Article supprimé avec succès !", "success");

            fetchArticles();

        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            displayNotification("Erreur", error.message || "Une erreur est survenue lors de la suppression", "error");
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <>
            {loading || submitting ? (
                <Loading text={submitting ? "Publication de l'article..." : undefined} />
            ) : (
                <div className='p-4 px-10'>
                    <h2 className="text-2xl font-bold">Gestion des articles</h2 >
                    <table className="min-w-full divide-y divide-gray-200 mb-5">
                        <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Titre</th>
                                <th className="px-6 py-3">Text</th>
                                <th className="px-6 py-3">Publication</th>
                                <th className="px-6 py-3">fichier</th>
                                <th className="px-6 py-3">image</th>
                                <th className="px-6 py-3">action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {articles.map((art, idx) => (
                                <tr key={idx} className='hover:bg-[#dddddd]' onClick={() => { handleArticleClick(art) }}>
                                    <td>{art.title}</td>
                                    <td>{truncateContent(art.content)}</td>
                                    {/* timestamp => replacing T by ' ' and deleting milisecond*/}
                                    <td>{art.edited_at.replace('T', ' ').split('.')[0]}</td>
                                    <td>{art.file ? art.file.split('_')[1] : ''}</td>
                                    <td>{art.image ? art.image.split('_')[1] : ''}</td>
                                    <td><button
                                        className='text-rayonorange underline'
                                        onClick={(e) => {
                                            e.stopPropagation() // needed to not active the modal 
                                            handleDelete(art)
                                        }}
                                    >Supprimer</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="text-2xl font-bold">Ajouter un article</h2 >
                    <form action="">
                        <div className='flex lg:flex-row flex-col'>
                            <div>
                                <FormInput
                                    labelClassName=""
                                    className="border border-rayonblue rounded-lg p-1 md:w-[30em] mb-5"
                                    inputText="Titre : "
                                    name='title'
                                    value={newArticle.title}
                                    onChange={handleChange}
                                    isStarred={true}
                                />
                                <FormTextArea
                                    textAreaName={"Texte :"}
                                    name="content"
                                    value={newArticle.content}
                                    onChange={handleChange}
                                    className="h-64 border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
                                />
                            </div>
                            <div className='ml-6'>
                                <p className='text-rayonblue'>Fichier associé : </p>
                                <input
                                    type='file'
                                    accept='.pdf'
                                    name='file'
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            displayNotification("Fichier sélectionné :", e.target.files[0].name, "info")
                                            handleFileChange(e, 'file');
                                        }
                                    }}
                                    ref={fileInputRef}
                                    className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E2EFF] file:text-white hover:file:bg-blue-700"
                                />
                                <p className='text-rayonblue'>Image : </p>
                                <input
                                    type='file'
                                    accept='.png,.svg,.jpg,.jpeg'
                                    name='file'
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            displayNotification("Fichier sélectionné :", e.target.files[0].name, "info")
                                            handleFileChange(e, 'image');
                                        }
                                    }}
                                    ref={imageInputRef}
                                    className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E2EFF] file:text-white hover:file:bg-blue-700"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className='text-white bg-rayonorange ml-4 px-2 py-1 mt-5'
                        >Ajouter un article</button>
                    </form>
                    <ArticleModal
                        article={selectedArticle}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                </div >

            )
            }
        </>
    );
}

export default MoreManagment;