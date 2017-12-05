import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';

@Pipe({
  name: `employeesFilterPipe`
})
export class EmployeesFilterPipe implements PipeTransform {

  transform(items: Employee[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.username.toLowerCase().includes(searchText) || it.surname.toLowerCase().includes(searchText);
    });
  }
}
