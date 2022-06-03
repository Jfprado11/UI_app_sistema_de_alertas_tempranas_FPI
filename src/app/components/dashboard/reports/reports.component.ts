import { DatePipe } from '@angular/common';
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
  loadingFirst = false;
  start = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource: MatTableDataSource<FpiDataInterface> = new MatTableDataSource();
  displayedColumns: string[] = [
    'ficha',
    'nombre_Programa',
    'competencia',
    'estado',
    'resulatado_aprendizaje',
    'jucio_de_evaluacion',
    'instructor_evaluo',
    'nombre',
    'apellido',
    'fecha_inicio',
    'fecha_fin',
    'fecha_lectiva',
    'fecha_actualizacion_reporte',
    'vencimiento_terminos',
  ];

  constructor(private fb: FormBuilder, private datepipe: DatePipe) {
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
    this.loadingFirst = true;
    const typeSearch = this.formSearch.value.typeSearch;
    const dataSearch = this.formSearch.value.dataSearch;
    this.isLoading = true;
    const URL = `https://api-sistemas-alertas-tempranas.herokuapp.com/api/v1/fpi-data/get-data?offset=${this.currentPage}&limit=${this.pageSize}`;
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
          const dataTransform = res.map((item: FpiDataInterface) => {
            return {
              ...item,
              FECHA_INICIO: this.datepipe.transform(
                item['FECHA_INICIO'],
                'dd/MM/yyyy'
              ),
              FECHA_FIN: this.datepipe.transform(
                item['FECHA_FIN'],
                'dd/MM/yyyy'
              ),
              FIN_LECTIVA: this.datepipe.transform(
                item['FIN_LECTIVA'],
                'dd/MM/yyyy'
              ),
              VENCIMIENTO_TERMINOS: this.datepipe.transform(
                item['VENCIMIENTO_TERMINOS'],
                'dd/MM/yyyy'
              ),
            };
          });
          console.log(dataTransform);
          this.start = true;
          this.dataSource.data = dataTransform;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            console.log(dataTransform[0]['ALL_ROWS']);
            this.paginator.length = dataTransform[0]['ALL_ROWS'];
          });
          this.isLoading = false;
          this.loadingFirst = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.loadingFirst = false;
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
