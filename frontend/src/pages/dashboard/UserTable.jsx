import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('User').select('*');
      if (error) console.error('Erreur de chargement des utilisateurs :', error);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

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
    console.log('User modifié :', editedUser);
    setEditMode(null);
    // TODO: Call supabase update
  };

  const handleDelete = (id) => {
    console.log('Suppression utilisateur :', id);
    // TODO: Call supabase delete
  };

  return (
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
                  <td className="px-6 py-4">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:underline mr-4"
                      onClick={() => toggleExpand(user.id)}
                    >
                      {expanded === user.id ? 'Fermer' : 'Déplier'}
                    </button>
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
                      </div>

                      <div className="flex gap-4">
                        {editMode === user.id ? (
                          <button
                            onClick={handleValidate}
                            className="px-4 py-2 bg-green text-white rounded"
                          >
                            Valider
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                          >
                            Modifier
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-2 bg-rayonorange text-white rounded"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
