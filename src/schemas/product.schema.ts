import { Schema , Prop, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';


@Schema({
    timestamps: true
})
export class Product{
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    })
    name:string;
    
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    })
    description: string;
    
    @Prop({
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
          validator: function(price) {
            return price >= 1 && price <= 20000 && /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(price.toString());
          },
          message: 'Price must be between 1 and 20000 with up to 2 decimal places'
        }
    })
    price: number;
}

export const ProductSchema =  SchemaFactory.createForClass(Product)