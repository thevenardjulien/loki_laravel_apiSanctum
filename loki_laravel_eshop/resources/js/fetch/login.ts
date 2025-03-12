export default async function fetchLogin(email: string, password: string) {
    const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const responseJSON = await response.json();

    console.log({ response, responseJSON });
    return responseJSON;
}
