import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '../consts/roles.const';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  roles = ROLES;

  transform(roleId: number): string {
    let role = this.roles.find(role => role.id == roleId);
    return role.descricao;
  }

}
