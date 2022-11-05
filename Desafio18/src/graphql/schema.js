import {buildSchema} from "graphql";
import {ProductoType} from "./types/productType.js";
import {GetAllProductosQuery} from "./queries/getAllProducts.js";
import {GetProductByIdQuery} from "./queries/getProductById.js";
import {ProductoNewInput} from "./inputs/ProductsNew.js";
import {CreateProductoMutation} from "./mutations/createProduct.js";
import {ProductoUpdateInput} from "./inputs/ProductsUpdate.js";
import {UpdateProductByIdMutation} from "./mutations/updateProductById.js";
import {DeleteProductByIdMutation} from "./mutations/deleteProductById.js";

export const schema = buildSchema(`
  ${ProductoType}
  ${ProductoNewInput}
  ${ProductoUpdateInput}
  
  type Query {
    ${GetProductByIdQuery}
    ${GetAllProductosQuery}
  }
  
  
  type Mutation {
    ${CreateProductoMutation}
    ${UpdateProductByIdMutation}
    ${DeleteProductByIdMutation}
  }
`);