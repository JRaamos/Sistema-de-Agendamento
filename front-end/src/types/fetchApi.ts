const fetchAPi = async () => {
  const response = await fetch('http://localhost:3001/services');
  const data = await response.json();  
  return data;
}
export default fetchAPi;