// Importing dependencies
import { useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { useNavigate } from 'react-router-dom';

// Importing common components
import FormInput from "@common/FormInput.jsx";
import PageButton from "@common/PageButton.jsx";

/**
 * The AdminLogin page.
 * @returns {React.ReactElement} AdminLogin component.
 */
function AdminLogin() {
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // 1. Auth Supabase
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.mail,
            password: formData.password
        });

        if (loginError) {
            console.error("Erreur login:", loginError.message);
            return;
        }

        const userId = loginData.user.id;
        console.log("User ID:", userId);

        // 2. Check if the user is an admin
        const { data: adminData, error: adminError } = await supabase
            .from('Admins')
            .select('id')
            .eq('id', userId)
            .single();

        if (adminError || !adminData) {
            alert("Accès refusé : le compte n'est pas administrateur")
            return;
        }

        console.log('Success: admin logged in');
        navigate('/admin/users')

    }

    return (
        <div className="bg-[#ffffff] w-[65.56vw] mx-auto mt-32 mb-10 rounded-2xl shadow-sm py-12 px-6">
            <div className="admin-login">
                <h1 className="text-[#2E2EFF] text-7xl font-extrabold text-center leading-tight mb-2">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div className="w-[65%] mx-auto">
                        <FormInput
                            type="email"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                            label="Email"
                            required
                            className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="w-[65%] mx-auto">
                        <FormInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Password"
                            required
                            className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-center">
                        <PageButton
                            buttonText={'Je me connecte'}
                            type="submit"
                            className="w-[400px] h-10 bg-[#FF8200] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
