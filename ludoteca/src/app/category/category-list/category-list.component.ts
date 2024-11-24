import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog // Para poder usar un diálogo
  ) { }

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        categories => this.dataSource.data = categories
      );
  }

  // Función que se llamará desde el botón al hacer click
  createCategory() {
    // Con esto abrimos el diálogo con el componente CategoryEditComponent
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {}
    });

    // Cuándo el diálogo se cierra ejecuta lo que hay en subscribe, en este caso vuelve a llamar
    // a ngOnInit para actualizar la vista del componente principal
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
