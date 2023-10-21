import serviceJson from './services.json';

const getPrice = (service: string): number => {
  const price = serviceJson.filter((serviceItem) => serviceItem.services === service);
  return price[0].price;
};

export default getPrice;