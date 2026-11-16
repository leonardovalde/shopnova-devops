import { ProductosService } from './productos.service.js';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(createProductoDto: CreateProductoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductoDto: UpdateProductoDto): string;
    remove(id: string): string;
}
