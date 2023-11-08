import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductUtils from '../../utils/entities/ProductUtils';
import AppPath from '../../components/appPath/AppPath';
import ProductInformation from '../../components/productInformation/ProductInformation';
import { Product, BidInformation } from '../../types';
import BidUtils from '../../utils/entities/BidUtils';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const ProductPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isImageContainerFocused, setIsImageContainerFocused] =
        useState(false);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const [bidInformation, setBidInformation] = useState<BidInformation>({
        highestBid: 0,
        numberOfBids: 0,
        timeLeft: '',
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('product_id');

    const imageContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (productId) {
            ProductUtils.fetchProduct(productId).then((data) => {
                setProduct(data);
                console.log(data);
            });
        }
    }, [productId]);

    useEffect(() => {
        if (productId) {
            BidUtils.getBidInformation(productId).then((data) => {
                setBidInformation(data);
            });
        }
    }, [productId]);

    const handleImageClick = (imageIndex: number) => {
        setSelectedImage(imageIndex);
        setIsImageClicked(true);
    };

    useEffect(() => {
        const handleArrowKeyPress = (e: KeyboardEvent) => {
            if ((isImageContainerFocused || isImageClicked) && product) {
                if (e.key === 'ArrowLeft') {
                    setSelectedImage((prevSelectedImage) =>
                        prevSelectedImage > 0 ? prevSelectedImage - 1 : 0,
                    );
                } else if (e.key === 'ArrowRight') {
                    setSelectedImage((prevSelectedImage) =>
                        prevSelectedImage < product.images.length - 1
                            ? prevSelectedImage + 1
                            : prevSelectedImage,
                    );
                }
            }
        };

        window.addEventListener('keydown', handleArrowKeyPress);

        return () => {
            window.removeEventListener('keydown', handleArrowKeyPress);
        };
    }, [product, isImageContainerFocused, isImageClicked]);

    useEffect(() => {
        const handleClick = () => {
            setIsImageContainerFocused(true);
        };

        const handleBlur = () => {
            setIsImageContainerFocused(false);
            setIsImageClicked(false);
        };

        if (imageContainerRef.current) {
            imageContainerRef.current.addEventListener('click', handleClick);
            imageContainerRef.current.addEventListener('blur', handleBlur);
        }

        return () => {
            if (imageContainerRef.current) {
                imageContainerRef.current.removeEventListener(
                    'click',
                    handleClick,
                );
                imageContainerRef.current.removeEventListener(
                    'blur',
                    handleBlur,
                );
            }
        };
    }, []);

    return (
        <>
            <div className="w-2/3 mx-auto pt-12 flex justify-between font-lato">
                <div>
                    {product ? (
                        <div className="font-bold">
                            <div>{product.name}</div>
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
                <AppPath />
            </div>

            <div className="flex w-2/3 h-2/3 mx-auto pt-12 gap-16">
                <div
                    className="flex flex-col w-1/2"
                    ref={imageContainerRef}
                    tabIndex={0}
                    style={{
                        outline: 'none',
                    }}
                >
                    <div
                        className="overflow-hidden w-full flex items-center justify-center"
                        style={{
                            height: '450px',
                        }}
                    >
                        {product && (
                            <>
                                <img
                                    src={product.images[selectedImage].imageUrl}
                                    alt={product.name}
                                    className="max-w-full max-h-full"
                                />
                            </>
                        )}
                    </div>

                    <div className="flex pt-8 pb-8 justify-between gap-2">
                        {product &&
                            product.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`w-1/5 h-4/5 ${
                                        index === selectedImage
                                            ? 'selected border border-trueIndigo-500 shadow-xl'
                                            : 'border border-gray-300'
                                    } flex justify-center items-center`}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={`Image ${index}`}
                                        className="cursor-pointer h-4/5"
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                {product && (
                    <ProductInformation
                        product={product}
                        bidInformation={bidInformation}
                    />
                )}
            </div>
        </>
    );
};

export default ProductPage;
