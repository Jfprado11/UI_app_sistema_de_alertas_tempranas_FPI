import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FpiDataInterface } from 'src/app/interfaces/FpiData.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  formSearch: FormGroup;
  start = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource: MatTableDataSource<FpiDataInterface> = new MatTableDataSource();
  displayedColumns: string[] = ['usuario', 'name', 'lastname', 'sexo'];

  constructor(private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      typeSearch: ['', Validators.required],
      dataSearch: ['', Validators.required],
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log(this.dataSource);
  }

  searchInfoReq() {
    const typeSearch = this.formSearch.value.typeSearch;
    const dataSearch = this.formSearch.value.dataSearch;
    this.isLoading = true;
    const URL = `http://localhost:3000/api/v1/fpi-data/get-data?offset=${this.currentPage}&limit=${this.pageSize}`;
    const token = localStorage.getItem('token');
    const data = { [typeSearch]: dataSearch };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res);
          this.start = true;
          this.dataSource.data = res;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            console.log(res[0]['ALL_ROWS']);
            this.paginator.length = res[0]['ALL_ROWS'];
          });
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.searchInfoReq();
  }
}
