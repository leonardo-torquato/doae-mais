import { Injectable } from '@nestjs/common';
import { CreatePixDto } from './dto/create-pix.dto';
import { QrCodePix } from 'qrcode-pix';

@Injectable()
export class PaymentService {
  
  async generatePix(createPixDto: CreatePixDto) {
    const { key, value, description } = createPixDto;

    // Cria a instância do PIX
    const pix = QrCodePix({
      version: '01',
      key: key, // Chave PIX da igreja
      name: 'Nome da Igreja', // TODO: Pode vir de uma variável de ambiente ou config
      city: 'Sua Cidade', // TODO: O mesmo aqui
      transactionId: 'DOACAO123', // ID único da transação (pode ser gerado dinamicamente)
      message: description || 'Doação',
      value: value,
    });

    // Gera o payload (a string "000201...")
    const payload = pix.payload();

    // Gera a imagem QR Code em Base64
    const base64 = await pix.base64();

    return {
      payload,
      base64,
    };
  }
}