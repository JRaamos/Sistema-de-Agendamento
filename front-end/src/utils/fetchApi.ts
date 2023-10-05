const fetchAPi = async () => {
  const response = await fetch('https://psychotic-direction-production.up.railway.app/services');
  const data = await response.json();  
  return data;
}
export default fetchAPi;