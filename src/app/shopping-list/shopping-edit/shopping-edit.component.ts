import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdd() {
    this.addIngredient.emit(this.createIngredient());
  }

  createIngredient() {
    const name = this.nameInput.nativeElement.value.trim();
    const amount = this.amountInput.nativeElement.value;
    if (name === '' && amount === '') return;
    return new Ingredient(name, parseInt(amount, 10));   
  }

}
