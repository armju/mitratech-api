import { Body, Controller, Get,Param, Post, Delete , Put, NotFoundException, ConflictException, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService : ProductsService){}
    
    @Get()
    async findAll() {
        return await this.productsService.findAll();
    }

    @Get(':name')
    async findOne(@Param('name') name: string) {
        return await this.productsService.findOneByName(name);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        try {
            return await this.productsService.create(createProductDto);
            
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Product already exist')
            }
            throw error;
        }
    }

    @Put(':name')
    async update(@Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
        const product = await this.productsService.update(name, updateProductDto);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    @Delete(':name')
    @HttpCode(204)
    async delete(@Param('name') name: string) {
        const product = await this.productsService.delete(name);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

}
