export type BookTime = {
  hour: string;
  services: [{
    name: string;
    duration: string;
    price: string;
  }];
  totalDuration: string;
};
