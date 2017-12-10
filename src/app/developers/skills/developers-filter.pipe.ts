import { Pipe, PipeTransform } from '@angular/core';
import { Developer } from '../../shared/models/developer.model';

@Pipe({
  name: `developersFilterPipe`
})
export class DevelopersFilterPipe implements PipeTransform {

  transform(items: Developer[], searchText: string): any[] {
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
