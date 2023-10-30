import CancellationModel, { CancellationInputtableTypes } 
  from '../database/models/cancellation.model';

const createCancellation = async (cancellation: CancellationInputtableTypes):
Promise<void> => {
  await CancellationModel.create(cancellation);
};

export default createCancellation;