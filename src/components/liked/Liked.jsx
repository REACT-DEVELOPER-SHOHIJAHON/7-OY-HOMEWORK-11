import { useGetLikedProductsMutation } from "../../redux/api/likedApi";
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { HeartFilled, HeartOutlined } from '@ant-design/icons'; 
import { removeLike } from '../../redux/slices/likeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from '../../utils';
import { Card, Button } from 'antd'; 
import React from 'react';


const { Meta } = Card;

const Like = () => {
    const dispatch = useDispatch();
    const [getLikedProducts] = useGetLikedProductsMutation();
    const likedProducts = useSelector((state) => state.like.likes);
    const { data: productsData } = useGetProductsQuery();

    const likedItems = productsData?.payload.filter((product) => likedProducts.includes(product._id));

    const handleLikeToggle = (productId, liked) => {
        dispatch(removeLike(productId));
        getLikedProducts({ id: productId, liked });
    };

    return (
        <Container>
            <h2 className='text-5xl font-bold text-center mb-12 mt-[100px] text-purple-600'>Liked Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {likedItems && likedItems.length > 0 ? (
                    likedItems.map((product) => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            likedProducts={likedProducts} 
                            handleLikeToggle={handleLikeToggle} 
                        />
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-400">You have not liked any products</p>
                )}
            </div>
        </Container>
    );
};

const ProductCard = ({ product, likedProducts, handleLikeToggle }) => (
    <Card
        hoverable
        className='relative transition-transform duration-300 hover:scale-105 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg'
        cover={
            <img src={product.product_images[0]} alt={product.product_name} className='object-cover w-full h-64 rounded-lg' />
        }
    >
        <div className="absolute top-4 right-4">
            {likedProducts.includes(product._id) ? (
                <HeartFilled 
                    className="text-red-600 text-2xl cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleLikeToggle(product._id, true)}
                />
            ) : (
                <HeartOutlined
                    className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleLikeToggle(product._id, false)}
                />
            )}
        </div>
        <Meta
            title={<span className='text-white text-lg font-semibold'>{product.product_name}</span>}
            description={
                <ProductDescription product={product} />
            }
        />
        <Link to={`/products/${product._id}`}>
            <Button className='w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold'>
                View 
            </Button>
        </Link>
    </Card>
);

const ProductDescription = ({ product }) => (
    <div>
        <span className='text-2xl text-green-400 font-bold'>${product.sale_price}</span>
        <p className='text-sm text-gray-300 mb-2'>{product.description}</p>
        {product.discount && (
            <div className='mt-2 text-red-500'>
                <strong>Discount: {product.discount}% OFF</strong>
            </div>
        )}
        <div className="mt-2 text-white">
            <span>{product.likes_count} Likes</span> 
        </div>
    </div>
);

export default Like;
