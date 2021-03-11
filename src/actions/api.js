export async function GET(endpoint, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token ? `JWT ${token}` : '',
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function POST(endpoint, body, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token ? `JWT ${token}` : '',
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function PATCH(endpoint, body, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}/`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token ? `JWT ${token}` : '',
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function DELETE(endpoint, token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}/`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token ? `JWT ${token}` : '',
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
