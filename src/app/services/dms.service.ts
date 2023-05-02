import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestEnds } from '../shared/config/config';
import { ApiManager } from '../shared/managers/api-manager';

@Injectable({
  providedIn: 'root'
})
export class DmsService {

  constructor(
    private apiManager: ApiManager
  ) { }

  // upload(data:any, folderId: any){
  //   return this.apiManager.sendUploadRequest(RestEnds.upload+"/"+environment.bucketName+"/"+folderId, data, true)
  // }

  // createFolder(data: any){
  //   return this.apiManager.sendDMSRequest(RestEnds.createFolder, data, true)
  // }

  // getFolder(data: any){
  //   return this.apiManager.sendDMSRequest(RestEnds.getFolder+"/"+environment.bucketName, data, true)
  // }
}
