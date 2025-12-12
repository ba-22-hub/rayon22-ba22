// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { deleteUser } from '@lib/deleteUser';
import { patchUser } from '@lib/patchUser';
import sendNotification from '@lib/sendNotification.js';
import { useAuthor } from '@context/AuthorContext';
import { useNavigate } from 'react-router-dom';
import { displayNotification } from '@lib/displayNotification.jsx';

// Importing common components
import FunctionButton from '@common/FunctionButton.jsx';

import Loading from '@common/Loading.jsx';


const UserTable = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [expanded, setExpanded] = useState(null);
	const [editMode, setEditMode] = useState(null);
	const [editedUser, setEditedUser] = useState({});
	const [update, setUpdate] = useState(true)

	// State to manage loading state to display the Loading component
	const [isLoading, setIsLoading] = useState(true);

	const { isAdmin, loading } = useAuthor()
	const navigate = useNavigate()

	let isNotifying = false;

	useEffect(() => {
		if (loading) return; // wait for the author informations to be fetch
		if (!isAdmin) {
			navigate('/admin')
			return;
		}
		const notifyUsers = async () => {
			if (isNotifying) return;
			isNotifying = true;

			const { data, error } = await supabase
				.from('User')
				.select('id, email, firstName')
				.eq('should_notify', true)
				.eq('notified', false);

			if (error) {
				console.error('Erreur lors de la récupération des utilisateurs à notifier:', error);
				displayNotification("Erreur lors de la récupération des utilisateurs à notifier", error.message, "danger")
				return;
			}

			for (const user of data) {
				try {
					await sendNotification({
						email: user.email,
						name: user.firstName,
					});

					const { error: updateError } = await supabase
						.from('User')
						.update({ should_notify: false, notified: true })
						.eq('id', user.id);

					if (updateError) {
						console.error(`Erreur lors de la mise à jour de l'utilisateur ${user.id}:`, updateError);
						displayNotification("Erreur lors de la mise à jour de l'utilisateur " + user.id, updateError.message, "danger")
					} else {
						displayNotification("Notification envoyée à " + user.email, "", "success")
					}
				} catch (err) {
					console.error(`Erreur lors de l'envoi de la notification à ${user.email}:`, err);
					displayNotification("Erreur inattendue lors de l'envoi de la notification à " + user.email, err.message, "danger")
				}
			}
		};
		notifyUsers();

		const fetchUsers = async () => {
			const { data, error } = await supabase.from('User').select('*');
			if (error) {
				console.error('Erreur de chargement des utilisateurs :', error)
				displayNotification("Erreur de chargement des utilisateurs", error.message, "danger")
			}
			else
				setUsers(data);
			setIsLoading(false);
		};
		fetchUsers()
	}, [update, loading]);

	const filteredUsers = users.filter(user =>
		`${user.firstName} ${user.lastName} ${user.email} ${user.phone}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const toggleExpand = (id) => {
		setExpanded(prev => (prev === id ? null : id));
		setEditMode(null);
	};

	const handleEdit = (user) => {
		setEditMode(user.id);
		setEditedUser(user);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedUser(prev => ({ ...prev, [name]: value }));
	};

	const handleValidate = () => {
		patchUser(editMode, editedUser)
			.then(() => setUpdate(!update))
			.then(() => setEditMode(null))

	};

	const handleDelete = (id) => {
		console.log('Suppression utilisateur :', id);
		deleteUser(id)
			.then(() =>
				displayNotification("Suppression effectuée avec succès", "", "success")
			)
			.then(() => setUpdate(!update))
			.catch((e) =>
				console.error("Erreur inattendue : ", e),
				displayNotification("Erreur inattendue", e.message, "danger")
			)
	};

	// Displaying the Loading component
	if (isLoading || loading) {
		return <Loading />;
	}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="p-6 max-w-7xl mx-auto">
					<h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>

					<input
						type="text"
						placeholder="Rechercher par nom, email, téléphone..."
						className="mb-6 px-4 py-2 border border-gray-300 rounded w-full"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<div className="overflow-x-auto bg-white shadow rounded">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
								<tr>
									<th className="px-6 py-3">Prénom</th>
									<th className="px-6 py-3">Nom</th>
									<th className="px-6 py-3">Email</th>
									<th className="px-6 py-3">Téléphone</th>
									<th className="px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 text-sm">
								{filteredUsers.map(user => (
									<React.Fragment key={user.id}>
										<tr>
											{/* firstName */}
											<td className="px-6 py-4">
												{editMode === user.id ? (
													<input
														name="firstName"
														value={editedUser.firstName || ''}
														onChange={handleChange}
														className="border px-2 py-1 rounded w-full"
													/>
												) : (
													user.firstName
												)}
											</td>

											{/* lastName */}
											<td className="px-6 py-4">
												{editMode === user.id ? (
													<input
														name="lastName"
														value={editedUser.lastName || ''}
														onChange={handleChange}
														className="border px-2 py-1 rounded w-full"
													/>
												) : (
													user.lastName
												)}
											</td>

											{/* email */}
											<td className="px-6 py-4">
												{editMode === user.id ? (
													<input
														name="email"
														value={editedUser.email || ''}
														onChange={handleChange}
														className="border px-2 py-1 rounded w-full"
													/>
												) : (
													user.email
												)}
											</td>

											{/* phone */}
											<td className="px-6 py-4">
												{editMode === user.id ? (
													<input
														name="phone"
														value={editedUser.phone || ''}
														onChange={handleChange}
														className="border px-2 py-1 rounded w-full"
													/>
												) : (
													user.phone
												)}
											</td>

											{/* Fold / unfold buttons */}
											<td className="px-6 py-4">
												<FunctionButton
													buttonText={expanded === user.id ? 'Fermer' : 'Déplier'}
													fun={() => toggleExpand(user.id)}
													className="text-blue-600 hover:underline mr-4 bg-transparent p-0 shadow-none"
												/>
											</td>
										</tr>
										{expanded === user.id && (
											<tr className="bg-gray-50">
												<td colSpan="5" className="px-6 py-4">
													<div className="grid grid-cols-2 gap-4 text-sm mb-4">
														{[
															['gender', 'Sexe'],
															['birthday', 'Date de naissance'],
															['address', 'Adresse'],
															['addAddress', 'Complément d’adresse'],
															['city', 'Ville'],
															['postalCode', 'Code postal'],
															['situation', 'Situation'],
															['quotient', 'Quotient'],
															['wageType', 'Type de revenu'],
															['otherWage', 'Autres revenus'],
														].map(([field, label]) => (
															<div key={field}>
																<strong>{label}:</strong>{' '}
																{editMode === user.id ? (
																	<input
																		name={field}
																		value={editedUser[field] || ''}
																		onChange={handleChange}
																		className="border px-2 py-1 rounded w-full mt-1"
																	/>
																) : (
																	<span className="ml-1">
																		{user[field] || '—'}
																	</span>
																)}
															</div>
														))}

														{/* weight limits */}
														<div>
															<strong>Limite de poids maximal :</strong>{' '}
															{editMode === user.id ? (
																<input
																	name="weight_limit"
																	type="number"
																	value={editedUser.weight_limit ?? ''}
																	onChange={handleChange}
																	className="border px-2 py-1 rounded w-full mt-1"
																/>
															) : (
																<span className="ml-1">
																	{user.current_weight} / {user.weight_limit}
																</span>
															)}
														</div>

														<div>
															<strong>Limite de poids minimal :</strong>{' '}
															{editMode === user.id ? (
																<input
																	name="weight_min_limit"
																	type="number"
																	value={editedUser.weight_min_limit ?? ''}
																	onChange={handleChange}
																	className="border px-2 py-1 rounded w-full mt-1"
																/>
															) : (
																<span className="ml-1">
																	{user.current_weight} / {user.weight_limit}
																</span>
															)}
														</div>

														{/* price limit */}
														<div>
															<strong>Limite de prix :</strong>{' '}
															{editMode === user.id ? (
																<input
																	name="price_limit"
																	type="number"
																	step="0.01"
																	value={editedUser.price_limit ?? ''}
																	onChange={handleChange}
																	className="border px-2 py-1 rounded w-full mt-1"
																/>
															) : (
																<span className="ml-1">
																	{user.current_price} / {user.price_limit}
																</span>
															)}
														</div>

														{/* order limit */}
														<div>
															<strong>Limite de commandes :</strong>{' '}
															{editMode === user.id ? (
																<input
																	name="order_limit"
																	type="number"
																	value={editedUser.order_limit ?? ''}
																	onChange={handleChange}
																	className="border px-2 py-1 rounded w-full mt-1"
																/>
															) : (
																<span className="ml-1">
																	{user.current_order} / {user.order_limit}
																</span>
															)}
														</div>
													</div>

													<div className="flex gap-4">
														{editMode === user.id ? (
															<FunctionButton
																buttonText="Valider"
																fun={handleValidate}
																className="px-4 py-2 bg-green text-white rounded"
															/>
														) : (
															<FunctionButton
																buttonText="Modifier"
																fun={() => handleEdit(user)}
																className="px-4 py-2 bg-blue-600 text-white rounded"
															/>
														)}

														<FunctionButton
															buttonText="Supprimer"
															fun={() => handleDelete(user.id)}
															className="px-4 py-2 bg-red text-white rounded"
														/>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								))}
								{filteredUsers.length === 0 && (
									<tr>
										<td colSpan="5" className="px-6 py-4 text-center text-gray">
											Aucun utilisateur trouvé.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>)}
		</>
	);
};

export default UserTable;
