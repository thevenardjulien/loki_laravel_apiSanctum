export async function fetchProducts(token: string) {
    const response = await fetch('http://localhost:8000/api/products', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const responseJSON = await response.json();

    console.log({ response, responseJSON });
    return responseJSON;
}

export async function fetchCreateProducts(formData: FormData, token: string) {
    const response = await fetch('http://localhost:8000/api/products/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const responseJSON = await response.json();

    console.log({ response, responseJSON });
    return responseJSON;
}
