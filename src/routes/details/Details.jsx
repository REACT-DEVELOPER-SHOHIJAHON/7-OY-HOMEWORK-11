import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Carousel, Typography, Button } from 'antd';
import { useParams } from "react-router-dom";
import { Container } from "../../utils";
import { useState } from "react";


const { Title, Text } = Typography;

const Details = () => {
    const { id } = useParams();
    const { data } = useGetProductDetailsQuery(id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!data || !data.payload) return null;

    const { product_images, product_name, description, sale_price, original_price } = data.payload;

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Container>
            <div className="flex flex-col lg:flex-row gap-12 mt-[120px]">
                <div className="flex flex-col space-y-2 p-4 rounded-lg bg-gray-100 shadow-md h-[500px] mt-[20px]">
                    {product_images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Product Thumbnail ${index + 1}`}
                            className={`w-[120px] h-[100px] object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-110 
                                ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                            onClick={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </div>

                <div className="lg:w-1/2">
                    <div className="p-4 bg-white shadow-lg rounded-lg">
                        {product_images.length > 1 ? (
                            <Carousel
                                autoplay
                                arrows
                                className="shadow-lg rounded-lg"
                                initialSlide={selectedImageIndex}
                                beforeChange={(current, next) => setSelectedImageIndex(next)}
                            >
                                {product_images.map((image, index) => (
                                    <div key={index} className="flex justify-center items-center bg-gray-900 rounded-lg">
                                        <img src={image} alt={`Product Image ${index + 1}`} className="object-cover w-full h-[500px] rounded-lg" />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <img
                                src={product_images[selectedImageIndex]}
                                alt="Product Image"
                                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                            />
                        )}
                    </div>
                </div>

                <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <Title level={1} className="text-4xl font-bold text-gray-900 mb-4">{product_name}</Title>
                        <Text className="text-lg text-gray-700 mb-6">{description}</Text>
                        <hr />
                        <Text className="text-lg text-gray-700 mb-6">{description}</Text>

                        <div className="mt-4 flex items-center gap-4">
                            <Text className="text-2xl font-bold text-red-500">${sale_price}</Text>
                            <Text className="text-lg font-bold text-gray-500 line-through">${original_price}</Text>
                            <Text className="text-lg font-bold text-green-500">10% off</Text>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                        <Button
                            icon={<MinusOutlined />}
                            onClick={() => handleQuantityChange('decrease')}
                            disabled={quantity === 1}
                            className="bg-gray-300 hover:bg-gray-400 transition"
                        />
                        <span className="text-xl font-semibold">{quantity}</span>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => handleQuantityChange('increase')}
                            className="bg-gray-300 hover:bg-gray-400 transition"
                        />
                        <Button type="primary" size="large" className="w-full py-4 text-xl font-semibold bg-blue-600 hover:bg-blue-700 transition">
                            Add {quantity} to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Details;
