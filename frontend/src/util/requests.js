import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const backEndUrl = import.meta.env.VITE_API_URL

export async function fetchProducts({queries}) {
  let url = `${backEndUrl}products/?${queries}`;
  console.log(url);
  
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const products = await response.json();
  return products;
}

export async function fetchOneProduct({signal, idItem}) {
  let url = `${backEndUrl}products/${idItem}`;
  
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const product = await response.json();
  
  return product;
}

export async function credentials({formData, type, method}) {  
   let url = `${backEndUrl}` + type;
   
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}
  
export async function fetchLogout() {
  let url = `${backEndUrl}logout`;
  
  const response = await fetch(url, {
      method: 'POST',
      credentials: "include",
    }
  )

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const message = await response.json();  
 
  return message;
}

export async function fetchUser() {
  let url = `${backEndUrl}user`;
  
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const user = await response.json();  
  
  return user;
}

export async function fetchCartItems() {
  let url = `${backEndUrl}cart`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const cartItems = await response.json();  
  
  return cartItems;
}

export async function addCartItem({item}) {  
   let url = `${backEndUrl}cart/add`;
   
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}

export async function deleteCartItem({id}) {  
   let url = `${backEndUrl}cart/delete/${id}`
   
   
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}

export async function updateCartQuatity({id, quantity}) {  
   let url = `${backEndUrl}cart/chageQuantity/${id}`
   
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({quantity}),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}

export async function fetchHistoricalData() {
  let url = `${backEndUrl}historical`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const historical = await response.json();  
  
  return historical;
}

export async function addHistoricalData({order}) {  
   let url = `${backEndUrl}historical/insert`;
   
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}

export async function addComment({comment}) {  
   let url = `${backEndUrl}comment/insert`;
   
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    throw error;
  }

  const res  = await response.json();
  
  return res;
}