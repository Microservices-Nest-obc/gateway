import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from './dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsClient.send('create_product', createProductDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async getProducts(@Query() paginationDto: PaginationDto) {
    try {
      return await this.productsClient.send('find_all', paginationDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send('find_one', { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsClient.send('update_product', {
        id: parseInt(id),
        ...updateProductDto,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productsClient.send('remove_product', { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
