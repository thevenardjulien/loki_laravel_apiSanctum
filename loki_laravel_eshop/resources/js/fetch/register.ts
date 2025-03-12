export default async function fetchRegister(name: string, email: string, password: string) {
    const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    const responseJSON = await response.json();

    console.log({ response, responseJSON });
    return responseJSON;
}
