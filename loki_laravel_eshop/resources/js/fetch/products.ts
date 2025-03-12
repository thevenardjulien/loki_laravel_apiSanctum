export async function fetchProducts(token: string) {
    const response = await fetch('http://localhost:8000/api/products', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    
    const responseJSON = await response.json();

    return responseJSON;
}

export async function fetchOneProduct(token: string, id: string) {
    const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const responseJSON = await response.json();

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

    return responseJSON;
}

export async function fetchDeleteProduct(token: string, id: string) {
    const response = await fetch(`http://localhost:8000/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}
