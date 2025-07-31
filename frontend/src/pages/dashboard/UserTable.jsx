import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

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
                      className="text-blue-600 hover:underline"
                      onClick={() => toggleExpand(user.id)}
                    >
                      {expanded === user.id ? 'Fermer' : 'Déplier'}
                    </button>
                  </td>
                </tr>
                {expanded === user.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>Sexe:</strong> {user.gender}</p>
                        <p><strong>Date de naissance:</strong> {user.birthday}</p>
                        <p><strong>Adresse:</strong> {user.address}</p>
                        <p><strong>Complément d’adresse:</strong> {user.addAddress || '—'}</p>
                        <p><strong>Ville:</strong> {user.city}</p>
                        <p><strong>Code postal:</strong> {user.postalCode}</p>
                        <p><strong>Situation:</strong> {user.situation}</p>
                        <p><strong>Quotient:</strong> {user.quotient}</p>
                        <p><strong>Type de revenu:</strong> {user.wageType}</p>
                        <p><strong>Autres revenus:</strong> {user.otherWage || '—'}</p>
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
