

const usersApi =' /api/numberUsers/'; 

export const fetchUsers= async () => {
  try {
    const response = await fetch(`${usersApi}`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};