import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  constructor() { }

  copiarObjeto(objeto: any): any {
      return cloneDeep(JSON.parse(JSON.stringify(objeto)));
  }
}
