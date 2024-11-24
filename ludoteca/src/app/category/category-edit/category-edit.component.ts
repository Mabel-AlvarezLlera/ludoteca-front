import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category : Category },
    private categoryService: CategoryService
  ) {
    this.category = new Category();
  }

  ngOnInit(): void {
    // Para si queremos modificar un elemento de la lista o crear una nueva categoría
    // Si se quiere modificar un elemento, tiene que aparecer en nuestro diálogo
    // el elemento, y usamos el Object.assign porque no queremos que se actualice en la lista
    this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
  }

  onSave() {
    this.categoryService.saveCategory(this.category).subscribe(() => {
      this.dialogRef.close();
    })
  }

  onClose() {
    this.dialogRef.close();
  }
}
