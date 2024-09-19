import React from 'react';
import { addLike, removeLike } from '../../redux/slices/likeSlice';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from '../../utils';
import { Carousel, Rate } from 'antd';
import { Button, Card } from 'antd';


const { Meta } = Card;

const Products = () => {
    const { data } = useGetProductsQuery();
    const dispatch = useDispatch();
    const likedProducts = useSelector((state) => state.like.likes);

    const handleLike = (productId) => {
        if (likedProducts.includes(productId)) {
            dispatch(removeLike(productId)); 
        } else {
            dispatch(addLike(productId)); 
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-700 text-white">
            <Banner data={data} />
            <Container>
                <h2 className="text-4xl font-bold text-center mb-10 text-yellow-300">Our Products</h2>
                <ProductGrid 
                    products={data?.payload} 
                    likedProducts={likedProducts} 
                    handleLike={handleLike} 
                />
            </Container>
        </div>
    );
};

const Banner = ({ data }) => (
    <div className="relative h-screen mb-16">
        <img 
            src={data && data.payload[0].product_images[3]} 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-600 opacity-90"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-7xl font-extrabold mb-4 text-yellow-400">iPhone 16 Pro Max</h1>
            <p className="text-2xl mb-6 max-w-3xl">
                Experience the power of a new generation of iPhone.
            </p>
            <Button className="mt-6 px-8 py-3 text-lg font-bold bg-blue-500 hover:bg-blue-600 transition" type="primary">
                Shop Now iPhone
            </Button>
        </div>
    </div>
);

const ProductGrid = ({ products, likedProducts, handleLike }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map(product => (
            <ProductCard 
                key={product._id} 
                product={product} 
                likedProducts={likedProducts} 
                handleLike={handleLike} 
            />
        ))}
    </div>
);

const ProductCard = ({ product, likedProducts, handleLike }) => (
    <Card
        hoverable
        className="bg-gray-800 transition-transform duration-300 hover:scale-105 shadow-lg"
        cover={
            <>
                <Carousel autoplay arrows>
                    {product.product_images.map((image, index) => (
                        <div key={index} className="flex justify-center">
                            <img src={image} alt={product.product_name} className="object-cover w-full h-60 rounded-lg border-2 border-blue-500" />
                        </div>
                    ))}
                </Carousel>
                <div className="absolute top-2 right-2 z-10">
                    <Button
                        type="text" 
                        icon={likedProducts.includes(product._id) ? <HeartFilled className='text-red-500' /> : <HeartOutlined className='text-white' />} 
                        onClick={() => handleLike(product._id)} 
                    />
                </div>
            </>
        }
    >
        <Meta
            title={<span className='text-white'>{product.product_name}</span>}
            description={<ProductDescription product={product} />}
        />
        <Link to={`/products/${product._id}`}>
            <Button className='w-full mt-4 bg-green-500 hover:bg-green-600 transition' type='primary'>View Details</Button>
        </Link>
    </Card>
);

const ProductDescription = ({ product }) => (
    <div>
        <span className='text-lg text-yellow-400'>${product.sale_price}</span>
        <div className='text-sm text-gray-300'>
            <p className='mb-2'>{product.description}</p>
            <div className='flex items-center'>
                <Rate disabled defaultValue={2} />
                <span className='ml-2'>{product.reviews_count} reviews</span>
            </div>
            {product.discount && 
                <div className='mt-2 text-red-400'>
                    <strong>Profucts: {product.discount}% discount </strong>
                </div>
            }
        </div>
    </div>
);

export default Products;
