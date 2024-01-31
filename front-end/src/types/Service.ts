
export type Service = {
  id: number;
  service: string;
  price: number;
  duration: number;
}

export type EditeServiceProps = {
  whatEdit: string;
  editorService: Service;
  handleChangeService: (type: string, value: string | number) => void;
  handleConfirmEdit: () => void;
  isError: boolean;
};