export const getData = async (url: string) => {
  try {
    const result = await fetch(url);

    return result.json();
  } catch (error) {
    console.error('Fetch error -- ', error);
  }
};
