import { Injectable, CanActivate, ExecutionContext, HttpService } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const apiPermissions: String[] = this.reflector.get<string[]>('permissions', context.getHandler());
    let resolution: boolean = false;
    if (!apiPermissions) {
      resolution = true;
    } else {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      const userActualPermissionsResponse: any = 
      await this.httpService.post('http://localhost:3000/auth/permissions', request.user).toPromise();
      
      const userActualPermissionsResponseData = userActualPermissionsResponse.data.data.permissions;

      if (_.includes(userActualPermissionsResponseData,'*')) {
        resolution = true;
      } else {
        resolution = _.difference(userActualPermissionsResponseData, apiPermissions).length === 0;
      }
    }
    return Promise.resolve(resolution);
  }




}