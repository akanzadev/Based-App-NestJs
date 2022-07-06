import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
// import * as intoStream from 'into-stream';
// const intoStream = require('into-stream');
// import intoStream from 'into-stream';
import toStream = require('buffer-to-stream');
// import intoStream = require('into-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    email,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'monokuma_delivery/users',
          public_id: `${email}-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      // intoStream(file.buffer).pipe(upload);
      toStream(file.buffer).pipe(upload);
    });
  }
}
