import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto'; 
import { UpdateProductDto } from '../dto/update-product.dto'; 


@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel : Model<Product>){}

    async findAll() {
        return await this.productModel.find().exec();
    }

    async create(createProductDto: CreateProductDto) {
        const newProduct = new this.productModel(createProductDto);
        return await newProduct.save();
    }

    async findOneByName(name: string) {
        const product = await this.productModel.findOne({ name: name });
        if (!product) {
            throw new NotFoundException(`Product with name ${name} not found`);
        }
        return product;
    }

    async delete(name: string) {
        return await this.productModel.findOneAndDelete({ name: name });
    }

    async update(name: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productModel.findOneAndUpdate({ name: name }, { $set: updateProductDto }, { new: true });
        if (!updatedProduct) {
            throw new NotFoundException(`Product with name ${name} not found`);
        }
        return updatedProduct;
    }
    
}
