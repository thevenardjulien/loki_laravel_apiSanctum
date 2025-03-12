import fetchUser from "@/fetch/user";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

type User = {
    id: number,
    name: string,
    email: string,
    roles: string[],
    created_at: string,
    updated_at: string
}

export default function Welcome() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const disconnect = () => {
        localStorage.removeItem("token");
        router.visit('/');
    }

    const token: string | null = localStorage.getItem("token");

    const fetchUserData = async (token: string) => {
        const response = await fetchUser(token);
        const responseJSON = await response.json();
        if (response.ok && response.status === 200) {
            if (responseJSON.roles.includes("admin")) {
                setIsAdmin(true);
                setUser(responseJSON);
            }
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        }
    }, []);

    return (
        <>
            <header>
                <nav className="flex justify-center items-center my-4">
                    <ul className="flex justify-center gap-20 w-full">
                        <li className="hover:text-blue-500 transition-colors">
                            <a href="/" className="px-3 py-2 rounded-lg hover:bg-gray-100">Accueil</a>
                        </li>
                        {!token &&
                            <>
                                <li className="hover:text-blue-500 transition-colors">
                                    <a href="/api-login" className="px-3 py-2 rounded-lg hover:bg-gray-100">Connexion</a>
                                </li>
                                <li className="hover:text-blue-500 transition-colors">
                                    <a href="/api-register" className="px-3 py-2 rounded-lg hover:bg-gray-100">Inscription</a>
                                </li>
                            </>
                        }
                        {token &&
                            <>
                                <li className="hover:text-blue-500 transition-colors">
                                    <a href="/account" className="px-3 py-2 rounded-lg hover:bg-gray-100">Mon compte</a>
                                </li>
                                <li className="hover:text-blue-500 transition-colors">
                                    <a href="#" className="px-3 py-2 rounded-lg hover:bg-gray-100" onClick={disconnect}>Déconnexion</a>
                                </li>
                            </>
                        }
                        {isAdmin &&
                            <li className="hover:text-blue-500 transition-colors">
                                <a href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-gray-100">Dashboard</a>
                            </li>
                        }
                        <li>{user && user.name}</li>
                    </ul>
                </nav>
            </header>
            <main>
                <ul className="flex justify-center gap-4">
                    <li>
                        <a href="/products" className="hover:text-blue-500 transition-colors">Products</a>
                    </li>
                    <li>
                        <a href="/products/create" className="hover:text-blue-500 transition-colors">Create Product</a>
                    </li>
                </ul>
            </main >
        </>
    )
}