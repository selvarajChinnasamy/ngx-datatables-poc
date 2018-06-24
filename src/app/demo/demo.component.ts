import { Component, OnInit } from '@angular/core';
import { MockServerResultsService } from '../mock-server-results-service';
import { PagedData } from '../model/paged-data';
import { CorporateEmployee } from '../model/corporate-employee';
import { Page } from '../model/page';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
  page = new Page();
  rows = new Array<CorporateEmployee>();
  loading = false;
  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }
  ngOnInit() {
    this.setPage({ offset: 0, pageSize: 10 });
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;


    this.serverResultsService.getResults(this.page).subscribe(pagedData => {

      this.loading = false;

      this.page = pagedData.page;

      const start = this.page.pageNumber * this.page.size;

      const rows = [...this.rows];

      this.rows = pagedData.data;
    });
  }

  onSort(event) {
    console.log('sort', event);
    // Api call for sorting
  }
  updateFilter(event) {
    console.log('search filter', event);
    // Api call for search filter
  }
}
