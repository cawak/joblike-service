import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { v4 as uuidGenerator } from 'uuid';
import { MetadaModel } from '../model/metada.model';

@Injectable()
export class MetadataMiddleware implements NestMiddleware {

  private readonly logger = new Logger(MetadataMiddleware.name);


  use(req: any, res: any, next: () => void) {
    req.meta = this.getMetaData();
    this.logger.log(`Received requesest with the following metada: ${JSON.stringify(req.meta)}`);
    next();
  }

  private getMetaData(): MetadaModel {
    const flowId = this.generateFlowId();
    const time = this.getEpochTimeInMillis();
    return { flowId, time };
  }

  private generateFlowId(): string {
    return uuidGenerator().replace(/-/g, '');
  }

  private getEpochTimeInMillis(): number {
    const now = new Date();
    return Math.round(now.getTime());
  }

}

