import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import { supabase } from '../../lib/supabaseClient';

const SignupPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [subtitle, setSubtitle] = useState("Bắt đầu hành trình Creator chuyên nghiệp cùng Alino");

    useEffect(() => {
        // Parse role from query params
        const queryParams = new URLSearchParams(location.search);
        const role = queryParams.get('role');

        // Dynamically set subtitle based on role
        if (role === 'brand') {
            setSubtitle("Giải pháp Influencer Marketing toàn diện cho doanh nghiệp");
        } else if (role === 'creator') {
            setSubtitle("Xây dựng Profile chuyên nghiệp & Gia tăng thu nhập");
        }

        // Store role in localStorage for OAuth survival
        if (role) {
            localStorage.setItem('pendingRole', role);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
                // If there's a specific role intent in the URL, apply it
                if (role && (role === 'creator' || role === 'brand')) {
                    try {
                        const { error } = await supabase
                            .from('profiles')
                            .update({ role })
                            .eq('id', session.user.id);

                        if (error) {
                            console.error('Error auto-updating role:', error);
                        } else {
                            // Clear pending role if successful
                            localStorage.removeItem('pendingRole');
                        }
                    } catch (err) {
                        console.error('Exception updating role:', err);
                    }
                }

                // Navigate to app which will handle redirection based on role
                navigate('/app');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [location.search, navigate]);

    return (
        <AuthPage
            view="sign_up"
            title="Đăng ký tài khoản"
            subtitle={subtitle}
        />
    );
};

export default SignupPage;
