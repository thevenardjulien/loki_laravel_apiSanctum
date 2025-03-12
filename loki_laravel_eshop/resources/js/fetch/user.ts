export default async function fetchUser(token: string) {
    const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}
