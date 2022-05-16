import { Component, OnInit } from '@angular/core';

export interface usuario {
  usuario: string;
  name: string;
  lastname: number;
  sexo: string;
}

const listUsuarios: usuario[] = [
  { usuario: "usuairo", name: 'Hydrogen', lastname: 1.0079, sexo: 'H' },
  { usuario: "usuairo", name: 'Helium', lastname: 4.0026, sexo: 'He' },
  { usuario: "usuairo", name: 'Lithium', lastname: 6.941, sexo: 'Li' },
  { usuario: "usuairo", name: 'Beryllium', lastname: 9.0122, sexo: 'Be' },
  { usuario: "usuairo", name: 'Boron', lastname: 10.811, sexo: 'B' },
  { usuario: "usuairo", name: 'Carbon', lastname: 12.0107, sexo: 'C' },
  { usuario: "usuairo", name: 'Nitrogen', lastname: 14.0067, sexo: 'N' },
  { usuario: "usuairo", name: 'Oxygen', lastname: 15.9994, sexo: 'O' },
  { usuario: "usuairo", name: 'Fluorine', lastname: 18.9984, sexo: 'F' },
  { usuario: "usuairo", name: 'Neon', lastname: 20.1797, sexo: 'Ne' },
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'name', 'lastname', 'sexo'];
  dataSource = listUsuarios;

  constructor() {}

  ngOnInit(): void {}
}
