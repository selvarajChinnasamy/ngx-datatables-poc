import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from './model/paged-data';
import { CorporateEmployee } from './model/corporate-employee';
import { Page } from './model/page';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MockServerResultsService {
  companyData;
  constructor(private http: HttpClient) {
   this.http.get('../assets/data/company.json').subscribe(data => {
     this.companyData = data;
   });
  }

    public getResults(page: Page) {
        return this.http.get('../assets/data/company.json').pipe(map(data => this.getPagedData(page, data)));
    }

    private getPagedData(page: Page, companyData): PagedData<CorporateEmployee> {
        const pagedData = new PagedData<CorporateEmployee>();
        page.totalElements = companyData.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++) {
            const jsonObj = companyData[i];
            const employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }

}
