import UserModel, { hasColumn } from '../models/User';


export async function upColumns(columnName: string) {
  if (hasColumn(columnName)) return

  UserModel.schema.add({
    [columnName]: {
      type: Date
    }
  });
  await UserModel.syncIndexes();
  
  try {
      const userDocs = await UserModel.updateMany({}, { $set: { [columnName]: null } })
      console.log('- Documents updated successfully ', userDocs)
  } catch (error) {
      console.log('Error Updating Documents ', error);   
  }
}
