import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { Producto } from './entities/producto.entity.js';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Audífonos inalámbricos', precio: 189900, stock: 25 },
    { id: 2, nombre: 'Lámpara LED de escritorio', precio: 79900, stock: 40 },
  ];
  private siguienteId = 3;

  create(dto: CreateProductoDto): Producto {
    const producto: Producto = {
      id: this.siguienteId++,
      nombre: dto.nombre,
      precio: dto.precio,
      stock: dto.stock,
    };
    this.productos.push(producto);
    return producto;
  }

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) throw new NotFoundException(`Producto ${id} no existe`);
    return producto;
  }

  update(id: number, dto: UpdateProductoDto): Producto {
    const producto = this.findOne(id);
    Object.assign(producto, dto);
    return producto;
  }

  remove(id: number): void {
    const indice = this.productos.findIndex((p) => p.id === id);
    if (indice === -1) throw new NotFoundException(`Producto ${id} no existe`);
    this.productos.splice(indice, 1);
  }
}
