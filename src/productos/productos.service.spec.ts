import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service.js';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosService],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('inicia con los dos productos del catálogo', () => {
    expect(service.findAll()).toHaveLength(2);
  });

  it('crea un producto con un id nuevo y lo agrega al catálogo', () => {
    const creado = service.create({ nombre: 'Teclado mecánico', precio: 249900, stock: 10 });

    expect(creado.id).toBe(3);
    expect(service.findAll()).toContainEqual(creado);
  });

  it('lanza NotFoundException al buscar un id que no existe', () => {
    expect(() => service.findOne(99)).toThrow(NotFoundException);
  });

  it('actualiza solo los campos enviados', () => {
    const actualizado = service.update(1, { precio: 159900 });

    expect(actualizado.precio).toBe(159900);
    expect(actualizado.nombre).toBe('Audífonos inalámbricos');
  });

  it('elimina un producto y deja de encontrarlo', () => {
    service.remove(2);

    expect(service.findAll()).toHaveLength(1);
    expect(() => service.findOne(2)).toThrow(NotFoundException);
  });

  it('lanza NotFoundException al eliminar un id que no existe', () => {
    expect(() => service.remove(99)).toThrow(NotFoundException);
  });
});
