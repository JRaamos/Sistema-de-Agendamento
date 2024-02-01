const fs = require('fs').promises;

const path = require('path');

const caminho = path.resolve('./src/utils/services.json');
const readFile = async () => {
  try {
    const response = await fs.readFile(caminho, 'utf-8');
    return JSON.parse(response) || [];
  } catch (error) {
    console.log('Erro ao ler o arquivo', error);
  }
};

const writeFile = async (data: any) => {
  try {
    const response = await fs.writeFile(caminho, JSON.stringify(data, null, 2));
    return response;
  } catch (error) {
    console.log('Erro ao escrever no arquivo', error);
  }
};

module.exports = {
  readFile,
  writeFile,
};