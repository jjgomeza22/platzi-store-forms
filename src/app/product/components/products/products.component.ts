import { Component, OnInit } from '@angular/core';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      _id: '1',
      description: 'mi producto',
      image: 'https://randomwordgenerator.com/img/picture-generator/54e8d74b4b56aa14f1dc8460962e33791c3ad6e04e507440752f72d69e4ec0_640.jpg',
      name: 'correos',
      price: 12
    },
  ];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

}
